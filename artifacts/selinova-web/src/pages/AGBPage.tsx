import React from "react"
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout"

export function AGBPage() {
  return (
    <LegalLayout
      title="Allgemeine Geschäftsbedingungen (AGB)"
      subtitle="für die Nutzung des SELINOVA-TECH Marktplatzes — Kauf, Verkauf und Vermietung digitaler Webseiten-Produkte"
      lastUpdated="Juli 2026"
      badge="AGB"
      backHref="/rechtliches"
    >
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 mb-6 text-sm text-amber-800">
        <strong>Wichtiger Hinweis:</strong> Diese AGB regeln die Rechtsbeziehung zwischen SELINOVA-TECH (Betreiber des Marktplatzes) und den Nutzern (Käufer, Mieter, Verkäufer). Durch die Nutzung des Marktplatzes stimmen Sie diesen Bedingungen zu. Es gilt österreichisches Recht.
      </div>

      <LegalSection number="1" title="Geltungsbereich und Vertragspartner">
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge, die über den Online-Marktplatz <strong>SELINOVA-TECH</strong> (www.selinova-tech.at), betrieben von Daldaban Ferhan, Wien, Österreich, zwischen dem Plattformbetreiber und den Nutzern sowie zwischen Käufern/Mietern und Verkäufern/Vermietern geschlossen werden.
        </p>
        <p>
          Der Marktplatz vermittelt den Kauf, Verkauf sowie die Vermietung von professionellen Webseiten, SaaS-Plattformen, Web-Applikationen und verwandten digitalen Produkten. Abweichende, entgegenstehende oder ergänzende AGB der Nutzer werden nicht Vertragsbestandteil, es sei denn, SELINOVA-TECH stimmt diesen ausdrücklich schriftlich zu.
        </p>
        <p>
          Die jeweils aktuelle Fassung der AGB ist jederzeit unter www.selinova-tech.at/agb abrufbar.
        </p>
      </LegalSection>

      <LegalSection number="2" title="Leistungsbeschreibung und Marktplatzfunktion">
        <p>SELINOVA-TECH stellt einen digitalen Marktplatz zur Verfügung, auf dem:</p>
        <ul>
          <li><strong>Verkäufer und Vermieter</strong> (Anbieter) ihre digitalen Produkte (Webseiten, Apps, SaaS-Lösungen) anbieten können;</li>
          <li><strong>Käufer und Mieter</strong> (Interessenten) digitale Produkte suchen, anfragen und erwerben können;</li>
          <li><strong>SELINOVA-TECH</strong> als Vermittler und Treuhänder fungiert und die Transaktion gegen eine Vermittlungsprovision abwickelt.</li>
        </ul>
        <p>
          SELINOVA-TECH ist selbst nicht Verkäufer der angebotenen Produkte, sofern nicht ausdrücklich als Anbieter gekennzeichnet. Die Verträge kommen direkt zwischen Käufer/Mieter und Anbieter zustande.
        </p>
      </LegalSection>

      <LegalSection number="3" title="Registrierung und Nutzerkonto">
        <p>
          Die Nutzung bestimmter Funktionen des Marktplatzes (Anzeige aufgeben, Anfragen stellen) erfordert eine Registrierung. Bei der Registrierung sind wahrheitsgemäße und vollständige Angaben zu machen. Die Zugangsdaten sind geheim zu halten. Nutzer haften für alle Aktivitäten, die unter ihrem Konto vorgenommen werden.
        </p>
        <p>
          SELINOVA-TECH behält sich vor, Nutzerkonten bei Verstößen gegen diese AGB oder gesetzliche Vorschriften ohne Vorankündigung zu sperren oder zu löschen.
        </p>
      </LegalSection>

      <LegalSection number="4" title="Vertragsabschluss">
        <p>
          Angebote auf dem Marktplatz stellen keine verbindlichen Kaufangebote, sondern <em>invitatio ad offerendum</em> (Aufforderung zur Abgabe eines Angebots) dar. Der Kaufvertrag bzw. Mietvertrag kommt erst durch die ausdrückliche schriftliche Bestätigung beider Parteien (Anbieter und Käufer/Mieter) zustande, in der Regel vermittelt durch SELINOVA-TECH.
        </p>
        <p>
          Die Abwicklung erfolgt über das SELINOVA-TECH Treuhandsystem: Der Kaufpreis wird von SELINOVA-TECH treuhändig verwahrt und erst nach vollständiger Übergabe aller vereinbarten Leistungen an den Anbieter ausgezahlt.
        </p>
      </LegalSection>

      <LegalSection number="5" title="Preise, Zahlung und Fälligkeit">
        <p>
          Alle auf dem Marktplatz angegebenen Preise sind, soweit nicht anders ausgewiesen, Nettopreise in Euro (EUR) zzgl. der gesetzlichen österreichischen Umsatzsteuer (20 % USt.). Für Leistungen an Unternehmer mit gültiger UID-Nummer gilt das Reverse-Charge-Verfahren.
        </p>
        <p>
          Die Zahlung erfolgt im Wege des von SELINOVA-TECH angebotenen Zahlungsdienstleisters. Rechnungen sind unverzüglich, spätestens innerhalb von 14 Tagen ab Rechnungsdatum zu begleichen. Bei Zahlungsverzug werden Verzugszinsen gemäß § 1000 ABGB bzw. § 456 UGB (9,2 % über dem Basiszinssatz) verrechnet.
        </p>
      </LegalSection>

      <LegalSection number="6" title="Widerrufsrecht für Verbraucher">
        <p>
          Verbrauchern (Personen, die außerhalb ihrer gewerblichen Tätigkeit handeln) steht gemäß §§ 11 ff FAGG (Fern- und Auswärtsgeschäfte-Gesetz) ein 14-tägiges Widerrufsrecht zu, beginnend mit dem Tag des Vertragsabschlusses.
        </p>
        <p>
          <strong>Ausnahmen:</strong> Das Widerrufsrecht erlischt vorzeitig bei digitalen Inhalten (§ 18 Abs. 1 Z 13 FAGG), wenn:
        </p>
        <ul>
          <li>der Käufer/Mieter ausdrücklich zugestimmt hat, dass vor Ablauf der Widerrufsfrist mit der Leistung begonnen wird, und</li>
          <li>bestätigt hat, dass er sein Widerrufsrecht verliert, sobald der Vertrag vollständig erfüllt wurde.</li>
        </ul>
        <p>
          Das Musterformular für den Widerruf wird auf Anfrage unter hallo@selinova-tech.at zur Verfügung gestellt.
        </p>
      </LegalSection>

      <LegalSection number="7" title="Gewährleistung">
        <p>
          Es gelten die gesetzlichen Gewährleistungsbestimmungen der §§ 922 ff ABGB sowie das Verbrauchergewährleistungsgesetz (VGG) in der jeweils geltenden Fassung. Die Gewährleistungsfrist beträgt 2 Jahre ab Übergabe des Produkts.
        </p>
        <p>
          Der Käufer/Mieter hat Mängel innerhalb einer angemessenen Frist (in der Regel 14 Tage) nach Entdeckung schriftlich zu rügen. SELINOVA-TECH und/oder der Anbieter sind primär zur Verbesserung oder zum Austausch berechtigt; nur bei Scheitern steht dem Käufer Preisminderung oder Rücktritt zu.
        </p>
      </LegalSection>

      <LegalSection number="8" title="Haftungsbeschränkung">
        <p>
          SELINOVA-TECH haftet als Vermittler nur für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit sowie für entgangenen Gewinn, Folgeschäden und mittelbare Schäden wird die Haftung — soweit gesetzlich zulässig — ausgeschlossen.
        </p>
        <p>
          SELINOVA-TECH übernimmt keine Haftung für die Richtigkeit, Vollständigkeit und Aktualität der von Anbietern eingestellten Angebote sowie für die technische Verfügbarkeit der vermittelten digitalen Produkte nach der Übergabe.
        </p>
        <p>
          Die Haftung gemäß dem Produkthaftungsgesetz (PHG) und für Schäden aus der Verletzung von Leben, Körper oder Gesundheit bleibt unberührt.
        </p>
      </LegalSection>

      <LegalSection number="9" title="Pflichten der Anbieter (Verkäufer/Vermieter)">
        <p>Anbieter auf dem SELINOVA-TECH Marktplatz verpflichten sich:</p>
        <ul>
          <li>Nur Produkte anzubieten, über die sie vollständig verfügungsberechtigt sind;</li>
          <li>Alle Angaben zu den Angeboten wahrheitsgemäß, vollständig und aktuell zu halten;</li>
          <li>Keine Rechte Dritter (Urheber, Marken, Patente) zu verletzen;</li>
          <li>Die vereinbarten Produkte und Dokumentationen vollständig und fristgerecht zu übergeben;</li>
          <li>Die DSGVO-Konformität ihrer Produkte sicherzustellen und dem Käufer entsprechende Unterlagen zu übergeben.</li>
        </ul>
        <p>
          SELINOVA-TECH ist berechtigt, Angebote ohne Angabe von Gründen zu entfernen, insbesondere bei Verdacht auf Rechtsverletzungen.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Geistiges Eigentum und Lizenzrechte">
        <p>
          Mit dem Kauf eines Produkts erwirbt der Käufer sämtliche Nutzungs- und Verwertungsrechte am übertragenen Produkt gemäß dem jeweiligen Kaufvertrag und § 31 ff UrhG. Soweit Drittlizenzen (Open-Source-Software, Plugins, Frameworks) Bestandteil des Produkts sind, werden diese nur in dem Umfang übertragen, der nach den jeweiligen Lizenzbedingungen zulässig ist.
        </p>
        <p>
          Der Käufer ist verpflichtet, die Lizenzbedingungen Dritter einzuhalten. SELINOVA-TECH und der Anbieter haften nicht für Rechtsverletzungen des Käufers nach der Übergabe.
        </p>
        <p>
          Bei <strong>Mietverträgen</strong> erhält der Mieter ein einfaches, nicht übertragbares Nutzungsrecht an dem gemieteten Produkt für die Dauer des Mietverhältnisses. Eine Untervermietung oder Weiterlizenzierung bedarf der schriftlichen Zustimmung des Anbieters.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Datenschutz">
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutz-Grundverordnung (DSGVO), dem österreichischen Datenschutzgesetz (DSG 2018) und der Datenschutzerklärung von SELINOVA-TECH (www.selinova-tech.at/datenschutz). Durch die Nutzung des Marktplatzes stimmt der Nutzer der Verarbeitung seiner Daten im Rahmen der Datenschutzerklärung zu.
        </p>
      </LegalSection>

      <LegalSection number="12" title="Änderungen der AGB">
        <p>
          SELINOVA-TECH ist berechtigt, diese AGB jederzeit mit Wirkung für die Zukunft zu ändern. Registrierte Nutzer werden über wesentliche Änderungen per E-Mail informiert. Widerspricht der Nutzer den geänderten AGB nicht innerhalb von 30 Tagen nach Bekanntgabe, gelten die geänderten AGB als akzeptiert. Auf dieses Widerspruchsrecht wird im Änderungsschreiben ausdrücklich hingewiesen.
        </p>
      </LegalSection>

      <LegalSection number="13" title="Schlussbestimmungen">
        <p>
          <strong>Anwendbares Recht:</strong> Es gilt ausschließlich österreichisches materielles Recht, unter Ausschluss des UN-Kaufrechts (CISG) und der Kollisionsregeln des IPR.
        </p>
        <p>
          <strong>Gerichtsstand:</strong> Für alle Streitigkeiten zwischen Unternehmern ist ausschließlich das sachlich zuständige Gericht in Wien, Österreich zuständig. Für Verbraucher gilt § 14 KSchG; es ist das Gericht am Wohn- oder Aufenthaltsort des Verbrauchers in Österreich zuständig.
        </p>
        <p>
          <strong>Salvatorische Klausel:</strong> Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, berührt dies die Gültigkeit der übrigen Bestimmungen nicht. Anstelle der unwirksamen Bestimmung gilt die gesetzlich zulässige Regelung, die dem wirtschaftlichen Zweck der unwirksamen Klausel am nächsten kommt.
        </p>
        <p>
          <strong>Schriftform:</strong> Änderungen oder Ergänzungen dieser AGB bedürfen der Schriftform. E-Mail genügt der Schriftform.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
