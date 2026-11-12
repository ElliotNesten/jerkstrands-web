import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Sparkle, Wave } from "@/components/decor";
import { cn } from "@/lib/cn";

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  /** Rubriken; lägg ett ord i <em> för den kursiva, ljusgröna markeringen */
  title: ReactNode;
  eyebrow?: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  /** Knappar eller annat under ingressen */
  children?: ReactNode;
  /** Foto till höger (med smörgul skuggplatta som på startsidan) */
  image?: { src: string; alt: string; position?: string };
  /** Eget innehåll till höger i stället för ett foto */
  aside?: ReactNode;
  className?: string;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Brödsmulor">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <li>
          <Link href="/" className="link-draw hover:text-forest">
            Start
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-1">
            <ChevronRight className="size-3.5" aria-hidden />
            {c.href ? (
              <Link href={c.href} className="link-draw hover:text-forest">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-forest">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Sidhuvud för undersidor i startsidans form: gräddmark, brödsmulor, överrubrik, stor rubrik med
 * kursivt ord, ingress och knappar, ev. ett foto till höger. Avslutas med en våg mot vitt.
 */
export function PageHero({ title, eyebrow, intro, crumbs, children, image, aside, className }: Props) {
  const side = Boolean(image || aside);
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="relative bg-cream">
        <Sparkle className="absolute top-6 left-[3.75%] size-10 text-butter sm:size-14" />
        <Sparkle className="absolute top-20 right-[6%] hidden size-6 text-moss sm:block" />
        <Sparkle className="absolute bottom-10 left-[46%] hidden size-6 text-leaf lg:block" />
        <div
          className={cn(
            "wrap relative pt-10 pb-14 lg:pt-14 lg:pb-20",
            side && "flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16",
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col items-start" data-enter>
            {crumbs && <Breadcrumbs crumbs={crumbs} />}
            {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
            <h1 className={cn("t-h1 max-w-[16ch]", eyebrow ? "mt-4" : "mt-8")}>{title}</h1>
            {intro && <div className="t-lead mt-6 max-w-[640px] text-ink-soft">{intro}</div>}
            {children}
          </div>
          {image && (
            <div className="relative mx-auto w-[calc(100%-1.5rem)] max-w-[520px] shrink-0 lg:mx-0 lg:w-[34%]" data-enter>
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px] bg-butter sm:translate-x-6 sm:translate-y-6 sm:rounded-[40px]" aria-hidden />
              <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] sm:rounded-[40px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  sizes="(min-width: 1700px) 520px, (min-width: 1024px) 34vw, 92vw"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
            </div>
          )}
          {!image && aside && <div className="w-full shrink-0 lg:w-[34%]">{aside}</div>}
        </div>
      </div>
      <Wave from="cream" to="white" />
    </section>
  );
}
