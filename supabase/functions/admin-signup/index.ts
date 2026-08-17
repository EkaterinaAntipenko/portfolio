import { createClient } from "jsr:@supabase/supabase-js@2"

const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

Deno.serve(async (request) => {
    if (request.method === "OPTIONS") return new Response("ok", { headers: cors })

    const admin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { userId, email, name } = await request.json()

    if (!userId || !email) {
        return new Response(JSON.stringify({ error: "userId and email are required" }), {
            status: 400,
            headers: { ...cors, "Content-Type": "application/json" },
        })
    }

    const token = crypto.randomUUID() + crypto.randomUUID()

    const { error } = await admin
        .from("admin_users")
        .upsert({ id: userId, email, name: name ?? "", status: "pending", approval_token: token })

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...cors, "Content-Type": "application/json" },
        })
    }

    const approveUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/approve-admin?token=${token}`

    await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
            access_key: Deno.env.get("WEB3FORMS_KEY"),
            email: Deno.env.get("OWNER_EMAIL"),
            subject: "Запрос доступа в админку портфолио",
            from_name: "Портфолио",
            message:
                `Пользователь запросил доступ администратора.\n\n` +
                `Имя: ${name ?? "не указано"}\n` +
                `Почта: ${email}\n\n` +
                `Подтвердить доступ: ${approveUrl}\n\n` +
                `Если это не вы — просто проигнорируйте письмо, вход останется закрытым.`,
        }),
    })

    return new Response(JSON.stringify({ ok: true }), {
        headers: { ...cors, "Content-Type": "application/json" },
    })
})
