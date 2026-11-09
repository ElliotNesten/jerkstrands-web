/**
 * Hylletiketter 150×39 mm / 150×45 mm som vektor-PDF (jsPDF).
 * Layouten följer Jerkstrands tidigare etikettgenerator:
 * packshot + logga | namn + ingredienser + QR-uppmaning | styckpris, vikt/art.nr/jmfpris, QR och EAN-13.
 */
import type { jsPDF } from "jspdf";
import { ean13Bars, isValidEan13 } from "@/lib/ean";

export type LabelSize = "39" | "45";

export interface LabelData {
  name: string;
  articleNo: string;
  weightGrams: number | null;
  ean: string | null;
  ingredientsShort: string;
  image: string;
  /** Pris i kronor som text, t.ex. "29,90" – tomt ger en skrivlinje */
  price: string;
  size: LabelSize;
  url: string;
}

const LABEL_W = 150;
const PAGE_W = 210;
const PAGE_H = 297;
const PAGE_MARGIN_Y = 12;
const GAP = 5;
const PT_TO_MM = 0.3528;

/* ------------------------------------------------------------------ */
/* Resurser (typsnitt, bilder) – cachas mellan utskrifter               */
/* ------------------------------------------------------------------ */

const fontCache = new Map<string, Promise<string>>();
function loadFontBase64(file: string) {
  if (!fontCache.has(file)) {
    fontCache.set(
      file,
      fetch(`/fonts/${file}`)
        .then((r) => {
          if (!r.ok) throw new Error(`Kunde inte ladda typsnitt ${file}`);
          return r.arrayBuffer();
        })
        .then((buf) => {
          let binary = "";
          const bytes = new Uint8Array(buf);
          for (let i = 0; i < bytes.length; i += 0x8000) {
            binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
          }
          return btoa(binary);
        }),
    );
  }
  return fontCache.get(file)!;
}

let fontsAvailable = true;
async function registerFonts(pdf: jsPDF) {
  if (!fontsAvailable) return "helvetica";
  try {
    const [regular, semibold] = await Promise.all([
      loadFontBase64("BarlowCondensed-Regular.ttf"),
      loadFontBase64("BarlowCondensed-SemiBold.ttf"),
    ]);
    pdf.addFileToVFS("BarlowCondensed-Regular.ttf", regular);
    pdf.addFont("BarlowCondensed-Regular.ttf", "Barlow", "normal");
    pdf.addFileToVFS("BarlowCondensed-SemiBold.ttf", semibold);
    pdf.addFont("BarlowCondensed-SemiBold.ttf", "Barlow", "bold");
    return "Barlow";
  } catch {
    fontsAvailable = false;
    return "helvetica";
  }
}

interface LoadedImage {
  data: string;
  format: "JPEG" | "PNG";
  aspect: number; // höjd / bredd
}

const imageCache = new Map<string, Promise<LoadedImage | null>>();
function loadImage(src: string, format: "JPEG" | "PNG", maxPx = 700) {
  const key = `${src}|${format}`;
  if (!imageCache.has(key)) {
    imageCache.set(
      key,
      new Promise<LoadedImage | null>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          const scale = Math.min(1, maxPx / Math.max(img.naturalWidth, img.naturalHeight));
          const w = Math.max(1, Math.round(img.naturalWidth * scale));
          const h = Math.max(1, Math.round(img.naturalHeight * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(null);
          if (format === "JPEG") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, w, h);
          }
          ctx.drawImage(img, 0, 0, w, h);
          resolve({
            data: canvas.toDataURL(format === "JPEG" ? "image/jpeg" : "image/png", 0.9),
            format,
            aspect: h / w,
          });
        };
        img.onerror = () => resolve(null);
        img.src = src;
      }),
    );
  }
  return imageCache.get(key)!;
}

/* ------------------------------------------------------------------ */
/* Pris                                                                */
/* ------------------------------------------------------------------ */

export function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/\s/g, "").replace(":-", "").replace(",", ".");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function formatKr(n: number) {
  return n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function comparisonPrice(price: number | null, grams: number | null) {
  if (!price || !grams) return null;
  return price / (grams / 1000);
}

function drawEan13(pdf: jsPDF, ean: string, x: number, y: number, width: number, barHeight: number, font: string) {
  const leftPad = 7; // utrymme för första siffran
  const m = width / (95 + leftPad);
  const bx = x + leftPad * m;
  pdf.setFillColor(0, 0, 0);
  for (const [start, w, guard] of ean13Bars(ean)) {
    pdf.rect(bx + start * m, y, w * m, barHeight + (guard ? m * 5 : 0), "F");
  }
  pdf.setFont(font, "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(0, 0, 0);
  const ty = y + barHeight + 2.6;
  pdf.text(ean[0], x + m * 2.5, ty, { align: "center" });
  pdf.text(ean.slice(1, 7), bx + 24 * m, ty, { align: "center" });
  pdf.text(ean.slice(7), bx + 70 * m, ty, { align: "center" });
}

/* ------------------------------------------------------------------ */
/* QR                                                                  */
/* ------------------------------------------------------------------ */

async function drawQr(pdf: jsPDF, value: string, x: number, y: number, size: number) {
  const QRCode = (await import("qrcode")).default;
  const qr = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = qr.modules.size;
  const quiet = 1;
  const cell = size / (n + quiet * 2);
  pdf.setFillColor(0, 0, 0);
  for (let r = 0; r < n; r++) {
    let c = 0;
    while (c < n) {
      if (!qr.modules.get(r, c)) {
        c++;
        continue;
      }
      let e = c;
      while (e < n && qr.modules.get(r, e)) e++;
      pdf.rect(x + (c + quiet) * cell, y + (r + quiet) * cell, (e - c) * cell + 0.01, cell + 0.01, "F");
      c = e;
    }
  }
}

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

function fitName(pdf: jsPDF, name: string, maxW: number, regionH: number) {
  const words = name.trim().split(/\s+/);
  // En rad
  for (let size = 30; size >= 15; size--) {
    pdf.setFontSize(size);
    if (pdf.getTextWidth(name) <= maxW) return { size, lines: [name] };
  }
  // Två rader – välj den mest balanserade brytpunkten
  let best: { size: number; lines: string[]; score: number } | null = null;
  for (let split = 1; split < words.length; split++) {
    const l1 = words.slice(0, split).join(" ");
    const l2 = words.slice(split).join(" ");
    for (let size = 21; size >= 10; size--) {
      pdf.setFontSize(size);
      const w1 = pdf.getTextWidth(l1);
      const w2 = pdf.getTextWidth(l2);
      const blockH = size * PT_TO_MM * 0.7 + size * PT_TO_MM * 1.05;
      if (w1 <= maxW && w2 <= maxW && blockH <= regionH) {
        const score = -size * 10 + Math.abs(w1 - w2);
        if (!best || score < best.score) best = { size, lines: [l1, l2], score };
        break;
      }
    }
  }
  if (best) return { size: best.size, lines: best.lines };
  pdf.setFontSize(10);
  return { size: 10, lines: pdf.splitTextToSize(name, maxW).slice(0, 2) as string[] };
}

function truncateToWidth(pdf: jsPDF, text: string, maxW: number) {
  if (pdf.getTextWidth(text) <= maxW) return text;
  let t = text;
  while (t.length > 1 && pdf.getTextWidth(`${t}…`) > maxW) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

/* ------------------------------------------------------------------ */
/* En etikett                                                          */
/* ------------------------------------------------------------------ */

async function drawLabel(pdf: jsPDF, data: LabelData, X0: number, Y0: number, font: string, logo: LoadedImage | null) {
  const H = data.size === "45" ? 45 : 39;
  const Yc = Y0 + (data.size === "45" ? 3 : 0);

  // Skärmarkering
  pdf.setLineWidth(0.2);
  pdf.setDrawColor(190, 190, 190);
  pdf.setLineDashPattern([1, 1], 0);
  pdf.rect(X0, Y0, LABEL_W, H);
  pdf.setLineDashPattern([], 0);
  pdf.setDrawColor(0, 0, 0);
  pdf.setTextColor(0, 0, 0);

  // Packshot
  const pack = await loadImage(data.image, "JPEG");
  if (pack) {
    const cellX = X0 + 3;
    const cellY = Yc + 3;
    const cellW = 36;
    const cellH = 23;
    let w = cellW;
    let h = w * pack.aspect;
    if (h > cellH) {
      h = cellH;
      w = h / pack.aspect;
    }
    pdf.addImage(pack.data, pack.format, cellX + (cellW - w) / 2, cellY + (cellH - h) / 2, w, h);
  }

  // Logga
  if (logo) {
    const w = 34;
    pdf.addImage(logo.data, logo.format, X0 + 4, Yc + 28, w, w * logo.aspect);
  }

  // Namn
  const nameX = X0 + 41.5;
  const nameTop = Yc + 3;
  const nameBottom = Yc + 19;
  pdf.setFont(font, "bold");
  const { size, lines } = fitName(pdf, data.name, 61, nameBottom - nameTop - 1);
  pdf.setFontSize(size);
  const cap = size * PT_TO_MM * 0.7;
  const lineGap = size * PT_TO_MM * 1.05;
  const blockH = cap + (lines.length - 1) * lineGap;
  const firstBaseline = nameTop + (nameBottom - nameTop - blockH) / 2 + cap - 0.4;
  lines.forEach((line, i) => pdf.text(line, nameX, firstBaseline + i * lineGap));

  // Linjer
  pdf.setLineWidth(0.15);
  pdf.line(X0 + 41.5, Yc + 19.5, X0 + 147, Yc + 19.5);
  pdf.line(X0 + 104.5, Yc + 14.8, X0 + 147, Yc + 14.8);

  // Ingredienser (max tre rader)
  const ingX = X0 + 41.5;
  const ingW = 60;
  const ingSize = 8.5;
  const lh = 3.55;
  let y = Yc + 23.6;
  pdf.setFontSize(ingSize);
  if (data.ingredientsShort) {
    pdf.setFont(font, "bold");
    const prefix = "Ingredienser: ";
    const prefixW = pdf.getTextWidth(prefix);
    pdf.text(prefix, ingX, y);
    pdf.setFont(font, "normal");
    const words = data.ingredientsShort.replace(/\s+/g, " ").trim().split(" ");
    const out: string[] = [];
    let current = "";
    let avail = ingW - prefixW;
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (pdf.getTextWidth(test) <= avail) current = test;
      else {
        out.push(current);
        current = word;
        avail = ingW;
      }
    }
    if (current) out.push(current);
    const shown = out.slice(0, 3);
    if (out.length > 3) shown[2] = truncateToWidth(pdf, `${shown[2]} ${out.slice(3).join(" ")}`, ingW);
    shown.forEach((line, i) => pdf.text(line, i === 0 ? ingX + prefixW : ingX, y + i * lh));
  } else {
    pdf.setFont(font, "normal");
    pdf.text("Fullständig innehållsförteckning finns via QR-koden.", ingX, y);
  }

  // QR-uppmaning med pil
  y = Yc + 23.6 + 3 * lh + 0.4;
  pdf.setFont(font, "bold");
  const cta = "Skanna för komplett innehållsdeklaration";
  pdf.text(cta, ingX, y);
  const qrX = X0 + 104;
  const qrY = Yc + 21;
  const arrowY = y - 1.05;
  const arrowStart = ingX + pdf.getTextWidth(cta) + 1.2;
  const arrowTip = qrX + 0.2;
  if (arrowTip - arrowStart > 2) {
    pdf.setLineWidth(0.45);
    pdf.setLineCap("round");
    pdf.line(arrowStart, arrowY, arrowTip - 1.2, arrowY);
    pdf.setFillColor(0, 0, 0);
    pdf.triangle(arrowTip, arrowY, arrowTip - 1.6, arrowY - 0.8, arrowTip - 1.6, arrowY + 0.8, "F");
    pdf.setLineCap("butt");
  }

  // Styckpris
  pdf.setFont(font, "bold");
  pdf.setFontSize(8.5);
  pdf.text("Styckpris (kr)", X0 + 104.5, Yc + 6.2);
  const price = parsePrice(data.price);
  const priceRight = X0 + 141.5;
  const priceBaseline = Yc + 13.2;
  if (price) {
    const kronor = Math.floor(price);
    const ore = Math.round((price - kronor) * 100);
    const big = 34;
    pdf.setFontSize(big);
    pdf.text(String(kronor), priceRight, priceBaseline, { align: "right" });
    pdf.setFontSize(big / 2);
    const smallTop = priceBaseline - big * PT_TO_MM * 0.7;
    pdf.text(ore ? String(ore).padStart(2, "0") : ":-", priceRight + 0.4, smallTop + (big / 2) * PT_TO_MM * 0.7);
  } else {
    pdf.setLineWidth(0.2);
    pdf.setDrawColor(150, 150, 150);
    pdf.line(X0 + 120, priceBaseline, X0 + 146, priceBaseline);
    pdf.setDrawColor(0, 0, 0);
  }

  // Vikt | Art.nr | Jmfpris
  const cmp = comparisonPrice(price, data.weightGrams);
  const parts = [
    data.weightGrams ? `Vikt: ${data.weightGrams >= 1000 ? `${(data.weightGrams / 1000).toLocaleString("sv-SE")} kg` : `${data.weightGrams} g`}` : null,
    `Art.nr: ${data.articleNo}`,
    data.weightGrams ? `Jmfpris/kg: ${cmp ? formatKr(cmp) : "–"}` : null,
  ].filter(Boolean);
  const meta = parts.join("  |  ");
  pdf.setFont(font, "normal");
  let metaSize = 8;
  pdf.setFontSize(metaSize);
  while (pdf.getTextWidth(meta) > 42.5 && metaSize > 5.5) {
    metaSize -= 0.25;
    pdf.setFontSize(metaSize);
  }
  pdf.text(meta, X0 + 125.75, Yc + 17.9, { align: "center" });

  // QR
  await drawQr(pdf, data.url, qrX, qrY, 15.5);

  // EAN-13 (eller artikelnummer om EAN saknas)
  if (isValidEan13(data.ean)) {
    drawEan13(pdf, data.ean, X0 + 121, Yc + 22.2, 26, 9.6, font);
  } else {
    pdf.setFont(font, "bold");
    pdf.setFontSize(9);
    pdf.text("Art.nr", X0 + 134, Yc + 27, { align: "center" });
    pdf.setFontSize(16);
    pdf.text(data.articleNo, X0 + 134, Yc + 33.5, { align: "center" });
  }
}

/* ------------------------------------------------------------------ */
/* Publikt API                                                          */
/* ------------------------------------------------------------------ */

export async function createLabelsPdf(labels: LabelData[]) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pdf.setProperties({ title: "Hylletiketter – Jerkstrands", creator: "jerkstrands.se" });
  const font = await registerFonts(pdf);
  const logo = await loadImage("/brand/jerkstrands-logo-ljus-bakgrund.png", "PNG", 900);

  const x = (PAGE_W - LABEL_W) / 2;
  let y = PAGE_MARGIN_Y;
  for (const label of labels) {
    const h = label.size === "45" ? 45 : 39;
    if (y + h > PAGE_H - PAGE_MARGIN_Y) {
      pdf.addPage();
      y = PAGE_MARGIN_Y;
    }
    await drawLabel(pdf, label, x, y, font, logo);
    y += h + GAP;
  }
  return pdf;
}

/**
 * Skapar PDF:en och öppnar den i en ny flik för utskrift.
 * Fönstret öppnas direkt vid klick (annars stoppas det av popup-blockerare) och fylls när PDF:en är klar.
 */
export async function openLabelsPdf(labels: LabelData[], filename: string) {
  const win = typeof window !== "undefined" ? window.open("", "_blank") : null;
  try {
    const pdf = await createLabelsPdf(labels);
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob);
    if (win && !win.closed) {
      win.location.href = url;
    } else {
      pdf.save(filename);
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    win?.close();
    throw error;
  }
}
