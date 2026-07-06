import React from "react"
import { useRoute, useLocation } from "wouter"
import { Layout } from "@/components/layout/Layout"
import { useGetListing } from "@workspace/api-client-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Heart, ShieldCheck, Mail, Globe, Eye, Calendar, Tag } from "lucide-react"

export function ListingDetailPage() {
  const [match, params] = useRoute("/listing/:id")
  const [, setLocation] = useLocation()
  
  const id = match && params?.id ? parseInt(params.id, 10) : 0
  const { data: listing, isLoading, error } = useGetListing(id, { 
    query: { enabled: !!id, queryKey: ['listing', id] } 
  })

  if (!match) return null

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <Skeleton className="h-[400px] w-full rounded-xl" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:w-1/3">
              <Skeleton className="h-80 w-full rounded-xl" />
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-AT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(new Date(dateStr))
  }

  const categoryGradients: Record<string, string> = {
    ecommerce: "from-blue-500 to-cyan-400",
    saas: "from-purple-500 to-pink-400",
    blogs: "from-amber-400 to-orange-500",
    apps: "from-emerald-400 to-teal-500",
    default: "from-slate-600 to-slate-800",
  }
  const gradientClass = categoryGradients[listing.categorySlug] || categoryGradients.default

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-sm font-bold text-slate-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zum Marktplatz
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="lg:w-2/3">
            {/* Hero Image Area */}
            <div className={`w-full aspect-[21/9] rounded-2xl mb-8 bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden shadow-sm`}>
              <div className="absolute inset-0 bg-black/10" />
              <ShieldCheck className="w-32 h-32 text-white/80 drop-shadow-lg relative z-10" strokeWidth={1} />
            </div>

            <div className="mb-6 flex flex-wrap gap-2 items-center">
              {listing.type === "buy" ? (
                <Badge variant="buy" className="text-sm px-3 py-1 font-bold uppercase tracking-wide">Kaufen</Badge>
              ) : (
                <Badge variant="rent" className="text-sm px-3 py-1 font-bold uppercase tracking-wide">Mieten</Badge>
              )}
              <Badge variant="secondary" className="text-sm px-3 py-1">{listing.categoryName || listing.categorySlug}</Badge>
              <Badge variant="outline" className="text-sm px-3 py-1 bg-white">{listing.subcategoryName || listing.subcategorySlug}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              {listing.title}
            </h1>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 mb-10 text-sm text-slate-500 border-y border-slate-100 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Eingestellt am {formatDate(listing.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{listing.views} Aufrufe</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Ref: #{listing.id}</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate max-w-none mb-12">
              <h2 className="text-2xl font-bold mb-4">Beschreibung</h2>
              <div className="whitespace-pre-wrap text-slate-600 leading-relaxed text-lg">
                {listing.description}
              </div>
            </div>

            {/* Features */}
            {listing.features && listing.features.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listing.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {listing.techStack && listing.techStack.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.techStack.map((tech) => (
                    <div key={tech} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-700 font-mono text-sm font-semibold">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white border-2 border-primary/20 rounded-xl p-6 shadow-xl shadow-primary/5">
                <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  {listing.type === "buy" ? "Kaufpreis" : "Mietpreis"}
                </div>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-foreground">{formatPrice(listing.price)}</span>
                  {listing.pricePeriod && listing.pricePeriod !== "once" && (
                    <span className="text-slate-500 font-medium text-lg">/ {listing.pricePeriod}</span>
                  )}
                </div>

                <div className="space-y-3">
                  <Button className="w-full h-14 text-lg font-bold">
                    <Mail className="w-5 h-5 mr-2" />
                    Anfrage stellen
                  </Button>
                  <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 hover:text-foreground">
                    <Heart className="w-5 h-5 mr-2" />
                    Auf die Merkliste
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span>Verifizierter Seller. Transaktion läuft über SELINOVA-TECH Treuhand.</span>
                  </div>
                </div>
              </div>

              {/* Seller Info Placeholder */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-foreground mb-4">Anbieter</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center text-xl font-black text-slate-400">
                    ST
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Selinova-Tech Agency</div>
                    <div className="text-sm text-slate-500">Geprüfter Partner</div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/5">
                  Alle Angebote dieses Anbieters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
