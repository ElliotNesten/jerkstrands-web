import { Search } from "lucide-react";

/** Sökfält som skickar vidare till katalogen (fungerar utan JavaScript). */
export function CatalogSearchForm({ className, id = "snabbsok" }: { className?: string; id?: string }) {
  return (
    <form action="/sortiment" method="get" role="search" className={className}>
      <label htmlFor={id} className="mb-2 block font-medium">
        Sök i sortimentet
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          id={id}
          name="q"
          type="search"
          placeholder="Produkt, artikelnummer eller EAN"
          className="field h-16 rounded-full border-[1.5px] border-forest pr-28 pl-13"
        />
        <button type="submit" className="btn btn-primary btn-md absolute top-1/2 right-2 -translate-y-1/2">
          Sök
        </button>
      </div>
    </form>
  );
}
