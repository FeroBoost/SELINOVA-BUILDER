import React from "react"
import { useRoute } from "wouter"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"

export function NotFoundPage() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-black text-slate-100 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">Seite nicht gefunden</h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          Die gesuchte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button size="lg" className="font-bold">Zur Startseite</Button>
          </Link>
          <Link href="/marktplatz">
            <Button size="lg" variant="outline" className="font-bold">Zum Marktplatz</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
