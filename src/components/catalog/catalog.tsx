"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
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
      {/* Sök + kanal */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor="katalogsok" className="sr-only">
            Sök produkt, artikelnummer eller EAN
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="katalogsok"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök produkt, artikelnummer eller EAN"
            autoComplete="off"
            className="field h-14 rounded-full pr-12 pl-13"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-hairline"
              aria-label="Rensa sökningen"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex overflow-x-auto rounded-full bg-canvas-soft p-1" role="group" aria-label="Kanal">
          {[{ id: null, name: "Alla" }, ...segments].map((s) => (
            <button
              key={s.id ?? "alla"}
              type="button"
              aria-pressed={filters.kanal === s.id}
              onClick={() => update({ kanal: s.id, kategori: null })}
              className={cn(
                "h-12 shrink-0 rounded-full px-5 text-[0.9375rem] font-semibold transition-colors",
                filters.kanal === s.id ? "bg-canvas text-ink" : "text-muted hover:text-ink",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-12">
        <aside className="hidden lg:block" aria-label="Filter">
          <div className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2 pb-6">{panel}</div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn btn-soft btn-sm lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filter
              {activeCount > 0 && <span className="rounded-full bg-ink px-1.5 text-xs text-canvas">{activeCount}</span>}
            </button>
            <p className="text-sm text-muted" aria-live="polite">
              <strong className="text-ink">{results.length}</strong> av {items.length} artiklar
            </p>
            <div className="ml-auto flex items-center gap-2">
              <label className="sr-only" htmlFor="sortering">
                Sortera
              </label>
              <select
                id="sortering"
                value={filters.sort}
                onChange={(e) => update({ sort: e.target.value as Filters["sort"] })}
                className="h-10 rounded-full bg-canvas-soft px-4 text-sm font-semibold focus:outline-2 focus:outline-ink"
              >
                <option value="relevans">{filters.q ? "Bäst träff" : "Namn A–Ö"}</option>
                <option value="namn">Namn A–Ö</option>
                <option value="artikelnummer">Artikelnummer</option>
              </select>
              <div className="flex rounded-full bg-canvas-soft p-1" role="group" aria-label="Visning">
                <button
                  type="button"
                  aria-pressed={filters.vy === "rutnat"}
                  onClick={() => update({ vy: "rutnat" })}
                  className={cn("rounded-full p-2", filters.vy === "rutnat" ? "bg-canvas" : "text-muted")}
                  aria-label="Visa som rutnät"
                >
                  <LayoutGrid className="size-4" />
                </button>
                <button
                  type="button"
                  aria-pressed={filters.vy === "lista"}
                  onClick={() => update({ vy: "lista" })}
                  className={cn("rounded-full p-2", filters.vy === "lista" ? "bg-canvas" : "text-muted")}
                  aria-label="Visa som lista"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <ActiveChips filters={filters} onChange={update} onClearQuery={() => setQuery("")} onClear={clearAll} />

          {results.length === 0 ? (
            <div className="tile mt-8 px-6 py-16">
              <p className="t-h3">Inga produkter matchar.</p>
              <p className="mt-2 max-w-md text-muted">
                Prova ett annat sökord eller färre filter. Saknar du en produkt? Ring oss så hjälper vi dig.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={clearAll} className="btn btn-primary btn-sm">
                  Rensa filtren
                </button>
                <Link href="/kontakt" className="btn btn-outline btn-sm">
                  Kontakta bageriet
                </Link>
              </div>
            </div>
          ) : filters.vy === "lista" ? (
            <ProductTable items={results} />
          ) : (
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 min-[1800px]:grid-cols-5">
              {results.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} sizes="(min-width: 1280px) 20vw, (min-width: 768px) 28vw, 46vw" />
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
        className="m-0 mt-auto max-h-[88dvh] w-full max-w-none rounded-t-[24px] bg-canvas p-0 text-ink backdrop:bg-ink/30"
        aria-label="Filter"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-canvas px-6 pt-5 pb-3">
          <span className="t-h4">Filter.</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex size-10 items-center justify-center rounded-full bg-canvas-soft"
            aria-label="Stäng filtren"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-6 py-4">{panel}</div>
        <div className="sticky bottom-0 bg-canvas px-6 py-4">
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
    { id: "butik", name: "Butik och café", cats: categories.filter((c) => c.segment === "butik") },
    { id: "sasong", name: "Säsong", cats: categories.filter((c) => c.segment === "sasong") },
    { id: "hotell-restaurang", name: "Hotell och restaurang", cats: categories.filter((c) => c.segment === "hotell-restaurang") },
  ].filter((g) => !filters.kanal || g.id === filters.kanal || (filters.kanal === "butik" && g.id === "sasong"));

  const toggle = <T extends string>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div className="space-y-8">
      <div>
        <button
          type="button"
          onClick={() => onChange({ kategori: null })}
          className={cn(
            "flex w-full items-center rounded-full px-4 py-2.5 text-left text-[0.9375rem] font-semibold",
            !filters.kategori ? "bg-ink text-canvas" : "hover:bg-canvas-soft",
          )}
        >
          Alla kategorier
        </button>
        {groups.map((g) => (
          <div key={g.id} className="mt-5">
            <p className="px-4 text-[0.8125rem] font-semibold text-muted">{g.name}</p>
            <ul className="mt-1.5 space-y-0.5">
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
                        "flex w-full items-center justify-between gap-2 rounded-full px-4 py-2 text-left text-[0.9375rem] transition-colors disabled:opacity-35",
                        active ? "bg-ink font-semibold text-canvas" : "hover:bg-canvas-soft",
                      )}
                    >
                      <span>{c.name}</span>
                      <span className={cn("text-xs tabular-nums", active ? "text-canvas/60" : "text-muted")}>{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <fieldset>
        <legend className="px-4 text-[0.8125rem] font-semibold text-muted">Egenskaper</legend>
        <div className="mt-2 flex flex-wrap gap-2 px-1">
          {FILTER_TAGS.map((t) => (
            <label
              key={t}
              className="flex h-9 cursor-pointer items-center rounded-full bg-canvas-soft px-3.5 text-sm font-semibold transition-colors has-[:checked]:bg-ink has-[:checked]:text-canvas"
            >
              <input
                type="checkbox"
                checked={filters.egenskap.includes(t)}
                onChange={() => onChange({ egenskap: toggle(filters.egenskap, t) })}
                className="sr-only"
              />
              {t === "mini" ? "Mini" : tagLabels[t]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="px-4 text-[0.8125rem] font-semibold text-muted">Innehåller inte</legend>
        <div className="mt-2 flex flex-wrap gap-2 px-1">
          {filterableAllergens.map((a) => (
            <label
              key={a}
              className="flex h-9 cursor-pointer items-center rounded-full bg-canvas-soft px-3.5 text-sm font-semibold transition-colors has-[:checked]:bg-ink has-[:checked]:text-canvas"
            >
              <input
                type="checkbox"
                checked={filters.utan.includes(a)}
                onChange={() => onChange({ utan: toggle(filters.utan, a) })}
                className="sr-only"
              />
              {allergenLabels[a]}
            </label>
          ))}
        </div>
        <p className="mt-3 px-4 text-xs leading-relaxed text-muted">
          Enligt ingrediensförteckningen. Se även ”Kan innehålla spår av” på varje produkt.
        </p>
      </fieldset>

      {activeFilterCount(filters) + (filters.q ? 1 : 0) > 0 && (
        <button type="button" onClick={onClear} className="btn btn-outline btn-sm w-full">
          Rensa filtren
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
    chips.push({ key: `e-${t}`, label: tagLabels[t], remove: () => onChange({ egenskap: filters.egenskap.filter((x) => x !== t) }) });
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
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3 text-xs font-semibold text-canvas"
          aria-label={`Ta bort filtret ${c.label}`}
        >
          {c.label} <X className="size-3" />
        </button>
      ))}
      {chips.length > 1 && (
        <button type="button" onClick={onClear} className="link-draw text-xs font-semibold text-muted">
          Rensa alla
        </button>
      )}
    </div>
  );
}

function ProductTable({ items }: { items: Item[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[24px] border border-hairline">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="bg-canvas-soft text-xs text-muted">
            <tr>
              <th scope="col" className="py-3 pr-3 pl-5 font-semibold">
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
              <th scope="col" className="py-3 pr-5 pl-3 text-right font-semibold">
                <span className="sr-only">Hylletikett</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.slug} className="border-t border-hairline-soft hover:bg-canvas-soft/60">
                <td className="py-2.5 pr-3 pl-5">
                  <Link href={`/sortiment/${p.slug}`} className="flex items-center gap-3 font-semibold">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-[12px] bg-canvas-soft">
                      <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                    </span>
                    <span className="link-draw">{p.name}</span>
                  </Link>
                </td>
                <td className="px-3 py-2.5 tabular-nums">{p.articleNo}</td>
                <td className="px-3 py-2.5 whitespace-nowrap">{formatWeight(p.weightGrams) ?? "–"}</td>
                <td className="px-3 py-2.5 tabular-nums text-muted">{p.ean ?? "–"}</td>
                <td className="py-2.5 pr-5 pl-3 text-right">
                  <AddLabelButton product={labelProduct(p)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
