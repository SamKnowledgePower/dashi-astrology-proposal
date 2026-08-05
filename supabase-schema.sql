create table if not exists public.progress_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress_projects enable row level security;

create policy "Sam can view all progress"
on public.progress_projects for select to authenticated
using ((auth.jwt() ->> 'email') = 'blessingstable@gmail.com');

create policy "Sam can create progress"
on public.progress_projects for insert to authenticated
with check ((auth.jwt() ->> 'email') = 'blessingstable@gmail.com');

create policy "Sam can update progress"
on public.progress_projects for update to authenticated
using ((auth.jwt() ->> 'email') = 'blessingstable@gmail.com')
with check ((auth.jwt() ->> 'email') = 'blessingstable@gmail.com');

create or replace function public.get_public_progress(project_slug text)
returns table(name text, data jsonb, updated_at timestamptz)
language sql security definer set search_path = public
as $$
  select p.name, p.data, p.updated_at
  from public.progress_projects p
  where p.slug = project_slug
  limit 1;
$$;

revoke all on function public.get_public_progress(text) from public;
grant execute on function public.get_public_progress(text) to anon, authenticated;

insert into public.progress_projects (slug, name, data)
values ('dashi-astrology', '達氏占星宇宙', '{"status":"提案階段｜尚未啟動","currentMonth":0,"updated":"2026-08-05","weekly":{"done":["專案尚未啟動"],"wait":["確認合作與正式啟動日"],"next":["簽署契約與安排啟動訪談"]},"tasks":{}}'::jsonb)
on conflict (slug) do nothing;
