import Image from "next/image";
import Link from "next/link";
import { CatalogSearchForm } from "@/components/catalog-search-form";
import { SectionHeading } from "@/components/section-heading";
import { categories, categoryCover, productsInCategory, products } from "@/lib/catalog";
import { toneBg } from "@/lib/tones";

/** Skärm tre: sortimentet som galleri – produkterna står för färgen. */
export function RangeSection() {
  const shop = categories.filter((c) => c.segment === "butik" && c.id !== "packat");
  return (
    <section aria-labelledby="sortiment-rubrik" className="screen max-sm:min-h-[200svh]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="sortiment-rubrik"
            className="lg:col-span-7"
            title={`${products.length} artiklar i sortimentet.`}
            intro="Sök på namn, artikelnummer eller EAN, eller börja i en kategori."
          />
          <CatalogSearchForm id="sok-start" className="lg:col-span-5" />
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6">
          {shop.map((c) => (
            <li key={c.id}>
              <Link href={`/sortiment?kategori=${c.id}`} className="lift group block">
                <div className={`relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[4/3] lg:aspect-[3/2] 2xl:aspect-[2/1] ${toneBg[c.tone]}`}>
                  <Image
                    src={categoryCover(c)}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 22vw, 46vw"
                    className="zoom-img object-contain p-6 sm:p-8"
                  />
                </div>
                <h3 className="mt-3 text-[1.0625rem] font-semibold">{c.name}</h3>
                <p className="text-sm text-muted">{productsInCategory(c.id).length} artiklar</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
