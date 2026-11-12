import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/** Fyruddig gnista från designen. Färgen sätts med text-*, storleken med size-*. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("pointer-events-none shrink-0", className)}>
      <path
        fill="currentColor"
        d="M12 0C12.75 7 17 11.25 24 12C17 12.75 12.75 17 12 24C11.25 17 7 12.75 0 12C7 11.25 11.25 7 12 0Z"
      />
    </svg>
  );
}

const waveBg = {
  white: "bg-canvas",
  cream: "bg-cream",
  forest: "bg-forest",
} as const;
const waveFill = {
  white: "text-canvas",
  cream: "text-cream",
  forest: "text-forest",
} as const;
export type WaveColor = keyof typeof waveBg;

/**
 * Vågkant mellan två sektioner: bakgrunden har färgen ovanför (from), vågen färgen nedanför (to).
 * 64 px hög i 1920 px bredd, lägre på små skärmar.
 */
export function Wave({ from, to, className }: { from: WaveColor; to: WaveColor; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative h-8 overflow-hidden sm:h-12 lg:h-16", waveBg[from], className)}>
      <svg
        viewBox="0 0 1920 56"
        preserveAspectRatio="none"
        className={cn("absolute inset-x-0 -bottom-px h-[calc(87.5%+1px)] w-full", waveFill[to])}
      >
        <path
          fill="currentColor"
          d="M0 24C160 -8 320 -8 480 24C640 56 800 56 960 24C1120 -8 1280 -8 1440 24C1600 56 1760 56 1920 24V56H0V24Z"
        />
      </svg>
    </div>
  );
}

/** Taggig rund stämpel ("SEDAN 1930") i smörgult. */
export function BurstBadge({ top, bottom, className }: { top: string; bottom: string; className?: string }) {
  return (
    <div className={cn("relative flex size-[136px] flex-col items-center justify-center text-forest", className)}>
      <Image src="/images/decor/badge-burst.svg" alt="" width={136} height={136} className="absolute inset-0 size-full" />
      <span className="relative text-sm leading-none font-semibold tracking-[0.16em]">{top}</span>
      <span className="font-display relative mt-1 text-5xl leading-[1.1] font-semibold">{bottom}</span>
    </div>
  );
}

/** Rubriktext där ord inom *stjärnor* blir kursiva (färgen styrs av --hl). */
export function Em({ children }: { children: string }): ReactNode {
  const parts = children.split(/\*(.+?)\*/);
  return parts.map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p));
}
