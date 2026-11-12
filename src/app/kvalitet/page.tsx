import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Em, Wave } from "@/components/decor";
import { Marquee } from "@/components/home/marquee";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/catalog";
import { qualityDetails } from "@/lib/quality";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

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
        crumbs={[{ label: "Kvalitet" }]}
        eyebrow={`Eget bageri sedan ${site.founded}`}
        title={
          <>
            Kvalitet från deg till <em>disk</em>
          </>
        }
        intro={
          <p>
            Allt bakas av våra egna bagare och konditorer på Slakthusgatan. {withNutrition} av {products.length} artiklar har
            näringsdeklaration här på sajten och {withEan} har EAN-kod.
          </p>
        }
        image={{ src: "/images/site/surdegsbrod.jpg", alt: "Surdegsbröd med mjölad skorpa på en skärbräda", position: "50% 55%" }}
      />

      <Marquee />

      {qualityDetails.map((d, i) => {
        const tinted = i === 1;
        const body = (
          <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="t-h2 mt-4">
                <Em>{d.title}</Em>
              </h2>
              <p className="t-lead mt-6 text-ink-soft">{d.text}</p>
            </div>
            <div className={cn("lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
              {"contain" in d ? (
                <div className="sticker bg-mint p-5 sm:p-10">
                  <Image
                    src={d.image}
                    alt={d.alt}
                    width={1819}
                    height={507}
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className="h-auto w-full rounded-[12px] bg-white"
                  />
                </div>
              ) : (
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[32px] border-12 border-white shadow-[var(--shadow-photo)]", i % 2 ? "-rotate-1" : "rotate-1")}>
                  <Image
                    src={d.image}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className="rounded-[20px] object-cover"
                    style={{ objectPosition: "position" in d ? d.position : undefined }}
                  />
                </div>
              )}
            </div>
          </div>
        );
        return tinted ? (
          <section key={d.title}>
            <Wave from="white" to="cream" />
            <div className="bg-cream py-16 lg:py-24">{body}</div>
            <Wave from="cream" to="white" />
          </section>
        ) : (
          <section key={d.title} className="section">
            {body}
          </section>
        );
      })}

      <section className="pb-20 lg:pb-[120px]">
        <div className="wrap">
          <div className="sticker flex flex-col gap-8 bg-butter p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
            <SectionHeading
              title={
                <>
                  Ingredienser och allergener för varje <em>artikel</em>
                </>
              }
              intro="I sortimentet kan du filtrera bort mjölk, ägg, nötter, sesam eller soja."
            />
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href="/sortiment" className="btn btn-primary">
                Se sortimentet <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/sortiment?egenskap=laktosfri" className="btn btn-outline">
                Se laktosfria tårtor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
