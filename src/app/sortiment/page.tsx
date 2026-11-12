import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/catalog/catalog";
import { PageHero } from "@/components/page-hero";
import { ProductCard, toSummary } from "@/components/product-card";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Sortiment och produktkatalog",
  description:
    "Jerkstrands sortiment med artikelnummer, EAN, ingredienser och allergener. Sök, filtrera och skriv ut hylletiketter.",
  alternates: { canonical: "/sortiment" },
};

const items = products.map((p) => ({ ...toSummary(p), hasProductData: p.hasProductData }));

export default function SortimentPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Sortiment" }]}
        eyebrow="Vårt sortiment"
        title={
          <>
            Hela <em>sortimentet</em>
          </>
        }
        intro={`${products.length} artiklar från bageriet, konditoriet och vår foodservice – med EAN, ingredienser och allergener. Sök, filtrera och skriv ut hylletiketter.`}
      />
      <section className="wrap pt-6 pb-24 lg:pt-10">
        <Suspense fallback={<CatalogFallback />}>
          <Catalog products={items} />
        </Suspense>
      </section>
    </>
  );
}

/** Statisk version av katalogen (visas innan filtren laddats och för sökmotorer). */
function CatalogFallback() {
  return (
    <div>
      <div className="h-14 w-full rounded-full border-[1.5px] border-forest bg-white" aria-hidden />
      <ul className="mt-16 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:grid-cols-3 xl:grid-cols-4 min-[1800px]:grid-cols-5">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} showLabelButton={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
