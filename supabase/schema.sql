-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  role text default 'investor' check (role in ('investor', 'artist', 'admin'))
);

-- ASSETS (Listings)
create table assets (
  id uuid default uuid_generate_v4() primary key,
  symbol text unique not null, -- e.g. "DRK-26"
  name text not null, -- e.g. "Drake 2026 Tour"
  description text,
  type text not null check (type in ('tour', 'catalog', 'album', 'single')),
  total_supply numeric not null, -- Total shares issued
  initial_price numeric not null,
  image_url text,
  issuer_id uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'active' check (status in ('upcoming', 'active', 'ended'))
);

-- BALANCES (Portfolio)
create table balances (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  asset_id uuid references assets(id), -- NULL for Cash (USD)
  amount numeric not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, asset_id) -- One balance record per asset per user (NULL asset_id = Cash)
);

-- ORDERS (Order Book)
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  asset_id uuid references assets(id) not null,
  side text not null check (side in ('buy', 'sell')),
  price numeric not null,
  amount numeric not null, -- Original amount
  filled_amount numeric default 0,
  status text default 'open' check (status in ('open', 'filled', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRADES (Executed History)
create table trades (
  id uuid default uuid_generate_v4() primary key,
  asset_id uuid references assets(id) not null,
  buyer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  price numeric not null,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Basic Security)
alter table profiles enable row level security;
alter table assets enable row level security;
alter table balances enable row level security;
alter table orders enable row level security;
alter table trades enable row level security;

-- Public read access for Assets and Trades
create policy "Public assets are viewable by everyone" on assets for select using (true);
create policy "Public trades are viewable by everyone" on trades for select using (true);

-- User specific policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own balances" on balances for select using (auth.uid() = user_id);
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
