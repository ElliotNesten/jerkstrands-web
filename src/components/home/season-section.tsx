import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getProduct } from "@/lib/catalog";
import { currentSeason } from "@/lib/season";

/** Säsong: stort foto bredvid fyra produkter på ljusgrå plattor. Ljusgrå mark som kontrast. */
export function SeasonSection() {
  if (!currentSeason) return null;
  const featured = currentSeason.productSlugs.map(getProduct).filter((p) => p !== undefined);
  return (
    <section aria-labelledby="sasong-rubrik" className="screen rounded-[24px] bg-canvas-soft sm:max-lg:min-h-[200svh]">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="sasong-rubrik" title={currentSeason.title} intro={currentSeason.muted} />
          <Link href={currentSeason.href} className="btn btn-primary self-start lg:self-auto">
            {currentSeason.cta} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] lg:col-span-7 lg:aspect-auto">
            <Image
              src={currentSeason.image}
              alt={currentSeason.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="object-cover"
            />
            <span className="badge-accent absolute top-4 left-4">{currentSeason.badge}</span>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:col-span-5 lg:gap-6">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link href={`/sortiment/${p.slug}`} className="lift group flex h-full flex-col">
                  <div className="relative aspect-square overflow-hidden rounded-[24px] bg-canvas lg:aspect-[5/4]">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 18vw, 44vw" className="zoom-img object-contain p-5" />
                  </div>
                  <p className="mt-2.5 font-semibold">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
