import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/faq";

/** Frågor som ljusgrå rader (Mobbin faq-row), svaret fälls ut. */
export function FaqList() {
  return (
    <div className="space-y-3">
      {faq.map((f) => (
        <details key={f.q} className="group rounded-[16px] bg-canvas-soft [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[1.0625rem] font-semibold">
            {f.q}
            <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="max-w-3xl px-6 pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
