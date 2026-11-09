import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, toSummary } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getProduct } from "@/lib/catalog";

const FEATURED = [
  "princesstarta",
  "kanelknut",
  "levain-blanche",
  "carrot-muffin",
  "wienertosca",
  "vetesur-sesam-vallmo",
  "budapestbakelse",
  "frobrod",
];

export function FeaturedProducts() {
  const items = FEATURED.map(getProduct).filter((p) => p !== undefined);
  return (
    <section aria-labelledby="utvalt-rubrik" className="bg-cream-200/60 py-16 sm:py-20 lg:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Ur sortimentet"
            title={<span id="utvalt-rubrik">Klassiker som säljer sig själva</span>}
          />
          <Link href="/sortiment" className="btn btn-outline self-start sm:self-auto">
            Se hela sortimentet <ArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.slug}>
              <ProductCard product={toSummary(p)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
