import Link from "next/link";
import { CatalogSearchForm } from "@/components/catalog-search-form";
import { Ornament } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="paper-texture">
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-4 text-4xl sm:text-6xl">Den här sidan har tyvärr ätits upp</h1>
        <p className="mt-5 max-w-lg text-lg text-espresso-700">
          Sidan du letar efter finns inte längre – men sortimentet är nybakat. Sök efter en produkt eller gå tillbaka
          till startsidan.
        </p>
        <CatalogSearchForm className="mt-8 w-full max-w-lg" />
        <Ornament className="mt-10 w-36 text-gold-500" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Till startsidan
          </Link>
          <Link href="/sortiment" className="btn btn-outline">
            Se sortimentet
          </Link>
        </div>
      </div>
    </section>
  );
}
