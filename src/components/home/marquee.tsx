import { Sparkle } from "@/components/decor";

const words = ["Bröd", "Kanelbullar", "Tårtor", "Bakelser", "Wienerbröd", "Lussekatter", "Kakor"];

/** Löpband på grön mark (Figma 822:350). Två kopior av listan rullar i en ändlös slinga. */
export function Marquee() {
  return (
    <div className="marquee-wrap overflow-hidden bg-forest py-6 text-cream" aria-label={words.join(", ")} role="img">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
            {words.map((w) => (
              <li key={w} className="flex items-center gap-10">
                <Sparkle className="size-6 text-butter" />
                <span className="font-display text-[clamp(2.25rem,2.5vw,3rem)] leading-none font-semibold whitespace-nowrap italic">
                  {w}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
