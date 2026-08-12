export interface NavItem {
    label: string;
    href: string;
}

export interface HeaderProps {
    items?: NavItem[];
    onDiscuss: () => void;
}
