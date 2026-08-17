import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text } from '../components/atoms/A-text/A-text'
import { signIn, signUp } from '../lib/auth'
import { AppShell } from '../App.styles'
import { Field, FieldLabel, Input, PrimaryButton } from './AdminPage.styles'
import { Centered, Card, Form, Switcher, SwitchButton, Notice } from './LoginPage.styles'

type Mode = 'login' | 'register'
type Status = { kind: 'success' | 'error' | 'info'; message: string } | null

export function LoginPage() {
    const [mode, setMode] = useState<Mode>('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState<Status>(null)
    const [busy, setBusy] = useState(false)
    const navigate = useNavigate()

    const submit = async (event: React.FormEvent) => {
        event.preventDefault()
        setBusy(true)
        setStatus(null)
        try {
            if (mode === 'login') {
                await signIn(email, password)
                navigate('/admin')
            } else {
                const message = await signUp({ name, email, password })
                setStatus({ kind: 'success', message })
                setMode('login')
            }
        } catch (error) {
            setStatus({ kind: 'error', message: (error as Error).message })
        } finally {
            setBusy(false)
        }
    }

    return (
        <AppShell>
            <Centered>
                <Card>
                    <Text tag="h1" className="heading2">
                        {mode === 'login' ? 'Вход в админку' : 'Заявка на доступ'}
                    </Text>

                    <Switcher>
                        <SwitchButton type="button" $active={mode === 'login'} onClick={() => setMode('login')}>
                            Вход
                        </SwitchButton>
                        <SwitchButton type="button" $active={mode === 'register'} onClick={() => setMode('register')}>
                            Регистрация
                        </SwitchButton>
                    </Switcher>

                    <Form onSubmit={submit}>
                        {mode === 'register' && (
                            <Field>
                                <FieldLabel>Имя</FieldLabel>
                                <Input value={name} required onChange={(e) => setName(e.target.value)} />
                            </Field>
                        )}

                        <Field>
                            <FieldLabel>Почта</FieldLabel>
                            <Input
                                type="email"
                                value={email}
                                required
                                autoComplete="username"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Пароль</FieldLabel>
                            <Input
                                type="password"
                                value={password}
                                required
                                minLength={6}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field>

                        <PrimaryButton type="submit" disabled={busy}>
                            {busy ? 'Отправляю...' : mode === 'login' ? 'Войти' : 'Отправить заявку'}
                        </PrimaryButton>

                        {status && <Notice $variant={status.kind}>{status.message}</Notice>}

                        {mode === 'register' && (
                            <Notice $variant="info">
                                Заявка уходит на почту владельца. Войти можно будет после подтверждения.
                            </Notice>
                        )}
                    </Form>
                </Card>
            </Centered>
        </AppShell>
    )
}
