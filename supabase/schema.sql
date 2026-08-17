create extension if not exists "pgcrypto";

create table if not exists projects (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    title text not null,
    description text default '',
    tags text[] default '{}',
    cover_url text default '',
    sort_order int default 0,
    created_at timestamptz default now()
);

create table if not exists project_images (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references projects(id) on delete cascade,
    url text not null,
    caption text default '',
    sort_order int default 0
);

create table if not exists project_links (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references projects(id) on delete cascade,
    label text not null,
    url text not null,
    sort_order int default 0
);

create index if not exists project_images_project_id_idx on project_images(project_id);
create index if not exists project_links_project_id_idx on project_links(project_id);

alter table projects enable row level security;
alter table project_images enable row level security;
alter table project_links enable row level security;

create policy "public read projects" on projects for select using (true);
create policy "public read images" on project_images for select using (true);
create policy "public read links" on project_links for select using (true);

create policy "auth write projects" on projects for all to authenticated using (true) with check (true);
create policy "auth write images" on project_images for all to authenticated using (true) with check (true);
create policy "auth write links" on project_links for all to authenticated using (true) with check (true);
