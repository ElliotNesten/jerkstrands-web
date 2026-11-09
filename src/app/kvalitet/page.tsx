import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Ornament } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/catalog";
import { qualityDetails, qualityPillars } from "@/lib/quality";

export const metadata: Metadata = {
  title: "Kvalitet – hantverk, råvaror och tydlig märkning",
  description:
    "Så arbetar Jerkstrands med kvalitet: hantverk sedan 1930, surdeg och långa jäsningar, utvalda råvaror och fullständig produktinformation för varje artikel.",
  alternates: { canonical: "/kvalitet" },
};

const detailImages = [
  { src: "/images/site/ragbrod.jpg", alt: "Rågbröd med snöre och etikett" },
  { src: "/images/site/princesstarta.jpg", alt: "Princesstårta på grön marmor" },
  { src: "/images/site/frallor-korg.jpg", alt: "Frallor i trådkorg" },
  { src: "/images/site/hylletikett-exempel.png", alt: "Hylletikett med EAN och QR-kod", contain: true },
];

export default function KvalitetPage() {
  const withNutrition = products.filter((p) => p.nutrition).length;
  const withEan = products.filter((p) => p.ean).length;
  const lactoseFree = products.filter((p) => p.tags.includes("laktosfri")).length;
  const stats = [
    { value: "1930", label: "Bakar i Göteborg sedan" },
    { value: String(products.length), label: "Artiklar i sortimentet" },
    { value: String(withNutrition), label: "Med näringsdeklaration online" },
    { value: String(lactoseFree), label: "Tårtor finns laktosfria" },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Kvalitet" }]}
        eyebrow="Kvalitet"
        title={
          <>
            Kvalitet i varje led – <em className="text-forest-800 italic">från deg till disk</em>
          </>
        }
        intro={
          <p>
            Vi älskar att baka och gör det alltid med mycket kärlek och hög kvalitet. För oss handlar kvalitet om
            smak och hantverk – men också om att du som kund alltid ska veta exakt vad du säljer.
          </p>
        }
      />

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream-300 bg-cream-300 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-cream-50 px-6 py-7 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-4xl text-forest-800 sm:text-5xl">{s.value}</span>
                  <span className="mt-2 block text-sm text-espresso-600">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {qualityPillars.map((p) => (
              <li key={p.title} className="card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
                  <p.icon className="size-6" aria-hidden />
                </span>
                <h2 className="mt-5 font-display text-xl">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-espresso-700">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {qualityDetails.map((d, i) => {
        const img = detailImages[i];
        return (
          <section key={d.title} className={i % 2 ? "bg-cream-200/60 py-14 sm:py-20" : "py-14 sm:py-20"}>
            <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? "lg:order-last" : undefined}>
                <div
                  className={
                    img.contain
                      ? "rounded-[2rem] bg-cream-50 p-4 shadow-soft sm:p-8"
                      : "relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift"
                  }
                >
                  {img.contain ? (
                    <Image src={img.src} alt={img.alt} width={1819} height={507} sizes="(min-width: 1024px) 45vw, 92vw" className="h-auto w-full" />
                  ) : (
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
                  )}
                </div>
              </div>
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                  <d.icon className="size-6" aria-hidden />
                </span>
                <h2 className="mt-5 text-3xl leading-tight sm:text-[2.6rem]">{d.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-espresso-700">{d.text}</p>
                {i === 3 && (
                  <p className="mt-4 text-sm text-espresso-600">
                    {withEan} av {products.length} artiklar har EAN-kod. Allergener i ingrediensförteckningen skrivs med
                    VERSALER.
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-16 sm:py-20">
        <div className="container-site max-w-3xl text-center">
          <Ornament className="mx-auto w-40 text-gold-500" />
          <blockquote className="mt-8 font-display text-3xl leading-snug text-espresso-900 sm:text-4xl">
            ”Njutningen av att äta en riktigt god tårta tillsammans kommer alltid att vara densamma.”
          </blockquote>
          <p className="mt-6 text-sm font-semibold tracking-[0.18em] text-gold-700 uppercase">Jerkstrands Konditori</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-site">
          <div className="grid gap-8 rounded-[2rem] border border-cream-300 bg-cream-50 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <SectionHeading
              eyebrow="Allergener & innehåll"
              title="All produktinformation – samlad på ett ställe"
              intro="Sök upp valfri artikel i sortimentet för ingredienser, allergener, spår av allergener och näringsvärde per 100 g. Filtrera fram produkter utan mjölk, ägg, nötter, sesam eller soja."
            />
            <div className="flex flex-col gap-3 lg:items-end">
              <Link href="/sortiment" className="btn btn-primary">
                Till sortimentet <ArrowRight className="size-4" />
              </Link>
              <Link href="/sortiment?egenskap=laktosfri" className="btn btn-outline">
                Visa laktosfria alternativ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
