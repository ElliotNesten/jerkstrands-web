import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { toneBg, type Tone } from "@/lib/tones";

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  title: ReactNode;
  muted?: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
  /** Färgband bakom sidhuvudet */
  tone?: Tone;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Brödsmulor">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <li>
          <Link href="/" className="link-draw hover:text-ink">
            Start
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 text-faint" aria-hidden />
            {c.href ? (
              <Link href={c.href} className="link-draw hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Sidhuvud för undersidor: brödsmulor, tung h1 med punkt, grå andra mening, ingress. */
export function PageHero({ title, muted, intro, crumbs, children, className, tone }: Props) {
  return (
    <section className={cn(tone ? cn("band mt-[var(--band-m)] mb-12 pt-28 pb-14 sm:mb-16 sm:pt-32 sm:pb-20", toneBg[tone]) : "pt-28 pb-12 sm:pt-32 sm:pb-16", className)}>
      <div className="wrap" data-enter>
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <h1 className="t-display mt-8 max-w-5xl">
          {title}
          {muted && (
            <>
              {" "}
              <span className="text-ink/55">{muted}</span>
            </>
          )}
        </h1>
        {intro && <div className="t-lead mt-6 max-w-2xl text-ink-soft">{intro}</div>}
        {children}
      </div>
    </section>
  );
}
