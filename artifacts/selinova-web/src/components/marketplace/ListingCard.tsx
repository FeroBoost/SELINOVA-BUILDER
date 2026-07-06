import React from "react"
import { Link } from "wouter"
import { Eye, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Listing } from "@workspace/api-client-react"

interface ListingCardProps {
  listing: Listing
}

// Map categories to gradient colors
const categoryGradients: Record<string, string> = {
  ecommerce: "from-blue-500 to-cyan-400",
  saas: "from-purple-500 to-pink-400",
  blogs: "from-amber-400 to-orange-500",
  apps: "from-emerald-400 to-teal-500",
  default: "from-slate-400 to-slate-500",
}

export function ListingCard({ listing }: ListingCardProps) {
  const gradientClass = categoryGradients[listing.categorySlug] || categoryGradients.default

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-AT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="group flex flex-col h-full bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
        {/* Thumbnail Area */}
        <div className={`h-40 w-full bg-gradient-to-br ${gradientClass} relative flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          <ShieldCheck className="w-16 h-16 text-white opacity-80" strokeWidth={1.5} />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {listing.type === "buy" ? (
              <Badge variant="buy" className="shadow-sm font-bold uppercase tracking-wider text-[10px] px-2 py-1">Kaufen</Badge>
            ) : (
              <Badge variant="rent" className="shadow-sm font-bold uppercase tracking-wider text-[10px] px-2 py-1">Mieten</Badge>
            )}
          </div>
          {listing.isFeatured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400 shadow-sm border-0 font-bold uppercase tracking-wider text-[10px] px-2 py-1">Top</Badge>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-foreground leading-tight line-clamp-2 text-base group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-xl font-black text-primary">{formatPrice(listing.price)}</span>
            {listing.pricePeriod && listing.pricePeriod !== "once" && (
              <span className="text-xs text-muted-foreground font-medium">/ {listing.pricePeriod}</span>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded truncate">
                  {listing.categoryName || listing.categorySlug}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {listing.subcategoryName || listing.subcategorySlug}
                </span>
              </div>
              <div className="flex items-center text-slate-400 text-xs shrink-0 ml-2">
                <Eye className="w-3.5 h-3.5 mr-1" />
                <span>{listing.views}</span>
              </div>
            </div>

            {/* Tech Stack Tags */}
            {listing.techStack && listing.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {listing.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                    {tech}
                  </span>
                ))}
                {listing.techStack.length > 3 && (
                  <span className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                    +{listing.techStack.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
