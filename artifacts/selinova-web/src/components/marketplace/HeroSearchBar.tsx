import React, { useState } from "react"
import { Search } from "lucide-react"
import { useLocation } from "wouter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function HeroSearchBar() {
  const [, setLocation] = useLocation()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.append("q", query.trim())
    if (category) params.append("category", category)
    
    setLocation(`/marktplatz${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto shadow-2xl rounded-lg overflow-hidden bg-white border-4 border-white">
      <div className="flex-1 flex flex-col sm:flex-row">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="search" 
            placeholder="Webseite, SaaS, E-Commerce suchen..." 
            className="w-full h-14 pl-12 border-0 rounded-none focus-visible:ring-0 text-lg shadow-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48 border-t sm:border-t-0 sm:border-l border-border bg-slate-50">
          <select 
            className="w-full h-14 px-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground font-medium appearance-none cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Alle Kategorien</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="saas">SaaS Plattform</option>
            <option value="blogs">Content & Blogs</option>
            <option value="apps">Web & Mobile Apps</option>
          </select>
        </div>
      </div>
      <Button type="submit" className="h-14 px-8 rounded-none text-lg font-bold uppercase tracking-wide bg-primary hover:bg-[#0F766E] transition-colors w-full sm:w-auto">
        Finden
      </Button>
    </form>
  )
}
