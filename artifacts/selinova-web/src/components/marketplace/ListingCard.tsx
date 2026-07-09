import React, { useState } from "react"
import { Link } from "wouter"
import { Eye, Monitor, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { WebsitePreviewThumbnail } from "./WebsitePreviewThumbnail"
import { type Listing } from "@workspace/api-client-react"

interface ListingCardProps {
  listing: Listing
}

export function ListingCard({ listing }: ListingCardProps) {
  const [wishlisted, setWishlisted] = useState(false)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("de-AT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price)

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/25 transition-all duration-300 hover:-translate-y-1">

      {/* ── Thumbnail — SVG website preview ──────────── */}
      <Link href={`/listing/${listing.id}`} className="block relative overflow-hidden" style={{ height: "176px" }}>
        {/* SVG thumbnail fills the space */}
        <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-500 origin-top">
          <WebsitePreviewThumbnail listing={listing} />
        </div>

        {/* Hover overlay — "Vorschau öffnen" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
            <Monitor className="w-3.5 h-3.5" />
            Vorschau öffnen
          </div>
        </div>

        {/* Badges — top left */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {listing.type === "buy" ? (
            <Badge variant="buy" className="shadow font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">Kaufen</Badge>
          ) : (
            <Badge variant="rent" className="shadow font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">Mieten</Badge>
          )}
        </div>

        {/* Featured badge — top right */}
        {listing.isFeatured && (
          <div className="absolute top-3 right-10">
            <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-400 shadow border-0 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5">Top</Badge>
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted((w) => !w) }}
          aria-label="Zur Merkliste"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "fill-rose-500 text-rose-500" : "text-slate-500"}`} />
        </button>
      </Link>

      {/* ── Card content ──────────────────────────────── */}
      <Link href={`/listing/${listing.id}`} className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-foreground leading-tight line-clamp-2 text-[15px] mb-2 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>

        <div className="flex items-baseline gap-1 mb-2.5">
          <span className="text-xl font-black text-primary">{formatPrice(listing.price)}</span>
          {listing.pricePeriod && listing.pricePeriod !== "once" && (
            <span className="text-xs text-muted-foreground font-medium">/ {listing.pricePeriod}</span>
          )}
        </div>

        {/* Description excerpt */}
        {listing.description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
            {listing.description.replace(/\n/g, " ")}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 space-y-2">
          {/* Category + views */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[120px]">
                {listing.categoryName || listing.categorySlug}
              </span>
              {(listing.subcategoryName || listing.subcategorySlug) && (
                <span className="text-[11px] text-slate-400 truncate hidden sm:inline">
                  {listing.subcategoryName || listing.subcategorySlug}
                </span>
              )}
            </div>
            <div className="flex items-center text-slate-400 text-xs shrink-0">
              <Eye className="w-3.5 h-3.5 mr-1" />
              {listing.views}
            </div>
          </div>

          {/* Tech stack pills */}
          {listing.techStack && listing.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {listing.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded whitespace-nowrap font-medium">
                  {tech}
                </span>
              ))}
              {listing.techStack.length > 3 && (
                <span className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                  +{listing.techStack.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}
