export type ATextTag = 'h1' | "h2" | "h3" | "h4" | "p";
export type ATextClassName = "pageTitle" | "mainText" | "tagText";

export interface ATextProps {
    tag?: ATextTag;
    className?: ATextClassName;
    color?: string;
    align?: "left" | "center" | "right";
    children: React.ReactNode;
}