import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '../components/atoms/A-text/A-text'
import { UsersPanel } from '../components/blocks/B-users-panel/B-users-panel'
import { fetchProjects, saveProject, deleteProject, createEmptyProject } from '../lib/projectsApi'
import { getCurrentUser, signOut } from '../lib/auth'
import { isSupabaseConfigured } from '../config'
import { AppShell } from '../App.styles'
import {
    AdminLayout,
    TopBar,
    Sidebar,
    ProjectButton,
    ProjectIndex,
    Panel,
    Row,
    Field,
    FieldLabel,
    Input,
    Textarea,
    ListRow,
    OrderBadge,
    SmallButton,
    PrimaryButton,
    DangerButton,
    SectionTitle,
    Notice,
    Thumb,
} from './AdminPage.styles'
import type { Project, ProjectImage, ProjectLink } from '../types/project'
import type { AdminUser } from '../types/admin'

type Status = { kind: 'info' | 'success' | 'error'; message: string } | null
type Tab = 'projects' | 'users'

function reorder<T extends { sortOrder: number }>(items: T[], from: number, to: number): T[] {
    if (to < 0 || to >= items.length) return items
    const next = [...items]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    return next.map((item, index) => ({ ...item, sortOrder: index }))
}

export function AdminPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [selectedId, setSelectedId] = useState<string>('')
    const [draft, setDraft] = useState<Project | null>(null)
    const [status, setStatus] = useState<Status>(null)
    const [saving, setSaving] = useState(false)
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
    const [checking, setChecking] = useState(true)
    const [tab, setTab] = useState<Tab>('projects')
    const navigate = useNavigate()

    useEffect(() => {
        let cancelled = false

        async function boot() {
            const user = await getCurrentUser().catch(() => null)
            if (cancelled) return

            if (!user) {
                navigate('/login')
                return
            }

            setCurrentUser(user)
            setChecking(false)

            const loaded = await fetchProjects().catch(() => [])
            if (cancelled) return

            setProjects(loaded)
            if (loaded.length) {
                setSelectedId(loaded[0].id)
                setDraft(loaded[0])
            }
        }

        boot()
        return () => {
            cancelled = true
        }
    }, [navigate])

    const select = (project: Project) => {
        setSelectedId(project.id)
        setDraft(project)
        setStatus(null)
    }

    const addProject = () => {
        const project = createEmptyProject(projects.length)
        setProjects([...projects, project])
        select(project)
    }

    const update = (patch: Partial<Project>) => {
        setDraft((current) => (current ? { ...current, ...patch } : current))
    }

    const updateImage = (index: number, patch: Partial<ProjectImage>) => {
        setDraft((current) => {
            if (!current) return current
            const images = current.images.map((image, i) => (i === index ? { ...image, ...patch } : image))
            return { ...current, images }
        })
    }

    const updateLink = (index: number, patch: Partial<ProjectLink>) => {
        setDraft((current) => {
            if (!current) return current
            const links = current.links.map((link, i) => (i === index ? { ...link, ...patch } : link))
            return { ...current, links }
        })
    }

    const save = async () => {
        if (!draft) return
        if (!draft.slug.trim()) {
            setStatus({ kind: 'error', message: 'Заполните адрес (slug) — он попадёт в ссылку' })
            return
        }
        setSaving(true)
        try {
            await saveProject(draft)
            setProjects((current) => {
                const index = current.findIndex((item) => item.id === draft.id)
                if (index === -1) return [...current, draft]
                const next = [...current]
                next[index] = draft
                return next
            })
            setStatus({ kind: 'success', message: 'Сохранено' })
        } catch {
            setStatus({ kind: 'error', message: 'Ошибка сохранения' })
        } finally {
            setSaving(false)
        }
    }

    const remove = async () => {
        if (!draft) return
        try {
            await deleteProject(draft.id)
            const rest = projects.filter((item) => item.id !== draft.id)
            setProjects(rest)
            setDraft(rest[0] ?? null)
            setSelectedId(rest[0]?.id ?? '')
            setStatus({ kind: 'success', message: 'Проект удалён' })
        } catch {
            setStatus({ kind: 'error', message: 'Ошибка удаления' })
        }
    }

    if (checking || !currentUser) {
        return (
            <AppShell>
                <TopBar>
                    <Text className="mainText" color="#8a8a92">Проверяю доступ...</Text>
                </TopBar>
            </AppShell>
        )
    }

    return (
        <AppShell>
            <TopBar>
                <Text tag="h1" className="heading2">Админка</Text>
                <Row>
                    <SmallButton type="button" onClick={() => setTab('projects')}>Проекты</SmallButton>
                    <SmallButton type="button" onClick={() => setTab('users')}>Пользователи</SmallButton>
                    <SmallButton type="button" onClick={() => navigate('/')}>На сайт</SmallButton>
                    <SmallButton
                        type="button"
                        onClick={async () => {
                            await signOut()
                            navigate('/login')
                        }}
                    >
                        Выйти ({currentUser.name || currentUser.email})
                    </SmallButton>
                    {tab === 'projects' && (
                        <PrimaryButton type="button" onClick={addProject}>Добавить проект</PrimaryButton>
                    )}
                </Row>
            </TopBar>

            {tab === 'users' && <UsersPanel currentUser={currentUser} />}

            {tab === 'projects' && (
            <AdminLayout>
                <Sidebar>
                    {projects.map((project, index) => (
                        <ProjectButton
                            key={project.id}
                            type="button"
                            $active={project.id === selectedId}
                            onClick={() => select(project)}
                        >
                            <ProjectIndex>{index + 1}</ProjectIndex>
                            {project.title || 'Без названия'}
                        </ProjectButton>
                    ))}
                    {!projects.length && <Notice $variant="info">Проектов пока нет</Notice>}
                </Sidebar>

                {draft && (
                    <Panel>
                        <Row>
                            <Field>
                                <FieldLabel>Название</FieldLabel>
                                <Input value={draft.title} onChange={(e) => update({ title: e.target.value })} />
                            </Field>
                            <Field>
                                <FieldLabel>Адрес в ссылке (slug)</FieldLabel>
                                <Input
                                    value={draft.slug}
                                    placeholder="branding"
                                    onChange={(e) => update({ slug: e.target.value })}
                                />
                            </Field>
                        </Row>

                        <Row>
                            <Field>
                                <FieldLabel>Обложка (URL)</FieldLabel>
                                <Input value={draft.coverUrl} onChange={(e) => update({ coverUrl: e.target.value })} />
                            </Field>
                            <Field>
                                <FieldLabel>Теги через запятую</FieldLabel>
                                <Input
                                    value={draft.tags.join(', ')}
                                    onChange={(e) =>
                                        update({ tags: e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })
                                    }
                                />
                            </Field>
                        </Row>

                        <Field>
                            <FieldLabel>Описание</FieldLabel>
                            <Textarea value={draft.description} onChange={(e) => update({ description: e.target.value })} />
                        </Field>

                        <SectionTitle>
                            <FieldLabel>Изображения проекта</FieldLabel>
                            <SmallButton
                                type="button"
                                onClick={() =>
                                    update({
                                        images: [
                                            ...draft.images,
                                            { id: `img${Date.now()}`, url: '', caption: '', sortOrder: draft.images.length },
                                        ],
                                    })
                                }
                            >
                                Добавить
                            </SmallButton>
                        </SectionTitle>

                        {draft.images.map((image, index) => (
                            <ListRow key={image.id}>
                                <OrderBadge>{index + 1}</OrderBadge>
                                <Input
                                    value={image.url}
                                    placeholder="https://..."
                                    onChange={(e) => updateImage(index, { url: e.target.value })}
                                />
                                <Input
                                    value={image.caption ?? ''}
                                    placeholder="Подпись"
                                    onChange={(e) => updateImage(index, { caption: e.target.value })}
                                />
                                <SmallButton
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => update({ images: reorder(draft.images, index, index - 1) })}
                                >
                                    ↑
                                </SmallButton>
                                <SmallButton
                                    type="button"
                                    disabled={index === draft.images.length - 1}
                                    onClick={() => update({ images: reorder(draft.images, index, index + 1) })}
                                >
                                    ↓
                                </SmallButton>
                                <DangerButton
                                    type="button"
                                    onClick={() => update({ images: draft.images.filter((_, i) => i !== index) })}
                                >
                                    Удалить
                                </DangerButton>
                                {image.url && <Thumb src={image.url} alt="" />}
                            </ListRow>
                        ))}

                        <SectionTitle>
                            <FieldLabel>Пункты выпадающего списка</FieldLabel>
                            <SmallButton
                                type="button"
                                onClick={() =>
                                    update({
                                        links: [
                                            ...draft.links,
                                            { id: `lnk${Date.now()}`, label: '', url: '', sortOrder: draft.links.length },
                                        ],
                                    })
                                }
                            >
                                Добавить
                            </SmallButton>
                        </SectionTitle>

                        {draft.links.map((link, index) => (
                            <ListRow key={link.id}>
                                <OrderBadge>{index + 1}</OrderBadge>
                                <Input
                                    value={link.label}
                                    placeholder="Название пункта"
                                    onChange={(e) => updateLink(index, { label: e.target.value })}
                                />
                                <Input
                                    value={link.url}
                                    placeholder="https://..."
                                    onChange={(e) => updateLink(index, { url: e.target.value })}
                                />
                                <SmallButton
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => update({ links: reorder(draft.links, index, index - 1) })}
                                >
                                    ↑
                                </SmallButton>
                                <SmallButton
                                    type="button"
                                    disabled={index === draft.links.length - 1}
                                    onClick={() => update({ links: reorder(draft.links, index, index + 1) })}
                                >
                                    ↓
                                </SmallButton>
                                <DangerButton
                                    type="button"
                                    onClick={() => update({ links: draft.links.filter((_, i) => i !== index) })}
                                >
                                    Удалить
                                </DangerButton>
                            </ListRow>
                        ))}

                        <SectionTitle>
                            <Row>
                                <PrimaryButton type="button" onClick={save} disabled={saving}>
                                    {saving ? 'Сохраняю...' : 'Сохранить'}
                                </PrimaryButton>
                                <SmallButton type="button" onClick={() => navigate(`/project/${draft.slug || draft.id}`)}>
                                    Открыть страницу
                                </SmallButton>
                                <DangerButton type="button" onClick={remove}>Удалить проект</DangerButton>
                            </Row>
                        </SectionTitle>

                        {status && <Notice $variant={status.kind}>{status.message}</Notice>}

                        {!isSupabaseConfigured && (
                            <Notice $variant="info">
                                Supabase не подключён — правки сохраняются в браузере. Добавьте ключи в .env, чтобы данные шли в базу.
                            </Notice>
                        )}
                    </Panel>
                )}
            </AdminLayout>
            )}
        </AppShell>
    )
}
