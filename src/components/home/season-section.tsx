import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Em, Sparkle } from "@/components/decor";
import { currentSeason } from "@/lib/season";

/** Säsong (Figma 822:522): smörgult klistermärkeskort med text till vänster och säsongsfotot till höger. */
export function SeasonSection() {
  if (!currentSeason) return null;
  const s = currentSeason;
  return (
    <section aria-labelledby="sasong-rubrik" className="relative bg-white pt-16 pb-10 lg:pt-[120px] lg:pb-16">
      <Sparkle className="absolute top-10 left-[5%] size-8 text-leaf" />
      <Sparkle className="absolute right-[6%] bottom-4 hidden size-6 text-butter sm:block" />
      <div className="wrap">
        <div className="sticker flex flex-col overflow-hidden bg-butter lg:flex-row">
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id="sasong-rubrik" className="t-h2 max-w-[5.5em]">
              <Em>{s.title}</Em>
            </h2>
            <p className="t-lead max-w-[640px] text-ink-soft">{s.text}</p>
            <ul className="flex flex-wrap gap-2">
              {s.highlights.map((h) => (
                <li key={h.slug}>
                  <Link href={`/sortiment/${h.slug}`} className="pill bg-cream transition-colors hover:bg-white">
                    {h.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={s.href} className="btn btn-primary mt-2">
              {s.cta} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="relative aspect-[824/600] lg:aspect-auto lg:min-h-[600px] lg:w-[51%]">
            <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1700px) 824px, (min-width: 1024px) 50vw, 92vw" className="object-cover" />
            <div className="absolute top-5 left-5 flex size-24 -rotate-8 flex-col items-center justify-center rounded-full border-2 border-butter bg-forest text-white sm:top-6 sm:left-10 sm:size-[136px]">
              <span className="text-[0.625rem] font-semibold tracking-[0.16em] text-butter uppercase sm:text-sm">Säsong</span>
              <span className="font-display text-4xl leading-[1.1] font-semibold tracking-[-0.01em] sm:text-[3.5rem]">{s.stamp}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
