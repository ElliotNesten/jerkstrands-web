import {
  categories,
  normalizeArticleNo,
  normalizeSearch,
  type AllergenId,
  type CategoryId,
  type SegmentId,
  type TagId,
} from "@/lib/catalog";
import type { ProductSummary } from "@/components/product-card";

export type SortKey = "relevans" | "namn" | "artikelnummer";
export type ViewMode = "rutnat" | "lista";

export interface CatalogItem extends ProductSummary {
  hasProductData: boolean;
  /** Förberäknad söktext (namn + kategorier + korta ingredienser) */
  haystack: string;
  nameKey: string;
}

export interface Filters {
  q: string;
  kanal: SegmentId | null;
  kategori: CategoryId | null;
  egenskap: TagId[];
  utan: AllergenId[];
  sort: SortKey;
  vy: ViewMode;
}

export const emptyFilters: Filters = {
  q: "",
  kanal: null,
  kategori: null,
  egenskap: [],
  utan: [],
  sort: "relevans",
  vy: "rutnat",
};

const categoryNames = new Map(categories.map((c) => [c.id, c.name]));

export function toCatalogItem(p: ProductSummary & { hasProductData: boolean }): CatalogItem {
  const cats = p.categories.map((c) => categoryNames.get(c) ?? "").join(" ");
  return {
    ...p,
    haystack: normalizeSearch(`${p.name} ${cats} ${p.ingredientsShort}`),
    nameKey: normalizeSearch(p.name),
  };
}

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function parseFilters(params: URLSearchParams): Filters {
  const kanal = params.get("kanal");
  const kategori = params.get("kategori");
  const sort = params.get("sort");
  return {
    q: params.get("q") ?? "",
    kanal: kanal === "butik" || kanal === "hotell-restaurang" ? kanal : null,
    kategori: kategori && categoryNames.has(kategori as CategoryId) ? (kategori as CategoryId) : null,
    egenskap: list(params.get("egenskap")) as TagId[],
    utan: list(params.get("utan")) as AllergenId[],
    sort: sort === "namn" || sort === "artikelnummer" ? sort : "relevans",
    vy: params.get("vy") === "lista" ? "lista" : "rutnat",
  };
}

export function filtersToQuery(f: Filters) {
  const p = new URLSearchParams();
  if (f.q.trim()) p.set("q", f.q.trim());
  if (f.kanal) p.set("kanal", f.kanal);
  if (f.kategori) p.set("kategori", f.kategori);
  if (f.egenskap.length) p.set("egenskap", f.egenskap.join(","));
  if (f.utan.length) p.set("utan", f.utan.join(","));
  if (f.sort !== "relevans") p.set("sort", f.sort);
  if (f.vy !== "rutnat") p.set("vy", f.vy);
  const s = p.toString();
  return s ? `?${s}` : "";
}

function searchScore(item: CatalogItem, tokens: string[]): number {
  let score = 0;
  for (const t of tokens) {
    let s = 0;
    if (/^\d+[a-z]?$/.test(t)) {
      const nt = normalizeArticleNo(t);
      const numbers = [item.articleNo, ...item.variants.map((v) => v.articleNo)].map(normalizeArticleNo);
      const eans = [item.ean, ...item.variants.map((v) => v.ean)].filter(Boolean) as string[];
      if (numbers.some((n) => n === nt)) s = 5;
      else if (nt.length >= 2 && numbers.some((n) => n.startsWith(nt))) s = 3;
      else if (t.length >= 4 && eans.some((e) => e.includes(t))) s = 4;
    }
    if (!s) {
      if (item.nameKey.startsWith(t)) s = 4;
      else if (item.nameKey.split(" ").some((w) => w.startsWith(t))) s = 3;
      else if (item.nameKey.includes(t)) s = 2;
      else if (item.haystack.includes(t)) s = 1;
    }
    if (!s) return 0;
    score += s;
  }
  return score;
}

function matchesBase(item: CatalogItem, f: Filters, ignore?: "kategori") {
  if (f.kanal && !item.segments.includes(f.kanal)) return false;
  if (ignore !== "kategori" && f.kategori && !item.categories.includes(f.kategori)) return false;
  for (const tag of f.egenskap) if (!item.tags.includes(tag)) return false;
  if (f.utan.length) {
    if (!item.hasProductData) return false;
    for (const a of f.utan) if (item.allergens.includes(a)) return false;
  }
  return true;
}

export function applyFilters(items: CatalogItem[], f: Filters) {
  const tokens = normalizeSearch(f.q).split(" ").filter(Boolean);
  const scored: { item: CatalogItem; score: number }[] = [];
  for (const item of items) {
    if (!matchesBase(item, f)) continue;
    const score = tokens.length ? searchScore(item, tokens) : 1;
    if (score > 0) scored.push({ item, score });
  }
  const byName = (a: CatalogItem, b: CatalogItem) => a.name.localeCompare(b.name, "sv");
  if (f.sort === "artikelnummer") {
    scored.sort((a, b) =>
      normalizeArticleNo(a.item.articleNo).localeCompare(normalizeArticleNo(b.item.articleNo), "sv", { numeric: true }),
    );
  } else if (f.sort === "namn" || !tokens.length) {
    scored.sort((a, b) => byName(a.item, b.item));
  } else {
    scored.sort((a, b) => b.score - a.score || byName(a.item, b.item));
  }
  return scored.map((s) => s.item);
}

/** Antal träffar per kategori givet övriga filter (för siffrorna i filterlistan). */
export function categoryCounts(items: CatalogItem[], f: Filters) {
  const tokens = normalizeSearch(f.q).split(" ").filter(Boolean);
  const counts = new Map<CategoryId, number>();
  for (const item of items) {
    if (!matchesBase(item, f, "kategori")) continue;
    if (tokens.length && !searchScore(item, tokens)) continue;
    for (const c of item.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return counts;
}

export function activeFilterCount(f: Filters) {
  return (f.kanal ? 1 : 0) + (f.kategori ? 1 : 0) + f.egenskap.length + f.utan.length;
}
