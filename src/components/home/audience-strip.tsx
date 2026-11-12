import { Bed, Cake, Coffee, ShoppingBasket, Utensils, type LucideIcon } from "lucide-react";
import { Sparkle } from "@/components/decor";
import { cn } from "@/lib/cn";

const audiences: { label: string; icon: LucideIcon; bg: string; tilt: string }[] = [
  { label: "Hotell", icon: Bed, bg: "bg-cream", tilt: "rotate-2" },
  { label: "Restauranger", icon: Utensils, bg: "bg-blush", tilt: "-rotate-[1.5deg]" },
  { label: "Caféer", icon: Coffee, bg: "bg-butter", tilt: "rotate-[1.5deg]" },
  { label: "Livsmedelsbutiker", icon: ShoppingBasket, bg: "bg-mint", tilt: "-rotate-2" },
  { label: "Catering & event", icon: Cake, bg: "bg-mist", tilt: "rotate-[1.5deg]" },
];

/** "Vi bakar för" (Figma 822:292): rubriken med en streckad pil mot fem snett placerade klistermärken. */
export function AudienceStrip() {
  return (
    <section aria-labelledby="vi-bakar-for" className="relative border-b border-hairline-soft bg-white">
      <Sparkle className="absolute top-10 left-[20.4%] hidden size-4 text-leaf xl:block" />
      <Sparkle className="absolute top-10 left-[36.7%] hidden size-8 text-butter xl:block" />
      <Sparkle className="absolute right-[6%] bottom-12 size-4 text-moss" />
      <div className="wrap flex flex-col gap-8 py-12 min-[1700px]:flex-row min-[1700px]:items-center min-[1700px]:justify-between min-[1700px]:py-14">
        <div className="flex items-center gap-6 xl:gap-12">
          <div>
            <h2 id="vi-bakar-for" className="text-[2.5rem] leading-tight">
              Vi bakar <em>för</em>
            </h2>
            <p className="mt-2 text-muted">Leverantör till Göteborgs företag</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- dekor-SVG från designen */}
          <img src="/images/decor/arrow-dashed-long.svg" alt="" width={160} height={48} className="mt-6 hidden h-12 w-40 md:block" />
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-5 lg:gap-6">
          {audiences.map(({ label, icon: Icon, bg, tilt }) => (
            <li
              key={label}
              className={cn(
                "sticker-sm font-ui flex items-center gap-3 rounded-full py-2 pr-6 pl-2 text-lg font-semibold",
                bg,
                tilt,
              )}
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-forest text-butter">
                <Icon className="size-5" aria-hidden />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
