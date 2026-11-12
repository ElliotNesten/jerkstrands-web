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
      setError(e instanceof Error ? e.message : "PDF:en kunde inte skapas. Försök igen.");
    } finally {
      setPrinting(false);
    }
  }

  return (
    <div className="fixed right-3 bottom-3 z-40 flex flex-col items-end gap-3 sm:right-5 sm:bottom-5">
      {open && (
        <section
          aria-label="Utskriftskö för hylletiketter"
          className="flex max-h-[min(36rem,calc(100dvh-7rem))] w-[min(25rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[24px] border-[1.5px] border-forest bg-canvas shadow-[var(--shadow-sticker-sm)]"
        >
          <header className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
            <div>
              <h2 className="font-display text-[1.75rem] leading-tight font-semibold">Utskriftskö</h2>
              <p className="text-sm text-muted">Hylletiketter 150 mm. Fyll i styckpris.</p>
            </div>
            <button
              type="button"
              onClick={() => labelQueue.setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full bg-canvas-soft hover:bg-hairline"
              aria-label="Stäng utskriftskön"
            >
              <X className="size-4" />
            </button>
          </header>

          {items.length === 0 ? (
            <div className="px-5 pt-4 pb-8 text-sm text-muted">
              <p>Inga hylletiketter i kön.</p>
              <Link href="/sortiment" className="btn btn-soft btn-sm mt-4">
                Välj produkter i sortimentet
              </Link>
            </div>
          ) : (
            <>
              <div className="mx-5 flex items-center justify-between gap-2 rounded-full bg-canvas-soft p-1 text-xs">
                <span className="pl-3 text-muted">
                  {items.length} {items.length === 1 ? "etikett" : "etiketter"} · alla:
                </span>
                <span className="flex">
                  {(["39", "45"] as LabelSize[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => labelQueue.setAllSizes(s)}
                      className="rounded-full px-3 py-1.5 font-semibold hover:bg-canvas"
                    >
                      150×{s}
                    </button>
                  ))}
                </span>
              </div>
              <ul className="mt-2 flex-1 overflow-y-auto px-5">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 border-b border-hairline-soft py-3 last:border-0">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-[16px] bg-canvas-soft">
                      <Image src={item.image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => labelQueue.remove(item.id)}
                          className="-mt-1 -mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-canvas-soft hover:text-ink"
                          aria-label={`Ta bort ${item.name} från kön`}
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-muted">Art.nr {item.articleNo}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="flex items-center gap-1.5 text-xs text-muted">
                          <span className="sr-only">Styckpris för {item.name}</span>
                          <input
                            inputMode="decimal"
                            placeholder="Pris"
                            value={item.price}
                            onChange={(e) => labelQueue.update(item.id, { price: e.target.value })}
                            className="field h-9 w-20 rounded-full px-3 py-0 text-sm"
                          />
                          kr
                        </label>
                        <div className="ml-auto flex rounded-full bg-canvas-soft p-0.5 text-xs" role="group" aria-label="Etikettstorlek">
                          {(["39", "45"] as LabelSize[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-pressed={item.size === s}
                              onClick={() => labelQueue.update(item.id, { size: s })}
                              className={cn(
                                "rounded-full px-2.5 py-1.5 font-semibold",
                                item.size === s ? "bg-canvas text-ink" : "text-muted",
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
              {error && <p className="mx-5 rounded-[16px] bg-canvas-soft px-4 py-2 text-xs">{error}</p>}
              <footer className="flex items-center gap-2 px-5 pt-3 pb-5">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Vill du tömma utskriftskön?")) labelQueue.clear();
                  }}
                  className="btn btn-soft btn-sm"
                >
                  Töm kön
                </button>
                <button type="button" onClick={printAll} disabled={printing} className="btn btn-primary btn-sm ml-auto disabled:opacity-70">
                  {printing ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />}
                  Skriv ut etiketter
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
        className="flex h-12 items-center gap-2 rounded-full bg-ink pr-4 pl-2 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5 active:scale-95"
      >
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-butter text-forest">
          <Tag className="size-3.5" />
        </span>
        Hylletiketter
        <span className="rounded-full bg-canvas/15 px-2 py-0.5 text-xs tabular-nums">{items.length}</span>
      </button>
    </div>
  );
}
