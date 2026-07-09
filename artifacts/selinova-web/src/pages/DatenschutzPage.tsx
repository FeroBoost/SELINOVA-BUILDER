import React from "react"
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout"

export function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13/14 DSGVO und § 24 DSG 2018"
      lastUpdated="Juli 2026"
      badge="DSGVO · DSG 2018"
      backHref="/rechtliches"
    >
      <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 mb-6 text-sm text-blue-800">
        <strong>Ihre Rechte auf einen Blick:</strong> Auskunft · Berichtigung · Löschung · Einschränkung · Widerspruch · Portabilität · Beschwerde bei der DSB (dsb.gv.at). Kontakt: <a href="mailto:datenschutz@selinova-tech.at" className="underline">datenschutz@selinova-tech.at</a>
      </div>

      <LegalSection number="1" title="Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der DSGVO und des österreichischen Datenschutzgesetzes (DSG 2018) ist:
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-sm">
          <strong>SELINOVA-TECH</strong><br />
          Daldaban Ferhan<br />
          Wien, Österreich<br />
          E-Mail: <a href="mailto:datenschutz@selinova-tech.at" className="text-primary hover:underline">datenschutz@selinova-tech.at</a><br />
          Web: www.selinova-tech.at
        </div>
      </LegalSection>

      <LegalSection number="2" title="Welche Daten wir verarbeiten">
        <h3>2.1 Beim Besuch der Website</h3>
        <p>Bei jedem Aufruf unserer Website werden folgende Daten automatisch erhoben (Serverlogfiles):</p>
        <ul>
          <li>IP-Adresse (anonymisiert nach 7 Tagen)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Aufgerufene URL</li>
          <li>Referrer-URL (Seite, von der der Zugriff erfolgte)</li>
          <li>Browser, Betriebssystem, Bildschirmauflösung</li>
        </ul>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Sicherheit und Funktionsfähigkeit der Website).</p>

        <h3>2.2 Bei der Kontaktaufnahme</h3>
        <p>Wenn Sie eine Anfrage über das Kontaktformular oder per E-Mail stellen, verarbeiten wir:</p>
        <ul>
          <li>Name, E-Mail-Adresse, Telefonnummer (soweit angegeben)</li>
          <li>Nachrichteninhalt, Betreff</li>
          <li>Zeitstempel der Anfrage</li>
          <li>Referenz zum jeweiligen Angebot (Listing-ID)</li>
        </ul>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung); Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
        <p><strong>Speicherdauer:</strong> 3 Jahre ab letztem Kontakt, sofern keine längere gesetzliche Aufbewahrungspflicht besteht (z. B. 7 Jahre für Buchhaltungsunterlagen gemäß § 132 BAO).</p>

        <h3>2.3 Bei der Registrierung (Nutzerkonto)</h3>
        <p>Für die Registrierung verarbeiten wir: E-Mail-Adresse, gewähltes Passwort (verschlüsselt), Name, Unternehmensdaten (soweit angegeben).</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.</p>

        <h3>2.4 Bei Transaktionen</h3>
        <p>Zur Abwicklung von Kauf- und Mietverträgen verarbeiten wir: Rechnungsadresse, Zahlungsdaten (nur pseudonymisiert, über Zahlungsdienstleister), Transaktionshistorie.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO; Art. 6 Abs. 1 lit. c DSGVO (gesetzliche Aufbewahrungspflicht gem. § 132 BAO, 7 Jahre).</p>
      </LegalSection>

      <LegalSection number="3" title="Cookies und Tracking">
        <p>
          Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind (z. B. Session-Cookie, CSRF-Schutz). Diese werden ohne Einwilligung gesetzt (§ 165 TKG 2021; Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          Wir verwenden <strong>kein Google Analytics, keine Social-Media-Pixel und kein Cross-Site-Tracking</strong>.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Empfänger und Weitergabe">
        <p>Ihre Daten werden grundsätzlich nicht an Dritte weitergegeben, außer:</p>
        <ul>
          <li><strong>Zahlungsdienstleister</strong> (z. B. Stripe): für die Zahlungsabwicklung;</li>
          <li><strong>Hosting-Provider</strong>: für den Betrieb der Website (Auftragsverarbeitung gem. Art. 28 DSGVO);</li>
          <li><strong>Anbieter auf dem Marktplatz</strong>: Ihre Anfragedaten werden dem jeweiligen Anbieter zwecks Kontaktaufnahme übermittelt;</li>
          <li><strong>Behörden und Gerichte</strong>: soweit gesetzlich verpflichtet.</li>
        </ul>
        <p>Eine Datenübertragung in Drittstaaten außerhalb der EU/EWR erfolgt nur auf Basis der Standardvertragsklauseln der EU-Kommission (Art. 46 DSGVO) oder bei Vorliegen eines Angemessenheitsbeschlusses.</p>
      </LegalSection>

      <LegalSection number="5" title="Ihre Rechte als Betroffene Person">
        <p>Sie haben das Recht auf:</p>
        <ul>
          <li><strong>Auskunft</strong> (Art. 15 DSGVO) über die zu Ihrer Person gespeicherten Daten;</li>
          <li><strong>Berichtigung</strong> (Art. 16 DSGVO) unrichtiger Daten;</li>
          <li><strong>Löschung</strong> (Art. 17 DSGVO, „Recht auf Vergessenwerden");</li>
          <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO);</li>
          <li><strong>Datenportabilität</strong> (Art. 20 DSGVO);</li>
          <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO), insbesondere bei Direktwerbung;</li>
          <li><strong>Widerruf</strong> einer erteilten Einwilligung jederzeit mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
        </ul>
        <p>
          Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:datenschutz@selinova-tech.at" className="text-primary hover:underline font-semibold">datenschutz@selinova-tech.at</a>
        </p>
        <p>
          Sie haben zudem das Recht, eine Beschwerde bei der österreichischen Datenschutzbehörde (DSB) einzureichen:
        </p>
        <div className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm">
          Österreichische Datenschutzbehörde<br />
          Barichgasse 40–42, 1030 Wien<br />
          Telefon: +43 1 52 152-0<br />
          E-Mail: dsb@dsb.gv.at · Web: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.dsb.gv.at</a>
        </div>
      </LegalSection>

      <LegalSection number="6" title="Datensicherheit">
        <p>
          Wir treffen technische und organisatorische Maßnahmen gemäß Art. 32 DSGVO zum Schutz Ihrer Daten, insbesondere: SSL/TLS-Verschlüsselung aller Datenübertragungen, Zugriffskontrollen, pseudonymisierte Datenspeicherung, regelmäßige Sicherheitsupdates und Backups.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Änderungen dieser Datenschutzerklärung">
        <p>
          Diese Datenschutzerklärung kann bei Bedarf aktualisiert werden. Die jeweils aktuelle Version ist unter www.selinova-tech.at/datenschutz abrufbar. Bei wesentlichen Änderungen werden registrierte Nutzer per E-Mail informiert.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
