import React from "react"
import type { Listing } from "@workspace/api-client-react"

interface Props {
  listing: Listing
  className?: string
}

/* ─── Palette per category ───────────────────────────── */
const palettes: Record<string, { bg: string; accent: string; dark: string; mid: string; light: string; text: string }> = {
  ecommerce: { bg: "#1d4ed8", accent: "#0ea5e9", dark: "#1e3a5f", mid: "#3b82f6", light: "#dbeafe", text: "#eff6ff" },
  saas:      { bg: "#6d28d9", accent: "#8b5cf6", dark: "#2e1065", mid: "#7c3aed", light: "#ede9fe", text: "#f5f3ff" },
  blogs:     { bg: "#b45309", accent: "#f59e0b", dark: "#78350f", mid: "#d97706", light: "#fef3c7", text: "#fffbeb" },
  apps:      { bg: "#065f46", accent: "#10b981", dark: "#022c22", mid: "#059669", light: "#d1fae5", text: "#ecfdf5" },
  crm:       { bg: "#9f1239", accent: "#f43f5e", dark: "#4c0519", mid: "#e11d48", light: "#ffe4e6", text: "#fff1f2" },
  corporate: { bg: "#1e293b", accent: "#0ea5e9", dark: "#0f172a", mid: "#334155", light: "#e2e8f0", text: "#f1f5f9" },
  landing:   { bg: "#0f172a", accent: "#06b6d4", dark: "#020617", mid: "#1e293b", light: "#e0f2fe", text: "#f0f9ff" },
  default:   { bg: "#1e293b", accent: "#14b8a6", dark: "#0f172a", mid: "#334155", light: "#f1f5f9", text: "#f8fafc" },
}

function getPalette(categorySlug: string) {
  return palettes[categorySlug] ?? palettes.default
}

/* ─── Shared browser chrome ──────────────────────────── */
function BrowserChrome({ p }: { p: ReturnType<typeof getPalette> }) {
  return (
    <>
      {/* Title bar */}
      <rect x="0" y="0" width="800" height="24" fill="#1e293b" />
      <circle cx="14" cy="12" r="4" fill="#ef4444" />
      <circle cx="26" cy="12" r="4" fill="#f59e0b" />
      <circle cx="38" cy="12" r="4" fill="#22c55e" />
      {/* URL bar */}
      <rect x="56" y="5" width="520" height="14" rx="7" fill="#334155" />
      <text x="316" y="15" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="system-ui,sans-serif">
        selinova-tech.at · Vorschau
      </text>
    </>
  )
}

/* ══ E-COMMERCE ══════════════════════════════════════════ */
function EcommerceThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const title = listing.title.split(" ").slice(0, 4).join(" ")
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill="#f8fafc" />
      <BrowserChrome p={p} />
      {/* Navbar */}
      <rect x="0" y="24" width="800" height="32" fill="white" />
      <rect x="12" y="32" width="60" height="10" rx="2" fill={p.bg} />
      <rect x="280" y="34" width="40" height="6" rx="3" fill="#cbd5e1" />
      <rect x="330" y="34" width="40" height="6" rx="3" fill="#cbd5e1" />
      <rect x="380" y="34" width="40" height="6" rx="3" fill="#cbd5e1" />
      <rect x="720" y="30" width="60" height="14" rx="4" fill={p.bg} />
      {/* Hero */}
      <rect x="0" y="56" width="800" height="100" fill={`url(#eg${listing.id})`} />
      <defs>
        <linearGradient id={`eg${listing.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.accent} />
        </linearGradient>
      </defs>
      <text x="50" y="94" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui,sans-serif">{title}</text>
      <text x="50" y="110" fill="rgba(255,255,255,0.75)" fontSize="8" fontFamily="system-ui,sans-serif">Professioneller Online-Shop · Vollständig eingerichtet</text>
      <rect x="50" y="120" width="80" height="20" rx="5" fill="white" />
      <text x="90" y="133" textAnchor="middle" fill={p.bg} fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Jetzt kaufen</text>
      {/* Product cards row */}
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${30 + i * 186}, 166)`}>
          <rect width="168" height="90" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="0" y="0" width="168" height="52" rx="6" fill={p.light} />
          <rect x="60" y="12" width="48" height="30" rx="3" fill={p.mid} opacity="0.3" />
          <rect x="10" y="62" width="80" height="6" rx="3" fill="#94a3b8" />
          <text x="10" y="80" fill={p.bg} fontSize="10" fontWeight="800" fontFamily="system-ui,sans-serif">€ {(89 + i * 23)},99</text>
          <rect x="128" y="68" width="30" height="14" rx="3" fill={p.bg} />
        </g>
      ))}
      {/* Footer */}
      <rect x="0" y="316" width="800" height="34" fill={p.dark} />
      <rect x="30" y="326" width="120" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="400" y="326" width="60" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="470" y="326" width="60" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
    </svg>
  )
}

/* ══ SAAS / DASHBOARD ════════════════════════════════════ */
function SaasThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const bars = [60, 80, 45, 95, 70, 55, 88, 40, 72, 65]
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill="#f1f5f9" />
      <BrowserChrome p={p} />
      {/* Sidebar */}
      <rect x="0" y="24" width="140" height="326" fill={p.dark} />
      <rect x="14" y="36" width="70" height="10" rx="2" fill={p.accent} />
      {[52, 72, 92, 112, 132].map((y, i) => (
        <g key={i}>
          <rect x="14" y={y} width={i === 0 ? 112 : 90} height="14" rx="3" fill={i === 0 ? p.accent + "40" : "transparent"} />
          <rect x="22" y={y + 4} width="8" height="8" rx="2" fill={i === 0 ? p.accent : "rgba(255,255,255,0.25)"} />
          <rect x="36" y={y + 5} width={40 + (i % 3) * 10} height="4" rx="2" fill="rgba(255,255,255,0.25)" />
        </g>
      ))}
      {/* Main area */}
      <rect x="140" y="24" width="660" height="326" fill="#f8fafc" />
      {/* Stats row */}
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${154 + i * 162}, 34)`}>
          <rect width="148" height="56" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="12" y="12" width="18" height="18" rx="4" fill={p.light} />
          <rect x="38" y="14" width="60" height="5" rx="2" fill="#cbd5e1" />
          <text x="38" y="36" fill={p.bg} fontSize="14" fontWeight="800" fontFamily="system-ui,sans-serif">
            {["€ 8.4k", "1,234", "94.2%", "48"][i]}
          </text>
          <text x="38" y="46" fill="#94a3b8" fontSize="6" fontFamily="system-ui,sans-serif">
            {["Umsatz (Monat)", "Aktive Nutzer", "Uptime", "NPS Score"][i]}
          </text>
        </g>
      ))}
      {/* Bar chart */}
      <rect x="154" y="104" width="420" height="160" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x="168" y="122" fill="#475569" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">Umsatz — letzte 10 Monate</text>
      {bars.map((h, i) => (
        <g key={i}>
          <rect x={170 + i * 36} y={240 - h * 1.1} width="22" height={h * 1.1} rx="3"
            fill={i === bars.indexOf(Math.max(...bars)) ? p.accent : p.mid} opacity="0.85" />
        </g>
      ))}
      {/* Table */}
      <rect x="586" y="104" width="210" height="160" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="586" y="104" width="210" height="22" rx="8" fill={p.light} />
      <text x="598" y="118" fill={p.bg} fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Letzte Transaktionen</text>
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x="598" y={134 + i * 20} width="30" height="6" rx="2" fill="#cbd5e1" />
          <rect x="660" y={134 + i * 20} width="50" height="6" rx="2" fill="#e2e8f0" />
          <rect x="738" y={132 + i * 20} width="40" height="10" rx="5"
            fill={i % 3 === 0 ? "#dcfce7" : i % 3 === 1 ? "#fef3c7" : "#fee2e2"} />
        </g>
      ))}
    </svg>
  )
}

/* ══ BLOG / CONTENT ══════════════════════════════════════ */
function BlogThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const title = listing.title.split(" ").slice(0, 5).join(" ")
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill="#fafaf9" />
      <BrowserChrome p={p} />
      {/* Navbar */}
      <rect x="0" y="24" width="800" height="30" fill="white" />
      <rect x="20" y="31" width="80" height="10" rx="2" fill={p.bg} />
      {["Blog", "Themen", "Über uns", "Newsletter"].map((label, i) => (
        <text key={label} x={140 + i * 80} y="41" fill="#64748b" fontSize="8" fontFamily="system-ui,sans-serif">{label}</text>
      ))}
      {/* Featured article hero */}
      <rect x="0" y="54" width="800" height="120" fill={p.bg} />
      <rect x="0" y="54" width="800" height="120" fill={`url(#bg${listing.id})`} opacity="0.4" />
      <defs>
        <linearGradient id={`bg${listing.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
        </linearGradient>
      </defs>
      <rect x="20" y="64" width="50" height="12" rx="6" fill={p.accent} />
      <text x="45" y="73" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="system-ui,sans-serif">FEATURED</text>
      <text x="20" y="100" fill="white" fontSize="14" fontWeight="800" fontFamily="system-ui,sans-serif">{title}</text>
      <rect x="20" y="108" width="240" height="5" rx="2" fill="rgba(255,255,255,0.5)" />
      <rect x="20" y="118" width="180" height="5" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="20" y="132" width="30" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
      <text x="35" y="138" textAnchor="middle" fill="white" fontSize="6" fontFamily="system-ui,sans-serif">5 min</text>
      {/* Article cards */}
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${20 + i * 260}, 186)`}>
          <rect width="242" height="110" rx="8" fill="white" stroke="#e7e5e4" strokeWidth="1" />
          <rect x="0" y="0" width="242" height="52" rx="8" fill={p.light} />
          <rect x="10" y="58" width="50" height="8" rx="4" fill={p.light} />
          <rect x="10" y="74" width="200" height="6" rx="2" fill="#d6d3d1" />
          <rect x="10" y="84" width="160" height="6" rx="2" fill="#e7e5e4" />
          <rect x="10" y="96" width="80" height="5" rx="2" fill="#a8a29e" />
        </g>
      ))}
    </svg>
  )
}

/* ══ CORPORATE / AGENCY ══════════════════════════════════ */
function CorporateThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const title = listing.title.split(" ").slice(0, 4).join(" ")
  const services = (listing.features ?? ["Webdesign", "Development", "SEO", "Support"]).slice(0, 4)
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill="white" />
      <BrowserChrome p={p} />
      {/* Navbar */}
      <rect x="0" y="24" width="800" height="30" fill={p.dark} />
      <rect x="20" y="30" width="70" height="12" rx="2" fill="white" opacity="0.9" />
      {["Leistungen", "Referenzen", "Team", "Kontakt"].map((l, i) => (
        <text key={l} x={180 + i * 100} y="42" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="system-ui,sans-serif">{l}</text>
      ))}
      <rect x="680" y="28" width="80" height="16" rx="4" fill={p.accent} />
      <text x="720" y="39" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">Anfrage senden</text>
      {/* Hero */}
      <rect x="0" y="54" width="800" height="130" fill={p.dark} />
      <circle cx="600" cy="120" r="80" fill={p.accent} opacity="0.08" />
      <circle cx="700" cy="80" r="50" fill={p.mid} opacity="0.07" />
      <text x="50" y="96" fill="white" fontSize="18" fontWeight="900" fontFamily="system-ui,sans-serif">{title}</text>
      <rect x="50" y="104" width="280" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="50" y="114" width="220" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="50" y="128" width="100" height="20" rx="5" fill={p.accent} />
      <text x="100" y="141" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Mehr erfahren</text>
      <rect x="160" y="128" width="100" height="20" rx="5" fill="transparent" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <text x="210" y="141" textAnchor="middle" fill="white" fontSize="8" fontFamily="system-ui,sans-serif">Portfolio</text>
      {/* Stats */}
      <rect x="0" y="184" width="800" height="36" fill={p.accent} />
      {[["150+", "Projekte"], ["12", "Jahre Erfahrung"], ["98%", "Zufriedenheit"], ["24/7", "Support"]].map(([v, l], i) => (
        <g key={i}>
          <text x={100 + i * 200} y="199" textAnchor="middle" fill="white" fontSize="12" fontWeight="900" fontFamily="system-ui,sans-serif">{v}</text>
          <text x={100 + i * 200} y="212" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="system-ui,sans-serif">{l}</text>
        </g>
      ))}
      {/* Service cards */}
      {services.map((svc, i) => (
        <g key={i} transform={`translate(${20 + i * 192}, 230)`}>
          <rect width="174" height="80" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="12" y="12" width="24" height="24" rx="6" fill={p.light} />
          <rect x="44" y="14" width="90" height="7" rx="3" fill={p.bg} opacity="0.6" />
          <rect x="12" y="44" width="150" height="5" rx="2" fill="#e2e8f0" />
          <rect x="12" y="54" width="120" height="5" rx="2" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  )
}

/* ══ CRM / ERP ════════════════════════════════════════════ */
function CrmThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const statuses = ["Aktiv", "Offen", "Abg.", "Aktiv", "Offen", "Abg.", "Aktiv"]
  const colors = { "Aktiv": "#dcfce7", "Offen": "#fef3c7", "Abg.": "#fee2e2" }
  const textColors = { "Aktiv": "#15803d", "Offen": "#92400e", "Abg.": "#b91c1c" }
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill="#f8fafc" />
      <BrowserChrome p={p} />
      {/* Sidebar */}
      <rect x="0" y="24" width="160" height="326" fill={p.dark} />
      <rect x="10" y="34" width="80" height="12" rx="2" fill="white" opacity="0.9" />
      {["Dashboard", "Kontakte", "Deals", "Aufgaben", "Berichte", "Einstellungen"].map((l, i) => (
        <g key={l}>
          <rect x="10" y={58 + i * 30} width="140" height="22" rx="4" fill={i === 0 ? p.accent + "30" : "transparent"} />
          <rect x="18" y={64 + i * 30} width="10" height="10" rx="2" fill={i === 0 ? p.accent : "rgba(255,255,255,0.3)"} />
          <text x="36" y={73 + i * 30} fill={i === 0 ? "white" : "rgba(255,255,255,0.6)"} fontSize="8" fontFamily="system-ui,sans-serif">{l}</text>
        </g>
      ))}
      {/* Main content */}
      <rect x="160" y="24" width="640" height="326" fill="#f8fafc" />
      {/* KPI row */}
      {[["142", "Kontakte"], ["28", "Offene Deals"], ["€ 84k", "Pipeline"], ["73%", "Abschlussrate"]].map(([v, l], i) => (
        <g key={l} transform={`translate(${172 + i * 156}, 34)`}>
          <rect width="140" height="50" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <text x="14" y="24" fill={p.bg} fontSize="16" fontWeight="800" fontFamily="system-ui,sans-serif">{v}</text>
          <text x="14" y="38" fill="#94a3b8" fontSize="7" fontFamily="system-ui,sans-serif">{l}</text>
        </g>
      ))}
      {/* Table */}
      <rect x="172" y="96" width="616" height="220" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="172" y="96" width="616" height="24" rx="8" fill={p.light} />
      {["Kontakt", "Unternehmen", "Status", "Wert", "Zuletzt"].map((h, i) => (
        <text key={h} x={188 + [0,150,300,390,480][i]} y="112" fill={p.bg} fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">{h}</text>
      ))}
      {statuses.map((status, i) => (
        <g key={i}>
          <rect x="172" y={120 + i * 26} width="616" height="26" fill={i % 2 === 0 ? "#f8fafc" : "white"} />
          <circle cx="198" cy={133 + i * 26} r="8" fill={p.light} />
          <rect x="214" y={128 + i * 26} width="80" height="6" rx="2" fill="#94a3b8" />
          <rect x="364" y={128 + i * 26} width="70" height="6" rx="2" fill="#cbd5e1" />
          <rect x={390} y={126 + i * 26} width="44" height="12" rx="6"
            fill={colors[status as keyof typeof colors]} />
          <text x={412} y={135 + i * 26} textAnchor="middle"
            fill={textColors[status as keyof typeof textColors]}
            fontSize="7" fontWeight="600" fontFamily="system-ui,sans-serif">{status}</text>
          <rect x="500" y={128 + i * 26} width="60" height="6" rx="2" fill={p.mid} opacity="0.5" />
          <rect x="590" y={128 + i * 26} width="80" height="6" rx="2" fill="#e2e8f0" />
        </g>
      ))}
    </svg>
  )
}

/* ══ APPS / WEB APP ══════════════════════════════════════ */
function AppThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const title = listing.title.split(" ").slice(0, 3).join(" ")
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill={p.dark} />
      <BrowserChrome p={p} />
      {/* Hero gradient */}
      <rect x="0" y="24" width="800" height="326" fill={`url(#ag${listing.id})`} />
      <defs>
        <linearGradient id={`ag${listing.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.dark} />
          <stop offset="100%" stopColor={p.bg} />
        </linearGradient>
      </defs>
      {/* Left: App description */}
      <text x="50" y="80" fill="white" fontSize="20" fontWeight="900" fontFamily="system-ui,sans-serif">{title}</text>
      <rect x="50" y="90" width="240" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="50" y="102" width="200" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="50" y="122" width="100" height="22" rx="6" fill={p.accent} />
      <text x="100" y="136" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">App starten</text>
      {/* Feature list */}
      {(listing.features ?? ["Dashboard", "Analytics", "Reports", "Settings"]).slice(0, 4).map((f, i) => (
        <g key={i} transform={`translate(50, ${160 + i * 26})`}>
          <circle cx="6" cy="6" r="6" fill={p.accent} opacity="0.3" />
          <circle cx="6" cy="6" r="3" fill={p.accent} />
          <text x="18" y="10" fill="rgba(255,255,255,0.85)" fontSize="8" fontFamily="system-ui,sans-serif">{f.length > 30 ? f.substring(0, 30) + "…" : f}</text>
        </g>
      ))}
      {/* Right: App mockup card */}
      <rect x="360" y="40" width="400" height="285" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="380" y="58" width="360" height="40" rx="8" fill="rgba(255,255,255,0.08)" />
      <circle cx="400" cy="78" r="12" fill={p.accent} opacity="0.4" />
      <rect x="418" y="68" width="100" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="418" y="80" width="70" height="5" rx="2" fill="rgba(255,255,255,0.2)" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={380 + i * 92} y="114" width="80" height="60" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <text x={420 + i * 92} y="145" textAnchor="middle" fill={p.accent} fontSize="14" fontWeight="800" fontFamily="system-ui,sans-serif">
            {["98%", "142", "4.8", "24h"][i]}
          </text>
          <rect x={396 + i * 92} y="152" width="48" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        </g>
      ))}
      <rect x="380" y="194" width="360" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="380" y="206" width="300" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="380" y="220" width="200" height="28" rx="6" fill={p.accent} />
      <text x="480" y="237" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Kostenlos testen</text>
    </svg>
  )
}

/* ══ LANDING PAGE / DEFAULT ══════════════════════════════ */
function LandingThumbnail({ p, listing }: { p: ReturnType<typeof getPalette>; listing: Listing }) {
  const title = listing.title.split(" ").slice(0, 4).join(" ")
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="350" fill="#0f172a" />
      <BrowserChrome p={p} />
      <defs>
        <radialGradient id={`lg${listing.id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="24" width="800" height="326" fill={`url(#lg${listing.id})`} />
      {/* Navbar */}
      <rect x="0" y="24" width="800" height="30" fill="rgba(15,23,42,0.8)" />
      <rect x="20" y="30" width="70" height="12" rx="2" fill={p.accent} opacity="0.8" />
      {["Produkt", "Features", "Preise", "Kontakt"].map((l, i) => (
        <text key={l} x={160 + i * 90} y="42" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="system-ui,sans-serif">{l}</text>
      ))}
      <rect x="700" y="28" width="70" height="16" rx="4" fill={p.accent} />
      <text x="735" y="39" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">Starten</text>
      {/* Center hero */}
      <rect x="200" y="62" width="180" height="14" rx="7" fill={p.accent} opacity="0.2" />
      <text x="290" y="73" textAnchor="middle" fill={p.accent} fontSize="7" fontWeight="700" fontFamily="system-ui,sans-serif">SELINOVA-TECH MARKTPLATZ</text>
      <text x="400" y="108" textAnchor="middle" fill="white" fontSize="22" fontWeight="900" fontFamily="system-ui,sans-serif">{title}</text>
      <rect x="160" y="118" width="480" height="7" rx="3" fill="rgba(255,255,255,0.2)" />
      <rect x="200" y="130" width="400" height="7" rx="3" fill="rgba(255,255,255,0.15)" />
      {/* CTA buttons */}
      <rect x="280" y="150" width="120" height="24" rx="6" fill={p.accent} />
      <text x="340" y="165" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui,sans-serif">Jetzt anfragen</text>
      <rect x="412" y="150" width="110" height="24" rx="6" fill="transparent" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="467" y="165" textAnchor="middle" fill="white" fontSize="8" fontFamily="system-ui,sans-serif">Vorschau</text>
      {/* Social proof logos strip */}
      <rect x="0" y="190" width="800" height="28" fill="rgba(255,255,255,0.04)" />
      {["Stripe", "AWS", "Google", "Shopify", "Vercel"].map((b, i) => (
        <text key={b} x={100 + i * 140} y="208" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="700" fontFamily="system-ui,sans-serif">{b}</text>
      ))}
      {/* Feature cards row */}
      {(listing.features ?? ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]).slice(0, 4).map((f, i) => (
        <g key={i} transform={`translate(${20 + i * 192}, 230)`}>
          <rect width="174" height="90" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <circle cx="24" cy="24" r="12" fill={p.accent} opacity="0.25" />
          <circle cx="24" cy="24" r="6" fill={p.accent} opacity="0.5" />
          <rect x="12" y="44" width="100" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="12" y="56" width="140" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
          <rect x="12" y="66" width="110" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
    </svg>
  )
}

/* ══ MAIN EXPORT ═════════════════════════════════════════ */
export function WebsitePreviewThumbnail({ listing, className = "" }: Props) {
  const p = getPalette(listing.categorySlug)
  const cat = listing.categorySlug

  const content = () => {
    if (cat === "ecommerce") return <EcommerceThumbnail p={p} listing={listing} />
    if (cat === "saas")      return <SaasThumbnail p={p} listing={listing} />
    if (cat === "blogs")     return <BlogThumbnail p={p} listing={listing} />
    if (cat === "crm")       return <CrmThumbnail p={p} listing={listing} />
    if (cat === "apps")      return <AppThumbnail p={p} listing={listing} />
    if (cat === "corporate") return <CorporateThumbnail p={p} listing={listing} />
    return <LandingThumbnail p={p} listing={listing} />
  }

  return (
    <div className={`w-full h-full overflow-hidden ${className}`}>
      {content()}
    </div>
  )
}
