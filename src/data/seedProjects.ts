import type { Project } from "../types/project"

const orbitSeeds = [
    { slug: "design", title: "Дизайн-система", radius: 90, size: 56, duration: 9, startAngle: 40 },
    { slug: "frontend", title: "Фронтенд-лендинг", radius: 90, size: 56, duration: 9, startAngle: 220 },
    { slug: "email", title: "Email-рассылка", radius: 200, size: 76, duration: 20, startAngle: 100 },
    { slug: "course", title: "Онлайн-курс", radius: 200, size: 76, duration: 20, startAngle: 280 },
    { slug: "poster", title: "Серия постеров", radius: 340, size: 96, duration: 34, startAngle: 160 },
    { slug: "mobile", title: "Мобильное приложение", radius: 340, size: 96, duration: 34, startAngle: 340 },
    { slug: "branding", title: "Брендинг", radius: 520, size: 116, duration: 52, startAngle: 60 },
    { slug: "social", title: "Соцсети", radius: 520, size: 116, duration: 52, startAngle: 240 },
    { slug: "ecommerce", title: "Интернет-магазин", radius: 750, size: 140, duration: 75, startAngle: 0 },
    { slug: "illustration", title: "Иллюстрации", radius: 750, size: 140, duration: 75, startAngle: 180 },
]

export const orbitLayout = orbitSeeds.map(({ slug, radius, size, duration, startAngle }) => ({
    slug,
    radius,
    size,
    duration,
    startAngle,
}))

export const seedProjects: Project[] = orbitSeeds.map((seed, index) => ({
    id: String(index + 1),
    slug: seed.slug,
    title: seed.title,
    description:
        "Описание проекта заполняется в админке. Здесь рассказывается задача, процесс и результат работы.",
    tags: ["Дизайн", "Айдентика", "Web"],
    coverUrl: `https://picsum.photos/seed/${seed.slug}/400`,
    sortOrder: index,
    images: [1, 2, 3].map((n) => ({
        id: `${index + 1}-${n}`,
        url: `https://picsum.photos/seed/${seed.slug}-${n}/1200/800`,
        caption: "",
        sortOrder: n - 1,
    })),
    links: [
        { id: `${index + 1}-l1`, label: "Смотреть на Behance", url: "https://behance.net", sortOrder: 0 },
        { id: `${index + 1}-l2`, label: "Живой сайт", url: "https://example.com", sortOrder: 1 },
    ],
}))
