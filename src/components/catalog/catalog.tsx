"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search, SlidersHorizontal, Tag, X } from "lucide-react";
import { ProductCard, labelProduct, type ProductSummary } from "@/components/product-card";
import { AddLabelButton } from "@/components/labels/add-label-button";
import {
  activeFilterCount,
  applyFilters,
  categoryCounts,
  filtersToQuery,
  parseFilters,
  toCatalogItem,
  type Filters,
} from "@/components/catalog/filtering";
import {
  allergenLabels,
  categories,
  filterableAllergens,
  formatWeight,
  getCategory,
  segments,
  tagLabels,
  type CategoryId,
  type TagId,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

type Item = ProductSummary & { hasProductData: boolean };

const FILTER_TAGS: TagId[] = ["laktosfri", "packad", "mini"];

export function Catalog({ products }: { products: Item[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlFilters = useMemo(() => parseFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const [query, setQuery] = useState(urlFilters.q);
  const filters: Filters = useMemo(() => ({ ...urlFilters, q: query }), [urlFilters, query]);
  const items = useMemo(() => products.map(toCatalogItem), [products]);
  const results = useMemo(() => applyFilters(items, filters), [items, filters]);
  const counts = useMemo(() => categoryCounts(items, filters), [items, filters]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function update(patch: Partial<Filters>) {
    const next = { ...urlFilters, q: query, ...patch };
    router.replace(`/sortiment${filtersToQuery(next)}`, { scroll: false });
  }

  // Skriv söktexten till adressfältet med en kort fördröjning
  useEffect(() => {
    if (query === urlFilters.q) return;
    const t = setTimeout(() => {
      router.replace(`/sortiment${filtersToQuery({ ...urlFilters, q: query })}`, { scroll: false });
    }, 350);
    return () => clearTimeout(t);
  }, [query, urlFilters, router]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (mobileOpen && !d.open) d.showModal();
    if (!mobileOpen && d.open) d.close();
  }, [mobileOpen]);

  const activeCount = activeFilterCount(filters);
  const clearAll = () => {
    setQuery("");
    router.replace("/sortiment", { scroll: false });
  };

  const panel = <FilterPanel filters={filters} counts={counts} onChange={update} onClear={clearAll} />;

  return (
    <div>
      {/* Sökfält + kanal */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="katalogsok" className="sr-only">
            Sök i sortimentet
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-espresso-500" aria-hidden />
          <input
            id="katalogsok"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök produkt, artikelnummer eller EAN…"
            autoComplete="off"
            className="h-14 w-full rounded-full border border-cream-400 bg-cream-50 pr-12 pl-13 text-base shadow-soft placeholder:text-espresso-500 focus:border-forest-700 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-espresso-500 hover:bg-cream-200"
              aria-label="Rensa sökningen"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0" role="group" aria-label="Kanal">
          {[{ id: null, name: "Alla" }, ...segments].map((s) => (
            <button
              key={s.id ?? "alla"}
              type="button"
              aria-pressed={filters.kanal === s.id}
              onClick={() => update({ kanal: s.id, kategori: null })}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
                filters.kanal === s.id
                  ? "border-forest-800 bg-forest-800 text-cream-50"
                  : "border-cream-400 bg-cream-50 text-espresso-800 hover:border-forest-700",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-10">
        <aside className="hidden lg:block" aria-label="Filter">
          <div className="sticky top-32 max-h-[calc(100dvh-9rem)] overflow-y-auto pr-2 pb-6">{panel}</div>
        </aside>

        <div className="min-w-0">
          {/* Resultatrad */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-cream-400 bg-cream-50 px-4 py-2 text-sm font-semibold lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filter
              {activeCount > 0 && (
                <span className="rounded-full bg-forest-800 px-1.5 text-xs text-cream-50">{activeCount}</span>
              )}
            </button>
            <p className="text-sm text-espresso-700" aria-live="polite">
              Visar <strong className="text-espresso-900">{results.length}</strong> av {items.length} artiklar
            </p>
            <div className="ml-auto flex items-center gap-2">
              <label className="sr-only" htmlFor="sortering">
                Sortera
              </label>
              <select
                id="sortering"
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value as Filters["sort"] })}
                className="h-10 rounded-full border border-cream-400 bg-cream-50 px-3 text-sm focus:border-forest-700 focus:outline-none"
              >
                <option value="relevans">{filters.q ? "Bäst träff" : "Namn A–Ö"}</option>
                <option value="namn">Namn A–Ö</option>
                <option value="artikelnummer">Artikelnummer</option>
              </select>
              <div className="flex overflow-hidden rounded-full border border-cream-400 bg-cream-50" role="group" aria-label="Visning">
                <button
                  type="button"
                  aria-pressed={filters.vy === "rutnat"}
                  onClick={() => update({ vy: "rutnat" })}
                  className={cn("p-2.5", filters.vy === "rutnat" ? "bg-forest-800 text-cream-50" : "hover:bg-cream-200")}
                  aria-label="Visa som rutnät"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  aria-pressed={filters.vy === "lista"}
                  onClick={() => update({ vy: "lista" })}
                  className={cn("p-2.5", filters.vy === "lista" ? "bg-forest-800 text-cream-50" : "hover:bg-cream-200")}
                  aria-label="Visa som lista"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <ActiveChips filters={filters} onChange={update} onClearQuery={() => setQuery("")} onClear={clearAll} />

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-gold-300/60 bg-gold-100/60 px-4 py-3 text-sm text-espresso-800">
            <Tag className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden />
            <p>
              <strong>Hylletiketter:</strong> klicka på <em>Etikett</em> för att lägga produkter i utskriftskön. Fyll i
              styckpris och skriv ut 150×39 eller 150×45 mm med EAN-streckkod och QR-kod.
            </p>
          </div>

          {results.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-cream-400 px-6 py-16 text-center">
              <p className="font-display text-2xl">Inga produkter matchar</p>
              <p className="mx-auto mt-2 max-w-md text-espresso-700">
                Prova ett annat sökord eller färre filter. Hittar du inte det du söker? Kontakta oss så hjälper vi dig.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={clearAll} className="btn btn-primary btn-sm">
                  Rensa filter
                </button>
                <Link href="/kontakt" className="btn btn-outline btn-sm">
                  Kontakta oss
                </Link>
              </div>
            </div>
          ) : filters.vy === "lista" ? (
            <ProductTable items={results} />
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 2xl:grid-cols-4">
              {results.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} sizes="(min-width: 1536px) 18vw, (min-width: 768px) 24vw, 46vw" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setMobileOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setMobileOpen(false);
        }}
        className="m-0 mt-auto max-h-[85dvh] w-full max-w-none rounded-t-3xl bg-cream-50 p-0 text-espresso-900 backdrop:bg-espresso-950/40"
        aria-label="Filter"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-300 bg-cream-50 px-5 py-4">
          <span className="font-display text-xl">Filter</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cream-200"
            aria-label="Stäng filter"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-5 py-5">{panel}</div>
        <div className="sticky bottom-0 border-t border-cream-300 bg-cream-50 px-5 py-4">
          <button type="button" onClick={() => setMobileOpen(false)} className="btn btn-primary w-full">
            Visa {results.length} artiklar
          </button>
        </div>
      </dialog>
    </div>
  );
}

function FilterPanel({
  filters,
  counts,
  onChange,
  onClear,
}: {
  filters: Filters;
  counts: Map<CategoryId, number>;
  onChange: (patch: Partial<Filters>) => void;
  onClear: () => void;
}) {
  const groups = [
    { id: "butik", name: "Butik & café", cats: categories.filter((c) => c.segment === "butik") },
    { id: "sasong", name: "Säsong", cats: categories.filter((c) => c.segment === "sasong") },
    { id: "hotell-restaurang", name: "Hotell & restaurang", cats: categories.filter((c) => c.segment === "hotell-restaurang") },
  ].filter((g) => !filters.kanal || g.id === filters.kanal || (filters.kanal === "butik" && g.id === "sasong"));

  const toggle = <T extends string>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">Kategori</h2>
        <button
          type="button"
          onClick={() => onChange({ kategori: null })}
          className={cn(
            "mt-3 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm",
            !filters.kategori ? "bg-forest-800 font-semibold text-cream-50" : "hover:bg-cream-200",
          )}
        >
          Alla kategorier
        </button>
        {groups.map((g) => (
          <div key={g.id} className="mt-4">
            <p className="px-3 text-[0.7rem] font-semibold tracking-wide text-espresso-500 uppercase">{g.name}</p>
            <ul className="mt-1 space-y-0.5">
              {g.cats.map((c) => {
                const count = counts.get(c.id) ?? 0;
                const active = filters.kategori === c.id;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      disabled={!count && !active}
                      aria-pressed={active}
                      onClick={() => onChange({ kategori: active ? null : c.id })}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors disabled:opacity-40",
                        active ? "bg-forest-800 font-semibold text-cream-50" : "hover:bg-cream-200",
                      )}
                    >
                      <span>{c.name}</span>
                      <span className={cn("text-xs tabular-nums", active ? "text-cream-200" : "text-espresso-500")}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <fieldset>
        <legend className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">Egenskaper</legend>
        <div className="mt-3 space-y-2">
          {FILTER_TAGS.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm hover:bg-cream-200">
              <input
                type="checkbox"
                checked={filters.egenskap.includes(t)}
                onChange={() => onChange({ egenskap: toggle(filters.egenskap, t) })}
                className="size-4 accent-forest-800"
              />
              {t === "mini" ? "Mini / portionsstorlek" : tagLabels[t]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">
          Innehåller inte
        </legend>
        <div className="mt-3 space-y-2">
          {filterableAllergens.map((a) => (
            <label key={a} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-sm hover:bg-cream-200">
              <input
                type="checkbox"
                checked={filters.utan.includes(a)}
                onChange={() => onChange({ utan: toggle(filters.utan, a) })}
                className="size-4 accent-forest-800"
              />
              {allergenLabels[a]}
            </label>
          ))}
        </div>
        <p className="mt-3 px-3 text-xs leading-relaxed text-espresso-600">
          Baserat på ingrediensförteckningen. Spår av allergener kan förekomma – se &quot;Kan innehålla spår av&quot; på
          respektive produkt.
        </p>
      </fieldset>

      {activeFilterCount(filters) + (filters.q ? 1 : 0) > 0 && (
        <button type="button" onClick={onClear} className="btn btn-outline btn-sm w-full">
          Rensa alla filter
        </button>
      )}
    </div>
  );
}

function ActiveChips({
  filters,
  onChange,
  onClearQuery,
  onClear,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onClearQuery: () => void;
  onClear: () => void;
}) {
  const chips: { key: string; label: string; remove: () => void }[] = [];
  if (filters.q) chips.push({ key: "q", label: `”${filters.q}”`, remove: onClearQuery });
  if (filters.kanal)
    chips.push({
      key: "kanal",
      label: segments.find((s) => s.id === filters.kanal)?.name ?? filters.kanal,
      remove: () => onChange({ kanal: null }),
    });
  if (filters.kategori)
    chips.push({
      key: "kategori",
      label: getCategory(filters.kategori)?.name ?? filters.kategori,
      remove: () => onChange({ kategori: null }),
    });
  for (const t of filters.egenskap)
    chips.push({
      key: `e-${t}`,
      label: tagLabels[t],
      remove: () => onChange({ egenskap: filters.egenskap.filter((x) => x !== t) }),
    });
  for (const a of filters.utan)
    chips.push({
      key: `u-${a}`,
      label: `Utan ${allergenLabels[a].toLowerCase()}`,
      remove: () => onChange({ utan: filters.utan.filter((x) => x !== a) }),
    });
  if (!chips.length) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 px-3 py-1.5 text-xs font-semibold text-forest-900 hover:bg-forest-200"
          aria-label={`Ta bort filter ${c.label}`}
        >
          {c.label} <X className="size-3" />
        </button>
      ))}
      {chips.length > 1 && (
        <button type="button" onClick={onClear} className="text-xs font-semibold text-espresso-600 underline">
          Rensa alla
        </button>
      )}
    </div>
  );
}

function ProductTable({ items }: { items: Item[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-cream-300 bg-cream-50">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-cream-200/70 text-xs tracking-wide text-espresso-600 uppercase">
            <tr>
              <th scope="col" className="py-3 pr-3 pl-4 font-semibold">
                Produkt
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Art.nr
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                Vikt
              </th>
              <th scope="col" className="px-3 py-3 font-semibold">
                EAN
              </th>
              <th scope="col" className="py-3 pr-4 pl-3 text-right font-semibold">
                <span className="sr-only">Hylletikett</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-300/70">
            {items.map((p) => (
              <tr key={p.slug} className="hover:bg-cream-100">
                <td className="py-2.5 pr-3 pl-4">
                  <Link href={`/sortiment/${p.slug}`} className="flex items-center gap-3 font-semibold hover:text-forest-700">
                    <span className="product-stage relative size-12 shrink-0 overflow-hidden rounded-xl">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                    </span>
                    {p.name}
                  </Link>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs">{p.articleNo}</td>
                <td className="px-3 py-2.5 whitespace-nowrap">{formatWeight(p.weightGrams) ?? "–"}</td>
                <td className="px-3 py-2.5 font-mono text-xs">{p.ean ?? "–"}</td>
                <td className="py-2.5 pr-4 pl-3 text-right">
                  <AddLabelButton product={labelProduct(p)} compact />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
