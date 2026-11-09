import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  { title: "Välj produkter", text: "Tryck på Hylletikett vid varje artikel i sortimentet." },
  { title: "Fyll i styckpris", text: "Jämförpriset per kilo räknas ut från vikten." },
  { title: "Skriv ut", text: "En PDF i 150 × 39 eller 150 × 45 mm, flera per A4." },
];

/** Säljstöd: hylletiketter med pris, EAN och QR-kod. Text till vänster, etiketten till höger. */
export function LabelsSection() {
  return (
    <section aria-labelledby="etiketter-rubrik" className="screen band bg-pistachio">
      <div className="wrap">
        <SectionHeading
          id="etiketter-rubrik"
          title="Hylletiketter med pris, EAN och QR-kod."
          intro="Gratis för återförsäljare. Välj produkter, fyll i pris och skriv ut direkt från sortimentet."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <ol className="flex flex-col gap-3 lg:col-span-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-[16px] bg-canvas p-5">
                <span className="text-sm font-semibold text-green">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-title">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.text}</p>
                </div>
              </li>
            ))}
            <Link href="/sortiment" className="btn btn-primary mt-3 self-start">
              Skapa hylletiketter <ArrowRight className="size-4" />
            </Link>
          </ol>
          <div className="flex items-center rounded-[24px] bg-canvas p-5 sm:p-10 lg:col-span-7">
            <Image
              src="/images/site/hylletikett-exempel.png"
              alt="Hylletikett för Jordgubbstårta med styckpris 149,90 kr, jämförpris, QR-kod och EAN-streckkod"
              width={1819}
              height={507}
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="h-auto w-full rounded-[8px] bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
