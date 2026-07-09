import React, { useState } from "react"
import { LegalLayout, LegalSection, Fill } from "@/components/layout/LegalLayout"

export function KaufvertragPage() {
  const [nonCompete, setNonCompete] = useState(true)

  return (
    <LegalLayout
      title="Kaufvertrag & Lizenzübertragung"
      subtitle="Vorlage für den vollständigen Erwerb einer Webseite inkl. aller Rechte, Code, Domain und Dokumentation. Österreichisches Recht (ABGB §1053 ff, UrhG §31, DSGVO)."
      lastUpdated="Juli 2026"
      badge="Vertragsvorlage"
      backHref="/rechtliches"
    >
      <div className="not-prose mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl no-print">
        <p className="text-sm font-bold text-emerald-800 mb-3">Optionale Klausel:</p>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setNonCompete((v) => !v)}
            className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${nonCompete ? "bg-emerald-600" : "bg-slate-300"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${nonCompete ? "translate-x-5" : "translate-x-1"}`} />
          </div>
          <span className="text-sm font-semibold text-emerald-800">§ 9 Wettbewerbsverbot einschließen</span>
        </label>
        <p className="text-xs text-emerald-600 mt-2">Gelbe Felder <span className="bg-amber-100 border border-amber-300 text-amber-800 px-1 rounded">[ ]</span> sind vor Unterzeichnung auszufüllen.</p>
      </div>

      <div className="not-prose text-center mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-xl font-black uppercase tracking-wide text-foreground">KAUFVERTRAG UND LIZENZÜBERTRAGUNGSVERTRAG</h2>
        <p className="text-sm text-slate-500 mt-1">Für den Erwerb digitaler Assets · SELINOVA-TECH Marktplatz</p>
      </div>

      <LegalSection number="1" title="Vertragsparteien">
        <p>Dieser Kaufvertrag wird abgeschlossen zwischen:</p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wide mb-2">Verkäufer</p>
            <p className="text-sm text-slate-700">
              Name/Firma: <Fill label="VOLLSTÄNDIGER NAME ODER FIRMENNAME" /><br/>
              Adresse: <Fill label="STRASSE, PLZ, ORT" /><br/>
              E-Mail: <Fill label="E-MAIL ADRESSE" /><br/>
              UID-Nr.: <Fill label="ATU XXXXXXXX" /><br/>
              Firmenbuchnummer (falls vorhanden): <Fill label="FN XXXXXX X" /><br/>
              (nachfolgend „<strong>Verkäufer</strong>")
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wide mb-2">Käufer</p>
            <p className="text-sm text-slate-700">
              Name/Firma: <Fill label="VOLLSTÄNDIGER NAME ODER FIRMENNAME" /><br/>
              Adresse: <Fill label="STRASSE, PLZ, ORT" /><br/>
              E-Mail: <Fill label="E-MAIL ADRESSE" /><br/>
              UID-Nr.: <Fill label="ATU XXXXXXXX" /><br/>
              Firmenbuchnummer (falls vorhanden): <Fill label="FN XXXXXX X" /><br/>
              (nachfolgend „<strong>Käufer</strong>")
            </p>
          </div>
        </div>
        <p>
          Beide Parteien handeln im Rahmen ihrer unternehmerischen/gewerblichen Tätigkeit, sofern nicht anders angegeben. Der Vertrag wird über den SELINOVA-TECH Marktplatz (www.selinova-tech.at) abgewickelt.
        </p>
      </LegalSection>

      <LegalSection number="2" title="Vertragsgegenstand">
        <p>Der Verkäufer verkauft und überträgt an den Käufer das nachfolgend beschriebene digitale Asset vollständig und dauerhaft:</p>
        <div className="not-prose bg-slate-50 border border-slate-200 rounded-lg p-4 my-3">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Bezeichnung", <Fill label="TITEL DER WEBSEITE / PROJEKTS" />],
                ["URL / Domain", <Fill label="www.beispiel.at" />],
                ["Kategorie", <Fill label="z.B. E-Commerce / SaaS / Corporate" />],
                ["Technologie / Framework", <Fill label="z.B. WordPress / Next.js / Shopify" />],
                ["Hosting-Anbieter", <Fill label="z.B. AWS / Hetzner / Vercel" />],
                ["Listing-Referenz (SELINOVA-TECH)", <Fill label="#LISTING-ID" />],
                ["Kurzbeschreibung", <Fill label="FUNKTIONEN, ZIELGRUPPE, BESONDERHEITEN" />],
              ].map(([k, v]) => (
                <tr key={String(k)} className="border-b border-slate-100 last:border-0">
                  <td className="py-2 pr-4 text-slate-500 font-medium w-52 align-top">{k}</td>
                  <td className="py-2 text-slate-700">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Der Lieferumfang umfasst:</p>
        <ul>
          <li>Vollständiger Quellcode (inklusive aller Dateien, Datenbanken, Konfigurationen);</li>
          <li>Übertragung der Domain <Fill label="DOMAIN" /> (Registrar-Transfer);</li>
          <li>Alle bestehenden Hosting-Zugänge und Server-Konfigurationen;</li>
          <li>Vollständige technische Dokumentation und Übergabeanleitung;</li>
          <li>Alle Zugangsdaten (Admin-Bereich, FTP/SSH, Datenbank, API-Keys);</li>
          <li>Bestehende Inhalte, Bilder und Medienbibliothek;</li>
          <li>Kundendaten und CRM-Daten (gemäß DSGVO-Übergabeprotokoll, §10).</li>
        </ul>
      </LegalSection>

      <LegalSection number="3" title="Kaufpreis und Zahlungsbedingungen">
        <p>
          Der Kaufpreis beträgt <Fill label="KAUFPREIS IN EUR" /> (in Worten: <Fill label="BETRAG AUSGESCHRIEBEN" />) zzgl. 20 % österreichischer Umsatzsteuer (= <Fill label="UST-BETRAG" />), <strong>Gesamtbetrag inkl. USt.: <Fill label="GESAMTBETRAG" /></strong>.
        </p>
        <p>Für Unternehmer mit gültiger österreichischer oder EU-UID-Nummer gilt das Reverse-Charge-Verfahren; in diesem Fall ist keine österreichische USt. auszuweisen.</p>
        <p>Der Kaufpreis ist wie folgt zu entrichten:</p>
        <ul>
          <li><strong>Option A (Einmalzahlung):</strong> Gesamtbetrag innerhalb von 7 Tagen nach Vertragsunterzeichnung auf das SELINOVA-TECH Treuhandkonto;</li>
          <li><strong>Option B (Ratenzahlung):</strong> <Fill label="z.B. 50 % bei Vertragsabschluss, 50 % nach erfolgreicher Übergabe" />.</li>
        </ul>
        <p>
          Die Abwicklung erfolgt ausschließlich über das SELINOVA-TECH Treuhandsystem. Der Kaufpreis wird vom Käufer auf das SELINOVA-TECH Treuhandkonto überwiesen und erst nach beiderseitiger Bestätigung der vollständigen Übergabe an den Verkäufer weitergeleitet (abzüglich der SELINOVA-TECH Vermittlungsprovision von <Fill label="X %" />).
        </p>
        <p>
          Zahlungsverzug: Bei Verzug werden Zinsen gemäß § 456 UGB (9,2 % p.a. über Basiszinssatz) verrechnet.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Übergabe und Abnahme">
        <p>
          Die Übergabe aller in §2 genannten Leistungen erfolgt spätestens innerhalb von <Fill label="z.B. 14 Tagen" /> nach vollständiger Zahlung des Kaufpreises auf das Treuhandkonto.
        </p>
        <p>Die Übergabe gilt als vollständig abgeschlossen, wenn:</p>
        <ul>
          <li>der Käufer alle Zugangsdaten erhalten und der Zugang bestätigt wurde;</li>
          <li>der Domain-Transfer abgeschlossen ist und die Domain auf den Käufer registriert ist;</li>
          <li>der Käufer den vollständigen Quellcode erhalten hat;</li>
          <li>eine einmalige Einführungssitzung (remote, <Fill label="X Stunden" />) stattgefunden hat.</li>
        </ul>
        <p>
          Der Käufer hat die übergebenen Leistungen innerhalb von <Fill label="7 Tagen" /> nach Übergabe zu prüfen und etwaige Mängel schriftlich zu rügen (§ 377 UGB analog). Nach Ablauf dieser Frist gilt die Übergabe als angenommen.
        </p>
        <p>
          Nach erfolgter Abnahme durch den Käufer gibt SELINOVA-TECH den Kaufpreis (abzüglich Provision) unverzüglich an den Verkäufer frei.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Vollständige Rechteübertragung und Lizenz">
        <p>
          Der Verkäufer überträgt mit Zahlung des Kaufpreises alle Nutzungs- und Verwertungsrechte an der Webseite und dem Quellcode unwiderruflich, vollständig, zeitlich und räumlich unbegrenzt an den Käufer (§ 31 UrhG).
        </p>
        <p>Die Rechteübertragung umfasst insbesondere:</p>
        <ul>
          <li>das Recht zur Vervielfältigung, Verbreitung, öffentlichen Zugänglichmachung und Bearbeitung;</li>
          <li>das Recht, das Werk weiterzulizenzieren oder zu verkaufen;</li>
          <li>alle Markenrechte und gewerblichen Schutzrechte, die mit der Webseite verbunden sind (soweit vom Verkäufer gehalten);</li>
          <li>das Recht, den Quellcode zu modifizieren und für beliebige Zwecke zu verwenden.</li>
        </ul>
        <p>
          <strong>Urheberpersönlichkeitsrechte</strong> (§ 19 ff UrhG) verbleiben beim ursprünglichen Schöpfer und sind nicht übertragbar. Der Käufer erklärt sich damit einverstanden, dass der Schöpfer nicht verpflichtet ist, als Urheber benannt zu werden.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Drittlizenzen und Open-Source-Komponenten">
        <p>
          Der Verkäufer ist verpflichtet, dem Käufer eine vollständige Liste aller verwendeten Drittanbieter-Bibliotheken, Plugins, Themes und Frameworks mit den jeweiligen Lizenzbedingungen zu übergeben (Übergabedokument).
        </p>
        <p>
          Open-Source-Komponenten werden nur in dem Umfang übertragen, der nach den jeweiligen Open-Source-Lizenzen (MIT, GPL, Apache 2.0 etc.) zulässig ist. Der Käufer hat die Lizenzbedingungen einzuhalten.
        </p>
        <p>
          Der Verkäufer versichert, dass die Webseite keine Drittrechte verletzt und alle verwendeten Ressourcen (Bilder, Fonts, Code) lizenzkonform eingesetzt wurden.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Gewährleistung">
        <p>
          Die gesetzliche Gewährleistungsfrist beträgt 2 Jahre ab Übergabe gemäß §§ 922 ff ABGB sowie dem Verbrauchergewährleistungsgesetz (VGG). Der Verkäufer gewährleistet, dass:
        </p>
        <ul>
          <li>die Webseite zum Übergabezeitpunkt funktionsfähig ist und die in §2 beschriebenen Eigenschaften aufweist;</li>
          <li>er der alleinige Eigentümer und Rechteinhaber der übertragenen Assets ist;</li>
          <li>keine Rechte Dritter (Pfandrechte, Sicherungsübereignungen, Lizenzen) der Übertragung entgegenstehen;</li>
          <li>keine laufenden Rechtsstreitigkeiten betreffend das übertragene Asset bestehen.</li>
        </ul>
        <p>
          Mängel sind vom Käufer innerhalb von 14 Tagen nach Entdeckung schriftlich zu rügen. Primär steht dem Käufer das Recht auf Verbesserung zu; bei Scheitern oder Unverhältnismäßigkeit Preisminderung oder Wandlung (§ 932 ABGB).
        </p>
      </LegalSection>

      <LegalSection number="8" title="Haftung">
        <p>
          Der Verkäufer haftet für Schäden aus der Verletzung von Rechten Dritter (Urheber, Marken), die im Zusammenhang mit dem übertragenen Asset stehen und dem Verkäufer zuzurechnen sind, in vollem Umfang. Im Übrigen ist die Haftung auf Vorsatz und grobe Fahrlässigkeit beschränkt; Haftung für leichte Fahrlässigkeit, entgangener Gewinn und Folgeschäden werden ausgeschlossen.
        </p>
        <p>
          SELINOVA-TECH haftet als Vermittler und Treuhänder nur für schuldhaft verursachte Schäden aus der Verletzung wesentlicher Vertragspflichten.
        </p>
      </LegalSection>

      {nonCompete && (
        <LegalSection number="9" title="Wettbewerbsverbot (optional)">
          <div className="not-prose bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-3 text-xs text-amber-700 font-semibold no-print">
            Diese Klausel ist optional und nur wirksam, wenn sie in diesem Vertrag ausdrücklich vereinbart wird.
          </div>
          <p>
            Der Verkäufer verpflichtet sich, für die Dauer von <Fill label="z.B. 24 Monaten" /> ab Vertragsunterzeichnung im Gebiet <Fill label="z.B. Österreich / DACH-Raum / Europa" /> keine gleichartige Webseite in derselben Branche (<Fill label="BRANCHE/KATEGORIE" />) zu betreiben, zu veräußern oder an Dritte zu lizenzieren.
          </p>
          <p>
            Bei Verstoß gegen dieses Wettbewerbsverbot ist eine Vertragsstrafe von <Fill label="EUR XXXXX" /> fällig, unbeschadet weitergehender Schadenersatzansprüche (§ 1336 ABGB). SELINOVA-TECH ist davon in Kenntnis zu setzen.
          </p>
          <p className="text-sm text-slate-500">
            <em>Hinweis: Wettbewerbsverbote sind nur wirksam, soweit sie sachlich, örtlich und zeitlich angemessen sind (§ 36 AngG analog, § 879 ABGB). Eine Prüfung durch einen österreichischen Rechtsanwalt wird empfohlen.</em>
          </p>
        </LegalSection>
      )}

      <LegalSection number={nonCompete ? "10" : "9"} title="DSGVO-Übergabe und Datenschutz">
        <p>
          Der Verkäufer stellt dem Käufer zum Übergabezeitpunkt folgende Datenschutz-Unterlagen bereit:
        </p>
        <ul>
          <li>Verzeichnis der Verarbeitungstätigkeiten (Art. 30 DSGVO);</li>
          <li>Liste aller Auftragsverarbeiter und bestehender AVV-Vereinbarungen;</li>
          <li>Datenschutz-Folgenabschätzungen (falls vorhanden);</li>
          <li>Informationen über gespeicherte Kundendaten (Kategorien, Umfang, Löschfristen).</li>
        </ul>
        <p>
          Der Käufer übernimmt ab dem Zeitpunkt der Übergabe die datenschutzrechtliche Verantwortung für alle gespeicherten personenbezogenen Daten und verpflichtet sich, den Schutzstandard der DSGVO einzuhalten. Vor der Übergabe bestehender Kundendatenbanken ist zu prüfen, ob eine Datenschutzmitteilung an die betroffenen Personen erforderlich ist.
        </p>
      </LegalSection>

      <LegalSection number={nonCompete ? "11" : "10"} title="Schlussbestimmungen">
        <p><strong>Anwendbares Recht:</strong> Es gilt ausschließlich österreichisches materielles Recht unter Ausschluss des UN-Kaufrechts (CISG) und der IPR-Kollisionsnormen.</p>
        <p><strong>Gerichtsstand:</strong> Ausschließlich zuständig sind die sachlich zuständigen Gerichte in Wien, Österreich (Handelsgericht Wien für Handelssachen).</p>
        <p><strong>Änderungen:</strong> Änderungen und Ergänzungen bedürfen der Schriftform. E-Mail genügt.</p>
        <p><strong>Salvatorische Klausel:</strong> Unwirksame Bestimmungen berühren die Gültigkeit der übrigen Bestimmungen nicht.</p>
        <p><strong>Gesamte Vereinbarung:</strong> Dieser Vertrag und seine Anhänge stellen die gesamte Vereinbarung der Parteien dar und ersetzen alle vorherigen mündlichen oder schriftlichen Absprachen.</p>
        <div className="not-prose mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8">
          {["Verkäufer", "Käufer"].map((p) => (
            <div key={p}>
              <p className="text-xs text-slate-500 mb-6">Ort, Datum: <Fill label="ORT, DATUM" /></p>
              <div className="border-t border-slate-400 pt-2">
                <p className="text-xs text-slate-500">{p}: <Fill label="UNTERSCHRIFT + STEMPEL (falls vorhanden)" /></p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-4">Dieser Vertrag wird in zwei gleichwertigen Exemplaren ausgefertigt, je eines für Verkäufer und Käufer. SELINOVA-TECH erhält eine Kopie als Vermittler. Das SELINOVA-TECH Übergabeprotokoll ist diesem Vertrag als Anhang beizufügen.</p>
      </LegalSection>
    </LegalLayout>
  )
}
