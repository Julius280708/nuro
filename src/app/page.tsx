"use client";

import Link from "next/link";
import Image from "next/image";

import { Instagram, Facebook } from "lucide-react";
import { JSX, useEffect, useState } from "react";

type Language = "EN" | "DE";
type Consent = "accepted" | "declined" | "settings" | null;

declare global {
  interface Window {
    Snipcart?: any;
  }
}

export default function HomePage(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("EN");
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  

  useEffect(() => {
    setMounted(true);
    setYear(new Date().getFullYear());
    const storedConsent = localStorage.getItem("nuro-cookie-consent") as Consent;
    if (storedConsent) {
      setConsent(storedConsent);
    }
  }, []);
  const [snipcartReady, setSnipcartReady] = useState(false);

useEffect(() => {
  const check = () => {
    if (window.Snipcart) {
      setSnipcartReady(true);
    } else {
      setTimeout(check, 300);
    }
  };

  if (typeof window !== "undefined") {
    check();
  }
}, []);

 // Prevent hydration mismatch

  const handleConsent = (value: Consent) => {
    localStorage.setItem("nuro-cookie-consent", value ?? "");
    setConsent(value);
  };

  const t = {
    EN: {
      heroTitle: "Look different,\nthink different.",
      heroSubtitle:
        "Introducing TE1! — your customised t-shirt first edition. Designed for those who stand out.",
      buyNow: "Buy Now",
      nurotshirtTitle: "Nuro T-Shirts",
      customizeNow: "Customize Now",
      aboutUs: "About Us",
      logosTitle: "Logos and Fontstyles",
      logosDesc:
        "Premium art and fontstyles for your fit that make you stand out. Over 100+ designs to choose from, created by artists worldwide.",
      logosBtn: "Designed Logos",
      communityTitle: "Logos of our Customers",
      communityBtn: "Community Logos",
      nurotshirt: "Nuro T-Shirt",
      nurotshirtDesc: "The perfect blend of comfort and style, tailored just for you.",
      cookieText: "This website uses cookies to improve your experience.",
      moreInfo: "Learn more",
      qna: "Q & A",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
      login: "Login / Register",
    },
    DE: {
      heroTitle: "Sieh anders aus,\ndenke anders.",
      heroSubtitle:
        "Entdecke TE1! — dein individuell gestaltetes T-Shirt der ersten Edition. Für alle, die herausstechen wollen.",
      buyNow: "Jetzt kaufen",
      customizeNow: "Jetzt gestalten",
      aboutUs: "Über uns",
      logosTitle: "Logos und Schriftarten",
      logosDesc:
        "Exklusive Kunstwerke und Schriftarten für dein Outfit. Über 100+ Designs von Künstler:innen weltweit.",
      logosBtn: "Designte Logos",
      communityTitle: "Logos unserer Kunden",
      communityBtn: "Community Logos",
      cookieText:
        "Diese Website verwendet Cookies, um dein Erlebnis zu verbessern.",
      moreInfo: "Mehr erfahren",
      qna: "Fragen & Antworten",
      privacy: "Datenschutzerklärung",
      terms: "Nutzungsbedingungen",
      contact: "Kontakt",
      login: "Anmelden / Registrieren",
    },
  }[language];

  return (
    <main className="min-h-screen bg-black text-white font-sans relative">
      {/* Cookie Consent */}
      {mounted && !consent && snipcartReady && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 text-gray-200 p-6 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-xl">
            <h2 className="text-lg font-bold mb-3">
              {language === "EN"
                ? "Your privacy matters"
                : "Deine Datenschutzeinstellungen"}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              {language === "EN"
                ? "We use cookies to understand what products are most loved. No ads, no third-party tracking."
                : "Wir verwenden Cookies, um zu verstehen, welche Produkte am beliebtesten sind. Keine Werbung, kein Tracking durch Dritte."}
            </p>
            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => handleConsent("declined")}
                className="px-5 py-2 text-sm rounded-full border border-gray-500 text-gray-300 hover:bg-gray-800"
              >
                {language === "EN" ? "Decline" : "Ablehnen"}
              </button>
              <button
                onClick={() => handleConsent("settings")}
                className="px-5 py-2 text-sm rounded-full border border-blue-500 text-blue-300 hover:bg-blue-900"
              >
                {language === "EN" ? "Settings" : "Einstellungen"}
              </button>
              <button
                onClick={() => handleConsent("accepted")}
                className="px-5 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {language === "EN" ? "Accept All" : "Alle akzeptieren"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Right Controls */}
      

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight whitespace-pre-line">
          {t.heroTitle}
        </h1>
        <p className="text-lg md:text-xl max-w-xl text-gray-400">
          {t.heroSubtitle}
        </p>
        <Link href="/nurotshirt/">
          <button
            onClick={() => setLoading(true)}
            className="mt-10 px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition"
          >
            {loading ? "Loading..." : t.buyNow}
          </button>
        </Link>
      </section>

      {/* Product + Logos Sections */}
      {[
        {
          id: "te1",
          title: "TE1! First Edition",
          subtitle: t.heroSubtitle,
          button: t.customizeNow,
          link: "/cimage/nurotshirt/PrivacyPolicy/QNA/custometshirt/",
        },
        {
          id: "logos",
          title: t.logosTitle,
          subtitle: t.logosDesc,
          button: t.logosBtn,
          link: "/cimage/nurotshirt/PrivacyPolicy/QNA/login/uploadimage/",
        },
        {
          id: "community",
          title: t.communityTitle,
          subtitle: t.logosDesc,
          button: t.communityBtn,
          link: "/cimage/",
        },
        {
          id: "nurotshirt",
          title: t.nurotshirtTitle,
          subtitle: t.nurotshirtDesc,
          button: t.nurotshirt,
          link: "/cimage/nurotshirt/",
        },
      ].map((section) => (
        <section
          key={section.id}
          className="py-20 px-4 border-t border-gray-800"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <Link href={section.link}>
              <Image
                src="/img/image.png"
                width={400}
                height={400}
                alt={`Image for ${section.title}`}
                className="bg-black rounded-xl shadow-lg cursor-pointer"
                />
            </Link>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{section.title}</h2>
              <p className="text-gray-400 mb-6 max-w-md">{section.subtitle}</p>
              <Link href={section.link}>
                <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition">
                  {section.button}
                </button>
              </Link>
            </div>
          </div>
        </section>
      ))}
      
      {/* Footer */}
      <footer className="py-12 px-6 text-center text-gray-500 text-sm border-t border-gray-800 space-y-6">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/nurotshirt/PrivacyPolicy/QNA" className="hover:underline">
            {t.qna}
          </Link>
          <Link href="/cimage/nurotshirt/PrivacyPolicy/" className="hover:underline">
            {t.privacy}
          </Link>
          <Link href="/terms" className="hover:underline">
            {t.terms}
          </Link>
          <Link href="mailto:neurodesigns@gmail.com" className="hover:underline">
            {t.contact}
          </Link>
        </div>
        <div className="flex justify-center gap-6 text-gray-500">
          <Link
            href="https://www.instagram.com/nurodesigns/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Instagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.facebook.com/nurodesigns/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Facebook className="w-5 h-5" />
          </Link>
        </div>
        <p>&copy; {year ?? "-"} Nuro. All rights reserved.</p>
      </footer>
    </main>
  );
}