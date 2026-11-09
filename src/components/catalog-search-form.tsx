import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

/** Enkel sökruta som skickar vidare till katalogen (fungerar utan JavaScript). */
export function CatalogSearchForm({ className }: { className?: string }) {
  return (
    <form action="/sortiment" method="get" role="search" className={cn("relative", className)}>
      <label htmlFor="snabbsok" className="sr-only">
        Sök i sortimentet
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-espresso-500" aria-hidden />
      <input
        id="snabbsok"
        name="q"
        type="search"
        placeholder="Sök produkt, artikelnummer eller EAN…"
        className="h-14 w-full rounded-full border border-cream-400 bg-cream-50 pr-32 pl-13 text-base shadow-soft placeholder:text-espresso-500 focus:border-forest-700 focus:outline-none"
      />
      <button type="submit" className="btn btn-primary btn-sm absolute top-1/2 right-2 -translate-y-1/2">
        Sök
      </button>
    </form>
  );
}
