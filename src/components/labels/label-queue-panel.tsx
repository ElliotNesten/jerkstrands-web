"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Printer, Tag, Trash2, X } from "lucide-react";
import { labelQueue, labelUrl, useLabelQueue } from "@/components/labels/label-queue";
import type { LabelSize } from "@/components/labels/label-pdf";
import { cn } from "@/lib/cn";

export function LabelQueuePanel() {
  const { items, open } = useLabelQueue();
  const [printing, setPrinting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0 && !open) return null;

  async function printAll() {
    setError(null);
    setPrinting(true);
    try {
      const { openLabelsPdf } = await import("@/components/labels/label-pdf");
      await openLabelsPdf(
        items.map((i) => ({ ...i, url: labelUrl(i.slug) })),
        "hylletiketter-jerkstrands.pdf",
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Något gick fel när PDF:en skapades.");
    } finally {
      setPrinting(false);
    }
  }

  return (
    <div className="fixed right-3 bottom-3 z-40 flex flex-col items-end gap-3 sm:right-5 sm:bottom-5">
      {open && (
        <section
          aria-label="Utskriftskö för hylletiketter"
          className="flex max-h-[min(36rem,calc(100dvh-7rem))] w-[min(26rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-cream-300 bg-cream-50 shadow-lift"
        >
          <header className="flex items-center justify-between gap-3 border-b border-cream-300 bg-forest-900 px-4 py-3 text-cream-50">
            <div>
              <h2 className="font-display text-lg leading-tight">Utskriftskö</h2>
              <p className="text-xs text-cream-300">Hylletiketter 150 mm · fyll i styckpris</p>
            </div>
            <button
              type="button"
              onClick={() => labelQueue.setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-full hover:bg-forest-800"
              aria-label="Stäng utskriftskön"
            >
              <X className="size-4" />
            </button>
          </header>

          {items.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-espresso-600">
              <p>Inga hylletiketter i kön ännu.</p>
              <Link href="/sortiment" className="mt-3 inline-block font-semibold text-forest-700 underline">
                Välj produkter i sortimentet
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2 border-b border-cream-300 px-4 py-2 text-xs text-espresso-600">
                <span>
                  {items.length} {items.length === 1 ? "etikett" : "etiketter"}
                </span>
                <span className="flex items-center gap-1.5">
                  Alla:
                  {(["39", "45"] as LabelSize[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => labelQueue.setAllSizes(s)}
                      className="rounded-full border border-cream-400 px-2 py-0.5 font-medium hover:border-forest-700 hover:text-forest-800"
                    >
                      150×{s}
                    </button>
                  ))}
                </span>
              </div>
              <ul className="flex-1 divide-y divide-cream-300/70 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 px-4 py-3">
                    <div className="product-stage relative size-14 shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.image} alt="" fill sizes="56px" className="object-contain p-1" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => labelQueue.remove(item.id)}
                          className="-mt-1 -mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-espresso-500 hover:bg-berry-100 hover:text-berry-700"
                          aria-label={`Ta bort ${item.name} från kön`}
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-espresso-500">Art.nr {item.articleNo}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="flex items-center gap-1.5 text-xs">
                          <span className="sr-only">Styckpris för {item.name}</span>
                          <input
                            inputMode="decimal"
                            placeholder="Pris"
                            value={item.price}
                            onChange={(e) => labelQueue.update(item.id, { price: e.target.value })}
                            className="w-20 rounded-lg border border-cream-400 bg-white px-2 py-1.5 text-sm focus:border-forest-700 focus:outline-none"
                          />
                          kr
                        </label>
                        <div className="ml-auto flex overflow-hidden rounded-lg border border-cream-400 text-xs" role="group" aria-label="Etikettstorlek">
                          {(["39", "45"] as LabelSize[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={item.size === s}
                              onClick={() => labelQueue.update(item.id, { size: s })}
                              className={cn(
                                "px-2 py-1.5 font-medium",
                                item.size === s ? "bg-forest-800 text-cream-50" : "bg-white hover:bg-cream-200",
                              )}
                            >
                              ×{s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {error && <p className="border-t border-berry-100 bg-berry-100 px-4 py-2 text-xs text-berry-700">{error}</p>}
              <footer className="flex items-center gap-2 border-t border-cream-300 bg-cream-100 px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Vill du tömma utskriftskön?")) labelQueue.clear();
                  }}
                  className="btn btn-ghost btn-sm text-espresso-600"
                >
                  Töm kön
                </button>
                <button
                  type="button"
                  onClick={printAll}
                  disabled={printing}
                  className="btn btn-primary btn-sm ml-auto disabled:opacity-70"
                >
                  {printing ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />}
                  Skriv ut alla (PDF)
                </button>
              </footer>
            </>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => labelQueue.setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-forest-900 py-2.5 pr-4 pl-3 text-sm font-semibold text-cream-50 shadow-lift hover:bg-forest-800"
      >
        <span className="relative inline-flex size-7 items-center justify-center rounded-full bg-gold-500 text-espresso-950">
          <Tag className="size-3.5" />
        </span>
        Hylletiketter
        <span className="rounded-full bg-cream-50/15 px-2 py-0.5 text-xs tabular-nums">{items.length}</span>
      </button>
    </div>
  );
}
