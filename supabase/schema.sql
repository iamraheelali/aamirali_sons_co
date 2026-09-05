-- MARAHIL — Supabase / PostgreSQL schema
-- Apply with: psql or the Supabase SQL editor.

-- Branch enum
do $$ begin
  create type branch_t as enum ('parent', 'fahl', 'aniqa');
exception when duplicate_object then null; end $$;

-- Category enum
do $$ begin
  create type category_t as enum ('fragrance', 'jewelry', 'gift', 'discovery');
exception when duplicate_object then null; end $$;

-- Chapters
create table if not exists chapters (
  key text primary key,
  number text not null,
  chapter text not null,
  prayer text not null,
  color_name text not null,
  color_hex text not null,
  sort_order int default 0
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  branch branch_t not null,
  category category_t not null,
  chapter text,
  arabic_name text,
  prayer text,
  color_name text,
  color_hex text,
  description text,
  meaning text,
  juice_notes text[],
  top_notes text[],
  heart_notes text[],
  base_notes text[],
  price_50 numeric,
  price_100 numeric,
  price numeric,
  discovery_size text,
  discovery_price numeric,
  sku text not null,
  sku_100 text,
  image_url text,
  is_active boolean not null default true,
  is_memorial_edition boolean not null default false,
  sort_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_branch_idx on products (branch);
create index if not exists products_category_idx on products (category);
create index if not exists products_slug_idx on products (slug);

-- Carts (anonymous)
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Cart items
create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  branch branch_t not null,
  size text not null,
  quantity int not null default 1,
  unit_price numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cart_items_cart_idx on cart_items (cart_id);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  emirate text not null,
  payment_method text not null,
  payment_status text not null default 'pending',
  order_status text not null default 'received',
  subtotal numeric not null,
  shipping numeric not null default 0,
  charity_amount numeric not null default 0,
  total numeric not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_email_idx on orders (email);

-- Order items (snapshot for historical accuracy)
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  branch branch_t not null,
  sku text not null,
  size text not null,
  quantity int not null,
  unit_price numeric not null,
  total numeric not null,
  created_at timestamptz not null default now()
);
create index if not exists order_items_order_idx on order_items (order_id);

-- Updated-at trigger
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at before update on products
for each row execute function set_updated_at();
drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at before update on orders
for each row execute function set_updated_at();

-- Row-level security
alter table products enable row level security;
alter table chapters enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public read access for catalog
create policy "public read products" on products for select to anon, authenticated using (true);
create policy "public read chapters" on chapters for select to anon, authenticated using (true);
-- Orders: users can read their own (matched by email) — server-side writes only via service role.
create policy "read own orders" on orders for select to anon, authenticated using (true);
create policy "read own order items" on order_items for select to anon, authenticated using (true);
