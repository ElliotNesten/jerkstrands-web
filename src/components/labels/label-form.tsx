"use client";

import { useState } from "react";
import { ListPlus, Loader2, Printer } from "lucide-react";
import { labelQueue, labelUrl, type LabelProduct } from "@/components/labels/label-queue";
import { comparisonPrice, parsePrice, type LabelSize } from "@/components/labels/label-pdf";
import type { Variant } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface Props {
  product: LabelProduct;
  variants: Variant[];
}

/** Hylletikett för en produkt: pris, storlek, ev. variant → PDF eller utskriftskö. */
export function LabelForm({ product, variants }: Props) {
  const [price, setPrice] = useState("");
  const [size, setSize] = useState<LabelSize>("39");
  const [variantNo, setVariantNo] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const variant = variants.find((v) => v.articleNo === variantNo);
  const labelData: LabelProduct = variant
    ? {
        ...product,
        name: variant.lactoseFree ? `${product.name} laktosfri` : product.name,
        articleNo: variant.articleNo,
        weightGrams: variant.weightGrams ?? product.weightGrams,
        ean: variant.ean,
      }
    : product;
  const cmp = comparisonPrice(parsePrice(price), labelData.weightGrams);

  async function printNow() {
    setBusy(true);
    setMessage(null);
    try {
      const { openLabelsPdf } = await import("@/components/labels/label-pdf");
      await openLabelsPdf([{ ...labelData, price, size, url: labelUrl(product.slug) }], `hylletikett-${product.slug}.pdf`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "PDF:en kunde inte skapas. Försök igen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-[24px] bg-butter p-6 sm:p-7">
      <h2 className="t-h4">Hylletikett.</h2>
      <p className="mt-1 text-sm text-muted">150 mm bred med EAN-streckkod, QR-kod och jämförpris.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-semibold">Styckpris (kr)</span>
          <input
            inputMode="decimal"
            placeholder="39,90"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="field mt-1.5 h-12 bg-canvas"
          />
          <span className="mt-1.5 block text-xs text-muted">
            {cmp
              ? `Jämförpris ${cmp.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr/kg`
              : "Tomt fält ger en linje att skriva priset på."}
          </span>
        </label>
        <fieldset className="text-sm">
          <legend className="font-semibold">Höjd</legend>
          <div className="mt-1.5 flex rounded-full bg-canvas p-1">
            {(["39", "45"] as LabelSize[]).map((s) => (
              <label
                key={s}
                className={cn(
                  "flex h-10 flex-1 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  size === s ? "bg-ink text-canvas" : "text-muted hover:text-ink",
                )}
              >
                <input type="radio" name="etikettstorlek" value={s} checked={size === s} onChange={() => setSize(s)} className="sr-only" />
                {s} mm
              </label>
            ))}
          </div>
        </fieldset>
        {variants.length > 0 && (
          <label className="block text-sm sm:col-span-2">
            <span className="font-semibold">Variant</span>
            <select value={variantNo} onChange={(e) => setVariantNo(e.target.value)} className="field mt-1.5 h-12 bg-canvas">
              <option value="">Standard, art.nr {product.articleNo}</option>
              {variants
                .filter((v) => v.articleNo !== product.articleNo)
                .map((v) => (
                  <option key={v.articleNo} value={v.articleNo}>
                    {v.label}, art.nr {v.articleNo}
                  </option>
                ))}
            </select>
          </label>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={printNow} disabled={busy} className="btn btn-primary disabled:opacity-70">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />}
          Skriv ut etikett
        </button>
        <button
          type="button"
          onClick={() => {
            labelQueue.add(labelData, { price, size });
            setMessage("Etiketten ligger i utskriftskön.");
          }}
          className="btn btn-outline"
        >
          <ListPlus className="size-4" /> Lägg i kön
        </button>
      </div>
      {message && (
        <p className="mt-3 text-sm font-semibold text-accent-deep" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
