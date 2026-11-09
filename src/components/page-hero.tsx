import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface Crumb {
  href?: string;
  label: string;
}

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
  compact?: boolean;
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Brödsmulor">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-espresso-600">
        <li>
          <Link href="/" className="hover:text-forest-700">
            Start
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 text-espresso-500" aria-hidden />
            {c.href ? (
              <Link href={c.href} className="hover:text-forest-700">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-espresso-900">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ eyebrow, title, intro, crumbs, children, className, compact }: Props) {
  return (
    <section className={cn("paper-texture border-b border-cream-300/70", className)}>
      <div className={cn("container-site", compact ? "py-7 sm:py-9" : "py-10 sm:py-14")}>
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <div className={cn("max-w-3xl", compact ? "mt-4" : "mt-6")}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={cn("mt-3 leading-[1.05]", compact ? "text-4xl sm:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl")}>{title}</h1>
          {intro && (
            <div className={cn("leading-relaxed text-espresso-700", compact ? "mt-3 text-base sm:text-lg" : "mt-5 text-lg")}>{intro}</div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
