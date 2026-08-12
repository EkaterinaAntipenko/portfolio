import {AHeader, ANav, ANavItem, ADiscussButton} from "./B-header.styles"
import type {HeaderProps, NavItem} from "./B-header.types"

const defaultItems : NavItem[] = [
    { label: "Обо мне", href: "#about" },
    { label: "Стек", href: "#stack" },
    { label: "Резюме", href: "#resume" },
    { label: "Опыт", href: "#experience" },
    { label: "Инспо", href: "#inspo" }
]

export function Header({ items = defaultItems, onDiscuss }: HeaderProps) {
    return (
        <AHeader>
            <ANav>
                {items.map((item) => (
                    <ANavItem key={item.href} href={item.href}>
                        {item.label}
                    </ANavItem>
                ))}
            </ANav>

            <ADiscussButton type="button" onClick={onDiscuss}>
                Обсудить проект
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ADiscussButton>
        </AHeader>
    )
}
