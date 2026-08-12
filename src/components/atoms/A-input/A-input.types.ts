export type AInputType = "text" | "email" | "password" | "search";
export type AInputClassName = "default" | "outlined";

export interface AInputProps {
    type?: AInputType;
    className?: AInputClassName;
    value?: string;
    placeholder?: string;
    color?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}
