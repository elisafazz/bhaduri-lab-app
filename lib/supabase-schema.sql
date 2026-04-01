-- Run this in your Supabase SQL editor after creating the project

-- profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  role text not null default 'member' check (role in ('admin', 'member')),
  is_active boolean not null default true,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- Users can view their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Only service role can insert profiles (done via trigger)
-- Admins can update profiles
create policy "Admins can update profiles" on public.profiles
  for update using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Auto-create profile on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, is_active)
  values (new.id, new.email, 'member', true);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Manually set admin roles after users sign up:
-- update public.profiles set role = 'admin' where email = 'elisafazzari815@gmail.com';
-- update public.profiles set role = 'admin' where email = '<aparna email>';

-- checklist_items table
create table public.checklist_items (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references public.profiles(id) on delete cascade,
  checklist_type text not null check (checklist_type in ('onboarding', 'offboarding')),
  item_key text not null,
  completed boolean not null default false,
  completed_at timestamp with time zone,
  completed_by uuid references public.profiles(id),
  created_at timestamp with time zone default now(),
  unique(member_id, checklist_type, item_key)
);

alter table public.checklist_items enable row level security;

-- Admins can do everything with checklists
create policy "Admins can manage checklist items" on public.checklist_items
  for all using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
