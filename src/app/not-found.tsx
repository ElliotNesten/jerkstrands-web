import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogSearchForm } from "@/components/catalog-search-form";
import { Sparkle, Wave } from "@/components/decor";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative bg-cream">
        <Sparkle className="absolute top-8 left-[4%] size-12 text-butter" />
        <Sparkle className="absolute top-24 right-[8%] size-8 text-moss" />
        <div className="wrap py-20 lg:py-28">
          <div className="max-w-4xl" data-enter>
            <p className="eyebrow">Fel 404</p>
            <h1 className="t-display mt-6">
              Sidan finns inte, men <em>sortimentet</em> finns kvar.
            </h1>
            <CatalogSearchForm id="sok-404" className="mt-10 max-w-xl" />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/" className="btn btn-primary">
                Gå till startsidan <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/sortiment" className="btn btn-outline">
                Se sortimentet
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Wave from="cream" to="white" />
    </section>
  );
}
