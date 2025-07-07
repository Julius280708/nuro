"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function QandA() {
  const [question, setQuestion] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const suggestions: string[] = [
    "Wie lange dauert die Lieferung?",
    "Kann ich mein Design später ändern?",
    "Gibt es Rabatte bei Mehrfachbestellungen?",
  ];

  const faqs: FAQ[] = [
    {
      question: "Wie lange dauert die Lieferung?",
      answer:
        "In der Regel dauert der Versand 3–5 Werktage innerhalb Deutschlands. Internationale Lieferungen können 7–14 Tage dauern.",
    },
    {
      question: "Kann ich mein Design nach der Bestellung ändern?",
      answer:
        "Leider nicht – sobald das Design abgeschickt wurde, beginnt die Produktion sofort.",
    },
    {
      question: "Bietet ihr Rückgaben oder Umtausch an?",
      answer:
        "Da jedes T-Shirt individuell bedruckt wird, bieten wir keinen Umtausch an. Bei fehlerhaften Produkten helfen wir natürlich weiter.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sendQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/sendQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (res.ok) {
        setStatus("success");
        setQuestion("");
      } else {
        throw new Error("Sending failed");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-xl mx-auto space-y-10">
        <h1 className="text-3xl font-semibold text-center">Q & A</h1>

        <form onSubmit={sendQuestion} className="space-y-4">
          <label className="block text-sm text-gray-400">
            Deine Frage
            <textarea
              value={question}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setQuestion(e.target.value)
              }
              className="w-full mt-1 p-3 rounded bg-gray-800 border border-gray-600 text-white"
              rows={4}
              placeholder="Stell uns deine Frage hier..."
              required
            />
          </label>

          {question.length === 0 && (
            <div className="text-sm text-gray-400">
              <p className="mb-2">Beispiele:</p>
              <ul className="list-disc ml-5 space-y-1">
                {suggestions.map((sug, i) => (
                  <li
                    key={i}
                    onClick={() => setQuestion(sug)}
                    className="cursor-pointer hover:text-white"
                  >
                    {sug}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-500">
            Mit dem Absenden erklärst du dich einverstanden, dass wir deine Frage
            per E-Mail beantworten dürfen. Deine Daten werden gemäß unserer{" "}
            <a href="/cimage/nurotshirt/PrivacyPolicy/" className="underline">
              Datenschutzerklärung
            </a>{" "}
            verarbeitet.
          </p>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
          >
            {status === "loading" ? "Sende..." : "Frage senden"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm">
              Vielen Dank! Wir melden uns per E-Mail.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">
              Es gab ein Problem beim Versenden. Bitte später erneut versuchen.
            </p>
          )}
        </form>

        <section className="space-y-6 border-t border-gray-700 pt-10">
          <h2 className="text-2xl font-semibold">Häufig gestellte Fragen</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-700 rounded">
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-4 py-3 hover:bg-gray-800"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-400">{faq.answer}</div>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}