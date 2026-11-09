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
        title="Sortiment."
        muted={`${products.length} artiklar med EAN, ingredienser och allergener.`}
      />
      <section className="wrap pb-24">
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
      <div className="h-14 w-full rounded-full bg-field" aria-hidden />
      <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} showLabelButton={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
