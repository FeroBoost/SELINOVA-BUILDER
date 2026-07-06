# SELINOVA-TECH — Marktplatz

Österreichischer Marktplatz für den Kauf und die Miete professioneller Webseiten und Software-Assets (E-Commerce, SaaS, Blogs, Apps, CRM-Tools, Landing Pages, Portfolios).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API-Server starten (Port 8080, via Proxy auf /api)
- `pnpm --filter @workspace/selinova-web run dev` — Frontend starten (via Workflow, Port dynamisch)
- `pnpm run typecheck` — vollständiger Typecheck über alle Pakete
- `pnpm run build` — Typecheck + Build aller Pakete
- `pnpm --filter @workspace/api-spec run codegen` — API-Hooks und Zod-Schemas aus OpenAPI neu generieren
- `pnpm --filter @workspace/db run push` — DB-Schema pushen (nur dev)
- Required env: `DATABASE_URL` — Postgres-Verbindungsstring

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, Wouter (Routing), TanStack React Query
- API: Express 5, OpenAPI-first, Orval codegen
- DB: PostgreSQL + Drizzle ORM, Drizzle-Zod
- Validation: Zod (zod/v4)

## Architektur

- `lib/api-spec/openapi.yaml` — OpenAPI-Spec (Source of Truth für alle API-Verträge)
- `lib/api-client-react/src/generated/` — generierte React Query Hooks
- `lib/api-zod/src/generated/` — generierte Zod-Schemas (für Server-Validierung)
- `lib/db/src/schema/listings.ts` — DB-Schema: categories, subcategories, listings (Enums: listing_type, listing_status)
- `artifacts/api-server/src/routes/` — Express-Route-Handler (listings.ts, categories.ts, health.ts)
- `artifacts/selinova-web/src/pages/` — React-Seiten: HomePage, MarketplacePage, ListingDetailPage, CategoryPage
- `artifacts/selinova-web/src/components/marketplace/` — ListingCard, FilterSidebar, SearchBar, CategoryGrid, StatsStrip

## Produkt

- **Marktplatz-Struktur**: willhaben.at-Stil — Navbar mit Suche, Kategorie-Nav mit Live-Zählern, Filter-Sidebar, Listing-Grid
- **Kategorien**: E-Commerce/Webshop, Corporate Website, SaaS Platform, Blog/Content, Mobile/Web App, CRM/ERP, Landing Page, Portfolio
- **Listing-Typen**: Kaufen (buy) | Mieten (rent)
- **Farben**: Turquoise #0D9488 (primary), Emerald #10B981 (accent), Lime #84CC16, Hintergrund #F8FAFB
- **Routes**: / · /marktplatz · /kaufen · /mieten · /featured · /listing/:id · /kategorie/:slug
- **22 Seed-Listings** mit realistischen österreichischen Marketplace-Daten

## User preferences

- Kein Emoji in der gesamten UI
- High-Tier Senior Fullstack Coding — keine Placeholder, kein Newbie-Design
- willhaben.at als UX-Referenz
- Logo-Video: attached_assets/download_20260614_135906_0000_1783241609712.mp4 (noch in Hero einbetten)

## Gotchas

- URL-Query-Parameter `type` darf nie als leerer String an die API gesendet werden — immer `|| undefined` verwenden
- `pnpm run typecheck:libs` vor API-Typecheck ausführen, wenn DB-Schema geändert wurde (sonst stale declarations)
- Subcategory-Filter ist slug-basiert (nicht label-basiert) — FilterSidebar nutzt API-Daten direkt
- Orval codegen: `info.title` in openapi.yaml nicht ändern (bricht generierte Dateinamen)

## Pointers

- DB-Schema: `lib/db/src/schema/listings.ts`
- API-Spec: `lib/api-spec/openapi.yaml`
- Frontend-Theme: `artifacts/selinova-web/src/index.css`
- Logo-Video: `attached_assets/download_20260614_135906_0000_1783241609712.mp4`
