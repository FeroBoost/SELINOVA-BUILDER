import React from "react"
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout"
import { ExternalLink } from "lucide-react"

export function ImpressumPage() {
  return (
    <LegalLayout
      title="Impressum"
      subtitle="Pflichtangaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz"
      lastUpdated="Juli 2026"
      badge="Pflichtangaben ECG"
      backHref="/rechtliches"
    >
      <LegalSection number="1" title="Angaben zum Unternehmen">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {[
              ["Unternehmen", "SELINOVA-TECH"],
              ["Rechtsform", "Einzelunternehmen (e.U.)"],
              ["Inhaber / Geschäftsführer", "Daldaban Ferhan"],
              ["Unternehmensgegenstand", "Digitaler Marktplatz für den Kauf, Verkauf und die Vermietung von professionellen Webseiten, SaaS-Plattformen und digitalen Produkten"],
              ["Sitz", "Wien, Österreich"],
              ["Postanschrift", "Wien, Österreich"],
              ["E-Mail", "hallo@selinova-tech.at"],
              ["Website", "www.selinova-tech.at"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-100">
                <td className="py-2.5 pr-6 text-slate-500 font-medium w-48 align-top">{k}</td>
                <td className="py-2.5 text-slate-700 font-semibold">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </LegalSection>

      <LegalSection number="2" title="Behördliche Registrierung">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {[
              ["UID-Nummer", "AT U – (in Beantragung)"],
              ["Firmenbuchnummer", "wird nach Eintragung veröffentlicht"],
              ["Firmenbuchgericht", "Handelsgericht Wien"],
              ["Mitglied bei", "Wirtschaftskammer Wien (WKW)"],
              ["Fachgruppe", "Unternehmensberatung, Buchhaltung und Informationstechnologie"],
              ["Gewerbeberechtigung", "gem. § 94 GewO 1994 – IT-Dienstleistung"],
              ["Aufsichtsbehörde", "Magistratisches Bezirksamt Wien"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-100">
                <td className="py-2.5 pr-6 text-slate-500 font-medium w-48 align-top">{k}</td>
                <td className="py-2.5 text-slate-700 font-semibold">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-3">
          Berufsrecht: Gewerbeordnung 1994 (GewO) in der geltenden Fassung. Abrufbar unter{" "}
          <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            www.ris.bka.gv.at <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </LegalSection>

      <LegalSection number="3" title="Inhaltlich Verantwortlicher">
        <p>
          Verantwortlicher im Sinne des § 25 Abs. 2 Mediengesetz für die Inhalte dieser Website ist:
        </p>
        <p className="font-semibold text-foreground mt-2">
          Daldaban Ferhan<br />
          Founder &amp; Geschäftsführer, SELINOVA-TECH<br />
          Wien, Österreich
        </p>
      </LegalSection>

      <LegalSection number="4" title="Online-Streitbeilegung (ODR)">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die unter folgendem Link erreichbar ist:
        </p>
        <p>
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 font-semibold">
            https://ec.europa.eu/consumers/odr <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </p>
        <p>
          Unsere E-Mail-Adresse finden Sie im Impressum oben. Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Bei Beschwerden wenden Sie sich bitte direkt an uns: <a href="mailto:hallo@selinova-tech.at" className="text-primary hover:underline">hallo@selinova-tech.at</a>
        </p>
      </LegalSection>

      <LegalSection number="5" title="Urheberrecht und Haftungsausschluss">
        <p>
          Alle auf dieser Website veröffentlichten Inhalte (Texte, Grafiken, Logos, Bilder) sind urheberrechtlich geschützt und Eigentum von SELINOVA-TECH bzw. der jeweiligen Rechteinhaber (§ 1 ff UrhG). Die Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedarf der schriftlichen Zustimmung.
        </p>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>
        <p>
          Angebote auf dem SELINOVA-TECH Marktplatz werden von unabhängigen Dritten eingestellt. SELINOVA-TECH übernimmt keine Haftung für deren Richtigkeit, Vollständigkeit oder Aktualität, sofern nicht anders angegeben.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Anwendbares Recht und Gerichtsstand">
        <p>
          Es gilt österreichisches Recht unter Ausschluss des UN-Kaufrechts (CISG). Ausschließlicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit dieser Website ist Wien, Österreich, soweit gesetzlich zulässig.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
