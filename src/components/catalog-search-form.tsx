import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

/** Sökfält som skickar vidare till katalogen (fungerar utan JavaScript). */
export function CatalogSearchForm({ className, id = "snabbsok" }: { className?: string; id?: string }) {
  return (
    <form action="/sortiment" method="get" role="search" className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        Sök produkt, artikelnummer eller EAN
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden />
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Sök produkt, artikelnummer eller EAN"
        className="field h-14 rounded-full pr-28 pl-13"
      />
      <button type="submit" className="btn btn-primary btn-sm absolute top-1/2 right-2 -translate-y-1/2">
        Sök
      </button>
    </form>
  );
}
