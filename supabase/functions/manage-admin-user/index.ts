import { createClient } from "jsr:@supabase/supabase-js@2"

const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

function json(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...cors, "Content-Type": "application/json" },
    })
}

Deno.serve(async (request) => {
    if (request.method === "OPTIONS") return new Response("ok", { headers: cors })

    const url = Deno.env.get("SUPABASE_URL")!
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)

    const caller = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: request.headers.get("Authorization") ?? "" } },
    })

    const { data: session } = await caller.auth.getUser()
    if (!session.user) return json({ error: "Нужен вход" }, 401)

    const { data: profile } = await admin
        .from("admin_users")
        .select("status")
        .eq("id", session.user.id)
        .maybeSingle()

    if (profile?.status !== "approved") return json({ error: "Недостаточно прав" }, 403)

    const { action, id, email, password, name, status } = await request.json()

    if (action === "delete") {
        if (!id) return json({ error: "Нужен id" }, 400)
        if (id === session.user.id) return json({ error: "Нельзя удалить себя" }, 400)
        const { error } = await admin.auth.admin.deleteUser(id)
        if (error) return json({ error: error.message }, 400)
        return json({ ok: true })
    }

    if (action === "update") {
        if (!id) return json({ error: "Нужен id" }, 400)

        const credentials: Record<string, string> = {}
        if (email) credentials.email = email
        if (password) credentials.password = password

        if (Object.keys(credentials).length) {
            const { error } = await admin.auth.admin.updateUserById(id, credentials)
            if (error) return json({ error: error.message }, 400)
        }

        const patch: Record<string, string> = {}
        if (email) patch.email = email
        if (name !== undefined) patch.name = name
        if (status) patch.status = status

        if (Object.keys(patch).length) {
            const { error } = await admin.from("admin_users").update(patch).eq("id", id)
            if (error) return json({ error: error.message }, 400)
        }

        return json({ ok: true })
    }

    if (!email || !password) return json({ error: "Нужны почта и пароль" }, 400)

    const { data: created, error } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    })
    if (error) return json({ error: error.message }, 400)

    const { error: profileError } = await admin.from("admin_users").upsert({
        id: created.user.id,
        email,
        name: name ?? "",
        status: "approved",
        approval_token: null,
    })
    if (profileError) return json({ error: profileError.message }, 400)

    return json({ ok: true, id: created.user.id })
})
