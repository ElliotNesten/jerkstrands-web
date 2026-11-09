import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { currentSeason } from "@/lib/season";

export function SeasonSection() {
  if (!currentSeason) return null;
  const featured = currentSeason.productSlugs.map(getProduct).filter((p) => p !== undefined);
  return (
    <section aria-labelledby="sasong-rubrik" className="bg-cream-200/70 py-16 sm:py-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] shadow-lift">
          <Image
            src={currentSeason.image}
            alt={currentSeason.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover"
          />
          <span className="absolute top-5 left-5 rounded-full bg-berry-600 px-3 py-1 text-xs font-semibold tracking-wide text-cream-50">
            {currentSeason.badge}
          </span>
        </div>
        <div>
          <p className="eyebrow">{currentSeason.eyebrow}</p>
          <h2 id="sasong-rubrik" className="mt-4 text-[2.1rem] leading-[1.08] sm:text-5xl">
            {currentSeason.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-espresso-700">{currentSeason.text}</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/sortiment/${p.slug}`}
                  className="group block rounded-2xl border border-cream-300 bg-cream-50 p-2 text-center transition-shadow hover:shadow-soft"
                >
                  <div className="product-stage relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="140px"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 text-xs leading-tight font-semibold">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={currentSeason.href} className="btn btn-primary mt-8">
            {currentSeason.cta} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
