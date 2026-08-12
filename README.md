# Portfolio

Личный сайт-портфолио. Стек: TypeScript + Vite + React, styled-components, React Router, GSAP.

## Требования

- Node.js 18+
- Yarn

## Установка

```bash
yarn install
```

## Разработка

```bash
yarn dev
```

Откроется на [http://localhost:5173](http://localhost:5173).

## Сборка

```bash
yarn build
```

Собирает продакшен-версию в `dist/` (сначала проверка типов через `tsc`, затем сборка Vite).

## Просмотр продакшен-сборки локально

```bash
yarn preview
```

## Линт

```bash
yarn lint
```

## Структура проекта

```
src/
  components/
    ui/       # переиспользуемые примитивы дизайн-системы (Button, Text, Input...)
    blocks/   # составные блоки интерфейса (Header, ProjectCard...)
  pages/      # компоненты страниц/роутов
  theme/      # тема styled-components и глобальные стили
  hooks/
  utils/
```

Каждый компонент — отдельная папка с файлами:

```
ComponentName/
  ComponentName.tsx        # сам компонент
  ComponentName.styles.ts  # styled-components стили
  ComponentName.types.ts   # TypeScript-типы пропсов
  index.ts                 # barrel-экспорт
```
