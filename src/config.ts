export const WEB3FORMS_ACCESS_KEY: string =
    import.meta.env.VITE_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_ACCESS_KEY";

export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? "";

export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured: boolean = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const OWNER_EMAIL: string =
    import.meta.env.VITE_OWNER_EMAIL ?? "antipenkoekaterina097@gmail.com";
