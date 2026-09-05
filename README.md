# MARAHIL — AAMIR ALI & SONS CO. LLC

> لكل مرحلة هيبتها — *For every stage, its presence.*

A luxury fragrance e-commerce ecosystem for **Aamir Ali & Sons Co. LLC** (Abu Dhabi, UAE).
Six daytime chapters, one bottle that never changes, two souls — **AL-FAHL** and **AL-ANIQA** —
plus the parent company site. Same bottle forever; only the chapter changes.

Built in memory of **Late Father Aamir Ali** and **Elder Brother Faisal Aamir Ali**.
2% Sadaqah Jariyah on every order, in their memory.

Built by **Raheel Ali** — custodian of the legacy.

---

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** (CSS-based theme, brand tokens per branch)
- **Supabase** (PostgreSQL) — schema + repository pattern, JSON fallback default
- **Zod 4** validation · **Lucide** icons · `clsx` + `tailwind-merge`

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

No environment variables are required to run the demo — the catalog reads from
`data/products.json` (the default `JsonCatalogRepository`).

## Environment

Copy `.env.example` to `.env.local` and fill in to switch to Supabase:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical / sitemap base |
| `NEXT_PUBLIC_SUPABASE_URL` | — | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | — | Supabase anon key |
| `CATALOG_SOURCE` | `json` | `json` (default) or `supabase` |
| `NEXT_PUBLIC_CURRENCY` | `USD` | Display currency code |

> `CATALOG_SOURCE=supabase` switches `lib/catalog` to `SupabaseCatalogRepository`.
> Components never touch the data source directly — they call `getProducts()`,
> `getProductBySlug()`, etc. This is the single integration point.

## Running modes

- **Development (SSR):** `npm run dev` — works as-is.
- **Production SSR + Supabase:** comment out `output: "export"` in `next.config.ts`,
  set the Supabase env vars, then `npm run build && npm start`.
- **Static export (live preview):** keep `output: "export"` and run `npm run build`,
  which emits the `out/` folder (served statically, cart/orders fall back to in-memory
  when `localStorage` is unavailable, e.g. sandboxed preview iframes).

## Supabase setup

1. Create a Supabase project.
2. In the SQL editor, run `supabase/schema.sql` (tables, enums, indexes, RLS).
3. Run `supabase/seed.sql` to load the 23 products and 6 chapters.
4. Set the three Supabase env vars and `CATALOG_SOURCE=supabase`.
5. (Optional) For cart/order persistence in Supabase, extend the repository.

Schema includes: `chapters`, `products`, `carts`, `cart_items`, `orders`,
`order_items` — with enums (`product_type`, `payment_method`, `order_status`,
`payment_status`), indexes, and Row-Level Security enabled.

## Routes

| Path | Description |
|---|---|
| `/` | Parent company home — bottle composition, brands, chapters, charity |
| `/company` | Memorial — In Loving Memory of Aamir Ali & Faisal Aamir Ali |
| `/fahl` | AL-FAHL storefront (dark, bold) |
| `/aniqa` | AL-ANIQA storefront (light, refined) — *(links to `/aniqa`)* |
| `/fahl/product/[slug]` | Product editorial detail (6 fragrances + discovery + jewelry + gifts) |
| `/aniqa/product/[slug]` | AL-ANIQA product detail |
| `/cart` | Full cart view |
| `/checkout` | Checkout (Zod-validated, card + COD) |
| `/order-confirmation?id=...` | Order confirmation with 2% Sadaqah Jariyah |
| `/admin` | Admin dashboard + Products / Orders / Catalog / Settings |

## Architecture highlights

- **One reusable bottle:** `<MarahilBottle chapter="bad" branch="fahl" size="50" />`
  (SVG, gold plate color per chapter, prayer inscription, volume, branch ink).
  The same component renders on every page — only the chapter changes.
- **Cross-site cart:** one `CartProvider` (React Context). Add a Fahl product, switch
  to Aniqa, add another — both in one cart, one checkout. `localStorage` persisted.
- **Branch theming:** `[data-branch="parent|fahl|aniqa"]` on `<html>`, set from the
  pathname by `BranchTheme`. CSS variables cascade in `globals.css`.
- **No fabricated data:** exact prices/SKUs, real chapters, no fake reviews, no fake
  inventory, no fake payment. Memorial editions: `hasDiscount: false` — no coupons.
- **No likenesses:** the brothers hero slot (`public/images/fahl/hero-brothers.jpg`)
  gracefully falls back to a luxury bottle composition until an approved photo exists.
- **SEO:** per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, product
  JSON-LD, organization JSON-LD. `getSiteFromHost()` resolves site by domain.

## Catalog (23 products)

- **AL-FAHL:** Bad' / Ishraq / Zuhr / Athar / Wasl / Layl (50ml $125 · 100ml $185),
  Discovery ($85), 4 jewelry ($95–$245), Brotherhood Memorial Gift Box ($395).
- **AL-ANIQA:** same six chapters, Discovery ($85), 3 jewelry, Elegance Memorial
  Gift Box ($395).
- **Chapters:** Bad' (Soft Gold #D4AF37), Ishraq (Bright Gold), Zuhr (Warm Gold),
  Athar (Rose Gold), Wasl (Ember), Layl (Black Gold).

## Asset slots (replace later)

All visuals are CSS/SVG (no broken images). Drop real photography into:

- `public/images/fahl/hero-brothers.jpg` — the brothers hero photograph
- `public/images/fahl/*.jpg`, `public/images/aniqa/*.jpg` — product photography
- `public/images/jewelry/*.jpg` — jewelry macro photography

See `public/images/README.md` for exact filenames.

## Scripts

```bash
npm run dev      # dev server (SSR)
npm run build    # production build (static export → out/)
npm run lint     # eslint
```

## Test checklist (verified)

- [x] `/`, `/fahl`, `/aniqa` load (200)
- [x] Product modal opens; 50ml/100ml changes SKU + price
- [x] Add to cart (card + modal); cart drawer opens
- [x] Quantity +/-, remove, persistence across refresh (`localStorage`)
- [x] Cross-site cart: Fahl + Aniqa items in one cart
- [x] Checkout: Zod validation, COD + mock card (4242…), order placed
- [x] Order confirmation: order number, items, 2% Sadaqah Jariyah, totals
- [x] JSON fallback (runs without Supabase)
- [x] Mobile (390px) for parent / fahl / aniqa
- [x] SEO metadata, sitemap, robots, JSON-LD
- [x] Escape closes modal/drawer; focus-visible states

---

© AAMIR ALI & SONS CO. LLC · Abu Dhabi, UAE
`group@marahil.ae` · `+971 2 123 4567`
