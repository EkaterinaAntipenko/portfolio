import { supabase } from "./supabase"
import { WEB3FORMS_ACCESS_KEY, OWNER_EMAIL } from "../config"
import type { AdminUser, AdminUserDraft, AdminStatus } from "../types/admin"

const USERS_KEY = "portfolio.adminUsers"
const SESSION_KEY = "portfolio.adminSession"

type LocalUser = AdminUser & { passwordHash: string }

async function hash(password: string): Promise<string> {
    const bytes = new TextEncoder().encode(password)
    const digest = await crypto.subtle.digest("SHA-256", bytes)
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("")
}

function readLocalUsers(): LocalUser[] {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]") as LocalUser[]
    } catch {
        return []
    }
}

function writeLocalUsers(users: LocalUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function strip(user: LocalUser): AdminUser {
    return { id: user.id, name: user.name, email: user.email, status: user.status }
}

async function notifyOwner(user: { name: string; email: string }, approveUrl?: string) {
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") return

    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            email: OWNER_EMAIL,
            subject: "Запрос доступа в админку портфолио",
            from_name: "Портфолио",
            message:
                `Пользователь запросил доступ администратора.\n\n` +
                `Имя: ${user.name || "не указано"}\n` +
                `Почта: ${user.email}\n\n` +
                (approveUrl
                    ? `Подтвердить доступ: ${approveUrl}`
                    : `Подтвердите его в админке, раздел «Пользователи».`),
        }),
    }).catch(() => undefined)
}

export async function signUp({ name, email, password }: AdminUserDraft): Promise<string> {
    if (!supabase) {
        const users = readLocalUsers()
        if (users.some((user) => user.email === email)) {
            throw new Error("Пользователь с такой почтой уже есть")
        }

        const isFirst = users.length === 0
        const user: LocalUser = {
            id: `u${Date.now()}`,
            name,
            email,
            status: isFirst ? "approved" : "pending",
            passwordHash: await hash(password),
        }
        writeLocalUsers([...users, user])

        if (isFirst) return "Вы первый пользователь — доступ выдан сразу. Войдите."

        await notifyOwner({ name, email })
        return "Заявка отправлена. Дождитесь подтверждения на почте владельца."
    }

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw new Error(error.message)

    if (data.user) {
        await supabase.functions.invoke("admin-signup", {
            body: { userId: data.user.id, email, name },
        })
    }

    await supabase.auth.signOut()
    return "Заявка отправлена. Дождитесь подтверждения на почте владельца."
}

export async function signIn(email: string, password: string): Promise<AdminUser> {
    if (!supabase) {
        const user = readLocalUsers().find((item) => item.email === email)
        if (!user || user.passwordHash !== (await hash(password))) {
            throw new Error("Неверная почта или пароль")
        }
        if (user.status !== "approved") {
            throw new Error("Доступ ещё не подтверждён владельцем")
        }
        localStorage.setItem(SESSION_KEY, user.id)
        return strip(user)
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error("Неверная почта или пароль")

    const profile = await fetchProfile(data.user.id)
    if (!profile || profile.status !== "approved") {
        await supabase.auth.signOut()
        throw new Error("Доступ ещё не подтверждён владельцем")
    }

    return profile
}

export async function signOut(): Promise<void> {
    if (!supabase) {
        localStorage.removeItem(SESSION_KEY)
        return
    }
    await supabase.auth.signOut()
}

async function fetchProfile(id: string): Promise<AdminUser | null> {
    if (!supabase) return null

    const { data } = await supabase
        .from("admin_users")
        .select("id, name, email, status")
        .eq("id", id)
        .maybeSingle()

    return (data as AdminUser | null) ?? null
}

export async function getCurrentUser(): Promise<AdminUser | null> {
    if (!supabase) {
        const id = localStorage.getItem(SESSION_KEY)
        if (!id) return null
        const user = readLocalUsers().find((item) => item.id === id)
        return user && user.status === "approved" ? strip(user) : null
    }

    const { data } = await supabase.auth.getSession()
    if (!data.session) return null

    const profile = await fetchProfile(data.session.user.id)
    return profile && profile.status === "approved" ? profile : null
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
    if (!supabase) return readLocalUsers().map(strip)

    const { data, error } = await supabase
        .from("admin_users")
        .select("id, name, email, status")
        .order("created_at")

    if (error) throw new Error(error.message)
    return (data ?? []) as AdminUser[]
}

export async function createAdminUser({ name, email, password }: AdminUserDraft): Promise<void> {
    if (!supabase) {
        const users = readLocalUsers()
        if (users.some((user) => user.email === email)) {
            throw new Error("Пользователь с такой почтой уже есть")
        }
        writeLocalUsers([
            ...users,
            { id: `u${Date.now()}`, name, email, status: "approved", passwordHash: await hash(password) },
        ])
        return
    }

    const { data, error } = await supabase.functions.invoke("manage-admin-user", {
        body: { action: "create", name, email, password },
    })
    if (error) throw new Error(error.message)
    if (data?.error) throw new Error(data.error)
}

export async function updateAdminUser(
    id: string,
    patch: { name?: string; email?: string; password?: string; status?: AdminStatus }
): Promise<void> {
    if (!supabase) {
        const users = readLocalUsers()
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) throw new Error("Пользователь не найден")

        const user = users[index]
        users[index] = {
            ...user,
            name: patch.name ?? user.name,
            email: patch.email ?? user.email,
            status: patch.status ?? user.status,
            passwordHash: patch.password ? await hash(patch.password) : user.passwordHash,
        }
        writeLocalUsers(users)
        return
    }

    const { data, error } = await supabase.functions.invoke("manage-admin-user", {
        body: { action: "update", id, ...patch },
    })
    if (error) throw new Error(error.message)
    if (data?.error) throw new Error(data.error)
}

export async function deleteAdminUser(id: string): Promise<void> {
    if (!supabase) {
        writeLocalUsers(readLocalUsers().filter((user) => user.id !== id))
        return
    }

    const { data, error } = await supabase.functions.invoke("manage-admin-user", {
        body: { action: "delete", id },
    })
    if (error) throw new Error(error.message)
    if (data?.error) throw new Error(data.error)
}
