export interface ProjectImage {
    id: string;
    url: string;
    caption?: string;
    sortOrder: number;
}

export interface ProjectLink {
    id: string;
    label: string;
    url: string;
    sortOrder: number;
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    tags: string[];
    coverUrl: string;
    sortOrder: number;
    images: ProjectImage[];
    links: ProjectLink[];
}

export type ProjectDraft = Omit<Project, "id">;
