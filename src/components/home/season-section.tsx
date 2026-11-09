import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getProduct } from "@/lib/catalog";
import { currentSeason } from "@/lib/season";

/**
 * Säsong på bärröd mark: rubrik, knapp och fyra produkter till vänster,
 * säsongsfotot på höger sida i hela sektionens höjd.
 */
export function SeasonSection() {
  if (!currentSeason) return null;
  const featured = currentSeason.productSlugs.map(getProduct).filter((p) => p !== undefined);
  return (
    <section aria-labelledby="sasong-rubrik" className="screen band flex bg-berry text-canvas sm:max-lg:min-h-[200svh]">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-6">
        <div className="flex flex-col lg:col-span-7">
          <SectionHeading id="sasong-rubrik" tone="light" title={currentSeason.title} intro={currentSeason.muted} />
          <Link href={currentSeason.href} className="btn btn-inverse-outline mt-8 self-start">
            {currentSeason.cta} <ArrowRight className="size-4" />
          </Link>
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:mt-auto lg:grid-cols-4 lg:gap-6 lg:pt-8">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link href={`/sortiment/${p.slug}`} className="lift group flex h-full flex-col">
                  <div className="relative aspect-square overflow-hidden rounded-[24px] bg-canvas lg:aspect-[4/5]">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 12vw, 44vw" className="zoom-img object-contain p-4" />
                  </div>
                  <p className="mt-2.5 font-semibold">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] lg:col-span-5 lg:col-start-8 lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={currentSeason.image}
            alt={currentSeason.imageAlt}
            fill
            sizes="(min-width: 1024px) 70vw, 130vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-butter px-3 py-1 text-xs font-semibold text-ink">
            {currentSeason.badge}
          </span>
        </div>
      </div>
    </section>
  );
}
