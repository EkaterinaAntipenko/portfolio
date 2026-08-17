export interface NavItem {
    label: string;
    targetId: string;
}

export interface HeaderProps {
    items?: NavItem[];
    onDiscuss: () => void;
}
