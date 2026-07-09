import * as React from "react"
import { Link, useLocation } from "wouter"
import { Search, User, PlusCircle, Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetMarketplaceStats } from "@workspace/api-client-react"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog"

export function Navbar() {
  const [location, setLocation] = useLocation()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [loginOpen, setLoginOpen] = React.useState(false)
  const [insertOpen, setInsertOpen] = React.useState(false)
  const { data: stats } = useGetMarketplaceStats()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set("q", searchQuery.trim())
    if (category) params.set("category", category)
    setLocation(`/marktplatz?${params.toString()}`)
    setMobileOpen(false)
  }

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true
    if (path !== "/" && location.startsWith(path)) return true
    return false
  }

  const navLinks = [
    {
      href: "/marktplatz",
      label: "Marktplatz",
      count: stats?.totalListings,
      activeClass: "border-primary text-primary",
      hoverClass: "hover:text-primary",
      countClass: "bg-slate-200 text-slate-600",
      active: isActive("/marktplatz") && !location.includes("sort=popular") && !location.includes("type="),
    },
    {
      href: "/kaufen",
      label: "Kaufen",
      count: stats?.totalBuy,
      activeClass: "border-emerald-500 text-emerald-600",
      hoverClass: "hover:text-emerald-600",
      countClass: "bg-emerald-100 text-emerald-700",
      active: location.includes("type=buy"),
    },
    {
      href: "/mieten",
      label: "Mieten",
      count: stats?.totalRent,
      activeClass: "border-teal-500 text-teal-600",
      hoverClass: "hover:text-teal-600",
      countClass: "bg-teal-100 text-teal-700",
      active: location.includes("type=rent"),
    },
    {
      href: "/marktplatz?sort=popular",
      label: "Featured",
      count: stats?.totalFeatured,
      activeClass: "border-amber-500 text-amber-600",
      hoverClass: "hover:text-amber-600",
      countClass: "bg-amber-100 text-amber-700",
      active: location.includes("sort=popular"),
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        {/* ── Top bar ─────────────────────────────────── */}
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-gradient uppercase">
              Selinova-Tech
            </span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <form onSubmit={handleSearch} className="relative w-full flex shadow-sm rounded-md">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 px-3 py-2 text-sm border border-r-0 border-input bg-slate-50 rounded-l-md text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:z-10"
              >
                <option value="">Alle Kategorien</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="saas">SaaS</option>
                <option value="blogs">Blogs</option>
                <option value="apps">Apps</option>
                <option value="crm">CRM Tools</option>
              </select>
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Webseite, SaaS, E-Commerce suchen..."
                  className="w-full rounded-l-none pl-4 pr-10 focus-visible:z-10 bg-white border-l-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-10 w-10 text-slate-500 hover:text-primary hover:bg-transparent"
                  aria-label="Suchen"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary"
              onClick={() => setLoginOpen(true)}
            >
              <User className="h-4 w-4" />
              Einloggen / Registrieren
            </Button>
            <Button
              className="hidden sm:flex items-center gap-2 font-bold shadow-sm"
              onClick={() => setInsertOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
              Anzeige aufgeben
            </Button>
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? <X className="h-5 w-5 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
            </Button>
          </div>
        </div>

        {/* ── Secondary nav ───────────────────────────── */}
        <div className="bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4">
            <nav className="flex items-center overflow-x-auto whitespace-nowrap hide-scrollbar">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-[3px] transition-colors flex items-center gap-2 ${
                    link.active
                      ? link.activeClass
                      : `border-transparent text-slate-600 ${link.hoverClass}`
                  }`}
                >
                  {link.label}
                  {link.count != null && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${link.countClass}`}>
                      {link.count}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ── Mobile search (collapsible) ─────────────── */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Suchen..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" aria-label="Suchen">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="ghost"
                className="justify-start gap-2 font-bold text-slate-600 hover:text-primary"
                onClick={() => { setLoginOpen(true); setMobileOpen(false) }}
              >
                <User className="h-4 w-4" /> Einloggen / Registrieren
              </Button>
              <Button
                className="justify-start gap-2 font-bold"
                onClick={() => { setInsertOpen(true); setMobileOpen(false) }}
              >
                <PlusCircle className="h-4 w-4" /> Anzeige aufgeben
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* ── Login / Register Modal ────────────────────── */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Einloggen / Registrieren
            </DialogTitle>
            <DialogDescription>
              Mitglieder-Bereich ist in Kürze verfügbar.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-slate-600 text-center leading-relaxed max-w-xs">
              Der Mitglieder-Bereich wird gerade fertiggestellt. Wir benachrichtigen Sie, sobald er live geht.
            </p>
            <Button className="w-full font-bold" onClick={() => setLoginOpen(false)}>
              Verstanden
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Insert Listing Modal ──────────────────────── */}
      <Dialog open={insertOpen} onOpenChange={setInsertOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-primary" />
              Anzeige aufgeben
            </DialogTitle>
            <DialogDescription>
              Ihr Angebot auf dem größten österreichischen Webseiten-Marktplatz.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-slate-600 text-center leading-relaxed max-w-xs">
              Das Anzeigen-Portal befindet sich im Aufbau. Kontaktieren Sie uns direkt unter{" "}
              <a href="mailto:hallo@selinova-tech.at" className="text-primary font-bold hover:underline">
                hallo@selinova-tech.at
              </a>
              , um Ihr Angebot einzustellen.
            </p>
            <Button className="w-full font-bold" onClick={() => setInsertOpen(false)}>
              Verstanden
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
