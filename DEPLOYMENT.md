# SELINOVA-TECH — Deployment & DNS Guide

## Übersicht

Dieses Projekt besteht aus:
- **Frontend**: React/Vite SPA (`artifacts/selinova-web`)
- **API**: Express.js Serverless Function (`api/index.ts`)
- **Datenbank**: PostgreSQL (Drizzle ORM)

---

## 1. Datenbank einrichten (vor Vercel-Deployment)

Empfohlen: [Neon](https://neon.tech) oder [Supabase](https://supabase.com) (beide bieten kostenlosen PostgreSQL-Tier an).

### Neon (empfohlen):
1. Account erstellen auf [neon.tech](https://neon.tech)
2. Neues Projekt erstellen → Datenbank-Name: `selinova`
3. Connection String kopieren (Format: `postgresql://user:pass@host/db?sslmode=require`)
4. Diesen String als `DATABASE_URL` in Vercel speichern (Schritt 3)

### Schema migrieren:
```bash
# Lokal ausführen nach DATABASE_URL gesetzt ist:
pnpm --filter @workspace/db run migrate
```

---

## 2. Vercel Deployment einrichten

### Schritt 1: Vercel-Account
1. Gehen Sie zu [vercel.com](https://vercel.com) → **Sign Up** (kostenlos, mit GitHub-Account)

### Schritt 2: Projekt importieren
1. Im Vercel Dashboard → **Add New Project**
2. **Import Git Repository** → `FeroBoost/SELINOVA-BUILDER` auswählen
3. Framework Preset: **Other** (nicht Next.js!)
4. **Root Directory**: Leer lassen (Root des Repos)
5. Build-Einstellungen werden automatisch aus `vercel.json` geladen

### Schritt 3: Umgebungsvariablen setzen
Im Vercel Dashboard → Project Settings → Environment Variables:

| Variable         | Wert                                      | Umgebung          |
|-----------------|-------------------------------------------|-------------------|
| `DATABASE_URL`   | `postgresql://...` (von Neon/Supabase)   | Production        |
| `SESSION_SECRET` | Zufälliger langer String (min. 32 Zeichen) | Production        |

> **Tipp**: Für `SESSION_SECRET` einen sicheren Wert generieren:
> ```bash
> openssl rand -base64 32
> ```

### Schritt 4: Deployen
1. Klicken Sie auf **Deploy**
2. Vercel baut das Projekt automatisch
3. Nach erfolgreichem Build → temporäre Domain: `selinova-builder.vercel.app`

---

## 3. Custom Domain bei internex.at konfigurieren

### Schritt 1: Domain in Vercel hinzufügen
1. Vercel Dashboard → Ihr Projekt → **Settings** → **Domains**
2. Domain eingeben (z.B. `selinova.at` oder `www.selinova.at`)
3. Vercel zeigt Ihnen die benötigten DNS-Einträge

### Schritt 2: DNS-Einträge bei internex.at eintragen

Loggen Sie sich bei **internex.at** ein und gehen Sie zu **DNS-Verwaltung** Ihrer Domain.

#### Für Root-Domain (z.B. `selinova.at`):
```
Typ:    A
Name:   @  (oder leer lassen)
Wert:   76.76.21.21
TTL:    3600 (oder Auto)
```

#### Für www-Subdomain (z.B. `www.selinova.at`):
```
Typ:    CNAME
Name:   www
Wert:   cname.vercel-dns.com.
TTL:    3600 (oder Auto)
```

#### Vollständige DNS-Tabelle:

| Typ   | Name | Wert                   | TTL  |
|-------|------|------------------------|------|
| A     | @    | 76.76.21.21            | 3600 |
| CNAME | www  | cname.vercel-dns.com.  | 3600 |

> **Hinweis**: DNS-Änderungen können bis zu 48 Stunden dauern, meist jedoch unter 1 Stunde.

### Schritt 3: SSL-Zertifikat
Vercel stellt automatisch ein kostenloses SSL-Zertifikat (Let's Encrypt) aus, sobald die DNS-Einträge aktiv sind. Kein manuelles Einrichten nötig.

### Schritt 4: Vercel bestätigt die Domain
1. Zurück in Vercel → **Settings** → **Domains**
2. Status wechselt von "Pending" zu "Valid" (grüner Haken)
3. Die Website ist dann unter Ihrer Domain erreichbar ✅

---

## 4. Automatische Deployments (CI/CD)

Sobald das GitHub-Repository verknüpft ist, deployed Vercel **automatisch** bei jedem Push auf `main`:
- Push zu GitHub → Vercel baut neu → Live in ~2 Minuten

---

## 5. API-Endpunkte (nach Deployment)

| Endpunkt                         | Beschreibung                        |
|----------------------------------|-------------------------------------|
| `GET /api/healthz`               | Health-Check                        |
| `GET /api/listings`              | Alle Listings (mit Filtern)         |
| `GET /api/listings/featured`     | Featured Listings                   |
| `GET /api/listings/stats`        | Statistiken                         |
| `GET /api/listings/:id`          | Einzelnes Listing                   |
| `POST /api/listings`             | Neues Listing erstellen             |
| `PATCH /api/listings/:id`        | Listing aktualisieren               |
| `DELETE /api/listings/:id`       | Listing löschen                     |
| `GET /api/categories`            | Alle Kategorien mit Unterkategorien |

---

## 6. Troubleshooting

### Build schlägt fehl:
- Prüfen Sie, ob `DATABASE_URL` in den Vercel Environment Variables gesetzt ist
- Logs unter Vercel Dashboard → Deployment → **Build Logs**

### API gibt 404 zurück:
- Prüfen Sie die Vercel Function Logs: Dashboard → Deployment → **Functions**
- Stellen Sie sicher, dass `DATABASE_URL` korrekt ist

### Domain zeigt noch alte Website:
- DNS-Propagation kann bis zu 48h dauern
- Prüfen Sie mit: `nslookup IhreDomain.at`
