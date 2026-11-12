import Link from "next/link";
import { ArrowRight, ClipboardList, Phone, ShoppingCart, type LucideIcon } from "lucide-react";
import { Wave } from "@/components/decor";
import { customerHref } from "@/lib/site";
import { cn } from "@/lib/cn";

const steps: { title: string; text: string; icon: LucideIcon; bg: string; tilt: string }[] = [
  {
    title: "Kontakta oss",
    text: "Berätta om din verksamhet och vad du behöver – ring eller mejla oss.",
    icon: Phone,
    bg: "bg-white",
    tilt: "rotate-6",
  },
  {
    title: "Få ett upplägg",
    text: "Vi tar fram sortiment, priser och leveranser åt er.",
    icon: ClipboardList,
    bg: "bg-butter",
    tilt: "-rotate-6",
  },
  {
    title: "Beställ i PCS",
    text: "Lägg dina beställningar enkelt online i vårt beställningssystem.",
    icon: ShoppingCart,
    bg: "bg-blush",
    tilt: "rotate-6",
  },
];

interface Props {
  /** Visa knappen "Bli kund hos oss" under stegen (av på sidan där formuläret redan finns) */
  cta?: { href: string; label: string } | null;
  /** Färgen ovanför och nedanför sektionens vågor */
  edge?: "white" | "forest";
}

/** "Så blir du kund" (Figma 822:581): tre numrerade klistermärkeskort med streckade pilar emellan, på gräddmark. */
export function StepsSection({ cta = { href: customerHref, label: "Bli kund hos oss" }, edge = "white" }: Props) {
  return (
    <section aria-labelledby="steg-rubrik">
      <Wave from={edge} to="cream" />
      <div className="bg-cream py-16 lg:py-24">
        <div className="wrap flex flex-col items-center gap-12 lg:gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="eyebrow">Så blir du kund</p>
            <h2 id="steg-rubrik" className="t-h2">
              Kom igång i tre enkla <em>steg</em>
            </h2>
          </div>
          <ol className="relative grid w-full gap-8 md:grid-cols-3 md:gap-10 xl:gap-20">
            {steps.map(({ title, text, icon: Icon, bg, tilt }, i) => (
              <li key={title} className={cn("sticker relative flex flex-col gap-5 p-8 lg:min-h-[272px] lg:p-10", bg)}>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[clamp(3rem,3.34vw,4rem)] leading-[1.1] font-semibold tracking-[-0.01em] text-leaf italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("inline-flex size-14 items-center justify-center rounded-[16px] bg-forest text-butter", tilt)}>
                    <Icon className="size-6" aria-hidden />
                  </span>
                </div>
                <div>
                  <h3 className="t-h4">{title}</h3>
                  <p className="t-body mt-3 text-ink-soft">{text}</p>
                </div>
                {i < steps.length - 1 && (
                  // eslint-disable-next-line @next/next/no-img-element -- dekor-SVG från designen
                  <img
                    src="/images/decor/arrow-dashed-curve.svg"
                    alt=""
                    width={64}
                    height={40}
                    className="absolute top-[120px] left-full ml-2 hidden h-10 w-16 xl:block"
                  />
                )}
              </li>
            ))}
          </ol>
          {cta && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link href={cta.href} className="btn btn-primary">
                {cta.label} <ArrowRight className="size-6" aria-hidden />
              </Link>
              <p className="t-body text-muted">Det tar bara några minuter.</p>
            </div>
          )}
        </div>
      </div>
      <Wave from="cream" to={edge} />
    </section>
  );
}
