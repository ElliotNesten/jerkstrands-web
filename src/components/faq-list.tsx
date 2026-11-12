import { Plus } from "lucide-react";
import { faq } from "@/lib/faq";

/** Vanliga frågor som gräddfärgade rader med grön kant; svaret fälls ut. */
export function FaqList() {
  return (
    <div className="space-y-3">
      {faq.map((f) => (
        <details
          key={f.q}
          className="group rounded-[24px] border-[1.5px] border-forest bg-cream transition-shadow open:bg-white open:shadow-[var(--shadow-sticker-sm)] [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="font-ui flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-lg font-semibold">
            {f.q}
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-butter transition-transform group-open:rotate-45">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="t-body max-w-3xl px-6 pb-6 text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
