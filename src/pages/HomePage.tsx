import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/blocks/B-header/B-header'
import { ProjectModal } from '../components/blocks/B-project-modal/B-project-modal'
import { OrbitSystem } from '../components/blocks/B-orbit-system/B-orbit-system'
import { CameraStage } from '../components/blocks/B-camera-stage/B-camera-stage'
import { fetchProjects } from '../lib/projectsApi'
import { orbitLayout } from '../data/seedProjects'
import { AppShell, Hero } from '../App.styles'
import type { Project } from '../types/project'
import type { OrbitItem } from '../components/blocks/B-orbit-system/B-orbit-system.types'

const fallbackLayout = { radius: 340, size: 96, duration: 34, startAngle: 0 }

function buildOrbitItems(projects: Project[]): OrbitItem[] {
    return projects.map((project, index) => {
        const layout =
            orbitLayout.find((item) => item.slug === project.slug) ??
            orbitLayout[index % orbitLayout.length] ??
            fallbackLayout

        return {
            id: project.slug || project.id,
            index: index + 1,
            src: project.coverUrl,
            alt: project.title,
            radius: layout.radius,
            size: layout.size,
            duration: layout.duration,
            startAngle: layout.startAngle,
        }
    })
}

export function HomePage() {
    const [modalOpen, setModalOpen] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchProjects()
            .then(setProjects)
            .catch(() => setProjects([]))
    }, [])

    return (
        <AppShell>
            <Header onDiscuss={() => setModalOpen(true)} />

            <Hero>
                <CameraStage>
                    <OrbitSystem
                        centerImage={{ src: 'https://picsum.photos/seed/avatar/200', alt: 'Екатерина Антипенко' }}
                        items={buildOrbitItems(projects)}
                        onSelect={(id) => navigate(`/project/${id}`)}
                    />
                </CameraStage>
            </Hero>

            <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </AppShell>
    )
}
