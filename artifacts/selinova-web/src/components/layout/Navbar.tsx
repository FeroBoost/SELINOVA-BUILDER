import * as React from "react"
import { Link, useLocation } from "wouter"
import { Search, User, PlusCircle, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetMarketplaceStats } from "@workspace/api-client-react"

export function Navbar() {
  const [location, setLocation] = useLocation()
  const [searchQuery, setSearchQuery] = React.useState("")
  const { data: stats } = useGetMarketplaceStats()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setLocation(`/marktplatz?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-gradient uppercase">
            Selinova-Tech
          </span>
        </Link>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="relative w-full flex shadow-sm rounded-md">
            <select className="h-10 px-3 py-2 text-sm border border-r-0 border-input bg-slate-50 rounded-l-md text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:z-10">
              <option value="">Alle Kategorien</option>
              <option value="ecommerce">E-Commerce</option>
              <option value="saas">SaaS</option>
              <option value="blogs">Blogs</option>
              <option value="apps">Apps</option>
            </select>
            <div className="relative flex-1">
              <Input 
                type="search" 
                placeholder="Webseite, SaaS, E-Commerce suchen..." 
                className="w-full rounded-l-none pl-4 pr-10 focus-visible:z-10 bg-white border-l-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10 text-slate-500 hover:text-primary hover:bg-transparent">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button variant="ghost" className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary">
            <User className="h-4 w-4" />
            Einloggen / Registrieren
          </Button>
          <Button className="hidden sm:flex items-center gap-2 font-bold shadow-sm">
            <PlusCircle className="h-4 w-4" />
            Anzeige aufgeben
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </Button>
        </div>
      </div>

      {/* Main Nav Row */}
      <div className="bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <nav className="flex items-center overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link 
              href="/marktplatz" 
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-[3px] transition-colors flex items-center gap-2 ${
                isActive("/marktplatz") && !location.includes("sort=popular") && !location.includes("type=") 
                  ? "border-primary text-primary" 
                  : "border-transparent text-slate-600 hover:text-primary"
              }`}
            >
              Marktplatz
              {stats && <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-sm">{stats.totalListings}</span>}
            </Link>
            <Link 
              href="/kaufen" 
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-[3px] transition-colors flex items-center gap-2 ${
                location.includes("type=buy") 
                  ? "border-emerald-500 text-emerald-600" 
                  : "border-transparent text-slate-600 hover:text-emerald-600"
              }`}
            >
              Kaufen
              {stats && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-sm">{stats.totalBuy}</span>}
            </Link>
            <Link 
              href="/mieten" 
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-[3px] transition-colors flex items-center gap-2 ${
                location.includes("type=rent") 
                  ? "border-teal-500 text-teal-600" 
                  : "border-transparent text-slate-600 hover:text-teal-600"
              }`}
            >
              Mieten
              {stats && <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-sm">{stats.totalRent}</span>}
            </Link>
            <Link 
              href="/marktplatz?sort=popular" 
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-[3px] transition-colors flex items-center gap-2 ${
                location.includes("sort=popular") 
                  ? "border-amber-500 text-amber-600" 
                  : "border-transparent text-slate-600 hover:text-amber-600"
              }`}
            >
              Featured
              {stats && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-sm">{stats.totalFeatured}</span>}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
