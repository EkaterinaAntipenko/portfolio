import { useEffect, useState } from 'react'
import {
    Panel,
    Row,
    Field,
    FieldLabel,
    Input,
    SmallButton,
    PrimaryButton,
    DangerButton,
    SectionTitle,
    Notice,
} from '../../../pages/AdminPage.styles'
import { UserCard, CardHead, StatusBadge, Actions, Hint } from './B-users-panel.styles'
import { fetchAdminUsers, createAdminUser, updateAdminUser, deleteAdminUser } from '../../../lib/auth'
import type { UsersPanelProps } from './B-users-panel.types'
import type { AdminUser } from '../../../types/admin'

type Status = { kind: 'info' | 'success' | 'error'; message: string } | null

const statusLabel = { approved: 'подтверждён', pending: 'ждёт подтверждения', rejected: 'отклонён' }

export function UsersPanel({ currentUser }: UsersPanelProps) {
    const [users, setUsers] = useState<AdminUser[]>([])
    const [drafts, setDrafts] = useState<Record<string, { name: string; email: string; password: string }>>({})
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
    const [status, setStatus] = useState<Status>(null)
    const [busy, setBusy] = useState(false)

    const apply = (loaded: AdminUser[]) => {
        setUsers(loaded)
        setDrafts(
            Object.fromEntries(
                loaded.map((user) => [user.id, { name: user.name, email: user.email, password: '' }])
            )
        )
    }

    const load = async () => {
        apply(await fetchAdminUsers())
    }

    useEffect(() => {
        let cancelled = false

        async function boot() {
            const loaded = await fetchAdminUsers().catch(() => [])
            if (cancelled) return
            apply(loaded)
        }

        boot()
        return () => {
            cancelled = true
        }
    }, [])

    const run = async (action: () => Promise<void>, message: string) => {
        setBusy(true)
        setStatus(null)
        try {
            await action()
            await load()
            setStatus({ kind: 'success', message })
        } catch (error) {
            setStatus({ kind: 'error', message: (error as Error).message })
        } finally {
            setBusy(false)
        }
    }

    const patchDraft = (id: string, patch: Partial<{ name: string; email: string; password: string }>) => {
        setDrafts((current) => ({ ...current, [id]: { ...current[id], ...patch } }))
    }

    return (
        <Panel>
            <SectionTitle>
                <FieldLabel>Новый пользователь админки</FieldLabel>
            </SectionTitle>

            <Row>
                <Field>
                    <FieldLabel>Имя</FieldLabel>
                    <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                </Field>
                <Field>
                    <FieldLabel>Почта</FieldLabel>
                    <Input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                </Field>
                <Field>
                    <FieldLabel>Пароль</FieldLabel>
                    <Input
                        type="password"
                        value={newUser.password}
                        autoComplete="new-password"
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </Field>
            </Row>

            <PrimaryButton
                type="button"
                disabled={busy || !newUser.email || newUser.password.length < 6}
                onClick={() =>
                    run(async () => {
                        await createAdminUser(newUser)
                        setNewUser({ name: '', email: '', password: '' })
                    }, 'Пользователь добавлен')
                }
            >
                Добавить пользователя
            </PrimaryButton>

            <SectionTitle>
                <FieldLabel>Пользователи</FieldLabel>
                <Hint>Всего: {users.length}</Hint>
            </SectionTitle>

            {users.map((user) => {
                const draft = drafts[user.id] ?? { name: user.name, email: user.email, password: '' }
                const isSelf = user.id === currentUser.id

                return (
                    <UserCard key={user.id}>
                        <CardHead>
                            <FieldLabel>{user.email}{isSelf ? ' — это вы' : ''}</FieldLabel>
                            <StatusBadge $status={user.status}>{statusLabel[user.status]}</StatusBadge>
                        </CardHead>

                        <Field>
                            <FieldLabel>Имя</FieldLabel>
                            <Input value={draft.name} onChange={(e) => patchDraft(user.id, { name: e.target.value })} />
                        </Field>

                        <Field>
                            <FieldLabel>Почта</FieldLabel>
                            <Input
                                type="email"
                                value={draft.email}
                                onChange={(e) => patchDraft(user.id, { email: e.target.value })}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Новый пароль</FieldLabel>
                            <Input
                                type="password"
                                value={draft.password}
                                placeholder="оставьте пустым"
                                autoComplete="new-password"
                                onChange={(e) => patchDraft(user.id, { password: e.target.value })}
                            />
                        </Field>

                        <Actions>
                            <SmallButton
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                    run(async () => {
                                        await updateAdminUser(user.id, {
                                            name: draft.name,
                                            email: draft.email,
                                            password: draft.password || undefined,
                                        })
                                    }, 'Изменения сохранены')
                                }
                            >
                                Сохранить
                            </SmallButton>

                            {user.status !== 'approved' && (
                                <SmallButton
                                    type="button"
                                    disabled={busy}
                                    onClick={() =>
                                        run(() => updateAdminUser(user.id, { status: 'approved' }), 'Доступ выдан')
                                    }
                                >
                                    Подтвердить доступ
                                </SmallButton>
                            )}

                            {user.status === 'approved' && !isSelf && (
                                <SmallButton
                                    type="button"
                                    disabled={busy}
                                    onClick={() =>
                                        run(() => updateAdminUser(user.id, { status: 'rejected' }), 'Доступ закрыт')
                                    }
                                >
                                    Закрыть доступ
                                </SmallButton>
                            )}

                            {!isSelf && (
                                <DangerButton
                                    type="button"
                                    disabled={busy}
                                    onClick={() => run(() => deleteAdminUser(user.id), 'Пользователь удалён')}
                                >
                                    Удалить
                                </DangerButton>
                            )}
                        </Actions>
                    </UserCard>
                )
            })}

            {status && <Notice $variant={status.kind}>{status.message}</Notice>}
        </Panel>
    )
}
