import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProject } from '../lib/projectsApi'
import glow from '../assets/glow.svg'
import plus from '../assets/plus.svg'
import {
    Page,
    Glow,
    Content,
    BackButton,
    Columns,
    InfoCard,
    InfoTop,
    Title,
    Description,
    TagRow,
    Tag,
    Dropdown,
    DropdownSummary,
    DropdownList,
    DropdownItem,
    Gallery,
    GalleryItem,
    GalleryImage,
    GalleryCaption,
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
        <Page>
            <Glow src={glow} alt="" aria-hidden="true" />

            <Content>
                <BackButton type="button" onClick={() => navigate('/')}>
                    К карте сайта
                </BackButton>

                {loading && <StateBox>Загружаю проект...</StateBox>}

                {!loading && !project && <StateBox>Проект не найден</StateBox>}

                {!loading && project && (
                    <Columns>
                        <InfoCard>
                            <InfoTop>
                                <Title>{project.title}</Title>

                                {project.description && <Description>{project.description}</Description>}

                                {project.tags.length > 0 && (
                                    <TagRow>
                                        {project.tags.map((tag) => (
                                            <Tag key={tag}>{tag}</Tag>
                                        ))}
                                    </TagRow>
                                )}
                            </InfoTop>

                            {project.links.length > 0 && (
                                <Dropdown>
                                    <DropdownSummary>
                                        Процесс создания
                                        <img src={plus} alt="" aria-hidden="true" />
                                    </DropdownSummary>
                                    <DropdownList>
                                        {project.links.map((link) => (
                                            <DropdownItem
                                                key={link.id}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {link.label}
                                            </DropdownItem>
                                        ))}
                                    </DropdownList>
                                </Dropdown>
                            )}
                        </InfoCard>

                        <Gallery>
                            {project.images.map((image) => (
                                <GalleryItem key={image.id}>
                                    <GalleryImage
                                        src={image.url}
                                        alt={image.caption || project.title}
                                        loading="lazy"
                                    />
                                    {image.caption && <GalleryCaption>{image.caption}</GalleryCaption>}
                                </GalleryItem>
                            ))}
                        </Gallery>
                    </Columns>
                )}
            </Content>
        </Page>
    )
}
