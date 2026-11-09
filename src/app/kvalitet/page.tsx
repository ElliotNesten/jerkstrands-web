import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/catalog";
import { qualityDetails } from "@/lib/quality";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kvalitet: surdeg, konditori och märkning",
  description:
    "Så arbetar Jerkstrands med kvalitet: eget bageri i Göteborg sedan 1930, lång jäsning, konditorns hantverk och fullständig märkning av varje artikel.",
  alternates: { canonical: "/kvalitet" },
};

export default function KvalitetPage() {
  const withNutrition = products.filter((p) => p.nutrition).length;
  const withEan = products.filter((p) => p.ean).length;
  return (
    <>
      <PageHero
        tone="pistachio"
        crumbs={[{ label: "Kvalitet" }]}
        title="Kvalitet från deg till disk."
        muted={`Eget bageri i Göteborg sedan ${site.founded}.`}
        intro={
          <p>
            Allt bakas av våra egna bagare och konditorer på Slakthusgatan. {withNutrition} av {products.length} artiklar
            har näringsdeklaration här på sajten och {withEan} har EAN-kod.
          </p>
        }
      />

      {qualityDetails.map((d, i) => (
        <section key={d.title} className={i === 1 ? "band bg-raspberry py-20 sm:py-28" : i === 3 ? "band bg-sage py-20 sm:py-28" : "py-20 sm:py-28"}>
          <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <h2 className="t-h2">{d.title}</h2>
              <p className="t-lead mt-5 text-ink-soft">{d.text}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              {"contain" in d ? (
                <div className={i % 2 === 1 ? "rounded-[24px] bg-canvas p-5 sm:p-10" : "rounded-[24px] bg-canvas-soft p-5 sm:p-10"}>
                  <Image src={d.image} alt={d.alt} width={1819} height={507} sizes="(min-width: 1024px) 45vw, 92vw" className="h-auto w-full rounded-[8px] bg-white" />
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className="object-cover"
                    style={{ objectPosition: "position" in d ? d.position : undefined }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-y-8 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <SectionHeading
            className="lg:col-span-8"
            title="Ingredienser och allergener för varje artikel."
            intro="I sortimentet kan du filtrera bort mjölk, ägg, nötter, sesam eller soja."
          />
          <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
            <Link href="/sortiment" className="btn btn-primary">
              Se sortimentet <ArrowRight className="size-4" />
            </Link>
            <Link href="/sortiment?egenskap=laktosfri" className="btn btn-outline">
              Se laktosfria tårtor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
