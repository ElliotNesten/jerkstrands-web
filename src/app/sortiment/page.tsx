import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/catalog/catalog";
import { PageHero } from "@/components/page-hero";
import { ProductCard, toSummary } from "@/components/product-card";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Sortiment & produktkatalog",
  description:
    "Hela Jerkstrands sortiment med artikelnummer, EAN, ingredienser och allergener. Sök, filtrera och skriv ut hylletiketter direkt.",
  alternates: { canonical: "/sortiment" },
};

const items = products.map((p) => ({ ...toSummary(p), hasProductData: p.hasProductData }));

export default function SortimentPage() {
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Sortiment" }]}
        eyebrow="Produktkatalog"
        title="Sortiment"
        intro={
          <p>
            Sök bland {products.length} artiklar på namn, artikelnummer eller EAN. Varje produkt har fullständig
            ingrediensförteckning, allergener och näringsvärden – och hylletiketter du skriver ut direkt.
          </p>
        }
      />
      <section className="container-site py-8 sm:py-10">
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
      <div className="h-14 w-full rounded-full border border-cream-400 bg-cream-50 shadow-soft" aria-hidden />
      <p className="mt-8 text-sm text-espresso-700">{products.length} artiklar</p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} showLabelButton={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
