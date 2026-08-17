export type ATextTag = "h1" | "h2" | "h3" | "h4" | "p";
export type ATextClassName = "pageTitle" | "heading2" | "mainText" | "tagText";

//то что тип получает
export interface ATextProps {
    tag?: ATextTag;
    className?: ATextClassName;
    color?: string;
    align?: "left" | "center" | "right";
    children: React.ReactNode;
}