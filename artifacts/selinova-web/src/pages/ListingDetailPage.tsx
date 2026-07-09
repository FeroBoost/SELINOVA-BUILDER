import React, { useState } from "react"
import { useRoute, useLocation } from "wouter"
import { Layout } from "@/components/layout/Layout"
import { useGetListing } from "@workspace/api-client-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PreviewModal } from "@/components/marketplace/PreviewModal"
import { ContactModal } from "@/components/marketplace/ContactModal"
import {
  ArrowLeft, Check, Heart, ShieldCheck, Eye, Calendar, Tag,
  Monitor, TrendingUp, Package, Cpu, Globe, Star, Layers
} from "lucide-react"

export function ListingDetailPage() {
  const [match, params] = useRoute("/listing/:id")
  const [, setLocation] = useLocation()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const id = match && params?.id ? parseInt(params.id, 10) : 0
  const { data: listing, isLoading, error } = useGetListing(id, {
    query: { enabled: !!id, queryKey: ["listing", id] },
  })

  if (!match) return null

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Skeleton className="h-8 w-44 mb-6" />
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-2/3 space-y-6">
              <Skeleton className="h-[420px] w-full rounded-2xl" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div className="lg:w-1/3">
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing nicht gefunden</h1>
          <p className="text-muted-foreground mb-8">Das gesuchte Angebot existiert nicht oder wurde entfernt.</p>
          <Button onClick={() => setLocation("/marktplatz")}>Zurück zum Marktplatz</Button>
        </div>
      </Layout>
    )
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price)

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(dateStr))

  const categoryGradients: Record<string, string> = {
    ecommerce: "from-blue-600 to-cyan-500",
    saas: "from-violet-600 to-purple-500",
    blogs: "from-amber-500 to-orange-500",
    apps: "from-emerald-500 to-teal-500",
    crm: "from-rose-500 to-pink-500",
    default: "from-slate-700 to-slate-900",
  }
  const gradientClass = categoryGradients[listing.categorySlug] ?? categoryGradients.default

  // Split description into logical sections for better presentation
  const descParagraphs = (listing.description ?? "").split(/\n+/).filter(Boolean)

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-7xl">

          {/* ── Back nav ─────────────────────────────────── */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-sm font-bold text-slate-500 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Zurück zum Marktplatz
          </button>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

            {/* ══ LEFT COLUMN ══════════════════════════════ */}
            <div className="lg:w-2/3 min-w-0">

              {/* ── Hero Preview Area ─────────────────────── */}
              <div
                className={`relative w-full aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br ${gradientClass} shadow-lg mb-6 cursor-pointer group`}
                onClick={() => setPreviewOpen(true)}
                role="button"
                aria-label="Website-Vorschau öffnen"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/8" />
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Globe className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm text-slate-800 font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg group-hover:bg-white transition-colors">
                      <Monitor className="w-4 h-4" />
                      Website-Vorschau öffnen
                    </div>
                  </div>
                </div>

                {/* Badges overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {listing.type === "buy" ? (
                    <Badge variant="buy" className="text-xs px-2.5 py-1 font-bold uppercase tracking-wide shadow">Kaufen</Badge>
                  ) : (
                    <Badge variant="rent" className="text-xs px-2.5 py-1 font-bold uppercase tracking-wide shadow">Mieten</Badge>
                  )}
                  {listing.isFeatured && (
                    <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400 border-0 text-xs px-2.5 py-1 font-bold uppercase tracking-wide shadow">
                      <Star className="w-3 h-3 mr-1" />Top
                    </Badge>
                  )}
                </div>

                {/* View count */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                  <Eye className="w-3.5 h-3.5" />
                  {listing.views} Aufrufe
                </div>
              </div>

              {/* ── Breadcrumb badges ─────────────────────── */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs px-2.5 py-1">
                  {listing.categoryName || listing.categorySlug}
                </Badge>
                <span className="text-slate-300 text-xs self-center">›</span>
                <Badge variant="outline" className="text-xs px-2.5 py-1 bg-white">
                  {listing.subcategoryName || listing.subcategorySlug}
                </Badge>
              </div>

              {/* ── Title ────────────────────────────────── */}
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-4 leading-tight">
                {listing.title}
              </h1>

              {/* ── Stats strip ──────────────────────────── */}
              <div className="flex flex-wrap gap-5 text-sm text-slate-500 border-y border-slate-200 py-3.5 mb-8">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Eingestellt {formatDate(listing.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{listing.views} Aufrufe</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span>Ref-Nr. #{listing.id}</span>
                </div>
              </div>

              {/* ══ SECTION: Beschreibung ════════════════════ */}
              <section className="bg-white rounded-2xl border border-slate-200 p-7 mb-5 shadow-sm">
                <h2 className="text-xl font-black text-foreground mb-5 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-primary" />
                  </span>
                  Über dieses Angebot
                </h2>

                <div className="space-y-4">
                  {descParagraphs.length > 0 ? (
                    descParagraphs.map((para, i) => (
                      <p key={i} className="text-slate-600 leading-relaxed text-[15px]">{para}</p>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">Keine Beschreibung verfügbar.</p>
                  )}
                </div>

                {/* Key metrics row */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-primary">{listing.views}</div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Aufrufe</div>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <div className="text-2xl font-black text-primary">
                      {listing.techStack?.length ?? 0}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Technologien</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-primary">
                      {listing.features?.length ?? 0}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">Features</div>
                  </div>
                </div>
              </section>

              {/* ══ SECTION: Features ════════════════════════ */}
              {listing.features && listing.features.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200 p-7 mb-5 shadow-sm">
                  <h2 className="text-xl font-black text-foreground mb-5 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </span>
                    Was ist enthalten?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {listing.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 font-medium text-[14px] leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ══ SECTION: Business Info ═══════════════════ */}
              <section className="bg-white rounded-2xl border border-slate-200 p-7 mb-5 shadow-sm">
                <h2 className="text-xl font-black text-foreground mb-5 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </span>
                  Geschäftsdaten &amp; Übergabe
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Angebotstyp", value: listing.type === "buy" ? "Verkauf (Einmalig)" : "Miete / Lizenz" },
                    { label: "Preismodell", value: listing.pricePeriod === "once" ? "Einmalzahlung" : listing.pricePeriod ? `Pro ${listing.pricePeriod}` : "Einmalzahlung" },
                    { label: "Übergabe", value: "Digital — sofort nach Zahlung" },
                    { label: "Abwicklung", value: "SELINOVA-TECH Treuhand" },
                    { label: "Kategorie", value: listing.categoryName || listing.categorySlug },
                    { label: "Subkategorie", value: listing.subcategoryName || listing.subcategorySlug },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 text-sm font-medium">{label}</span>
                      <span className="text-foreground text-sm font-bold text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ══ SECTION: Tech Stack ══════════════════════ */}
              {listing.techStack && listing.techStack.length > 0 && (
                <section className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
                  <h2 className="text-xl font-black text-foreground mb-5 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-violet-600" />
                    </span>
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {listing.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-mono text-sm font-semibold hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-slate-400">
                    Vollständige Dokumentation und Quellcode werden nach Vertragsabschluss übergeben.
                  </p>
                </section>
              )}
            </div>

            {/* ══ RIGHT COLUMN — Sticky sidebar ═══════════ */}
            <div className="lg:w-1/3 w-full flex-shrink-0">
              <div className="sticky top-24 space-y-4">

                {/* ── Price Card ───────────────────────── */}
                <div className="bg-white border-2 border-primary/25 rounded-2xl p-6 shadow-xl shadow-primary/8">
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">
                    {listing.type === "buy" ? "Kaufpreis" : "Mietpreis"}
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-foreground">{formatPrice(listing.price)}</span>
                  </div>
                  {listing.pricePeriod && listing.pricePeriod !== "once" && (
                    <div className="text-slate-500 text-sm font-medium mb-4">pro {listing.pricePeriod}</div>
                  )}

                  <div className="space-y-2.5 mt-5">
                    <Button
                      className="w-full h-12 text-base font-bold"
                      onClick={() => setContactOpen(true)}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Anfrage stellen
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-11 font-semibold border-slate-200 text-slate-600 hover:text-foreground"
                      onClick={() => setPreviewOpen(true)}
                    >
                      <Monitor className="w-4 h-4 mr-2" />
                      Website-Vorschau
                    </Button>

                    <Button
                      variant="outline"
                      className={`w-full h-11 font-semibold border-slate-200 transition-colors ${wishlisted ? "text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-50 hover:text-rose-600" : "text-slate-600 hover:text-foreground"}`}
                      onClick={() => setWishlisted((w) => !w)}
                    >
                      <Heart className={`w-4 h-4 mr-2 transition-all ${wishlisted ? "fill-current" : ""}`} />
                      {wishlisted ? "Auf Merkliste" : "Zur Merkliste"}
                    </Button>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Verifizierter Seller. Transaktion läuft über SELINOVA-TECH Treuhand-System.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Vollständige Übergabe: Code, Domain &amp; Dokumentation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Seller Card ──────────────────────── */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-black text-sm text-foreground uppercase tracking-wide mb-4">Anbieter</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 rounded-full flex items-center justify-center text-sm font-black text-white shadow">
                      ST
                    </div>
                    <div>
                      <div className="font-bold text-sm text-foreground">Selinova-Tech Agency</div>
                      <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Geprüfter Partner
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary/80 hover:bg-primary/5 font-semibold text-sm"
                    onClick={() => setLocation("/marktplatz")}
                  >
                    Alle Angebote dieses Anbieters
                  </Button>
                </div>

                {/* ── Trust badges ─────────────────────── */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "Sicher", sub: "Treuhand" },
                      { label: "Geprüft", sub: "Seller" },
                      { label: "Sofort", sub: "Übergabe" },
                    ].map(({ label, sub }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                        </div>
                        <div className="text-xs font-bold text-foreground">{label}</div>
                        <div className="text-[10px] text-slate-400">{sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────── */}
      <PreviewModal listing={listing} open={previewOpen} onOpenChange={setPreviewOpen} />
      <ContactModal listing={listing} open={contactOpen} onOpenChange={setContactOpen} />
    </Layout>
  )
}
