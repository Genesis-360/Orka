-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- Serves both "contact us" messages and newsletter signups (footer + blog).

create table if not exists contact (
  id uuid default gen_random_uuid() primary key,
  name text,
  email text not null,
  message text,
  newsletter boolean default false,
  created_at timestamptz default now()
);

-- Migrations for databases created before newsletter support
alter table contact add column if not exists newsletter boolean default false;
alter table contact alter column message drop not null;

-- One subscription per email
create unique index if not exists contact_newsletter_email_key
  on contact (email)
  where newsletter = true;

-- Optional: enable RLS so only server-side (service role) can write
alter table contact enable row level security;

create policy "Allow anonymous contact submissions"
  on contact for insert
  to anon
  with check (true);

create policy "Allow read for service role"
  on contact for select
  to service_role
  using (true);