import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  { title: "Välj produkter", text: "Tryck på Hylletikett vid varje artikel i sortimentet." },
  { title: "Fyll i styckpris", text: "Jämförpriset per kilo räknas ut från vikten." },
  { title: "Skriv ut", text: "En PDF i 150 × 39 eller 150 × 45 mm, flera per A4." },
];

/** Säljstöd: hylletiketter med pris, EAN och QR-kod. Text och steg till vänster, ett utskrivet ark till höger. */
export function LabelsSection() {
  return (
    <section aria-labelledby="etiketter-rubrik" className="screen band bg-pistachio">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <SectionHeading
            id="etiketter-rubrik"
            title="Hylletiketter med pris, EAN och QR-kod."
            intro="Gratis för återförsäljare. Välj produkter, fyll i pris och skriv ut direkt från sortimentet."
          />
          <ol className="mt-8 border-t border-ink/15">
            {steps.map((s, i) => (
              <li key={s.title} className="border-b border-ink/15 py-4">
                <p className="t-label text-green-deep">Steg {i + 1}</p>
                <h3 className="t-title mt-1">{s.title}</h3>
                <p className="mt-1 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/sortiment" className="btn btn-primary mt-8">
            Skapa hylletiketter <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-[24px] bg-canvas p-4 sm:p-6 lg:col-span-5 lg:col-start-8">
          <Image
            src="/images/site/hylletiketter-ark.png"
            alt="Utskrivet ark med hylletiketter för Baguette Blanche, Barkis och Danskt Rågbröd med styckpris, jämförpris, QR-kod och EAN-streckkod"
            width={1600}
            height={1357}
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="h-auto max-h-[calc(100svh-var(--padt)-var(--padb)-4rem)] w-auto max-w-full rounded-[8px] bg-white"
          />
        </div>
      </div>
    </section>
  );
}
