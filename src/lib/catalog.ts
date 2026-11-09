import productsJson from "@/data/products.json";
import type { Tone } from "@/lib/tones";

export type SegmentId = "butik" | "hotell-restaurang";

export type CategoryId =
  | "matbrod"
  | "portionsbrod"
  | "fikabrod"
  | "kransar-langder-flator"
  | "mjuka-kakor"
  | "tartor"
  | "bakelser"
  | "smakakor"
  | "packat"
  | "hr-matbrod"
  | "hr-landgang"
  | "hr-frukost"
  | "hr-muffins-bullar"
  | "hr-kondisbitar"
  | "hr-kakblock"
  | "jul";

export type AllergenId =
  | "gluten"
  | "mjolk"
  | "agg"
  | "notter"
  | "jordnotter"
  | "soja"
  | "sesam"
  | "senap"
  | "selleri"
  | "lupin"
  | "sulfit";

export type TagId = "laktosfri" | "jul" | "packad" | "mini";

export interface Nutrition {
  energyKj: number | null;
  energyKcal: number | null;
  fat: number | null;
  saturatedFat: number | null;
  carbohydrates: number | null;
  sugars: number | null;
  fiber: number | null;
  protein: number | null;
  salt: number | null;
}

export interface Variant {
  articleNo: string;
  label: string;
  pieces: number | null;
  weightGrams: number | null;
  ean: string | null;
  lactoseFree: boolean;
}

export interface Product {
  slug: string;
  articleNo: string;
  name: string;
  categories: CategoryId[];
  section: string | null;
  segments: SegmentId[];
  tags: TagId[];
  image: string;
  weightGrams: number | null;
  ean: string | null;
  description: string;
  ingredientsShort: string;
  ingredients: string;
  traces: string;
  allergens: AllergenId[];
  nutrition: Nutrition | null;
  variants: Variant[];
  hasProductData: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  segment: SegmentId | "sasong";
  description: string;
  /** Produkt (slug) vars bild representerar kategorin */
  coverSlug: string;
  /** Pastellton bakom kategorins produktbilder */
  tone: Tone;
}

export const segments: { id: SegmentId; name: string; short: string }[] = [
  { id: "butik", name: "Butik & café", short: "Butik & café" },
  { id: "hotell-restaurang", name: "Hotell & restaurang", short: "Hotell & restaurang" },
];

export const categories: Category[] = [
  {
    id: "matbrod",
    name: "Matbröd",
    segment: "butik",
    description: "Surdegsbröd, rustika limpor och klassiska matbröd.",
    coverSlug: "levain-blanche",
    tone: "wheat",
  },
  {
    id: "portionsbrod",
    name: "Portionsbröd & frallor",
    segment: "butik",
    description: "Frallor, bagels, surdegsfrallor och frukostbröd.",
    coverSlug: "vetesur-sesam-vallmo",
    tone: "butter",
  },
  {
    id: "fikabrod",
    name: "Fikabröd",
    segment: "butik",
    description: "Handknutna bullar, wienerbröd och fikaklassiker.",
    coverSlug: "kanelknut",
    tone: "apricot",
  },
  {
    id: "kransar-langder-flator",
    name: "Kransar, längder & flätor",
    segment: "butik",
    description: "Fyllda flätor och kransar att dela på.",
    coverSlug: "kanelflata",
    tone: "honey",
  },
  {
    id: "mjuka-kakor",
    name: "Mjuka kakor & muffins",
    segment: "butik",
    description: "Mumsbitar, rulltårta, morotskaka och muffins.",
    coverSlug: "morotskaka",
    tone: "cocoa",
  },
  {
    id: "tartor",
    name: "Tårtor & längder",
    segment: "butik",
    description: "Gräddtårtor, moussetårtor och marsipanklassiker.",
    coverSlug: "princesstarta",
    tone: "raspberry",
  },
  {
    id: "bakelser",
    name: "Bakelser & kondisbitar",
    segment: "butik",
    description: "Konditorns bakelser – från napoleon till semla.",
    coverSlug: "princessbakelse",
    tone: "pistachio",
  },
  {
    id: "smakakor",
    name: "Småkakor",
    segment: "butik",
    description: "Klassiska kakor i påse – perfekt till kaffet.",
    coverSlug: "finska-puckar",
    tone: "vanilla",
  },
  {
    id: "packat",
    name: "Packat bröd & bakverk",
    segment: "butik",
    description: "Butiksklara förpackningar med EAN.",
    coverSlug: "kallarfranska-8-pack",
    tone: "sage",
  },
  {
    id: "hr-matbrod",
    name: "Matbröd för hotell & restaurang",
    segment: "hotell-restaurang",
    description: "Brödkorgens favoriter för frukost och middag.",
    coverSlug: "surdegsbrod-durum",
    tone: "wheat",
  },
  {
    id: "hr-landgang",
    name: "Landgång, toast & smörgåstårta",
    segment: "hotell-restaurang",
    description: "Skivat bröd och bottnar för kalla köket.",
    coverSlug: "restaurangbrod-landgang",
    tone: "vanilla",
  },
  {
    id: "hr-frukost",
    name: "Frukost & konferens",
    segment: "hotell-restaurang",
    description: "Portionsbröd i ministorlek som minskar svinnet.",
    coverSlug: "brioche-mini",
    tone: "butter",
  },
  {
    id: "hr-muffins-bullar",
    name: "Muffins & bullar mini",
    segment: "hotell-restaurang",
    description: "Fikabröd i lagom storlek för buffé och möten.",
    coverSlug: "kanelknut-mini",
    tone: "apricot",
  },
  {
    id: "hr-kondisbitar",
    name: "Kondisbitar mini",
    segment: "hotell-restaurang",
    description: "Små söta bitar till kaffet.",
    coverSlug: "chokladboll-mini",
    tone: "cocoa",
  },
  {
    id: "hr-kakblock",
    name: "Mjuka kakblock",
    segment: "hotell-restaurang",
    description: "Hela bleck att portionera själv.",
    coverSlug: "karleksmums-bleck",
    tone: "peach",
  },
  {
    id: "jul",
    name: "Julsortiment",
    segment: "sasong",
    description: "Lussekatter, saffransfläta, vörtbröd och pepparkaksdeg.",
    coverSlug: "lussekatt-saffran",
    tone: "raspberry",
  },
];

export const allergenLabels: Record<AllergenId, string> = {
  gluten: "Gluten",
  mjolk: "Mjölk",
  agg: "Ägg",
  notter: "Nötter & mandel",
  jordnotter: "Jordnötter",
  soja: "Soja",
  sesam: "Sesam",
  senap: "Senap",
  selleri: "Selleri",
  lupin: "Lupin",
  sulfit: "Sulfit",
};

/** Allergener som går att filtrera bort i katalogen */
export const filterableAllergens: AllergenId[] = ["mjolk", "agg", "notter", "sesam", "soja"];

export const tagLabels: Record<TagId, string> = {
  laktosfri: "Finns laktosfri",
  jul: "Julsortiment",
  packad: "Packad",
  mini: "Mini",
};

export const products = productsJson as Product[];

const bySlug = new Map(products.map((p) => [p.slug, p]));
const byCategory = new Map(categories.map((c) => [c.id, c]));

export function getProduct(slug: string) {
  return bySlug.get(slug);
}

export function getCategory(id: string) {
  return byCategory.get(id as CategoryId);
}

export function productsInCategory(id: CategoryId) {
  return products.filter((p) => p.categories.includes(id));
}

export function categoryTone(id: CategoryId | string | undefined): Tone {
  return (id && byCategory.get(id as CategoryId)?.tone) || "vanilla";
}

export function categoryCover(category: Category) {
  return bySlug.get(category.coverSlug)?.image ?? products[0].image;
}

/* ---------- Formatting ---------- */

export function formatWeight(grams: number | null | undefined) {
  if (!grams) return null;
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg.toLocaleString("sv-SE", { maximumFractionDigits: 2 })} kg`;
  }
  return `${grams} g`;
}

export function formatNumber(n: number | null | undefined, digits = 1) {
  if (n === null || n === undefined) return "–";
  return n.toLocaleString("sv-SE", { maximumFractionDigits: digits });
}

/** Normaliserar text för sökning: gemener, utan diakriter (ö→o) men behåller siffror. */
export function normalizeSearch(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Artikelnummer utan inledande nollor för jämförelse ("0054" ≈ "54"). */
export function normalizeArticleNo(v: string) {
  return v.replace(/[^0-9a-z]/gi, "").replace(/^0+/, "").toLowerCase();
}
