import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Text } from '../components/atoms/A-text/A-text'
import { fetchProject } from '../lib/projectsApi'
import { AppShell } from '../App.styles'
import {
    Layout,
    Gallery,
    GalleryItem,
    GalleryImage,
    GalleryCaption,
    Aside,
    TagRow,
    Tag,
    Dropdown,
    DropdownSummary,
    DropdownItem,
    BackLink,
    StateBox,
} from './ProjectPage.styles'
import type { Project } from '../types/project'

export function ProjectPage() {
    const { id = '' } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        async function load() {
            setLoading(true)
            const found = await fetchProject(id).catch(() => null)
            if (cancelled) return
            setProject(found)
            setLoading(false)
        }

        load()
        return () => {
            cancelled = true
        }
    }, [id])

    return (
        <AppShell>
            <BackLink type="button" onClick={() => navigate('/')}>
                ← К проектам
            </BackLink>

            {loading && <StateBox>Загружаю проект...</StateBox>}

            {!loading && !project && <StateBox>Проект не найден</StateBox>}

            {!loading && project && (
                <Layout>
                    <Gallery>
                        {project.images.map((image) => (
                            <GalleryItem key={image.id}>
                                <GalleryImage src={image.url} alt={image.caption || project.title} loading="lazy" />
                                {image.caption && <GalleryCaption>{image.caption}</GalleryCaption>}
                            </GalleryItem>
                        ))}
                    </Gallery>

                    <Aside>
                        <Text tag="h1" className="heading2">{project.title}</Text>

                        {project.tags.length > 0 && (
                            <TagRow>
                                {project.tags.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </TagRow>
                        )}

                        <Text className="mainText" color="#c9c9cf">{project.description}</Text>

                        {project.links.length > 0 && (
                            <Dropdown>
                                <DropdownSummary>
                                    Ссылки по проекту
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </DropdownSummary>
                                {project.links.map((link) => (
                                    <DropdownItem key={link.id} href={link.url} target="_blank" rel="noreferrer">
                                        {link.label}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        )}
                    </Aside>
                </Layout>
            )}
        </AppShell>
    )
}
