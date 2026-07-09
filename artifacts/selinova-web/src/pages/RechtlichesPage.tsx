import React from "react"
import { Link } from "wouter"
import { Layout } from "@/components/layout/Layout"
import { FileText, Shield, Lock, ScrollText, ArrowRight, Scale, CheckCircle } from "lucide-react"

interface DocCard {
  href: string
  icon: React.ReactNode
  badge: string
  badgeColor: string
  title: string
  description: string
  tags: string[]
}

const documents: DocCard[] = [
  {
    href: "/rechtliches/mietvertrag",
    icon: <ScrollText className="w-6 h-6" />,
    badge: "Vorlage",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "Website-Mietvertrag",
    description: "Mietvertrag für die zeitlich begrenzte Nutzung einer Webseite, inkl. Optionen für Support-Pakete (ohne Support, Basic, Premium). Österreichisches Recht, ABGB.",
    tags: ["ABGB §1090 ff", "KSchG", "UrhG §31", "DSGVO"],
  },
  {
    href: "/rechtliches/kaufvertrag",
    icon: <Scale className="w-6 h-6" />,
    badge: "Vorlage",
    badgeColor: "bg-emerald-100 text-emerald-700",
    title: "Kaufvertrag & Lizenzübertragung",
    description: "Kaufvertrag für den vollständigen Erwerb einer Webseite inkl. Code, Domain und vollständiger Rechteübertragung. Mit optionalem Wettbewerbsverbot.",
    tags: ["ABGB §1053 ff", "UrhG §31", "GewO", "DSGVO"],
  },
  {
    href: "/impressum",
    icon: <FileText className="w-6 h-6" />,
    badge: "Pflichtangabe",
    badgeColor: "bg-slate-100 text-slate-700",
    title: "Impressum",
    description: "Pflichtangaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz.",
    tags: ["§5 ECG", "§25 MedienG"],
  },
  {
    href: "/agb",
    icon: <Shield className="w-6 h-6" />,
    badge: "Rechtsdokument",
    badgeColor: "bg-amber-100 text-amber-700",
    title: "Allgemeine Geschäftsbedingungen",
    description: "AGB für den SELINOVA-TECH Marktplatz: Kauf, Mietverträge, Gewährleistung, Haftung, Gerichtsstand Wien.",
    tags: ["ABGB", "KSchG", "ECG", "FAGG"],
  },
  {
    href: "/datenschutz",
    icon: <Lock className="w-6 h-6" />,
    badge: "Pflichtangabe",
    badgeColor: "bg-purple-100 text-purple-700",
    title: "Datenschutzerklärung",
    description: "Informationen zur Datenverarbeitung gemäß DSGVO und DSG 2018. Ihre Rechte als Betroffene Person.",
    tags: ["DSGVO Art. 13/14", "DSG 2018", "TKG 2021"],
  },
]

const legalBasis = [
  { law: "ABGB", full: "Allgemeines bürgerliches Gesetzbuch", relevance: "Vertragsrecht, Gewährleistung, Haftung" },
  { law: "ECG", full: "E-Commerce-Gesetz", relevance: "Informationspflichten, Online-Verträge" },
  { law: "KSchG", full: "Konsumentenschutzgesetz", relevance: "Verbraucherrechte, Widerrufsrecht" },
  { law: "FAGG", full: "Fern- und Auswärtsgeschäfte-Gesetz", relevance: "14-Tage-Widerruf, Informationspflichten" },
  { law: "UrhG", full: "Urheberrechtsgesetz", relevance: "IP-Übertragung, Lizenzrechte" },
  { law: "DSGVO", full: "Datenschutz-Grundverordnung", relevance: "Datenverarbeitung, Betroffenenrechte" },
  { law: "DSG 2018", full: "Österreichisches Datenschutzgesetz", relevance: "Nationale DSGVO-Umsetzung" },
  { law: "TKG 2021", full: "Telekommunikationsgesetz", relevance: "Cookie-Einwilligung, Datenschutz" },
  { law: "UWG", full: "Bundesgesetz gegen unlauteren Wettbewerb", relevance: "Wettbewerbsrecht" },
  { law: "GewO", full: "Gewerbeordnung 1994", relevance: "Gewerbeberechtigung, Berufspflichten" },
  { law: "UGB", full: "Unternehmensgesetzbuch", relevance: "B2B-Transaktionen, Handelskauf" },
  { law: "BAO", full: "Bundesabgabenordnung", relevance: "Aufbewahrungspflichten (7 Jahre)" },
]

export function RechtlichesPage() {
  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Rechtliches</div>
                <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">
                  Rechtsdokumente &amp; Vertragsvorlagen
                </h1>
                <p className="text-slate-500 text-base max-w-2xl">
                  Alle rechtlichen Grundlagen für den SELINOVA-TECH Marktplatz — gebunden an österreichisches Recht.
                  Vertragsvorlagen können ausgedruckt oder als PDF gespeichert werden.
                </p>
              </div>
            </div>

            {/* Austrian law compliance banner */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["ABGB", "DSGVO", "ECG", "KSchG", "UrhG", "GewO", "FAGG"].map(law => (
                <span key={law} className="inline-flex items-center gap-1 bg-primary/8 text-primary border border-primary/20 px-2.5 py-1 rounded-full text-xs font-bold">
                  <CheckCircle className="w-3 h-3" /> {law}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 max-w-5xl space-y-10">

          {/* Documents grid */}
          <section>
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Dokumente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <Link key={doc.href} href={doc.href}>
                  <div className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {doc.icon}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${doc.badgeColor}`}>
                        {doc.badge}
                      </span>
                    </div>

                    <h3 className="font-black text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Legal basis table */}
          <section>
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
              Österreichische Rechtsgrundlagen
            </h2>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-5 py-3 text-xs font-black text-slate-500 uppercase tracking-wide w-24">Gesetz</th>
                    <th className="text-left px-5 py-3 text-xs font-black text-slate-500 uppercase tracking-wide">Vollständige Bezeichnung</th>
                    <th className="text-left px-5 py-3 text-xs font-black text-slate-500 uppercase tracking-wide">Relevanz für SELINOVA-TECH</th>
                  </tr>
                </thead>
                <tbody>
                  {legalBasis.map((row, i) => (
                    <tr key={row.law} className={i < legalBasis.length - 1 ? "border-b border-slate-100" : ""}>
                      <td className="px-5 py-3 font-mono font-black text-primary text-xs">{row.law}</td>
                      <td className="px-5 py-3 text-slate-700 font-medium">{row.full}</td>
                      <td className="px-5 py-3 text-slate-500">{row.relevance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Alle Gesetze in der jeweils geltenden Fassung. Abrufbar unter{" "}
              <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                ris.bka.gv.at
              </a>
              {" "}(Rechtsinformationssystem des Bundes).
            </p>
          </section>

          {/* Contact for legal questions */}
          <section className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
            <h2 className="font-black text-foreground mb-2">Rechtliche Fragen?</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Bei Fragen zu Verträgen, Datenschutz oder rechtlichen Angelegenheiten wenden Sie sich direkt an uns.
              Für komplexe rechtliche Fragen empfehlen wir die Konsultation eines österreichischen Rechtsanwalts.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:hallo@selinova-tech.at" className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                hallo@selinova-tech.at
              </a>
              <a href="https://www.raknoe.at" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:border-primary/30 transition-colors">
                Anwaltsuche Österreich →
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
