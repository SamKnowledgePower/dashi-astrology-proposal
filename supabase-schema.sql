create table if not exists public.progress_projects (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress_projects enable row level security;

create policy "Public can read progress"
on public.progress_projects for select
to anon, authenticated
using (true);

create policy "Sam can create progress"
on public.progress_projects for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'samknowledgepower@gmail.com');

create policy "Sam can update progress"
on public.progress_projects for update
to authenticated
using ((auth.jwt() ->> 'email') = 'samknowledgepower@gmail.com')
with check ((auth.jwt() ->> 'email') = 'samknowledgepower@gmail.com');
