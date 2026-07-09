import type { Listing } from "@workspace/api-client-react"

/** Escape all HTML special characters — prevents XSS from listing data. */
function esc(raw: unknown): string {
  return String(raw ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/* ─── Category palettes ───────────────────────────────── */
const palettes: Record<string, { bg: string; accent: string; dark: string; mid: string; light: string; text: string }> = {
  ecommerce: { bg: "#1d4ed8", accent: "#0ea5e9", dark: "#1e3a5f", mid: "#3b82f6", light: "#dbeafe", text: "#eff6ff" },
  saas:      { bg: "#6d28d9", accent: "#8b5cf6", dark: "#2e1065", mid: "#7c3aed", light: "#ede9fe", text: "#f5f3ff" },
  blogs:     { bg: "#b45309", accent: "#f59e0b", dark: "#78350f", mid: "#d97706", light: "#fef3c7", text: "#fffbeb" },
  apps:      { bg: "#065f46", accent: "#10b981", dark: "#022c22", mid: "#059669", light: "#d1fae5", text: "#ecfdf5" },
  crm:       { bg: "#9f1239", accent: "#f43f5e", dark: "#4c0519", mid: "#e11d48", light: "#ffe4e6", text: "#fff1f2" },
  corporate: { bg: "#1e293b", accent: "#0ea5e9", dark: "#0f172a", mid: "#334155", light: "#e2e8f0", text: "#f1f5f9" },
  default:   { bg: "#0f172a", accent: "#14b8a6", dark: "#020617", mid: "#1e293b", light: "#f0fdfa", text: "#f8fafc" },
}

/* ─── Category-specific headline copy ────────────────── */
const categoryHeroCopy: Record<string, { sub: string; heroTag: string; cta: string }> = {
  ecommerce: { sub: "Vollständig eingerichteter Online-Shop — sofort übernahmebereit.", heroTag: "E-COMMERCE WEBSEITE", cta: "Shop übernehmen" },
  saas:      { sub: "SaaS-Plattform mit skalierbarer Architektur und bestehender Nutzerbasis.", heroTag: "SOFTWARE AS A SERVICE", cta: "SaaS erwerben" },
  blogs:     { sub: "Content-Plattform mit aufgebautem SEO und loyaler Leserschaft.", heroTag: "CONTENT & BLOG", cta: "Blog übernehmen" },
  apps:      { sub: "Fertige Web-App mit modernem Tech-Stack und produktionsreifen Features.", heroTag: "WEB APPLICATION", cta: "App erwerben" },
  crm:       { sub: "CRM-Lösung für effizientes Kundenmanagement und Vertriebssteuerung.", heroTag: "CRM / ERP SYSTEM", cta: "CRM übernehmen" },
  corporate: { sub: "Professionelle Corporate-Webseite — bereit für Ihren Markenauftritt.", heroTag: "CORPORATE WEBSITE", cta: "Website erwerben" },
  default:   { sub: "Professionelles digitales Produkt — übergabebereit über SELINOVA-TECH.", heroTag: "DIGITALES PRODUKT", cta: "Jetzt anfragen" },
}

/* ─── Generic FAQ per category ───────────────────────── */
const categoryFAQ: Record<string, Array<{ q: string; a: string }>> = {
  ecommerce: [
    { q: "Sind alle Produkte und Kundendaten inbegriffen?", a: "Ja, die vollständige Produktdatenbank, Kundendaten (DSGVO-konform) und Bestellhistorie werden übergeben." },
    { q: "Welche Zahlungsanbieter sind integriert?", a: "Die integrierten Zahlungsanbieter sind im Tech Stack ersichtlich. Eine Neumeldung auf Ihren Account ist nach Übernahme erforderlich." },
    { q: "Wie läuft die Domain-Übernahme ab?", a: "Der Registrar-Transfer wird über SELINOVA-TECH koordiniert und dauert in der Regel 3–7 Werktage." },
  ],
  saas: [
    { q: "Sind bestehende Nutzer und Abos inbegriffen?", a: "Ja, bestehende Abonnenten werden vollständig übergeben. Die Zahlungsverarbeitungskonten müssen auf den Käufer übertragen werden." },
    { q: "Ist der Quellcode vollständig dokumentiert?", a: "Eine technische Übergabedokumentation und README-Dateien werden mit übergeben. Eine Einführungssitzung ist im Kaufpreis enthalten." },
    { q: "Wie skalierbar ist die Architektur?", a: "Die Architektur ist für Wachstum ausgelegt. Details zur Skalierbarkeit entnehmen Sie bitte dem Tech Stack und der Beschreibung." },
  ],
  blogs: [
    { q: "Wie viele Artikel/Posts sind vorhanden?", a: "Der aktuelle Bestand an Inhalten ist in der Produktbeschreibung angegeben. Alle Inhalte werden vollständig übergeben." },
    { q: "Welche SEO-Rankings bestehen aktuell?", a: "Ein SEO-Report und Google Search Console-Daten werden auf Anfrage vor dem Kauf bereitgestellt." },
    { q: "Sind E-Mail-Abonnenten inbegriffen?", a: "Bestehende Newsletter-Abonnenten werden DSGVO-konform übergeben, sofern entsprechende Einwilligungen vorliegen." },
  ],
  default: [
    { q: "Was ist im Kaufpreis enthalten?", a: "Vollständiger Quellcode, Domain, Hosting-Zugänge, Dokumentation und eine Einführungssitzung sind im Kaufpreis enthalten." },
    { q: "Wie erfolgt die Übergabe?", a: "Die Übergabe erfolgt digital innerhalb von 14 Tagen nach vollständiger Zahlung über das SELINOVA-TECH Treuhandsystem." },
    { q: "Gibt es eine Gewährleistung?", a: "Ja, gemäß österreichischem Recht gilt eine 2-jährige Gewährleistungsfrist ab Übergabe (ABGB §922 ff)." },
  ],
}

/* ─── Testimonials (generic, per category) ────────────── */
const testimonials = [
  { name: "Markus H.", role: "Unternehmer, Wien", text: "Die Übernahme über SELINOVA-TECH war reibungslos. Das Treuhandsystem hat mir das nötige Vertrauen gegeben.", stars: 5 },
  { name: "Sandra B.", role: "Geschäftsführerin, Graz", text: "Hervorragende Qualität des übertragenen Produkts. Dokumentation war vollständig und die Übergabe professionell.", stars: 5 },
  { name: "Thomas K.", role: "Freelancer, Linz", text: "Sehr empfehlenswert. Der Marktplatz ist seriös und die Abwicklung transparent. Gerne wieder.", stars: 5 },
]

/* ─── Main generator ──────────────────────────────────── */
export function generatePreviewHtml(listing: Listing): string {
  const p = palettes[listing.categorySlug] ?? palettes.default
  const copy = categoryHeroCopy[listing.categorySlug] ?? categoryHeroCopy.default
  const faqs = categoryFAQ[listing.categorySlug] ?? categoryFAQ.default

  const features = listing.features ?? []
  const techStack = listing.techStack ?? []
  const desc = listing.description ?? ""

  // Escaped safe values
  const safeTitle     = esc(listing.title)
  const safeNavTitle  = esc(listing.title.split(" ").slice(0, 3).join(" "))
  const safeCategory  = esc(listing.categoryName || listing.categorySlug)
  const safeSubcat    = esc(listing.subcategoryName || listing.subcategorySlug)
  const safeId        = esc(listing.id)

  const priceFormatted = new Intl.NumberFormat("de-AT", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(listing.price)

  const pricePeriodLabel = listing.pricePeriod && listing.pricePeriod !== "once"
    ? ` / ${esc(listing.pricePeriod)}` : ""

  const typeLabel = listing.type === "buy" ? "Zu verkaufen" : "Zu vermieten"

  const paragraphs = desc.split(/\n+/).filter(Boolean)
    .map(para => `<p>${esc(para)}</p>`).join("\n")

  const featureItems = features.map(f => `
    <div class="feature-item">
      <div class="check-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" width="12" height="12"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span>${esc(f)}</span>
    </div>`).join("")

  const techItems = techStack.map(t => `
    <div class="tech-badge">${esc(t)}</div>`).join("")

  const faqItems = faqs.map(({ q, a }) => `
    <div class="faq-item">
      <div class="faq-q">${esc(q)}</div>
      <div class="faq-a">${esc(a)}</div>
    </div>`).join("")

  const testimonialItems = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="stars">${"★".repeat(t.stars)}</div>
      <p class="testimonial-text">"${esc(t.text)}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${esc(t.name.charAt(0))}</div>
        <div>
          <div class="author-name">${esc(t.name)}</div>
          <div class="author-role">${esc(t.role)}</div>
        </div>
      </div>
    </div>`).join("")

  const statsRow = `
    <div class="stat"><span class="stat-num">${esc(listing.views)}+</span><span class="stat-label">Interessenten</span></div>
    <div class="stat"><span class="stat-num">${features.length}</span><span class="stat-label">Features inbegriffen</span></div>
    <div class="stat"><span class="stat-num">${techStack.length}</span><span class="stat-label">Technologien</span></div>
    <div class="stat"><span class="stat-num">100%</span><span class="stat-label">Übergabebereit</span></div>
  `

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${safeTitle} — SELINOVA-TECH Vorschau</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: ${p.bg};
      --accent: ${p.accent};
      --dark: ${p.dark};
      --mid: ${p.mid};
      --light: ${p.light};
      --text: ${p.text};
    }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #0f172a; }
    a { color: inherit; text-decoration: none; }

    /* ── Navbar ── */
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(15,23,42,0.95); backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 0 40px; height: 64px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .navbar-brand { display: flex; align-items: center; gap: 10px; }
    .navbar-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); display: inline-block; }
    .navbar-name { font-weight: 800; font-size: 17px; color: #fff; letter-spacing: -.4px; }
    .navbar-links { display: flex; gap: 28px; }
    .navbar-links a { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.65); transition: color .2s; }
    .navbar-links a:hover { color: #fff; }
    .navbar-cta {
      background: var(--accent); color: #fff; padding: 8px 20px;
      border-radius: 8px; font-size: 13px; font-weight: 700; border: none; cursor: pointer;
    }

    /* ── Hero ── */
    .hero {
      background: linear-gradient(135deg, var(--dark) 0%, var(--bg) 60%, var(--accent) 100%);
      padding: 100px 40px 80px;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0, rgba(255,255,255,.03) 1px, transparent 0, transparent 50%);
      background-size: 24px 24px;
    }
    .hero-orb1 { position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; border-radius: 50%; background: var(--accent); opacity: .08; }
    .hero-orb2 { position: absolute; bottom: -80px; left: -80px; width: 350px; height: 350px; border-radius: 50%; background: var(--bg); opacity: .15; }
    .hero-inner { position: relative; max-width: 860px; margin: 0 auto; text-align: center; }
    .hero-tag {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,.12); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,.2); padding: 6px 18px;
      border-radius: 100px; margin-bottom: 28px;
    }
    .hero-tag span { font-size: 11px; font-weight: 700; letter-spacing: .12em; color: #fff; text-transform: uppercase; }
    .hero-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    .hero h1 { color: #fff; font-size: clamp(34px,5vw,60px); font-weight: 900; line-height: 1.08; letter-spacing: -.04em; margin-bottom: 24px; }
    .hero-sub { color: rgba(255,255,255,.78); font-size: 18px; line-height: 1.65; margin: 0 auto 44px; max-width: 600px; }
    .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      background: #fff; color: var(--bg);
      padding: 14px 36px; border-radius: 10px;
      font-size: 15px; font-weight: 800; border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(0,0,0,.25);
    }
    .btn-secondary {
      background: transparent; color: #fff;
      border: 1.5px solid rgba(255,255,255,.4);
      padding: 14px 30px; border-radius: 10px;
      font-size: 15px; font-weight: 600; cursor: pointer;
    }
    .hero-price-badge {
      display: inline-flex; align-items: baseline; gap: 4px;
      background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15);
      border-radius: 12px; padding: 10px 20px; margin-top: 28px;
    }
    .hero-price-label { font-size: 12px; color: rgba(255,255,255,.6); font-weight: 600; }
    .hero-price-num { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -.02em; }
    .hero-price-period { font-size: 13px; color: rgba(255,255,255,.5); }

    /* ── Stats strip ── */
    .stats-strip {
      background: #fff; border-bottom: 1px solid #e2e8f0;
      display: grid; grid-template-columns: repeat(4, 1fr);
    }
    .stat { padding: 28px 24px; text-align: center; border-right: 1px solid #e2e8f0; }
    .stat:last-child { border-right: none; }
    .stat-num { display: block; font-size: 30px; font-weight: 900; color: var(--bg); line-height: 1; }
    .stat-label { font-size: 12px; color: #64748b; font-weight: 500; margin-top: 6px; display: block; }

    /* ── Section layout ── */
    .section { padding: 88px 40px; }
    .section-inner { max-width: 960px; margin: 0 auto; }
    .section-alt { background: #f8fafc; }
    .section-dark { background: var(--dark); }
    .label { font-size: 11px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
    h2.section-title { font-size: clamp(26px,3.5vw,40px); font-weight: 900; color: #0f172a; line-height: 1.15; letter-spacing: -.03em; margin-bottom: 16px; }
    h2.section-title-light { color: #fff; }
    .section-sub { font-size: 16px; color: #64748b; line-height: 1.65; margin-bottom: 52px; max-width: 620px; }

    /* ── Description ── */
    .desc-grid { display: grid; grid-template-columns: 1fr 320px; gap: 60px; align-items: start; }
    .desc-text p { font-size: 16px; color: #475569; line-height: 1.75; margin-bottom: 18px; }
    .info-card {
      background: var(--light); border: 1px solid ${p.accent}30;
      border-radius: 16px; padding: 28px;
    }
    .info-card h3 { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 20px; }
    .info-row { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid rgba(0,0,0,.06); font-size: 13px; }
    .info-row:last-child { border-bottom: none; }
    .info-key { color: #64748b; font-weight: 500; }
    .info-val { font-weight: 700; color: var(--bg); text-align: right; }

    /* ── Features ── */
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
    .feature-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 18px; background: #fff; border-radius: 12px;
      border: 1px solid #e2e8f0; transition: border-color .2s, box-shadow .2s;
    }
    .feature-item:hover { border-color: var(--accent); box-shadow: 0 4px 16px rgba(0,0,0,.06); }
    .check-icon {
      width: 24px; height: 24px; border-radius: 50%;
      background: var(--accent); display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
    }
    .feature-item span { font-size: 14px; font-weight: 500; color: #374151; line-height: 1.5; }

    /* ── Tech Stack ── */
    .tech-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
    .tech-badge {
      padding: 8px 18px; background: var(--light);
      border: 1px solid ${p.accent}40; border-radius: 8px;
      font-size: 13px; font-weight: 700; font-family: monospace; color: var(--bg);
      transition: background .2s;
    }
    .tech-badge:hover { background: ${p.accent}20; }
    .tech-note { margin-top: 18px; font-size: 12px; color: #94a3b8; }

    /* ── Testimonials ── */
    .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .testimonial-card {
      background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
      border-radius: 16px; padding: 28px;
    }
    .stars { color: #fbbf24; font-size: 16px; letter-spacing: 2px; margin-bottom: 14px; }
    .testimonial-text { font-size: 14px; color: rgba(255,255,255,.8); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
    .testimonial-author { display: flex; align-items: center; gap: 12px; }
    .author-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0; }
    .author-name { font-size: 13px; font-weight: 700; color: #fff; }
    .author-role { font-size: 11px; color: rgba(255,255,255,.5); }

    /* ── FAQ ── */
    .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .faq-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 22px; }
    .faq-q { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
    .faq-a { font-size: 13px; color: #64748b; line-height: 1.6; }

    /* ── CTA section ── */
    .cta-section {
      background: linear-gradient(135deg, var(--dark) 0%, var(--bg) 100%);
      padding: 88px 40px; text-align: center; position: relative; overflow: hidden;
    }
    .cta-section::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 50%, var(--accent) 0%, transparent 70%);
      opacity: .12;
    }
    .cta-inner { position: relative; max-width: 640px; margin: 0 auto; }
    .cta-inner h2 { color: #fff; font-size: 38px; font-weight: 900; line-height: 1.15; margin-bottom: 16px; }
    .cta-inner p { color: rgba(255,255,255,.75); font-size: 17px; margin-bottom: 36px; line-height: 1.6; }
    .cta-price-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 28px; }
    .cta-price { font-size: 44px; font-weight: 900; color: #fff; }
    .cta-period { font-size: 16px; color: rgba(255,255,255,.5); align-self: flex-end; margin-bottom: 6px; }
    .trust-row { display: flex; gap: 20px; justify-content: center; margin-top: 28px; flex-wrap: wrap; }
    .trust-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: rgba(255,255,255,.6); }
    .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; }

    /* ── Footer ── */
    .footer { background: #020617; padding: 40px; text-align: center; }
    .footer-logo { font-size: 18px; font-weight: 800; color: var(--accent); letter-spacing: -.02em; margin-bottom: 14px; }
    .footer-links { display: flex; gap: 24px; justify-content: center; margin-bottom: 20px; }
    .footer-links a { font-size: 12px; color: rgba(255,255,255,.4); transition: color .2s; }
    .footer-links a:hover { color: #fff; }
    .footer-copy { font-size: 12px; color: rgba(255,255,255,.25); }
    .footer-ref { margin-top: 8px; font-size: 11px; color: rgba(255,255,255,.15); }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .navbar { padding: 0 20px; }
      .navbar-links { display: none; }
      .hero { padding: 70px 20px 60px; }
      .stats-strip { grid-template-columns: repeat(2, 1fr); }
      .section { padding: 60px 20px; }
      .desc-grid { grid-template-columns: 1fr; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .faq-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<!-- ██ NAVBAR ███████████████████████████████████████████ -->
<nav class="navbar">
  <div class="navbar-brand">
    <span class="navbar-dot"></span>
    <span class="navbar-name">${safeNavTitle}</span>
  </div>
  <div class="navbar-links">
    <a href="#about">Über das Produkt</a>
    <a href="#features">Features</a>
    ${techStack.length > 0 ? '<a href="#tech">Technologie</a>' : ''}
    <a href="#testimonials">Referenzen</a>
    <a href="#faq">FAQ</a>
    <a href="#cta">Kontakt</a>
  </div>
  <button class="navbar-cta" onclick="document.getElementById('cta').scrollIntoView({behavior:'smooth'})">${esc(copy.cta)}</button>
</nav>

<!-- ██ HERO ██████████████████████████████████████████████ -->
<section class="hero">
  <div class="hero-orb1"></div>
  <div class="hero-orb2"></div>
  <div class="hero-inner">
    <div class="hero-tag">
      <span class="hero-dot"></span>
      <span>${esc(copy.heroTag)} · ${safeCategory}</span>
    </div>
    <h1>${safeTitle}</h1>
    <p class="hero-sub">${esc(copy.sub)}</p>
    <div class="hero-btns">
      <button class="btn-primary" onclick="document.getElementById('cta').scrollIntoView({behavior:'smooth'})">${esc(copy.cta)} →</button>
      <button class="btn-secondary" onclick="document.getElementById('about').scrollIntoView({behavior:'smooth'})">Mehr erfahren</button>
    </div>
    <div>
      <div class="hero-price-badge">
        <span class="hero-price-label">${esc(typeLabel)} ·</span>
        <span class="hero-price-num">${esc(priceFormatted)}</span>
        ${pricePeriodLabel ? `<span class="hero-price-period">${esc(pricePeriodLabel)}</span>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- ██ STATS ██████████████████████████████████████████████ -->
<div class="stats-strip">${statsRow}</div>

<!-- ██ ABOUT / DESCRIPTION ███████████████████████████████ -->
<section class="section" id="about">
  <div class="section-inner">
    <div class="label">Über dieses Angebot</div>
    <h2 class="section-title">Was Sie erwerben</h2>
    <div class="desc-grid">
      <div class="desc-text">
        ${paragraphs || `<p>${safeTitle} – ein professionelles digitales Produkt auf dem SELINOVA-TECH Marktplatz.</p>`}
      </div>
      <div class="info-card">
        <h3>Schnellübersicht</h3>
        <div class="info-row"><span class="info-key">Typ</span><span class="info-val" style="color:${listing.type === "buy" ? "#059669" : "#0891b2"}">${esc(typeLabel)}</span></div>
        <div class="info-row"><span class="info-key">Kategorie</span><span class="info-val">${safeCategory}</span></div>
        <div class="info-row"><span class="info-key">Subkategorie</span><span class="info-val">${safeSubcat}</span></div>
        <div class="info-row"><span class="info-key">Features</span><span class="info-val">${features.length} inbegriffen</span></div>
        <div class="info-row"><span class="info-key">Technologien</span><span class="info-val">${techStack.length} Stack-Layer</span></div>
        <div class="info-row"><span class="info-key">Übergabe</span><span class="info-val">Digital · sofort</span></div>
        <div class="info-row"><span class="info-key">Abwicklung</span><span class="info-val">SELINOVA-TECH Treuhand</span></div>
        <div class="info-row"><span class="info-key">Ref.-Nr.</span><span class="info-val" style="font-family:monospace">#${safeId}</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ██ FEATURES ███████████████████████████████████████████ -->
${features.length > 0 ? `
<section class="section section-alt" id="features">
  <div class="section-inner">
    <div class="label">Leistungsumfang</div>
    <h2 class="section-title">Was ist alles enthalten?</h2>
    <p class="section-sub">Alle nachfolgenden Features und Leistungen sind im Kaufpreis / Mietpreis vollständig inbegriffen und werden bei Übergabe aktiv bereitgestellt.</p>
    <div class="features-grid">${featureItems}</div>
  </div>
</section>` : ""}

<!-- ██ TESTIMONIALS ███████████████████████████████████████ -->
<section class="section section-dark" id="testimonials">
  <div class="section-inner">
    <div class="label" style="color:${p.accent}">Kundenstimmen</div>
    <h2 class="section-title section-title-light">Was Käufer über SELINOVA-TECH sagen</h2>
    <p class="section-sub" style="color:rgba(255,255,255,0.6)">Geprüfte Bewertungen von Käufern und Mietern auf dem SELINOVA-TECH Marktplatz.</p>
    <div class="testimonials-grid">${testimonialItems}</div>
  </div>
</section>

<!-- ██ TECH STACK ██████████████████████████████████████████ -->
${techStack.length > 0 ? `
<section class="section" id="tech">
  <div class="section-inner">
    <div class="label">Technologie</div>
    <h2 class="section-title">Tech Stack</h2>
    <p class="section-sub">Vollständiger Quellcode, alle Konfigurationsdateien und Abhängigkeiten werden nach Vertragsabschluss vollständig übergeben.</p>
    <div class="tech-wrap">${techItems}</div>
    <p class="tech-note">Alle verwendeten Drittanbieter-Lizenzen werden im Übergabeprotokoll vollständig aufgelistet.</p>
  </div>
</section>` : ""}

<!-- ██ FAQ ████████████████████████████████████████████████ -->
<section class="section section-alt" id="faq">
  <div class="section-inner">
    <div class="label">Häufige Fragen</div>
    <h2 class="section-title">FAQ</h2>
    <div class="faq-grid">${faqItems}</div>
  </div>
</section>

<!-- ██ CTA ████████████████████████████████████████████████ -->
<section class="cta-section" id="cta">
  <div class="cta-inner">
    <div class="label" style="color:${p.accent}">Jetzt anfragen</div>
    <h2>Bereit für den nächsten Schritt?</h2>
    <p>Alle Transaktionen laufen über das sichere SELINOVA-TECH Treuhandsystem. Vollständige Übergabe garantiert.</p>
    <div class="cta-price-row">
      <span class="cta-price">${esc(priceFormatted)}</span>
      ${pricePeriodLabel ? `<span class="cta-period">${esc(pricePeriodLabel)}</span>` : ''}
    </div>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <button class="btn-primary" style="font-size:16px;padding:16px 44px" onclick="window.open('https://www.selinova-tech.at/listing/${safeId}','_blank')">
        Anfrage auf SELINOVA-TECH →
      </button>
    </div>
    <div class="trust-row">
      <div class="trust-item"><span class="trust-dot"></span>Treuhand-Abwicklung</div>
      <div class="trust-item"><span class="trust-dot"></span>Verifizierter Verkäufer</div>
      <div class="trust-item"><span class="trust-dot"></span>DSGVO-konform</div>
      <div class="trust-item"><span class="trust-dot"></span>2 Jahre Gewährleistung</div>
    </div>
  </div>
</section>

<!-- ██ FOOTER █████████████████████████████████████████████ -->
<footer class="footer">
  <div class="footer-logo">SELINOVA-TECH</div>
  <div class="footer-links">
    <a href="https://www.selinova-tech.at">Marktplatz</a>
    <a href="https://www.selinova-tech.at/impressum">Impressum</a>
    <a href="https://www.selinova-tech.at/datenschutz">Datenschutz</a>
    <a href="https://www.selinova-tech.at/agb">AGB</a>
    <a href="https://www.selinova-tech.at/rechtliches">Rechtliches</a>
  </div>
  <p class="footer-copy">© ${new Date().getFullYear()} SELINOVA-TECH · Wien, Österreich · Österreichs Marktplatz für professionelle Webseiten</p>
  <p class="footer-ref">Ref.-Nr. #${safeId} · Diese Vorschau wurde generiert durch SELINOVA-TECH</p>
</footer>

</body>
</html>`
}
