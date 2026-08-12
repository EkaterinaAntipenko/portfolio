export type AButtonType = "button" | "submit" | "reset";
export type AButtonClassName = "primary" | "secondary" | "ghost";

export interface AButtonProps {
    type?: AButtonType;
    className?: AButtonClassName;
    color?: string;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}
