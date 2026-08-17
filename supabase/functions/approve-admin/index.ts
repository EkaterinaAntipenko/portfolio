import { createClient } from "jsr:@supabase/supabase-js@2"

function page(title: string, message: string) {
    return new Response(
        `<!doctype html><meta charset="utf-8"><title>${title}</title>` +
            `<div style="font-family:sans-serif;background:#141417;color:#f2f2f5;min-height:100vh;display:flex;align-items:center;justify-content:center">` +
            `<div style="text-align:center;padding:2rem"><h1 style="font-size:1.5rem">${title}</h1><p style="color:#9a9aa2">${message}</p></div></div>`,
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
    )
}

Deno.serve(async (request) => {
    const token = new URL(request.url).searchParams.get("token")
    if (!token) return page("Ссылка неверная", "В ссылке нет кода подтверждения.")

    const admin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { data: user } = await admin
        .from("admin_users")
        .select("id, email")
        .eq("approval_token", token)
        .maybeSingle()

    if (!user) return page("Ссылка недействительна", "Код уже использован или неверен.")

    const { error } = await admin
        .from("admin_users")
        .update({ status: "approved", approval_token: null })
        .eq("id", user.id)

    if (error) return page("Не получилось", error.message)

    return page("Доступ подтверждён", `Пользователь ${user.email} теперь может войти в админку.`)
})
