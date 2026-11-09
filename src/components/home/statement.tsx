import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  /** Påståendet; ord inom **dubbla stjärnor** tänds i accentfärgen */
  text: string;
  link?: { href: string; label: string };
}

/**
 * Moment "word-highlight" (tasteskill, assets/moments/word-highlight): påståendet tänds ord för ord
 * när det passerar skärmens mitt. Kitets moment.js sköter rörelsen; utan skript står allt i bläck.
 */
export function Statement({ text, link }: Props) {
  const parts = text.split(/\*\*(.+?)\*\*/);
  return (
    <section
      aria-label="Om Jerkstrands"
      data-moment="word-highlight"
      className="statement screen band bg-apricot"
      style={{ ["--bg" as string]: "var(--color-apricot)", ["--t-h2" as string]: "clamp(2.25rem, 5.4vw, 4.75rem)" }}
    >
      <div className="wrap">
        <p className="mo-wh__text">{parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}</p>
        {link && (
          <Link href={link.href} className="btn btn-outline mt-12">
            {link.label} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
