# SELINOVA-TECH — Deployment & DNS Guide

## Übersicht

Dieses Projekt besteht aus:
- **Frontend**: React/Vite SPA (`artifacts/selinova-web`)
- **API**: Express.js Serverless Function (`api/index.ts`)
- **Datenbank**: PostgreSQL (Drizzle ORM)

---

## Sicherheitsarchitektur

| Schicht | Maßnahme |
|---------|----------|
| **Security Headers** | `helmet` — XSS, Clickjacking, MIME-Sniffing Schutz |
| **CORS** | Nur erlaubte Domains (Allowlist) — kein `*` |
| **Rate Limiting** | 120 GET/min · 20 Write/min pro IP |
| **Write-Schutz** | POST / PATCH / DELETE erfordern `X-Api-Key` Header |
| **Secrets** | Alle Keys ausschließlich als verschlüsselte Env-Variablen |
| **XSS (Frontend)** | Alle Nutzerdaten mit `esc()` sanitized |

---

## 1. Datenbank einrichten (vor Vercel-Deployment)

Empfohlen: [Neon](https://neon.tech) oder [Supabase](https://supabase.com) (beide kostenlosen Tier).

### Neon (empfohlen):
1. Account auf [neon.tech](https://neon.tech) erstellen
2. Neues Projekt → Datenbank: `selinova`
3. Connection String kopieren: `postgresql://user:pass@host/db?sslmode=require`

### Schema migrieren:
```bash
DATABASE_URL="postgresql://..." pnpm --filter @workspace/db run migrate
```

---

## 2. Vercel Deployment einrichten

### Schritt 1: Vercel-Account
[vercel.com](https://vercel.com) → Sign Up (kostenlos, mit GitHub)

### Schritt 2: Projekt importieren
1. Vercel Dashboard → **Add New Project**
2. **Import**: `FeroBoost/SELINOVA-BUILDER`
3. Framework Preset: **Other**
4. Root Directory: leer lassen
5. Build-Einstellungen kommen automatisch aus `vercel.json`

### Schritt 3: Umgebungsvariablen setzen
Vercel Dashboard → Project Settings → **Environment Variables**:

| Variable | Wert | Umgebung |
|----------|------|----------|
| `DATABASE_URL` | `postgresql://...` (Neon/Supabase) | Production |
| `SESSION_SECRET` | Zufälliger String ≥ 32 Zeichen | Production |
| `ADMIN_API_KEY` | Geheimer API-Schlüssel für Write-Ops | Production |

> **Tipp**: Sichere Werte generieren:
> ```bash
> openssl rand -base64 32   # für SESSION_SECRET
> openssl rand -hex 32      # für ADMIN_API_KEY
> ```
>
> ⚠️ Diese Werte **niemals** in den Code oder ins Git-Repository eintragen.
> Vercel speichert alle Environment Variables **verschlüsselt**.

### Schritt 4: Deployen
Klicken Sie auf **Deploy** → Vercel baut automatisch.
Temporäre URL: `https://selinova-builder.vercel.app`

---

## 3. Custom Domain bei internex.at konfigurieren

### Schritt 1: Domain in Vercel hinzufügen
Vercel Dashboard → Ihr Projekt → **Settings** → **Domains** → Domain eingeben (z.B. `selinova-tech.at`)

### Schritt 2: DNS-Einträge bei internex.at eintragen

Einloggen bei **internex.at** → DNS-Verwaltung Ihrer Domain:

#### Root-Domain (`selinova-tech.at`):
```
Typ:    A
Name:   @
Wert:   76.76.21.21
TTL:    3600
```

#### www-Subdomain (`www.selinova-tech.at`):
```
Typ:    CNAME
Name:   www
Wert:   cname.vercel-dns.com.
TTL:    3600
```

#### Vollständige DNS-Tabelle:

| Typ | Name | Wert | TTL |
|-----|------|------|-----|
| A | @ | `76.76.21.21` | 3600 |
| CNAME | www | `cname.vercel-dns.com.` | 3600 |

> **Hinweis**: DNS-Propagation dauert 15 Minuten bis 48 Stunden.

### Schritt 3: SSL-Zertifikat
Vercel stellt automatisch ein kostenloses SSL-Zertifikat (HTTPS) aus — kein manuelles Einrichten.

### Schritt 4: Bestätigung in Vercel
Settings → Domains → Status: **Valid** (grüner Haken) ✅

---

## 4. CORS für Ihre Domain freischalten

Nach Einrichten der Domain müssen Sie diese in zwei Dateien eintragen:

**`artifacts/api-server/src/app.ts`** und **`api/index.ts`** — beide enthalten:
```typescript
const ALLOWED_ORIGINS = [
  "https://www.selinova-tech.at",   // ← Ihre Domain (bereits eingetragen)
  "https://selinova-tech.at",
  ...
];
```

Wenn Sie eine andere Domain verwenden, tragen Sie diese dort ein und pushen Sie erneut.

---

## 5. API-Endpunkte (nach Deployment)

### Öffentliche Endpunkte (kein Key):
| Endpunkt | Beschreibung |
|----------|-------------|
| `GET /api/healthz` | Health-Check |
| `GET /api/listings` | Listings (Filter: `q`, `category`, `type`, `sort`) |
| `GET /api/listings/featured` | Featured Listings |
| `GET /api/listings/stats` | Statistiken |
| `GET /api/listings/:id` | Einzelnes Listing |
| `GET /api/categories` | Kategorien + Unterkategorien |

### Geschützte Endpunkte (ADMIN_API_KEY erforderlich):
Header: `X-Api-Key: <ADMIN_API_KEY>`

| Endpunkt | Beschreibung |
|----------|-------------|
| `POST /api/listings` | Listing erstellen |
| `PATCH /api/listings/:id` | Listing aktualisieren |
| `DELETE /api/listings/:id` | Listing löschen |

---

## 6. Automatische Deployments

Jeder Push auf `main` → Vercel deployt automatisch (~2 Minuten).

---

## 7. Troubleshooting

### Build schlägt fehl:
- `DATABASE_URL` in Vercel Environment Variables gesetzt?
- Logs: Vercel Dashboard → Deployment → **Build Logs**

### API gibt 401 zurück:
- `X-Api-Key` Header bei Write-Requests mitschicken
- `ADMIN_API_KEY` in Vercel gesetzt?

### API gibt 403/CORS-Fehler:
- Ihre Domain in `ALLOWED_ORIGINS` eingetragen?
- Danach neu pushen und Vercel deployen lassen

### Domain zeigt alte Seite:
- DNS noch in Propagation — bis zu 48h warten
- Prüfen: `nslookup IhreDomain.at`

---

## 8. ⚠️ Sicherheits-Checkliste vor Go-Live

- [ ] `DATABASE_URL` als Vercel Secret gesetzt (nicht im Code)
- [ ] `SESSION_SECRET` ≥ 32 Zeichen, als Vercel Secret gesetzt
- [ ] `ADMIN_API_KEY` generiert und als Vercel Secret gesetzt
- [ ] GitHub PAT rotiert (neuen Token generieren, alten widerrufen)
- [ ] Domain mit HTTPS aktiv (grüner Haken in Vercel)
- [ ] `GET /api/healthz` antwortet mit `{"status":"ok"}`
- [ ] `POST /api/listings` ohne API-Key gibt `401` zurück ✅
