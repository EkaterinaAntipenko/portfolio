import { supabase } from "./supabase"
import { seedProjects } from "../data/seedProjects"
import type { Project } from "../types/project"

const STORAGE_KEY = "portfolio.projects"

function readLocal(): Project[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects))
        return seedProjects
    }
    try {
        return JSON.parse(raw) as Project[]
    } catch {
        return seedProjects
    }
}

function writeLocal(projects: Project[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

function sortProjects(projects: Project[]): Project[] {
    return [...projects]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((project) => ({
            ...project,
            images: [...project.images].sort((a, b) => a.sortOrder - b.sortOrder),
            links: [...project.links].sort((a, b) => a.sortOrder - b.sortOrder),
        }))
}

type ProjectRow = {
    id: string
    slug: string
    title: string
    description: string | null
    tags: string[] | null
    cover_url: string | null
    sort_order: number | null
    project_images: { id: string; url: string; caption: string | null; sort_order: number | null }[] | null
    project_links: { id: string; label: string; url: string; sort_order: number | null }[] | null
}

function mapRow(row: ProjectRow): Project {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        description: row.description ?? "",
        tags: row.tags ?? [],
        coverUrl: row.cover_url ?? "",
        sortOrder: row.sort_order ?? 0,
        images: (row.project_images ?? []).map((image) => ({
            id: image.id,
            url: image.url,
            caption: image.caption ?? "",
            sortOrder: image.sort_order ?? 0,
        })),
        links: (row.project_links ?? []).map((link) => ({
            id: link.id,
            label: link.label,
            url: link.url,
            sortOrder: link.sort_order ?? 0,
        })),
    }
}

const SELECT = "id, slug, title, description, tags, cover_url, sort_order, project_images(id, url, caption, sort_order), project_links(id, label, url, sort_order)"

export async function fetchProjects(): Promise<Project[]> {
    if (!supabase) return sortProjects(readLocal())

    const { data, error } = await supabase.from("projects").select(SELECT).order("sort_order")
    if (error) throw error
    return sortProjects((data as unknown as ProjectRow[]).map(mapRow))
}

export async function fetchProject(idOrSlug: string): Promise<Project | null> {
    if (!supabase) {
        return (
            sortProjects(readLocal()).find(
                (project) => project.slug === idOrSlug || project.id === idOrSlug
            ) ?? null
        )
    }

    const { data, error } = await supabase
        .from("projects")
        .select(SELECT)
        .or(`slug.eq.${idOrSlug},id.eq.${idOrSlug}`)
        .maybeSingle()
    if (error) throw error
    return data ? mapRow(data as unknown as ProjectRow) : null
}

export async function saveProject(project: Project): Promise<void> {
    if (!supabase) {
        const projects = readLocal()
        const index = projects.findIndex((item) => item.id === project.id)
        if (index === -1) {
            projects.push(project)
        } else {
            projects[index] = project
        }
        writeLocal(projects)
        return
    }

    const { error } = await supabase.from("projects").upsert({
        id: project.id,
        slug: project.slug,
        title: project.title,
        description: project.description,
        tags: project.tags,
        cover_url: project.coverUrl,
        sort_order: project.sortOrder,
    })
    if (error) throw error

    await supabase.from("project_images").delete().eq("project_id", project.id)
    if (project.images.length) {
        const { error: imagesError } = await supabase.from("project_images").insert(
            project.images.map((image) => ({
                project_id: project.id,
                url: image.url,
                caption: image.caption ?? "",
                sort_order: image.sortOrder,
            }))
        )
        if (imagesError) throw imagesError
    }

    await supabase.from("project_links").delete().eq("project_id", project.id)
    if (project.links.length) {
        const { error: linksError } = await supabase.from("project_links").insert(
            project.links.map((link) => ({
                project_id: project.id,
                label: link.label,
                url: link.url,
                sort_order: link.sortOrder,
            }))
        )
        if (linksError) throw linksError
    }
}

export async function deleteProject(id: string): Promise<void> {
    if (!supabase) {
        writeLocal(readLocal().filter((project) => project.id !== id))
        return
    }

    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) throw error
}

export function createEmptyProject(sortOrder: number): Project {
    const id = `p${Date.now()}`
    return {
        id,
        slug: "",
        title: "Новый проект",
        description: "",
        tags: [],
        coverUrl: "",
        sortOrder,
        images: [],
        links: [],
    }
}
