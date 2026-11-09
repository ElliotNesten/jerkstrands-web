"use client";

import { Check, Tag } from "lucide-react";
import { useState } from "react";
import { labelQueue, type LabelProduct } from "@/components/labels/label-queue";
import { cn } from "@/lib/cn";

interface Props {
  product: LabelProduct;
  className?: string;
  compact?: boolean;
}

/** Lägger produkten i utskriftskön för hylletiketter. */
export function AddLabelButton({ product, className, compact }: Props) {
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
        "inline-flex items-center gap-1.5 rounded-full border text-xs font-semibold transition-colors",
        compact ? "px-2.5 py-1.5" : "px-3 py-2",
        added
          ? "border-forest-700 bg-forest-800 text-cream-50"
          : "border-cream-400 bg-cream-50 text-espresso-800 hover:border-forest-700 hover:text-forest-800",
        className,
      )}
      aria-label={`Lägg ${product.name} i utskriftskön för hylletiketter`}
    >
      {added ? <Check className="size-3.5" /> : <Tag className="size-3.5" />}
      {added ? "Tillagd" : "Etikett"}
    </button>
  );
}
