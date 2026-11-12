import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Sparkle } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  { title: "Välj produkter", text: "Tryck på Hylletikett vid varje artikel i sortimentet." },
  { title: "Fyll i styckpris", text: "Jämförpriset per kilo räknas ut från vikten." },
  { title: "Skriv ut", text: "En PDF i 150 × 39 eller 150 × 45 mm, flera per A4." },
];

/** Säljstöd: hylletiketter med pris, EAN och QR-kod. Text och steg till vänster, ett utskrivet ark till höger. */
export function LabelsSection() {
  return (
    <section aria-labelledby="etiketter-rubrik" className="section relative bg-white">
      <Sparkle className="absolute top-16 right-[5%] size-8 text-butter" />
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <SectionHeading
            id="etiketter-rubrik"
            eyebrow="Säljstöd för butik"
            title={
              <>
                Hylletiketter med pris, EAN och <em>QR-kod</em>
              </>
            }
            intro="Gratis för kunder. Välj produkter, fyll i pris och skriv ut direkt från sortimentet."
          />
          <ol className="mt-10 border-t border-hairline">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-6 border-b border-hairline py-5">
                <span className="font-display w-10 shrink-0 text-[2.5rem] leading-none font-semibold text-leaf italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-title">{s.title}</h3>
                  <p className="t-body mt-1 text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/sortiment" className="btn btn-primary mt-10">
            Skapa hylletiketter <ArrowRight className="size-6" aria-hidden />
          </Link>
        </div>
        <div className="sticker flex items-center justify-center bg-mint p-4 sm:p-8 lg:col-span-5 lg:col-start-8 lg:-rotate-1">
          <Image
            src="/images/site/hylletiketter-ark.png"
            alt="Utskrivet ark med hylletiketter för Baguette Blanche, Barkis och Danskt Rågbröd med styckpris, jämförpris, QR-kod och EAN-streckkod"
            width={1600}
            height={1357}
            sizes="(min-width: 1024px) 36vw, 100vw"
            className="h-auto w-full rounded-[12px] bg-white"
          />
        </div>
      </div>
    </section>
  );
}
