#!/usr/bin/env node
/**
 * Bygger src/data/products.json från
 *   - data/source/katalog.json   (vilka artiklar som visas, slug, kategori, bild)
 *   - data/source/produktdata.csv (artikeldata: EAN, vikt, texter, ingredienser, näring)
 *
 * Kör:  npm run import:products
 * eller: node scripts/import-products.mjs path/till/ny-export.csv
 *
 * CSV-formatet är samma som data.jerkstrands.se/flavour/flavour.php levererar.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = resolve(root, process.argv[2] ?? "data/source/produktdata.csv");
const catalogPath = resolve(root, "data/source/katalog.json");
const outPath = resolve(root, "src/data/products.json");

/* ---------- CSV ---------- */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v !== "")) rows.push(row);
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

/* ---------- Article numbers ---------- */
const cleanId = (v) => String(v ?? "").replace(/[^0-9A-Za-z]/g, "");
function normId(v) {
  const s = cleanId(v);
  if (!s) return "";
  if (/^\d+$/.test(s)) return s.replace(/^0+/, "") || "0";
  return s.toUpperCase();
}

/* ---------- EAN-13 ---------- */
function validEan13(ean) {
  if (!/^\d{13}$/.test(ean)) return false;
  const digits = ean.split("").map(Number);
  const sum = digits.slice(0, 12).reduce((acc, d, i) => acc + d * (i % 2 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === digits[12];
}

/* ---------- Numbers ---------- */
function num(v) {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
const grams = (kg) => {
  const n = num(kg);
  return n && n > 0 ? Math.round(n * 1000) : null;
};

/* ---------- Allergens (EU 1169/2011, marked with CAPITALS in the ingredient list) ---------- */
const ALLERGEN_RULES = [
  ["gluten", /(VETE|RÅG|KORN|HAVRE|DINKEL|SPELT|DURUM|KAMUT|GLUTEN)/],
  ["mjolk", /(MJÖLK|GRÄDDE|SMÖR|LAKTOS|VASSLE|KÄRNMJÖLK|OST|KASEIN|YOGHURT|FILMJÖLK|KVARG)/],
  ["agg", /ÄGG/],
  ["notter", /(MANDEL|HASSELNÖT|VALNÖT|CASHEW|PEKAN|PARANÖT|PISTAGE|MACADAMIA|NÖTTER)/],
  ["jordnotter", /JORDNÖT/],
  ["soja", /SOJA/],
  ["sesam", /SESAM/],
  ["senap", /SENAP/],
  ["selleri", /SELLERI/],
  ["lupin", /LUPIN/],
  ["sulfit", /(SULFIT|SVAVELDIOXID)/],
];
function deriveAllergens(ingredients) {
  if (!ingredients) return [];
  // Only consider words written in capitals (the legal allergen highlighting).
  const caps = (ingredients.match(/[A-ZÅÄÖÜÉ]{3,}/g) ?? []).join(" ");
  return ALLERGEN_RULES.filter(([, re]) => re.test(caps)).map(([key]) => key);
}

/* ---------- Size lines for cakes, e.g. "8 bitar – 900g – Artnr 0220" ---------- */
function parseSizeLine(line) {
  const pieces = line.match(/(\d+)\s*bit/i);
  const weight = line.match(/(\d+)\s*g\b/i);
  const art = line.match(/Artnr\s*[–-]?\s*([0-9A-Za-z]+)/i);
  return {
    pieces: pieces ? Number(pieces[1]) : null,
    weightGrams: weight ? Number(weight[1]) : null,
    articleNo: art ? art[1] : null,
  };
}

const SEGMENT_BY_CATEGORY = (cat) => (cat.startsWith("hr-") ? "hotell-restaurang" : cat === "jul" ? null : "butik");

/* ---------- Run ---------- */
const csvRows = parseCsv(readFileSync(csvPath, "utf8"));
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const byId = new Map();
for (const r of csvRows) {
  const id = normId(r.ArticleID);
  if (id && !byId.has(id)) byId.set(id, r);
}

function findRow(articleNo) {
  const candidates = [normId(articleNo)];
  const stripped = cleanId(articleNo).replace(/^0+/, "");
  if (stripped) candidates.push(normId(stripped));
  if (/^\d+$/.test(cleanId(articleNo))) candidates.push(normId(articleNo + "a"));
  for (const c of candidates) if (byId.has(c)) return byId.get(c);
  return null;
}

const warnings = [];
function cleanEan(raw, label) {
  const ean = cleanId(raw);
  if (!ean) return null;
  if (!validEan13(ean)) {
    warnings.push(`Ogiltig EAN för ${label}: ${ean} (visas inte)`);
    return null;
  }
  return ean;
}

const products = catalog.map((entry) => {
  const row = findRow(entry.articleNo);
  if (!row) warnings.push(`Saknar produktdata i CSV: ${entry.articleNo} ${entry.name}`);

  const ingredients = row?.IngredientText || "";
  const nutrition = row
    ? {
        energyKj: num(row.Nut_ENERGI_kJ),
        energyKcal: num(row.Nut_ENERGI_kcal),
        fat: num(row.Nut_FETT),
        saturatedFat: num(row.Nut_MATTAT),
        carbohydrates: num(row.Nut_KOLHYDRAT),
        sugars: num(row.Nut_SOCKERART),
        fiber: num(row.Nut_KOSTFIBER),
        protein: num(row.Nut_PROTEIN),
        salt: num(row.Nut_NATRIUM),
      }
    : null;
  const hasNutrition = nutrition && Object.values(nutrition).some((v) => v !== null && v !== 0);

  // Size variants (cakes) + lactose-free versions found in the CSV.
  const variants = [];
  for (const line of entry.sizes ?? []) {
    const parsed = parseSizeLine(line);
    if (!parsed.articleNo) continue;
    const vRow = findRow(parsed.articleNo);
    variants.push({
      articleNo: parsed.articleNo,
      label: parsed.pieces ? `${parsed.pieces} bitar` : "Standard",
      pieces: parsed.pieces,
      weightGrams: grams(vRow?.Weight) ?? parsed.weightGrams,
      ean: cleanEan(vRow?.EAN, `${entry.name} ${parsed.articleNo}`),
      lactoseFree: false,
    });
  }
  const baseNumbers = variants.length ? variants.map((v) => v.articleNo) : [entry.articleNo];
  const seen = new Set([normId(entry.articleNo), ...variants.map((v) => normId(v.articleNo))]);
  // Packade versioner (suffix "a") har ofta egen EAN – visa dem som varianter.
  if (entry.categories.includes("tartor")) {
    for (const base of baseNumbers) {
      const digits = cleanId(base).replace(/[A-Za-z]+$/, "");
      const aRow = byId.get(normId(digits + "a"));
      if (!aRow || seen.has(normId(aRow.ArticleID))) continue;
      const ean = cleanEan(aRow.EAN, aRow.ArticleName);
      if (!ean) continue;
      seen.add(normId(aRow.ArticleID));
      const pieces = aRow.ArticleName.match(/(\d+)\s*bit/i);
      variants.push({
        articleNo: cleanId(aRow.ArticleID),
        label: `${pieces ? `${pieces[1]} bitar, ` : ""}packad`,
        pieces: pieces ? Number(pieces[1]) : null,
        weightGrams: grams(aRow.Weight),
        ean,
        lactoseFree: false,
      });
    }
  }
  for (const base of baseNumbers) {
    const digits = cleanId(base).replace(/[A-Za-z]+$/, "");
    const lRow = byId.get(normId(digits + "L"));
    if (lRow && !/landgång/i.test(lRow.ArticleName) && !seen.has(normId(lRow.ArticleID))) {
      seen.add(normId(lRow.ArticleID));
      const pieces = lRow.ArticleName.match(/(\d+)\s*bit/i);
      variants.push({
        articleNo: cleanId(lRow.ArticleID),
        label: `${pieces ? `${pieces[1]} bitar, ` : ""}laktosfri`,
        pieces: pieces ? Number(pieces[1]) : null,
        weightGrams: grams(lRow.Weight),
        ean: cleanEan(lRow.EAN, lRow.ArticleName),
        lactoseFree: true,
      });
    }
  }

  // Ta bort varianter som bara upprepar en annan rad (samma EAN), och en ensam variant som är produkten själv.
  const productEan = cleanEan(row?.EAN, `${entry.name} ${entry.articleNo}`);
  const seenEans = new Set();
  for (let i = 0; i < variants.length; i++) {
    const v = variants[i];
    if (v.ean && seenEans.has(v.ean)) {
      variants.splice(i--, 1);
      continue;
    }
    if (v.ean) seenEans.add(v.ean);
  }
  if (
    variants.length === 1 &&
    (variants[0].ean === productEan || normId(variants[0].articleNo.replace(/a$/i, "")) === normId(entry.articleNo.replace(/a$/i, "")))
  ) {
    variants.length = 0;
  }

  const categories = entry.categories;
  const segments = [...new Set(categories.map(SEGMENT_BY_CATEGORY).filter(Boolean))];
  const tags = [];
  if (variants.some((v) => v.lactoseFree)) tags.push("laktosfri");
  if (categories.includes("jul")) tags.push("jul");
  if (categories.includes("packat") || /\d-pack/i.test(entry.name)) tags.push("packad");
  if (/mini/i.test(entry.name)) tags.push("mini");

  return {
    slug: entry.slug,
    articleNo: entry.articleNo,
    name: entry.name,
    categories,
    section: entry.section ?? null,
    segments,
    tags,
    image: `/images/products/${entry.image}`,
    weightGrams: grams(row?.Weight),
    ean: productEan,
    description: row?.MainText || "",
    ingredientsShort: row?.FootMainText || "",
    ingredients,
    traces: row?.ArticleDescription || "",
    allergens: deriveAllergens(ingredients),
    nutrition: hasNutrition ? nutrition : null,
    variants,
    hasProductData: Boolean(row),
  };
});

products.sort((a, b) => a.name.localeCompare(b.name, "sv"));
writeFileSync(outPath, JSON.stringify(products, null, 2) + "\n");
console.log(`✓ ${products.length} produkter → ${outPath.replace(root + "/", "")}`);
for (const w of warnings) console.warn(`  ! ${w}`);
