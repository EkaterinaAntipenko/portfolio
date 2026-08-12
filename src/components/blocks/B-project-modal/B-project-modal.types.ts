export type ProjectModalStatus = "idle" | "loading" | "success" | "error";

export interface ProjectModalProps {
    open: boolean;
    onClose: () => void;
}
