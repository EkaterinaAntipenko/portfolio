import {AHeader, ANav, ANavItem, ADiscussButton} from "./B-header.styles"
import type {HeaderProps, NavItem} from "./B-header.types"

const defaultItems : NavItem[] = [
    { label: "Обо мне", targetId: "about" },
    { label: "Стек", targetId: "stack" },
    { label: "Резюме", targetId: "resume" },
    { label: "Опыт", targetId: "experience" },
    { label: "Инспо", targetId: "inspo" }
]

function scrollToSection(targetId: string) {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
}

export function Header({ items = defaultItems, onDiscuss }: HeaderProps) {
    return (
        <AHeader>
            <ANav>
                {items.map((item) => (
                    <ANavItem
                        key={item.targetId}
                        type="button"
                        onClick={() => scrollToSection(item.targetId)}
                    >
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
