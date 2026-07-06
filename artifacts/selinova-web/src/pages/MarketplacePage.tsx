import React, { useEffect, useState } from "react"
import { useLocation } from "wouter"
import { Layout } from "@/components/layout/Layout"
import { FilterSidebar, type FilterState } from "@/components/marketplace/FilterSidebar"
import { ListingCard } from "@/components/marketplace/ListingCard"
import { useGetListings } from "@workspace/api-client-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

export function MarketplacePage() {
  const [location, setLocation] = useLocation()
  
  // Parse initial filters from URL
  const [filters, setFilters] = useState<FilterState>(() => {
    const params = new URLSearchParams(window.location.search)
    return {
      type: (params.get("type") || undefined) as "buy" | "rent" | undefined,
      category: params.get("category") || undefined,
      subcategories: params.get("subcategories")?.split(",").filter(Boolean) || [],
      minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
      maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
      sort: ((params.get("sort") || undefined) as "newest" | "price_asc" | "price_desc" | "popular" | undefined) ?? "newest"
    }
  })

  // Get search query separately
  const searchQuery = new URLSearchParams(window.location.search).get("q") || undefined

  // Update URL when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (newFilters.type) params.set("type", newFilters.type)
    if (newFilters.category) params.set("category", newFilters.category)
    if (newFilters.subcategories.length > 0) params.set("subcategories", newFilters.subcategories.join(","))
    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice.toString())
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice.toString())
    if (newFilters.sort && newFilters.sort !== "newest") params.set("sort", newFilters.sort)
    
    const searchString = params.toString()
    setLocation(location.split('?')[0] + (searchString ? `?${searchString}` : ""), { replace: true })
  }

  // Fetch data
  const { data, isLoading } = useGetListings({
    q: searchQuery,
    type: filters.type,
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: filters.sort,
    // Note: API might not support subcategories array filter directly in params shape, 
    // but we send it if possible. We might need to filter client-side if API doesn't support multiple.
    // For now, we'll pass the first subcategory if supported, or handle appropriately.
    subcategory: filters.subcategories.length === 1 ? filters.subcategories[0] : undefined,
    limit: 24,
    page: 1
  })

  // Client-side subcategory filtering if API only supports one
  const filteredItems = data?.items?.filter(item => {
    if (filters.subcategories.length === 0) return true;
    return filters.subcategories.includes(item.subcategoryName || "") || 
           filters.subcategories.includes(item.subcategorySlug || "");
  }) || []

  return (
    <Layout>
      <div className="bg-slate-50 border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Marktplatz</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery ? (
                  <>Suchergebnisse für: <span className="font-bold text-foreground">"{searchQuery}"</span></>
                ) : (
                  "Finden Sie das perfekte digitale Asset"
                )}
              </p>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Sortieren nach:</span>
              <select 
                className="h-10 px-3 bg-white border border-input rounded-md text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                value={filters.sort || "newest"}
                onChange={(e) => handleFilterChange({ ...filters, sort: e.target.value as any })}
              >
                <option value="newest">Neueste</option>
                <option value="popular">Beliebteste</option>
                <option value="price_asc">Preis aufsteigend</option>
                <option value="price_desc">Preis absteigend</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-sm font-medium text-slate-500">
                {isLoading ? (
                  <Skeleton className="h-5 w-32" />
                ) : (
                  <>{filteredItems.length} Treffer gefunden</>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-lg" />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-border border-dashed rounded-xl">
                <Search className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Keine Treffer gefunden</h3>
                <p className="text-muted-foreground max-w-md">
                  Wir konnten keine Listings finden, die Ihren Filterkriterien entsprechen. Bitte passen Sie Ihre Suche an.
                </p>
                <button 
                  onClick={() => handleFilterChange({ subcategories: [] })}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  )
}
