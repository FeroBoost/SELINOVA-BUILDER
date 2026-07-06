import React from "react"
import { useGetMarketplaceStats } from "@workspace/api-client-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Activity, ShoppingCart, Key, TrendingUp } from "lucide-react"

export function StatsStrip() {
  const { data: stats, isLoading } = useGetMarketplaceStats()

  if (isLoading) {
    return (
      <div className="bg-white border-y border-border py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-border">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-4 flex flex-col items-center">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!stats) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-AT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const statItems = [
    { label: "Gesamt-Listings", value: stats.totalListings, icon: Activity, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Kaufen", value: stats.totalBuy, icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Mieten", value: stats.totalRent, icon: Key, color: "text-teal-600", bg: "bg-teal-100" },
    { label: "Ø Preis", value: formatPrice(stats.averagePrice), icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
  ]

  return (
    <div className="bg-white border-y border-border py-8 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border/50">
          {statItems.map((item, i) => (
            <div key={i} className="px-4 flex flex-col items-center justify-center text-center">
              <div className={`p-3 rounded-full ${item.bg} mb-3`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-3xl font-black text-foreground mb-1">{item.value}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
