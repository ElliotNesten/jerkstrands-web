import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogSearchForm } from "@/components/catalog-search-form";
import { SectionHeading } from "@/components/section-heading";
import { categories, categoryCover, productsInCategory, products } from "@/lib/catalog";

export function CategoryShowcase() {
  const shop = categories.filter((c) => c.segment === "butik" && c.id !== "packat");
  const hotelCount = products.filter((p) => p.segments.includes("hotell-restaurang")).length;
  return (
    <section aria-labelledby="sortiment-rubrik" className="py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Vårt sortiment"
            title={<span id="sortiment-rubrik">Från frasiga frallor till festtårtor</span>}
            intro="Allt bakas i vårt eget bageri i Göteborg. Sök direkt på namn, artikelnummer eller EAN – och skriv ut hylletiketter med ett klick."
          />
          <CatalogSearchForm className="w-full lg:max-w-md" />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {shop.map((c) => {
            const count = productsInCategory(c.id).length;
            return (
              <li key={c.id}>
                <Link
                  href={`/sortiment?kategori=${c.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-300/70 bg-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <div className="product-stage relative aspect-[5/4]">
                    <Image
                      src={categoryCover(c)}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
                      className="object-contain p-5 drop-shadow-[0_16px_14px_rgba(42,32,25,0.2)] transition-transform duration-500 group-hover:scale-105 sm:p-7"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-4 pt-3 pb-5 sm:px-5">
                    <h3 className="font-display text-lg leading-tight sm:text-xl">{c.name}</h3>
                    <p className="mt-1.5 hidden text-sm leading-snug text-espresso-600 sm:block">{c.description}</p>
                    <p className="mt-auto pt-3 text-xs font-semibold tracking-wide text-gold-700 uppercase">
                      {count} artiklar
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 grid gap-3 sm:gap-5 md:grid-cols-2">
          <Link
            href="/sortiment?kanal=hotell-restaurang"
            className="group relative flex min-h-48 items-end overflow-hidden rounded-3xl p-6 text-cream-50 sm:p-8"
          >
            <Image
              src="/images/site/konditoridisk.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover object-[50%_65%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/45 to-transparent" aria-hidden />
            <div className="relative">
              <p className="eyebrow eyebrow-light">Hotell & restaurang</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl">Frukost, konferens & buffé</p>
              <p className="mt-1 text-sm text-cream-200">{hotelCount} artiklar i branschanpassade storlekar</p>
            </div>
            <ArrowRight className="relative ml-auto size-6 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/sortiment?kategori=packat"
            className="group relative flex min-h-48 items-end overflow-hidden rounded-3xl p-6 text-cream-50 sm:p-8"
          >
            <Image
              src="/images/site/smakakor-packade.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover object-[50%_45%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/35 to-transparent" aria-hidden />
            <div className="relative">
              <p className="eyebrow eyebrow-light">Butiksklart</p>
              <p className="mt-2 font-display text-2xl sm:text-3xl">Packat med EAN</p>
              <p className="mt-1 text-sm text-cream-200">Färdigt för hyllan – med Jerkstrands förpackning</p>
            </div>
            <ArrowRight className="relative ml-auto size-6 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
