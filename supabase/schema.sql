-- ============================================================
-- SELINOVA-TECH — Supabase SQL Schema
-- Version: 1.0
-- Kompatibel mit: Drizzle ORM (lib/db/src/schema/listings.ts)
--
-- Ausführungsreihenfolge:
--   1. Extensions
--   2. Enums
--   3. Kerntabellen (categories, subcategories, listings)
--   4. Erweiterte Tabellen (inquiries, listing_audit_log, listing_views_log)
--   5. Indexes
--   6. Volltextsuche
--   7. Trigger-Funktionen & Trigger
--   8. Row Level Security (RLS)
--   9. Datenbank-Funktionen (API-Hilfsfunktionen)
--  10. Views
--  11. Seed-Daten (Kategorien & Unterkategorien)
-- ============================================================

-- ============================================================
-- 1. EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "unaccent";        -- Akzentunabhängige Suche (ä→a, ö→o etc.)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";         -- Trigram-Ähnlichkeitssuche (fuzzy search)

-- ============================================================
-- 2. ENUMS
-- (müssen exakt mit Drizzle-Schema übereinstimmen)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE listing_type   AS ENUM ('buy', 'rent');
  CREATE TYPE listing_status AS ENUM ('active', 'sold', 'rented');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- 3. KERNTABELLEN
-- ============================================================

-- ── categories ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL      PRIMARY KEY,
  slug TEXT        NOT NULL UNIQUE,
  name TEXT        NOT NULL,
  icon TEXT        NOT NULL DEFAULT 'Globe'
);

COMMENT ON TABLE  categories      IS 'Hauptkategorien des Marktplatzes (ecommerce, saas, blogs, …)';
COMMENT ON COLUMN categories.icon IS 'Lucide-Icon-Name, z.B. "ShoppingCart", "Code", "Globe"';

-- ── subcategories ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subcategories (
  id            SERIAL PRIMARY KEY,
  slug          TEXT   NOT NULL UNIQUE,
  name          TEXT   NOT NULL,
  category_slug TEXT   NOT NULL REFERENCES categories(slug) ON DELETE CASCADE ON UPDATE CASCADE
);

COMMENT ON TABLE subcategories IS 'Unterkategorien — je einer Hauptkategorie zugeordnet';

-- ── listings ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS listings (
  id               SERIAL          PRIMARY KEY,
  title            TEXT            NOT NULL CHECK (char_length(title) >= 3),
  description      TEXT            NOT NULL CHECK (char_length(description) >= 10),
  category_slug    TEXT            NOT NULL REFERENCES categories(slug)    ON DELETE RESTRICT ON UPDATE CASCADE,
  subcategory_slug TEXT            NOT NULL REFERENCES subcategories(slug) ON DELETE RESTRICT ON UPDATE CASCADE,
  type             listing_type    NOT NULL,
  price            DECIMAL(12, 2)  NOT NULL CHECK (price >= 0),
  price_period     TEXT            NOT NULL DEFAULT 'einmalig',
  status           listing_status  NOT NULL DEFAULT 'active',
  is_featured      BOOLEAN         NOT NULL DEFAULT FALSE,
  views            INTEGER         NOT NULL DEFAULT 0 CHECK (views >= 0),
  tech_stack       TEXT[]          NOT NULL DEFAULT '{}',
  features         TEXT[]          NOT NULL DEFAULT '{}',
  -- Volltextsuche (automatisch befüllt via Trigger)
  search_vector    TSVECTOR,
  created_at       TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  listings               IS 'Kern-Listings des SELINOVA-TECH Marktplatzes';
COMMENT ON COLUMN listings.search_vector IS 'Automatisch generierter Volltext-Index (DE + EN)';
COMMENT ON COLUMN listings.price_period  IS 'z.B. "einmalig", "monatlich", "jährlich"';

-- ============================================================
-- 4. ERWEITERTE TABELLEN
-- ============================================================

-- ── inquiries (Anfragen zu Listings) ────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id           SERIAL         PRIMARY KEY,
  listing_id   INTEGER        NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  name         TEXT           NOT NULL CHECK (char_length(name) >= 2),
  email        TEXT           NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  phone        TEXT,
  message      TEXT           NOT NULL CHECK (char_length(message) >= 10),
  budget       DECIMAL(12, 2),
  status       TEXT           NOT NULL DEFAULT 'new'
                              CHECK (status IN ('new', 'in_progress', 'closed', 'spam')),
  ip_address   INET,
  created_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  inquiries            IS 'Käufer-/Mieter-Anfragen zu Listings';
COMMENT ON COLUMN inquiries.status     IS 'new | in_progress | closed | spam';
COMMENT ON COLUMN inquiries.ip_address IS 'Gespeichert für Spam-Erkennung — DSGVO-konform nur mit Datenschutzerklärung';

-- ── listing_audit_log (Änderungsprotokoll) ───────────────────
CREATE TABLE IF NOT EXISTS listing_audit_log (
  id          SERIAL        PRIMARY KEY,
  listing_id  INTEGER       NOT NULL,
  action      TEXT          NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  changed_by  TEXT,                          -- API-Key-Fingerprint oder NULL
  old_data    JSONB,
  new_data    JSONB,
  changed_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE listing_audit_log IS 'Vollständiges Audit-Log aller Listing-Änderungen (unveränderlich)';

-- ── listing_views_log (Aufruf-Tracking, dedupliziert) ────────
CREATE TABLE IF NOT EXISTS listing_views_log (
  id          BIGSERIAL     PRIMARY KEY,
  listing_id  INTEGER       NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  ip_hash     TEXT,                          -- SHA-256 des IP — nicht reversibel
  user_agent  TEXT,
  viewed_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE listing_views_log IS 'Einzel-Aufrufe pro Listing — für deduplizierte View-Zählung';

-- ============================================================
-- 5. INDEXES
-- ============================================================

-- categories
CREATE INDEX IF NOT EXISTS idx_categories_slug     ON categories(slug);

-- subcategories
CREATE INDEX IF NOT EXISTS idx_subcategories_slug          ON subcategories(slug);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_slug ON subcategories(category_slug);

-- listings — häufige Filter
CREATE INDEX IF NOT EXISTS idx_listings_category_slug    ON listings(category_slug);
CREATE INDEX IF NOT EXISTS idx_listings_subcategory_slug ON listings(subcategory_slug);
CREATE INDEX IF NOT EXISTS idx_listings_type             ON listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_status           ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_is_featured      ON listings(is_featured);
CREATE INDEX IF NOT EXISTS idx_listings_price            ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_created_at       ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_views            ON listings(views DESC);

-- Kombinierter Index: aktive Listings nach Preis (häufigste Abfrage)
CREATE INDEX IF NOT EXISTS idx_listings_active_price
  ON listings(status, price)
  WHERE status = 'active';

-- Kombinierter Index: featured aktive Listings
CREATE INDEX IF NOT EXISTS idx_listings_featured_active
  ON listings(is_featured, created_at DESC)
  WHERE status = 'active' AND is_featured = TRUE;

-- Volltextsuche
CREATE INDEX IF NOT EXISTS idx_listings_search_vector
  ON listings USING GIN(search_vector);

-- Trigram-Index für LIKE/ILIKE Suche auf Titel
CREATE INDEX IF NOT EXISTS idx_listings_title_trgm
  ON listings USING GIN(title gin_trgm_ops);

-- inquiries
CREATE INDEX IF NOT EXISTS idx_inquiries_listing_id ON inquiries(listing_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status     ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- audit log
CREATE INDEX IF NOT EXISTS idx_audit_listing_id  ON listing_audit_log(listing_id);
CREATE INDEX IF NOT EXISTS idx_audit_changed_at  ON listing_audit_log(changed_at DESC);

-- views log
CREATE INDEX IF NOT EXISTS idx_views_log_listing_id ON listing_views_log(listing_id);
CREATE INDEX IF NOT EXISTS idx_views_log_viewed_at  ON listing_views_log(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_views_log_ip_listing ON listing_views_log(listing_id, ip_hash, viewed_at DESC);

-- ============================================================
-- 6. VOLLTEXTSUCHE — Hilfsfunktion
-- ============================================================

-- Deutsch+Englisch gewichteter Suchvektor
CREATE OR REPLACE FUNCTION listings_search_vector(
  p_title       TEXT,
  p_description TEXT,
  p_tech_stack  TEXT[],
  p_features    TEXT[]
) RETURNS TSVECTOR
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT
    setweight(to_tsvector('german', unaccent(coalesce(p_title, ''))),       'A') ||
    setweight(to_tsvector('english', unaccent(coalesce(p_title, ''))),      'A') ||
    setweight(to_tsvector('german', unaccent(coalesce(p_description, ''))), 'B') ||
    setweight(to_tsvector('simple', unaccent(array_to_string(coalesce(p_tech_stack, '{}'), ' '))), 'C') ||
    setweight(to_tsvector('simple', unaccent(array_to_string(coalesce(p_features, '{}'), ' '))),   'D')
$$;

-- ============================================================
-- 7. TRIGGER-FUNKTIONEN & TRIGGER
-- ============================================================

-- ── Trigger 1: updated_at automatisch setzen ─────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_listings_updated_at ON listings;
CREATE TRIGGER trg_listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_inquiries_updated_at ON inquiries;
CREATE TRIGGER trg_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Trigger 2: search_vector automatisch befüllen ────────────
CREATE OR REPLACE FUNCTION update_listings_search_vector()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector := listings_search_vector(
    NEW.title,
    NEW.description,
    NEW.tech_stack,
    NEW.features
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_listings_search_vector ON listings;
CREATE TRIGGER trg_listings_search_vector
  BEFORE INSERT OR UPDATE OF title, description, tech_stack, features ON listings
  FOR EACH ROW EXECUTE FUNCTION update_listings_search_vector();

-- ── Trigger 3: Audit-Log für Listings ───────────────────────
CREATE OR REPLACE FUNCTION log_listing_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO listing_audit_log(listing_id, action, new_data)
    VALUES (NEW.id, 'INSERT', to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO listing_audit_log(listing_id, action, old_data, new_data)
    VALUES (NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO listing_audit_log(listing_id, action, old_data)
    VALUES (OLD.id, 'DELETE', to_jsonb(OLD));
    RETURN OLD;
  END IF;
END;
$$;

DROP TRIGGER IF EXISTS trg_listings_audit ON listings;
CREATE TRIGGER trg_listings_audit
  AFTER INSERT OR UPDATE OR DELETE ON listings
  FOR EACH ROW EXECUTE FUNCTION log_listing_change();

-- ── Trigger 4: Views-Zähler atomar erhöhen ──────────────────
-- (Verhindert Race Conditions bei gleichzeitigen Requests)
CREATE OR REPLACE FUNCTION sync_listing_views()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE listings
  SET views = (
    SELECT COUNT(*) FROM listing_views_log WHERE listing_id = NEW.listing_id
  )
  WHERE id = NEW.listing_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_views ON listing_views_log;
CREATE TRIGGER trg_sync_views
  AFTER INSERT ON listing_views_log
  FOR EACH ROW EXECUTE FUNCTION sync_listing_views();

-- ============================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- listings: öffentlich lesbar (nur aktive), schreiben nur service_role
ALTER TABLE listings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries      ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_views_log ENABLE ROW LEVEL SECURITY;

-- categories: öffentlich lesbar
DROP POLICY IF EXISTS "categories_public_read" ON categories;
CREATE POLICY "categories_public_read"
  ON categories FOR SELECT TO anon, authenticated
  USING (TRUE);

-- subcategories: öffentlich lesbar
DROP POLICY IF EXISTS "subcategories_public_read" ON subcategories;
CREATE POLICY "subcategories_public_read"
  ON subcategories FOR SELECT TO anon, authenticated
  USING (TRUE);

-- listings: anon/authenticated darf nur aktive Listings lesen
DROP POLICY IF EXISTS "listings_public_read_active" ON listings;
CREATE POLICY "listings_public_read_active"
  ON listings FOR SELECT TO anon, authenticated
  USING (status = 'active');

-- listings: service_role darf alles lesen (inkl. sold/rented — für Admin)
DROP POLICY IF EXISTS "listings_service_read_all" ON listings;
CREATE POLICY "listings_service_read_all"
  ON listings FOR SELECT TO service_role
  USING (TRUE);

-- listings: nur service_role darf schreiben
DROP POLICY IF EXISTS "listings_service_insert" ON listings;
CREATE POLICY "listings_service_insert"
  ON listings FOR INSERT TO service_role WITH CHECK (TRUE);

DROP POLICY IF EXISTS "listings_service_update" ON listings;
CREATE POLICY "listings_service_update"
  ON listings FOR UPDATE TO service_role USING (TRUE);

DROP POLICY IF EXISTS "listings_service_delete" ON listings;
CREATE POLICY "listings_service_delete"
  ON listings FOR DELETE TO service_role USING (TRUE);

-- inquiries: anon/authenticated darf eigene Anfragen erstellen
DROP POLICY IF EXISTS "inquiries_public_insert" ON inquiries;
CREATE POLICY "inquiries_public_insert"
  ON inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (TRUE);

-- inquiries: nur service_role darf lesen und verwalten
DROP POLICY IF EXISTS "inquiries_service_all" ON inquiries;
CREATE POLICY "inquiries_service_all"
  ON inquiries FOR ALL TO service_role USING (TRUE);

-- audit log: nur service_role lesbar, kein direktes Schreiben
DROP POLICY IF EXISTS "audit_service_read" ON listing_audit_log;
CREATE POLICY "audit_service_read"
  ON listing_audit_log FOR SELECT TO service_role USING (TRUE);

-- views log: anon/authenticated darf eintragen (für View-Tracking)
DROP POLICY IF EXISTS "views_log_public_insert" ON listing_views_log;
CREATE POLICY "views_log_public_insert"
  ON listing_views_log FOR INSERT TO anon, authenticated
  WITH CHECK (TRUE);

DROP POLICY IF EXISTS "views_log_service_read" ON listing_views_log;
CREATE POLICY "views_log_service_read"
  ON listing_views_log FOR SELECT TO service_role USING (TRUE);

-- ============================================================
-- 9. DATENBANK-FUNKTIONEN
-- ============================================================

-- ── Funktion: increment_listing_views ───────────────────────
-- Atomar: trägt View ein und gibt aktuellen Zähler zurück.
-- Dedupliziert: gleiches ip_hash + gleiche listing_id innerhalb
-- von 1 Stunde zählt nur einmal.
CREATE OR REPLACE FUNCTION increment_listing_views(
  p_listing_id  INTEGER,
  p_ip_hash     TEXT    DEFAULT NULL,
  p_user_agent  TEXT    DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_already_viewed BOOLEAN := FALSE;
  v_current_views  INTEGER;
BEGIN
  -- Deduplizierung: gleicher IP-Hash innerhalb 1 Stunde
  IF p_ip_hash IS NOT NULL THEN
    SELECT EXISTS(
      SELECT 1 FROM listing_views_log
      WHERE listing_id = p_listing_id
        AND ip_hash    = p_ip_hash
        AND viewed_at  > NOW() - INTERVAL '1 hour'
    ) INTO v_already_viewed;
  END IF;

  IF NOT v_already_viewed THEN
    INSERT INTO listing_views_log(listing_id, ip_hash, user_agent)
    VALUES (p_listing_id, p_ip_hash, p_user_agent);
  END IF;

  SELECT views INTO v_current_views FROM listings WHERE id = p_listing_id;
  RETURN COALESCE(v_current_views, 0);
END;
$$;

-- ── Funktion: search_listings ────────────────────────────────
-- Volltextsuche mit Ranking, Kategorie-Filter und Preisrange.
-- Gibt angereicherte Listings zurück (inkl. categoryName, subcategoryName).
CREATE OR REPLACE FUNCTION search_listings(
  p_query          TEXT            DEFAULT NULL,
  p_category       TEXT            DEFAULT NULL,
  p_subcategory    TEXT            DEFAULT NULL,
  p_type           listing_type    DEFAULT NULL,
  p_min_price      DECIMAL(12, 2)  DEFAULT NULL,
  p_max_price      DECIMAL(12, 2)  DEFAULT NULL,
  p_sort           TEXT            DEFAULT 'newest',   -- newest | price_asc | price_desc | popular | relevance
  p_page           INTEGER         DEFAULT 1,
  p_limit          INTEGER         DEFAULT 24
)
RETURNS TABLE (
  id               INTEGER,
  title            TEXT,
  description      TEXT,
  category_slug    TEXT,
  subcategory_slug TEXT,
  category_name    TEXT,
  subcategory_name TEXT,
  type             listing_type,
  price            DECIMAL(12, 2),
  price_period     TEXT,
  status           listing_status,
  is_featured      BOOLEAN,
  views            INTEGER,
  tech_stack       TEXT[],
  features         TEXT[],
  created_at       TIMESTAMPTZ,
  updated_at       TIMESTAMPTZ,
  rank             REAL,
  total_count      BIGINT
)
LANGUAGE plpgsql STABLE PARALLEL SAFE AS $$
DECLARE
  v_tsquery TSQUERY;
  v_offset  INTEGER := (GREATEST(p_page, 1) - 1) * GREATEST(p_limit, 1);
BEGIN
  -- Suchvektor aufbauen (deutsch + englisch + einfach)
  IF p_query IS NOT NULL AND p_query <> '' THEN
    v_tsquery := websearch_to_tsquery('german',  unaccent(p_query))
              || websearch_to_tsquery('english', unaccent(p_query));
  END IF;

  RETURN QUERY
  WITH filtered AS (
    SELECT
      l.*,
      c.name  AS cat_name,
      s.name  AS sub_name,
      CASE
        WHEN v_tsquery IS NOT NULL THEN ts_rank_cd(l.search_vector, v_tsquery)
        ELSE 1.0
      END AS search_rank,
      COUNT(*) OVER() AS total_cnt
    FROM listings l
    LEFT JOIN categories    c ON c.slug = l.category_slug
    LEFT JOIN subcategories s ON s.slug = l.subcategory_slug
    WHERE
      l.status = 'active'
      AND (p_category    IS NULL OR l.category_slug    = p_category)
      AND (p_subcategory IS NULL OR l.subcategory_slug = p_subcategory)
      AND (p_type        IS NULL OR l.type             = p_type)
      AND (p_min_price   IS NULL OR l.price           >= p_min_price)
      AND (p_max_price   IS NULL OR l.price           <= p_max_price)
      AND (
        v_tsquery IS NULL
        OR l.search_vector @@ v_tsquery
        OR l.title ILIKE '%' || p_query || '%'
      )
    ORDER BY
      CASE p_sort
        WHEN 'price_asc'  THEN NULL
        WHEN 'price_desc' THEN NULL
        WHEN 'popular'    THEN NULL
        WHEN 'relevance'  THEN NULL
        ELSE l.created_at
      END DESC NULLS LAST,
      CASE p_sort WHEN 'price_asc'  THEN l.price    END ASC  NULLS LAST,
      CASE p_sort WHEN 'price_desc' THEN l.price    END DESC NULLS LAST,
      CASE p_sort WHEN 'popular'    THEN l.views    END DESC NULLS LAST,
      CASE p_sort WHEN 'relevance'  THEN search_rank END DESC NULLS LAST,
      l.is_featured DESC,
      l.created_at  DESC
    LIMIT  GREATEST(p_limit, 1)
    OFFSET v_offset
  )
  SELECT
    f.id, f.title, f.description,
    f.category_slug, f.subcategory_slug,
    f.cat_name, f.sub_name,
    f.type, f.price, f.price_period,
    f.status, f.is_featured, f.views,
    f.tech_stack, f.features,
    f.created_at, f.updated_at,
    f.search_rank::REAL,
    f.total_cnt
  FROM filtered f;
END;
$$;

-- ── Funktion: get_marketplace_stats ─────────────────────────
-- Aggregierte Statistiken für die Startseite (entspricht /api/listings/stats).
CREATE OR REPLACE FUNCTION get_marketplace_stats()
RETURNS TABLE (
  total_listings  BIGINT,
  total_buy       BIGINT,
  total_rent      BIGINT,
  total_featured  BIGINT,
  average_price   NUMERIC(12, 2)
)
LANGUAGE sql STABLE PARALLEL SAFE AS $$
  SELECT
    COUNT(*)                                           AS total_listings,
    COUNT(*) FILTER (WHERE type = 'buy')               AS total_buy,
    COUNT(*) FILTER (WHERE type = 'rent')              AS total_rent,
    COUNT(*) FILTER (WHERE is_featured = TRUE)         AS total_featured,
    ROUND(AVG(price), 2)                               AS average_price
  FROM listings
  WHERE status = 'active';
$$;

-- ── Funktion: get_category_stats ─────────────────────────────
-- Listings-Anzahl pro Kategorie (für Sidebar-Filter mit Count).
CREATE OR REPLACE FUNCTION get_category_stats()
RETURNS TABLE (
  category_slug   TEXT,
  category_name   TEXT,
  listing_count   BIGINT,
  avg_price       NUMERIC(12, 2),
  min_price       NUMERIC(12, 2),
  max_price       NUMERIC(12, 2)
)
LANGUAGE sql STABLE PARALLEL SAFE AS $$
  SELECT
    c.slug,
    c.name,
    COUNT(l.id)              AS listing_count,
    ROUND(AVG(l.price), 2)  AS avg_price,
    MIN(l.price)             AS min_price,
    MAX(l.price)             AS max_price
  FROM categories c
  LEFT JOIN listings l
    ON l.category_slug = c.slug AND l.status = 'active'
  GROUP BY c.slug, c.name
  ORDER BY listing_count DESC;
$$;

-- ── Funktion: get_related_listings ──────────────────────────
-- Ähnliche Listings: gleiche Kategorie, ähnlicher Preis (±50%), nicht selbst.
CREATE OR REPLACE FUNCTION get_related_listings(
  p_listing_id  INTEGER,
  p_limit       INTEGER DEFAULT 4
)
RETURNS TABLE (
  id               INTEGER,
  title            TEXT,
  category_slug    TEXT,
  subcategory_slug TEXT,
  category_name    TEXT,
  subcategory_name TEXT,
  type             listing_type,
  price            DECIMAL(12, 2),
  price_period     TEXT,
  status           listing_status,
  is_featured      BOOLEAN,
  views            INTEGER,
  tech_stack       TEXT[],
  features         TEXT[],
  created_at       TIMESTAMPTZ
)
LANGUAGE plpgsql STABLE PARALLEL SAFE AS $$
DECLARE
  v_cat_slug  TEXT;
  v_price     DECIMAL(12,2);
BEGIN
  SELECT category_slug, price INTO v_cat_slug, v_price
  FROM listings WHERE id = p_listing_id;

  RETURN QUERY
  SELECT
    l.id, l.title,
    l.category_slug, l.subcategory_slug,
    c.name AS category_name,
    s.name AS subcategory_name,
    l.type, l.price, l.price_period,
    l.status, l.is_featured, l.views,
    l.tech_stack, l.features, l.created_at
  FROM listings l
  LEFT JOIN categories    c ON c.slug = l.category_slug
  LEFT JOIN subcategories s ON s.slug = l.subcategory_slug
  WHERE
    l.status        = 'active'
    AND l.id        <> p_listing_id
    AND l.category_slug = v_cat_slug
    AND l.price     BETWEEN v_price * 0.5 AND v_price * 1.5
  ORDER BY
    l.is_featured DESC,
    ABS(l.price - v_price) ASC,
    l.views DESC
  LIMIT p_limit;
END;
$$;

-- ── Funktion: submit_inquiry ─────────────────────────────────
-- Anfrage absenden (aus dem Frontend direkt via Supabase-Client aufrufbar).
CREATE OR REPLACE FUNCTION submit_inquiry(
  p_listing_id  INTEGER,
  p_name        TEXT,
  p_email       TEXT,
  p_phone       TEXT        DEFAULT NULL,
  p_message     TEXT        DEFAULT NULL,
  p_budget      DECIMAL     DEFAULT NULL,
  p_ip_address  INET        DEFAULT NULL
)
RETURNS INTEGER           -- gibt die neue inquiry.id zurück
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_id         INTEGER;
  v_is_active  BOOLEAN;
BEGIN
  -- Nur aktive Listings können angefragt werden
  SELECT (status = 'active') INTO v_is_active FROM listings WHERE id = p_listing_id;
  IF NOT FOUND OR NOT v_is_active THEN
    RAISE EXCEPTION 'Listing % ist nicht verfügbar oder existiert nicht.', p_listing_id;
  END IF;

  INSERT INTO inquiries(listing_id, name, email, phone, message, budget, ip_address)
  VALUES (p_listing_id, p_name, p_email, p_phone,
          COALESCE(p_message, ''), p_budget, p_ip_address)
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- ── Funktion: cleanup_old_views_log ─────────────────────────
-- Aufräumen: Views älter als 90 Tage löschen (per Cron aufrufbar).
CREATE OR REPLACE FUNCTION cleanup_old_views_log(p_days INTEGER DEFAULT 90)
RETURNS INTEGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM listing_views_log
  WHERE viewed_at < NOW() - (p_days || ' days')::INTERVAL;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

-- ============================================================
-- 10. VIEWS
-- ============================================================

-- ── View: listings_enriched ──────────────────────────────────
-- Joind category_name + subcategory_name direkt — ersetzt den
-- nachträglichen enrichListing()-Aufruf im API-Server.
CREATE OR REPLACE VIEW listings_enriched AS
SELECT
  l.id,
  l.title,
  l.description,
  l.category_slug,
  l.subcategory_slug,
  c.name   AS category_name,
  s.name   AS subcategory_name,
  l.type,
  l.price,
  l.price_period,
  l.status,
  l.is_featured,
  l.views,
  l.tech_stack,
  l.features,
  l.created_at,
  l.updated_at
FROM listings l
LEFT JOIN categories    c ON c.slug = l.category_slug
LEFT JOIN subcategories s ON s.slug = l.subcategory_slug;

COMMENT ON VIEW listings_enriched IS
  'Listings inkl. Kategorie-/Unterkategorie-Namen — für API-Abfragen ohne JOIN im Anwendungscode';

-- ── View: inquiry_summary ────────────────────────────────────
CREATE OR REPLACE VIEW inquiry_summary AS
SELECT
  i.id,
  i.listing_id,
  l.title  AS listing_title,
  l.price  AS listing_price,
  i.name,
  i.email,
  i.status,
  i.budget,
  i.created_at
FROM inquiries i
JOIN listings l ON l.id = i.listing_id
ORDER BY i.created_at DESC;

-- ── View: active_listings_count_per_category ─────────────────
CREATE OR REPLACE VIEW active_listings_count_per_category AS
SELECT
  c.id,
  c.slug,
  c.name,
  c.icon,
  COUNT(l.id) AS listing_count
FROM categories c
LEFT JOIN listings l ON l.category_slug = c.slug AND l.status = 'active'
GROUP BY c.id, c.slug, c.name, c.icon
ORDER BY c.id;

-- ============================================================
-- 11. SEED-DATEN
-- ============================================================

-- ── Kategorien ───────────────────────────────────────────────
INSERT INTO categories (slug, name, icon) VALUES
  ('ecommerce', 'E-Commerce',        'ShoppingCart'),
  ('saas',      'SaaS / Software',   'Code2'),
  ('blogs',     'Blogs & Content',   'FileText'),
  ('apps',      'Web Apps',          'AppWindow'),
  ('crm',       'CRM / ERP',         'Users'),
  ('corporate', 'Corporate & Firma', 'Building2')
ON CONFLICT (slug) DO UPDATE
  SET name = EXCLUDED.name,
      icon = EXCLUDED.icon;

-- ── Unterkategorien ──────────────────────────────────────────
INSERT INTO subcategories (slug, name, category_slug) VALUES
  -- E-Commerce
  ('dropshipping',       'Dropshipping-Shop',       'ecommerce'),
  ('shopify-store',      'Shopify Store',            'ecommerce'),
  ('woocommerce',        'WooCommerce Shop',         'ecommerce'),
  ('print-on-demand',    'Print-on-Demand',          'ecommerce'),
  ('marketplace',        'Marktplatz / Plattform',   'ecommerce'),
  ('subscription-box',   'Abo-Box / Subscription',   'ecommerce'),

  -- SaaS / Software
  ('b2b-saas',           'B2B SaaS',                 'saas'),
  ('b2c-saas',           'B2C SaaS',                 'saas'),
  ('api-tool',           'API / Developer Tool',     'saas'),
  ('browser-extension',  'Browser Extension',        'saas'),
  ('mobile-saas',        'Mobile SaaS App',          'saas'),
  ('ai-tool',            'KI / AI Tool',             'saas'),

  -- Blogs & Content
  ('niche-blog',         'Nischen-Blog',             'blogs'),
  ('news-portal',        'News-Portal',              'blogs'),
  ('affiliate-blog',     'Affiliate-Blog',           'blogs'),
  ('review-site',        'Bewertungsseite',          'blogs'),
  ('educational',        'Bildungs-Plattform',       'blogs'),
  ('newsletter',         'Newsletter / Substack',    'blogs'),

  -- Web Apps
  ('web-app',            'Web-Applikation',          'apps'),
  ('dashboard',          'Dashboard / Admin',        'apps'),
  ('productivity',       'Produktivitäts-Tool',      'apps'),
  ('community',          'Community / Forum',        'apps'),
  ('directory',          'Verzeichnis / Directory',  'apps'),
  ('booking-tool',       'Buchungstool / Kalender',  'apps'),

  -- CRM / ERP
  ('crm-system',         'CRM-System',               'crm'),
  ('erp-system',         'ERP-System',               'crm'),
  ('hr-tool',            'HR-Tool / Recruiting',     'crm'),
  ('project-mgmt',       'Projektmanagement',        'crm'),
  ('invoicing',          'Rechnungssoftware',        'crm'),
  ('support-tool',       'Support / Helpdesk',       'crm'),

  -- Corporate & Firma
  ('company-website',    'Firmenwebseite',           'corporate'),
  ('agency-website',     'Agentur-Website',          'corporate'),
  ('portfolio',          'Portfolio-Seite',          'corporate'),
  ('landing-page',       'Landing Page',             'corporate'),
  ('brochure-site',      'Broschüren-Webseite',      'corporate'),
  ('franchise-site',     'Franchise-Webseite',       'corporate')

ON CONFLICT (slug) DO UPDATE
  SET name          = EXCLUDED.name,
      category_slug = EXCLUDED.category_slug;

-- ============================================================
-- FERTIG
-- ============================================================
-- Schema ist bereit. Nächste Schritte:
--
-- 1. Dieses Skript in Supabase ausführen:
--    Supabase Dashboard → SQL Editor → New Query → Ausführen
--
-- 2. DATABASE_URL aus Supabase holen:
--    Settings → Database → Connection string (URI mode, port 5432)
--    Für Vercel: Connection Pooler URL (port 6543, Session Mode)
--
-- 3. Drizzle-Migrationen überspringen (Supabase hat das Schema direkt):
--    DATABASE_URL="..." pnpm --filter @workspace/db run generate
--    (nur für zukünftige Drizzle-Diffs)
--
-- 4. ADMIN_API_KEY in Vercel Environment Variables setzen.
-- ============================================================
