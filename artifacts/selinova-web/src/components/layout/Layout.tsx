import React from "react"
import { Link } from "wouter"
import { Navbar } from "./Navbar"
import { Scale, Shield, Lock, FileText } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 mt-auto">
        {/* Main footer content */}
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-xl font-black text-white tracking-tighter uppercase mb-3">
                Selinova<span className="text-primary">-Tech</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                Österreichs Marktplatz für professionelle Webseiten, SaaS-Plattformen und digitale Produkte. Seriös, sicher, treuhandgesichert.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["ABGB", "DSGVO", "ECG", "KSchG"].map(law => (
                  <span key={law} className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded font-mono">
                    {law}
                  </span>
                ))}
              </div>
            </div>

            {/* Marktplatz */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Marktplatz</h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  { href: "/marktplatz", label: "Alle Angebote" },
                  { href: "/kaufen", label: "Kaufen" },
                  { href: "/mieten", label: "Mieten" },
                  { href: "/marktplatz?sort=popular", label: "Featured" },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Rechtliches */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Rechtliches</h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  { href: "/impressum", label: "Impressum", icon: <FileText className="w-3 h-3" /> },
                  { href: "/datenschutz", label: "Datenschutz", icon: <Lock className="w-3 h-3" /> },
                  { href: "/agb", label: "AGB", icon: <Shield className="w-3 h-3" /> },
                  { href: "/rechtliches", label: "Alle Rechtsdokumente", icon: <Scale className="w-3 h-3" /> },
                  { href: "/rechtliches/mietvertrag", label: "Mietvertrag Vorlage", icon: null },
                  { href: "/rechtliches/kaufvertrag", label: "Kaufvertrag Vorlage", icon: null },
                ].map(({ href, label, icon }) => (
                  <Link key={href} href={href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                    {icon && <span className="text-slate-500">{icon}</span>}
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} SELINOVA-TECH · Daldaban Ferhan · Wien, Österreich
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>Gerichtsstand Wien</span>
              <span>·</span>
              <span>Österreichisches Recht</span>
              <span>·</span>
              <a href="mailto:hallo@selinova-tech.at" className="text-slate-500 hover:text-primary transition-colors">
                hallo@selinova-tech.at
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
