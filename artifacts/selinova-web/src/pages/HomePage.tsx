import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroSearchBar } from '@/components/marketplace/HeroSearchBar';
import { StatsStrip } from '@/components/marketplace/StatsStrip';
import { CategoryGrid } from '@/components/marketplace/CategoryGrid';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { useGetFeaturedListings, useGetListings } from '@workspace/api-client-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  };
}

export function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useGetFeaturedListings({ limit: 4 });
  const { data: latest, isLoading: latestLoading } = useGetListings({ sort: 'newest', limit: 8 });

  return (
    <Layout>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="snv-hero-section">
        <div className="snv-hero-bg" />
        <div className="snv-hero-grid" />

        {/* Decorative floating orbs */}
        <div className="snv-orb snv-orb-1" />
        <div className="snv-orb snv-orb-2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center py-24 lg:py-32">

            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-semibold tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Österreichs Nr.1 Webseiten-Marktplatz
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.08)}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.04] mb-6 text-white max-w-4xl"
            >
              Professionelle{' '}
              <span className="snv-gradient-text">Webseiten</span>
              <br />
              kaufen &amp; mieten.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.16)}
              className="text-base md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
            >
              Geprüfte E-Commerce Shops, SaaS-Plattformen und Corporate Sites —
              sofort einsatzbereit, direkt aus Österreich.
            </motion.p>

            {/* Search bar */}
            <motion.div {...fadeUp(0.22)} className="w-full max-w-2xl">
              <HeroSearchBar />
            </motion.div>

            {/* Trust badges */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 flex flex-wrap gap-x-8 gap-y-2 justify-center text-xs text-slate-500 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400">✓</span> Geprüfte Anbieter
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400">✓</span> DSGVO-konform
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400">✓</span> Sofortübergabe
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────────── */}
      <StatsStrip />

      {/* ─── Categories ───────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Kategorien entdecken
              </h2>
              <p className="text-muted-foreground">
                Finden Sie das passende digitale Asset für Ihr Business.
              </p>
            </div>
            <Link href="/marktplatz" className="hidden sm:flex items-center text-primary font-bold hover:underline">
              Alle Kategorien <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* ─── Featured ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                Gerade angesagt
              </h2>
              <p className="text-muted-foreground">
                Die beliebtesten Projekte der letzten 48 Stunden.
              </p>
            </div>
            <Link href="/marktplatz?sort=popular" className="hidden sm:flex items-center text-primary font-bold hover:underline">
              Alle Top-Listings <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          {featuredLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-80 rounded-lg" />)}
            </div>
          ) : featured && featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground">Keine Top-Listings verfügbar.</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Latest ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Neu auf dem Marktplatz
              </h2>
              <p className="text-muted-foreground">
                Frisch eingetroffene Webseiten und Plattformen.
              </p>
            </div>
            <Link href="/marktplatz?sort=newest" className="hidden sm:flex items-center text-primary font-bold hover:underline">
              Alle neuen Listings <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          {latestLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} className="h-80 rounded-lg" />)}
            </div>
          ) : latest?.items && latest.items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {latest.items.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
              </div>
              <div className="mt-12 text-center">
                <Link href="/marktplatz">
                  <Button size="lg" className="font-bold tracking-wide uppercase px-8">
                    Gesamten Marktplatz durchsuchen
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground">Keine neuen Listings verfügbar.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
