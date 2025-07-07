"use client";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Datenschutzerklärung</h1>

        <section className="space-y-4 text-gray-300 text-sm leading-relaxed">
          <p>
            Der Schutz deiner persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten deine Daten daher ausschließlich
            auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser Datenschutzerklärung informieren wir dich
            über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">1. Kontakt mit uns</h2>
          <p>
            Wenn du per Formular auf der Website oder per E-Mail Kontakt mit uns aufnimmst, werden deine angegebenen Daten zwecks
            Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns gespeichert. Diese Daten geben wir
            nicht ohne deine Einwilligung weiter.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">2. Datenverarbeitung zur Vertragserfüllung</h2>
          <p>
            Zur Erfüllung deines Auftrags (z. B. beim Kauf eines Produkts) verarbeiten wir folgende Daten: Name, Adresse,
            E-Mail-Adresse, Zahlungsdaten und bestellte Produkte. Diese Daten sind zur Vertragserfüllung erforderlich.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">3. Cookies</h2>
          <p>
            Unsere Website verwendet sogenannte Cookies. Dabei handelt es sich um kleine Textdateien, die mit Hilfe des Browsers
            auf deinem Endgerät abgelegt werden. Sie richten keinen Schaden an. Wir nutzen Cookies dazu, unser Angebot
            nutzerfreundlich zu gestalten.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">4. Newsletter</h2>
          <p>
            Wenn du dich für unseren Newsletter anmeldest, verwenden wir deine E-Mail-Adresse ausschließlich für den Versand von
            Informationen und Angeboten. Du kannst dich jederzeit vom Newsletter abmelden. Ein entsprechender Link befindet sich
            am Ende jeder E-Mail.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">5. Deine Rechte</h2>
          <p>
            Dir stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit,
            Widerruf und Widerspruch zu. Wenn du glaubst, dass die Verarbeitung deiner Daten gegen das Datenschutzrecht verstößt
            oder deine datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, kannst du dich bei der
            Aufsichtsbehörde beschweren.
          </p>

          <h2 className="text-xl font-semibold text-white mt-6">6. Verantwortlich für die Datenverarbeitung</h2>
          <p>
            NuroDesigns  
            E-Mail: <a href="mailto:neurodesigns@gmail.com" className="underline text-white">neurodesigns@gmail.com</a>
          </p>

          <p className="text-gray-500 text-xs mt-10">
            Stand: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </section>
      </div>
    </main>
  );
}