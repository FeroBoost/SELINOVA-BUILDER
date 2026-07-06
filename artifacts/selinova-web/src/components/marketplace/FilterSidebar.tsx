import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGetCategories } from "@workspace/api-client-react"

export interface FilterState {
  type?: "buy" | "rent"
  category?: string
  subcategories: string[]
  minPrice?: number
  maxPrice?: number
  sort?: "newest" | "price_asc" | "price_desc" | "popular"
}

interface FilterSidebarProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const { data: categories } = useGetCategories()

  const [minPriceInput, setMinPriceInput] = React.useState(filters.minPrice?.toString() || "")
  const [maxPriceInput, setMaxPriceInput] = React.useState(filters.maxPrice?.toString() || "")

  const handleTypeChange = (type: "buy" | "rent" | undefined) => {
    onFilterChange({ ...filters, type })
  }

  const handleCategoryChange = (slug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === slug ? undefined : slug,
      subcategories: [],
    })
  }

  const handleSubcategoryChange = (slug: string, checked: boolean) => {
    const next = checked
      ? [...filters.subcategories, slug]
      : filters.subcategories.filter((s) => s !== slug)
    onFilterChange({ ...filters, subcategories: next })
  }

  const applyPrice = () => {
    onFilterChange({
      ...filters,
      minPrice: minPriceInput ? Number(minPriceInput) : undefined,
      maxPrice: maxPriceInput ? Number(maxPriceInput) : undefined,
    })
  }

  // Subcategories: show all if no category selected, otherwise show only
  // subcategories that belong to the selected category.
  const visibleSubcategories = React.useMemo(() => {
    if (!categories) return []
    if (!filters.category) {
      return categories.flatMap((c) => c.subcategories)
    }
    return categories.find((c) => c.slug === filters.category)?.subcategories ?? []
  }, [categories, filters.category])

  return (
    <div className="w-full bg-white rounded-lg border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black uppercase tracking-wide">Filter</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setMinPriceInput("")
            setMaxPriceInput("")
            onFilterChange({ subcategories: [] })
          }}
          className="text-xs text-muted-foreground hover:text-foreground h-auto px-2 py-1"
        >
          Zurücksetzen
        </Button>
      </div>

      <div className="space-y-6">
        {/* Angebotstyp */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-foreground">Angebotstyp</h3>
          <div className="flex gap-2">
            {(
              [
                { label: "Alle", value: undefined },
                { label: "Kaufen", value: "buy" as const },
                { label: "Mieten", value: "rent" as const },
              ] as const
            ).map(({ label, value }) => {
              const active =
                value === undefined ? !filters.type : filters.type === value
              const activeCls =
                value === "buy"
                  ? "bg-[#10B981] text-white border-[#10B981]"
                  : value === "rent"
                    ? "bg-[#0D9488] text-white border-[#0D9488]"
                    : "bg-slate-900 text-white border-slate-900"
              return (
                <button
                  key={label}
                  onClick={() => handleTypeChange(value)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md border transition-colors ${
                    active
                      ? activeCls
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Kategorien */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-foreground">Kategorie</h3>
          <div className="space-y-2">
            {categories?.map((cat) => (
              <label
                key={cat.slug}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.category === cat.slug}
                  onCheckedChange={() => handleCategoryChange(cat.slug)}
                  className="rounded-sm"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Unterkategorien — slug-based, dynamic from API */}
        {visibleSubcategories.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-foreground">Unterkategorie</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {visibleSubcategories.map((sub) => (
                <label
                  key={sub.slug}
                  className="flex items-start space-x-2 cursor-pointer group"
                >
                  <Checkbox
                    checked={filters.subcategories.includes(sub.slug)}
                    onCheckedChange={(checked) =>
                      handleSubcategoryChange(sub.slug, checked as boolean)
                    }
                    className="rounded-sm mt-0.5"
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-tight">
                    {sub.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Preisspanne */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-foreground">Preisspanne (€)</h3>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="h-9"
            />
            <span className="text-muted-foreground">–</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="h-9"
            />
          </div>
          <Button
            onClick={applyPrice}
            variant="outline"
            className="w-full h-9 font-medium text-xs"
          >
            Preis anwenden
          </Button>
        </div>
      </div>
    </div>
  )
}
