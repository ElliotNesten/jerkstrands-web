"use client";

import { useState } from "react";
import { ListPlus, Loader2, Printer, Tag } from "lucide-react";
import { labelQueue, labelUrl, type LabelProduct } from "@/components/labels/label-queue";
import { comparisonPrice, parsePrice, type LabelSize } from "@/components/labels/label-pdf";
import type { Variant } from "@/lib/catalog";
import { cn } from "@/lib/cn";

interface Props {
  product: LabelProduct;
  variants: Variant[];
}

/** Skapa hylletikett för en produkt: pris, storlek, ev. variant → PDF eller utskriftskö. */
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
      await openLabelsPdf(
        [{ ...labelData, price, size, url: labelUrl(product.slug) }],
        `hylletikett-${product.slug}.pdf`,
      );
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Kunde inte skapa PDF.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-3xl border border-cream-300 bg-cream-50 p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
          <Tag className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-xl">Skriv ut hylletikett</h2>
          <p className="text-xs text-espresso-600">Med EAN-streckkod, QR-kod och jämförpris</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-semibold">Styckpris (kr)</span>
          <input
            inputMode="decimal"
            placeholder="t.ex. 39,90"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-cream-400 bg-white px-3 text-base focus:border-forest-700 focus:outline-none"
          />
          <span className="mt-1 block text-xs text-espresso-600">
            {cmp
              ? `Jämförpris: ${cmp.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr/kg`
              : "Lämna tomt för att skriva priset för hand."}
          </span>
        </label>
        <fieldset className="text-sm">
          <legend className="font-semibold">Etikettstorlek</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {(["39", "45"] as LabelSize[]).map((s) => (
              <label
                key={s}
                className={cn(
                  "flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm font-medium",
                  size === s ? "border-forest-800 bg-forest-800 text-cream-50" : "border-cream-400 bg-white hover:border-forest-700",
                )}
              >
                <input
                  type="radio"
                  name="etikettstorlek"
                  value={s}
                  checked={size === s}
                  onChange={() => setSize(s)}
                  className="sr-only"
                />
                150 × {s} mm
              </label>
            ))}
          </div>
        </fieldset>
        {variants.length > 0 && (
          <label className="block text-sm sm:col-span-2">
            <span className="font-semibold">Variant</span>
            <select
              value={variantNo}
              onChange={(e) => setVariantNo(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-cream-400 bg-white px-3 text-base focus:border-forest-700 focus:outline-none"
            >
              <option value="">Standard – art.nr {product.articleNo}</option>
              {variants
                .filter((v) => v.articleNo !== product.articleNo)
                .map((v) => (
                  <option key={v.articleNo} value={v.articleNo}>
                    {v.label} – art.nr {v.articleNo}
                  </option>
                ))}
            </select>
          </label>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={printNow} disabled={busy} className="btn btn-primary disabled:opacity-70">
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />}
          Skriv ut (PDF)
        </button>
        <button
          type="button"
          onClick={() => {
            labelQueue.add(labelData, { price, size });
            setMessage("Tillagd i utskriftskön.");
          }}
          className="btn btn-outline"
        >
          <ListPlus className="size-4" /> Lägg i utskriftskö
        </button>
      </div>
      {message && (
        <p className="mt-3 text-sm text-forest-700" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
