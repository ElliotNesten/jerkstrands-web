import Link from "next/link";
import { CatalogSearchForm } from "@/components/catalog-search-form";

export default function NotFound() {
  return (
    <section className="screen">
      <div className="wrap max-w-3xl" data-enter>
        <p className="text-sm font-semibold text-muted">404</p>
        <h1 className="t-display mt-4">Sidan finns inte. <span className="text-ink/65">Sortimentet finns kvar.</span></h1>
        <CatalogSearchForm id="sok-404" className="mt-10 max-w-xl" />
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/" className="btn btn-primary">
            Gå till startsidan
          </Link>
          <Link href="/sortiment" className="btn btn-outline">
            Se sortimentet
          </Link>
        </div>
      </div>
    </section>
  );
}
