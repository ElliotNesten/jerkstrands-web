"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { labelQueue, type LabelProduct } from "@/components/labels/label-queue";
import { cn } from "@/lib/cn";

interface Props {
  product: LabelProduct;
  className?: string;
}

/** Lägger produkten i utskriftskön för hylletiketter. */
export function AddLabelButton({ product, className }: Props) {
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        labelQueue.add(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1600);
      }}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] font-semibold transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:scale-95",
        added ? "bg-ink text-canvas" : "bg-canvas-soft text-ink hover:bg-hairline",
        className,
      )}
      aria-label={`Lägg ${product.name} i utskriftskön för hylletiketter`}
    >
      {added ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
      {added ? "I kön" : "Hylletikett"}
    </button>
  );
}
