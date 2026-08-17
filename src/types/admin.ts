export type AdminStatus = "pending" | "approved" | "rejected";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    status: AdminStatus;
}

export interface AdminUserDraft {
    name: string;
    email: string;
    password: string;
}
