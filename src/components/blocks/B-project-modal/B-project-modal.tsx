import { useEffect, useState } from "react"
import { Text } from "../../atoms/A-text/A-text"
import { WEB3FORMS_ACCESS_KEY } from "../../../config"
import {
    AOverlay,
    AModal,
    ACloseButton,
    AForm,
    AField,
    ALabel,
    AInput,
    ASubmit,
    AStatus,
} from "./B-project-modal.styles"
import type { ProjectModalProps, ProjectModalStatus } from "./B-project-modal.types"

export function ProjectModal({ open, onClose }: ProjectModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState<ProjectModalStatus>("idle")

    useEffect(() => {
        if (!open) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }
        document.addEventListener("keydown", onKey)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", onKey)
            document.body.style.overflow = ""
        }
    }, [open, onClose])

    if (!open) return null

    const submit = async (event: React.FormEvent) => {
        event.preventDefault()
        setStatus("loading")
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: "Новая заявка с портфолио",
                    from_name: "Портфолио",
                    name,
                    email,
                    phone,
                }),
            })
            const data = await response.json()
            if (data.success) {
                setStatus("success")
                setName("")
                setEmail("")
                setPhone("")
            } else {
                setStatus("error")
            }
        } catch {
            setStatus("error")
        }
    }

    return (
        <AOverlay onClick={onClose}>
            <AModal onClick={(event) => event.stopPropagation()}>
                <ACloseButton type="button" onClick={onClose} aria-label="Закрыть">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </ACloseButton>

                <Text tag="h2" className="pageTitle">Обсудить проект</Text>
                <Text className="tagText" color="#8a8a92">
                    Оставьте контакты — свяжусь с вами в ближайшее время
                </Text>

                <AForm onSubmit={submit}>
                    <AField>
                        <ALabel>Имя</ALabel>
                        <AInput
                            name="name"
                            value={name}
                            required
                            placeholder="Как вас зовут"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </AField>

                    <AField>
                        <ALabel>Почта</ALabel>
                        <AInput
                            name="email"
                            type="email"
                            value={email}
                            required
                            placeholder="you@example.com"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </AField>

                    <AField>
                        <ALabel>Телефон</ALabel>
                        <AInput
                            name="phone"
                            type="tel"
                            value={phone}
                            required
                            placeholder="+7 900 000-00-00"
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </AField>

                    <ASubmit type="submit" disabled={status === "loading"}>
                        {status === "loading" ? "Отправляю..." : "Отправить заявку"}
                    </ASubmit>

                    {status === "success" && (
                        <AStatus $variant="success">Заявка отправлена. Спасибо!</AStatus>
                    )}
                    {status === "error" && (
                        <AStatus $variant="error">Не удалось отправить. Попробуйте ещё раз.</AStatus>
                    )}
                </AForm>
            </AModal>
        </AOverlay>
    )
}
