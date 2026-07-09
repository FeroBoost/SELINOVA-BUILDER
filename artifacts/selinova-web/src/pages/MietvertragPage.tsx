import React, { useState } from "react"
import { LegalLayout, LegalSection, Fill } from "@/components/layout/LegalLayout"

type SupportTier = "none" | "basic" | "premium"

const supportLabels: Record<SupportTier, string> = {
  none: "Ohne Support",
  basic: "Basic-Support",
  premium: "Premium-Support",
}

export function MietvertragPage() {
  const [support, setSupport] = useState<SupportTier>("basic")

  return (
    <LegalLayout
      title="Website-Mietvertrag"
      subtitle="Vorlage für die zeitlich begrenzte Überlassung einer professionellen Webseite gegen Entgelt. Österreichisches Recht (ABGB §1090 ff, UrhG, DSGVO)."
      lastUpdated="Juli 2026"
      badge="Vertragsvorlage"
      backHref="/rechtliches"
    >
      {/* Support tier selector */}
      <div className="not-prose mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl no-print">
        <p className="text-sm font-bold text-blue-800 mb-3">Support-Paket auswählen (beeinflusst §6 des Vertrags):</p>
        <div className="flex flex-wrap gap-2">
          {(["none", "basic", "premium"] as SupportTier[]).map((t) => (
            <button
              key={t}
              onClick={() => setSupport(t)}
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                support === t
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-200 hover:border-blue-400"
              }`}
            >
              {supportLabels[t]}
            </button>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">Gelbe Felder <span className="bg-amber-100 border border-amber-300 text-amber-800 px-1 rounded">[ ]</span> sind vor Unterzeichnung auszufüllen.</p>
      </div>

      {/* Contract header */}
      <div className="not-prose text-center mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-xl font-black uppercase tracking-wide text-foreground">WEBSITE-MIETVERTRAG</h2>
        <p className="text-sm text-slate-500 mt-1">mit {supportLabels[support]} · SELINOVA-TECH Marktplatz</p>
      </div>

      <LegalSection number="1" title="Vertragsparteien">
        <p>Dieser Mietvertrag wird abgeschlossen zwischen:</p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wide mb-2">Vermieter</p>
            <p className="text-sm text-slate-700">
              Name/Firma: <Fill label="VOLLSTÄNDIGER NAME ODER FIRMENNAME" /><br/>
              Adresse: <Fill label="STRASSE, PLZ, ORT" /><br/>
              E-Mail: <Fill label="E-MAIL ADRESSE" /><br/>
              UID-Nr. (falls vorhanden): <Fill label="ATU XXXXXXXX" /><br/>
              (nachfolgend „<strong>Vermieter</strong>")
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wide mb-2">Mieter</p>
            <p className="text-sm text-slate-700">
              Name/Firma: <Fill label="VOLLSTÄNDIGER NAME ODER FIRMENNAME" /><br/>
              Adresse: <Fill label="STRASSE, PLZ, ORT" /><br/>
              E-Mail: <Fill label="E-MAIL ADRESSE" /><br/>
              UID-Nr. (falls vorhanden): <Fill label="ATU XXXXXXXX" /><br/>
              (nachfolgend „<strong>Mieter</strong>")
            </p>
          </div>
        </div>
        <p>
          Der Vertrag wird über den SELINOVA-TECH Marktplatz (www.selinova-tech.at), betrieben von Daldaban Ferhan, Wien, vermittelt und abgewickelt.
        </p>
      </LegalSection>

      <LegalSection number="2" title="Vertragsgegenstand">
        <p>Gegenstand dieses Vertrages ist die entgeltliche, zeitlich begrenzte Überlassung der folgenden Webseite zur Nutzung durch den Mieter:</p>
        <div className="not-prose bg-slate-50 border border-slate-200 rounded-lg p-4 my-3">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Bezeichnung der Webseite", <Fill label="TITEL DER WEBSEITE / PRODUKT-NAME" />],
                ["URL / Domain", <Fill label="www.beispiel.at" />],
                ["Kategorie", <Fill label="z.B. E-Commerce / SaaS / Corporate" />],
                ["Listing-Referenz (SELINOVA-TECH)", <Fill label="#LISTING-ID" />],
                ["Beschreibung des Leistungsumfangs", <Fill label="KURZBESCHREIBUNG DER WEBSEITE UND IHRER FUNKTIONEN" />],
              ].map(([k, v]) => (
                <tr key={String(k)} className="border-b border-slate-100 last:border-0">
                  <td className="py-2 pr-4 text-slate-500 font-medium w-52 align-top">{k}</td>
                  <td className="py-2 text-slate-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Die Überlassung umfasst das Recht zur Nutzung der Webseite inkl. der zugehörigen Hosting-Infrastruktur und Datenbank im vereinbarten Umfang. Quellcode und Eigentumsrechte verbleiben beim Vermieter, soweit nicht schriftlich anders vereinbart.
        </p>
      </LegalSection>

      <LegalSection number="3" title="Mietdauer und Kündigung">
        <p>
          Der Mietvertrag beginnt am <Fill label="STARTDATUM (TT.MM.JJJJ)" /> und wird auf <Fill label="z.B. unbestimmte Zeit / 12 Monate" /> abgeschlossen.
        </p>
        <p>
          Bei einem Vertrag auf unbestimmte Zeit kann der Mietvertrag von beiden Seiten mit einer Frist von <Fill label="z.B. 30 Tagen" /> zum Monatsende schriftlich (E-Mail genügt) gekündigt werden.
        </p>
        <p>
          Bei einem Vertrag auf bestimmte Zeit verlängert er sich automatisch um jeweils <Fill label="z.B. 1 Monat / 1 Jahr" />, sofern er nicht mindestens <Fill label="30 Tage" /> vor Ablauf schriftlich gekündigt wird.
        </p>
        <p>
          Das Recht zur außerordentlichen Kündigung aus wichtigem Grund (§ 1117 ABGB analog) bleibt unberührt.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Mietentgelt und Zahlung">
        <p>
          Das monatliche Mietentgelt beträgt <Fill label="BETRAG IN EUR" /> zzgl. der gesetzlichen Umsatzsteuer (derzeit 20 % USt.).
        </p>
        <p>
          Die Zahlung erfolgt jeweils im Voraus zum <Fill label="z.B. 1. des Monats" /> per <Fill label="Banküberweisung / Kreditkarte / SEPA-Lastschrift" />. Die Abwicklung erfolgt über das SELINOVA-TECH Treuhandsystem.
        </p>
        <p>
          Bei Zahlungsverzug von mehr als 14 Tagen ist der Vermieter berechtigt, den Zugang zur Webseite zu sperren und Verzugszinsen gemäß § 456 UGB (9,2 % p.a. über dem Basiszinssatz) zu verrechnen.
        </p>
        <p>
          Eine Preisanpassung ist mit einer Ankündigungsfrist von <Fill label="60 Tagen" /> schriftlich möglich.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Nutzungsumfang und Anpassungen">
        <p>Der Mieter ist berechtigt:</p>
        <ul>
          <li>die Webseite im Rahmen seiner unternehmerischen Tätigkeit zu nutzen;</li>
          <li>Inhalte (Texte, Bilder, Produkte) selbst zu pflegen und anzupassen;</li>
          <li>die Webseite unter der vereinbarten Domain zu betreiben.</li>
        </ul>
        <p>Der Mieter ist <strong>nicht</strong> berechtigt:</p>
        <ul>
          <li>den Quellcode zu kopieren, zu verändern oder für andere Zwecke zu verwenden;</li>
          <li>die Webseite an Dritte weiterzuvermieten oder unterzulizenzieren;</li>
          <li>SELINOVA-TECH oder den Vermieter als Dienstleister gegenüber Dritten falsch darzustellen.</li>
        </ul>
      </LegalSection>

      <LegalSection number="6" title={`Support-Paket: ${supportLabels[support]}`}>
        {support === "none" && (
          <>
            <p>
              <strong>Kein Support inbegriffen.</strong> Der Vermieter erbringt keinerlei Wartungs-, Update- oder Supportleistungen. Der Mieter ist selbst für den technischen Betrieb und die Wartung der Webseite verantwortlich.
            </p>
            <p>
              Technische Probleme, die aus der Nutzung der Webseite entstehen, sind vom Mieter eigenverantwortlich oder durch einen Dritten zu beheben. Der Vermieter haftet nicht für Ausfallzeiten oder technische Fehler.
            </p>
            <p>
              Optionale Supportleistungen können separat zu einem Stundensatz von <Fill label="EUR XXX / Stunde" /> beauftragt werden.
            </p>
          </>
        )}
        {support === "basic" && (
          <>
            <p>
              <strong>Basic-Support (Mo–Fr, 9:00–17:00 Uhr MEZ)</strong>
            </p>
            <ul>
              <li><strong>Reaktionszeit:</strong> max. 48 Stunden auf Anfragen per E-Mail;</li>
              <li><strong>Inbegriffene Leistungen:</strong> Behebung kritischer Fehler (Serverausfall, Sicherheitslücken), Sicherheitsupdates des CMS/Frameworks, E-Mail-Support;</li>
              <li><strong>Nicht inbegriffen:</strong> Designanpassungen, neue Funktionen, Inhaltsänderungen;</li>
              <li><strong>Supportstunden:</strong> max. <Fill label="X Stunden pro Monat" /> inkl., darüber hinaus <Fill label="EUR XXX / Stunde" />.</li>
            </ul>
            <p>
              Support-Anfragen sind an <Fill label="SUPPORT-E-MAIL" /> zu richten.
            </p>
          </>
        )}
        {support === "premium" && (
          <>
            <p>
              <strong>Premium-Support (Mo–So, 8:00–20:00 Uhr MEZ, inkl. Rufbereitschaft)</strong>
            </p>
            <ul>
              <li><strong>Reaktionszeit:</strong> max. 4 Stunden auf kritische Fehler; max. 12 Stunden auf alle anderen Anfragen;</li>
              <li><strong>Inbegriffene Leistungen:</strong> Alle Basic-Leistungen + Designanpassungen (bis <Fill label="X Stunden/Monat" />), monatliche Performance-Berichte, SEO-Monitoring, proaktives Monitoring (24/7 Uptime-Überwachung);</li>
              <li><strong>Dedizierter Ansprechpartner:</strong> <Fill label="NAME DES ANSPRECHPARTNERS" />, Tel.: <Fill label="TELEFONNUMMER" />;</li>
              <li><strong>Supportstunden:</strong> max. <Fill label="X Stunden pro Monat" /> inkl., darüber hinaus <Fill label="EUR XXX / Stunde" />;</li>
              <li><strong>SLA Verfügbarkeit:</strong> 99,5 % monatliche Uptime garantiert. Bei Unterschreitung: Gutschrift von 10 % der Monatsmiete je weiteres Prozent Ausfall.</li>
            </ul>
          </>
        )}
      </LegalSection>

      <LegalSection number="7" title="Pflichten des Vermieters">
        <ul>
          <li>Bereitstellung der Webseite in einem funktionsfähigen, DSGVO-konformen Zustand;</li>
          <li>Übergabe aller notwendigen Zugangsdaten (Hosting-Panel, CMS-Backend, FTP/SSH) zu Vertragsbeginn;</li>
          <li>Sicherstellung der Hosting-Infrastruktur für die Dauer des Mietverhältnisses;</li>
          <li>Information des Mieters über wesentliche technische Änderungen mit mindestens 14 Tagen Vorlaufzeit.</li>
        </ul>
      </LegalSection>

      <LegalSection number="8" title="Pflichten des Mieters">
        <ul>
          <li>Pünktliche Zahlung des Mietentgelts;</li>
          <li>Nutzung der Webseite ausschließlich im Rahmen der gesetzlichen Bestimmungen (kein Spam, keine illegalen Inhalte);</li>
          <li>Einhaltung der DSGVO bei der Verarbeitung personenbezogener Daten über die Webseite (eigenverantwortlich);</li>
          <li>Sorgfältige Aufbewahrung der Zugangsdaten; sofortige Meldung bei Verdacht auf Missbrauch;</li>
          <li>Keine Weitergabe von Zugangsdaten an unbefugte Dritte.</li>
        </ul>
      </LegalSection>

      <LegalSection number="9" title="Datenschutz (DSGVO)">
        <p>
          Der Mieter ist ab Übergabe der Webseite selbst als datenschutzrechtlich Verantwortlicher (Art. 4 Z 7 DSGVO) für die Verarbeitung personenbezogener Daten der Webseitenbesucher verantwortlich. Er hat insbesondere:
        </p>
        <ul>
          <li>eine eigene Datenschutzerklärung auf der Webseite zu veröffentlichen;</li>
          <li>ein Verzeichnis von Verarbeitungstätigkeiten (Art. 30 DSGVO) zu führen;</li>
          <li>erforderliche Einwilligungen (Cookie-Consent, Newsletter) rechtskonform einzuholen;</li>
          <li>die Anforderungen der österreichischen Datenschutzbehörde (DSB) zu beachten.</li>
        </ul>
        <p>
          Soweit der Vermieter weiterhin Zugang zu den Servern hat, schließen die Parteien einen gesonderten Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO ab.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Haftung und Gewährleistung">
        <p>
          Der Vermieter gewährleistet, dass die Webseite zum Übergabezeitpunkt die vereinbarten Eigenschaften aufweist. Die Gewährleistung richtet sich nach §§ 922 ff ABGB. Mängel sind unverzüglich schriftlich zu rügen.
        </p>
        <p>
          Die Haftung des Vermieters ist — soweit gesetzlich zulässig — auf Vorsatz und grobe Fahrlässigkeit beschränkt. Entgangener Gewinn, Folgeschäden und mittelbare Schäden werden ausgeschlossen.
        </p>
        <p>
          SELINOVA-TECH als Vermittler haftet nur für schuldhaft verursachte Schäden aus der Verletzung wesentlicher Vertragspflichten.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Vertragsende und Rückgabe">
        <p>
          Nach Beendigung des Mietverhältnisses (Kündigung, Ablauf, außerordentliche Kündigung) hat der Mieter:
        </p>
        <ul>
          <li>alle Zugangsdaten unverzüglich zurückzugeben oder zu löschen;</li>
          <li>die eigene Domain (soweit separat) von der gemieteten Webseite zu trennen;</li>
          <li>alle personenbezogenen Daten der Webseitenbesucher gemäß DSGVO zu löschen oder zu exportieren.</li>
        </ul>
        <p>
          Der Vermieter ist berechtigt, die Webseite nach Vertragsende anderweitig zu vermieten oder zu verkaufen.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Schlussbestimmungen">
        <p><strong>Anwendbares Recht:</strong> Es gilt ausschließlich österreichisches Recht unter Ausschluss des UN-Kaufrechts (CISG).</p>
        <p><strong>Gerichtsstand:</strong> Ausschließlich zuständig sind die sachlich zuständigen Gerichte in Wien, Österreich.</p>
        <p><strong>Schriftform:</strong> Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform (E-Mail genügt).</p>
        <p><strong>Salvatorische Klausel:</strong> Sollte eine Bestimmung dieses Vertrages unwirksam sein, berührt dies die Gültigkeit der übrigen Bestimmungen nicht.</p>
        <div className="not-prose mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8">
          {["Vermieter", "Mieter"].map((p) => (
            <div key={p}>
              <p className="text-xs text-slate-500 mb-6">Ort, Datum: <Fill label="ORT, DATUM" /></p>
              <div className="border-t border-slate-400 pt-2">
                <p className="text-xs text-slate-500">{p}: <Fill label="UNTERSCHRIFT" /></p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4">Dieser Vertrag wird in zwei gleichwertigen Exemplaren ausgefertigt, je eines für Vermieter und Mieter. SELINOVA-TECH erhält eine Kopie als Vermittler.</p>
      </LegalSection>
    </LegalLayout>
  )
}
