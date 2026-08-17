export interface OrbitItem {
    id: string;
    src: string;
    alt: string;
    radius: number;
    size: number;
    duration: number;
    startAngle?: number;
}

export interface OrbitSystemProps {
    centerImage: {
        src: string;
        alt: string;
        size?: number;
    };
    items: OrbitItem[];
}
