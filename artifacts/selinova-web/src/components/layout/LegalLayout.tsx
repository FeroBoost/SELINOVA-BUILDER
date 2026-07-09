import React from "react"
import { Link } from "wouter"
import { Layout } from "./Layout"
import { Button } from "@/components/ui/button"
import { Printer, ArrowLeft, FileText } from "lucide-react"

interface Section {
  number?: string
  title: string
  content: React.ReactNode
}

interface LegalLayoutProps {
  title: string
  subtitle?: string
  lastUpdated?: string
  badge?: string
  backHref?: string
  backLabel?: string
  showPrint?: boolean
  children: React.ReactNode
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  badge,
  backHref = "/rechtliches",
  backLabel = "Rechtliches",
  showPrint = true,
  children,
}: LegalLayoutProps) {
  return (
    <Layout>
      {/* Print styles — injected into head via style tag, only active on @media print */}
      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          body { font-size: 11pt; }
          .print-page { padding: 0 !important; max-width: 100% !important; }
          h1 { font-size: 18pt; }
          h2 { font-size: 13pt; }
          p, li { font-size: 10pt; line-height: 1.5; }
        }
      `}</style>

      <div className="bg-slate-50 min-h-screen">
        {/* Document header bar */}
        <div className="bg-white border-b border-slate-200 no-print">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-4xl">
            <Link href={backHref} className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
            {showPrint && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 text-xs font-semibold no-print"
              >
                <Printer className="w-3.5 h-3.5" />
                Drucken / Als PDF speichern
              </Button>
            )}
          </div>
        </div>

        {/* Document content */}
        <div className="container mx-auto px-4 py-10 max-w-4xl print-page">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Document title block */}
            <div className="border-b border-slate-200 px-8 py-8 bg-gradient-to-br from-slate-50 to-white">
              {badge && (
                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                  <FileText className="w-3 h-3" />
                  {badge}
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mb-2">{title}</h1>
              {subtitle && <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{subtitle}</p>}
              {lastUpdated && (
                <p className="text-xs text-slate-400 mt-3 font-medium">
                  Stand: {lastUpdated} · Gültig für Österreich (ABGB, DSGVO, ECG, KSchG, UrhG)
                </p>
              )}
            </div>

            {/* Body */}
            <div className="px-8 py-8 prose prose-slate max-w-none
              prose-h2:text-lg prose-h2:font-black prose-h2:text-foreground prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:font-bold prose-h3:text-foreground prose-h3:mt-5 prose-h3:mb-2
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-[14.5px]
              prose-li:text-slate-600 prose-li:text-[14.5px]
              prose-strong:text-foreground
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            ">
              {children}
            </div>

            {/* Footer stamp */}
            <div className="border-t border-slate-100 px-8 py-4 bg-slate-50 flex items-center justify-between text-xs text-slate-400">
              <span>SELINOVA-TECH · Wien, Österreich · selinova-tech.at</span>
              {lastUpdated && <span>Stand: {lastUpdated}</span>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

/** Numbered section heading for legal documents */
export function LegalSection({ number, title, children }: Section) {
  return (
    <section className="mb-1">
      <h2 className="flex items-baseline gap-2 !mt-8 !mb-3">
        {number && (
          <span className="text-primary font-black text-base shrink-0">§ {number}</span>
        )}
        <span>{title}</span>
      </h2>
      <div>{children}</div>
    </section>
  )
}

/** Highlighted placeholder field for contract templates */
export function Fill({ label }: { label: string }) {
  return (
    <span className="inline-block bg-amber-100 border border-amber-300 text-amber-800 rounded px-1.5 py-0.5 text-[13px] font-semibold mx-0.5 no-print">
      [{label}]
    </span>
  )
}
