import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { YearsSince } from "@/components/current-year";
import { Sparkle } from "@/components/decor";
import { site } from "@/lib/site";

interface Props {
  eyebrow?: string;
  title?: ReactNode;
  paragraphs?: ReactNode[];
  link?: { href: string; label: string } | null;
  /** Extra innehåll under länken, t.ex. en Instagram-knapp */
  children?: ReactNode;
}

const defaultParagraphs = [
  <>
    Sedan {site.founded} har göteborgarna njutit av våra bröd och bakverk. Ofta träffar vi kunder som berättar om härliga
    minnen av tårtkalas när de var barn – traditioner där Jerkstrands har spelat en betydelsefull roll.
  </>,
  <>Vi värnar om traditionen och kärleken till hantverket, samtidigt som vi låter oss inspireras av det nya.</>,
];

/** "Om oss" (Figma 822:552): två snett ställda foton med vit ram och årskortet, texten och citatet till höger. */
export function AboutSection({
  eyebrow = "Om oss",
  title = (
    <>
      Ett Göteborgsbageri
      <br /> sedan <em>{site.founded}</em>
    </>
  ),
  paragraphs = defaultParagraphs,
  link = { href: "/om-oss", label: "Läs mer om oss" },
  children,
}: Props) {
  return (
    <section aria-labelledby="om-oss-rubrik" className="relative bg-white pt-10 pb-20 lg:pt-14 lg:pb-[120px]">
      <Sparkle className="absolute bottom-[100px] left-[5%] size-8 text-moss" />
      <div className="wrap flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
        <div className="relative mx-auto flex w-full max-w-[886px] gap-[3%] px-2 pb-6 lg:mx-0 lg:w-[54.7%] lg:shrink-0">
          <Photo src="/images/site/konditoridisk.jpg" alt="Bullar och bakverk i en konditoridisk" className="w-1/2 rotate-3" />
          <div className="w-1/2 pt-[7.5%]">
            <Photo src="/images/site/brodsortiment-marmor.jpg" alt="Rågbröd, surdegsbröd och baguetter på marmor" className="w-full -rotate-3" />
          </div>
          <div className="sticker-sm absolute top-[78%] left-[22%] flex rotate-4 items-center gap-4 rounded-[24px] bg-white px-5 py-4 whitespace-nowrap sm:px-8 sm:py-6">
            <span className="font-display text-[clamp(2.75rem,3.34vw,4rem)] leading-[1.1] font-semibold tracking-[-0.01em] text-leaf italic">
              <YearsSince year={site.founded} />
            </span>
            <span className="font-ui text-base leading-[1.3] font-semibold sm:text-lg">
              år av hantverk
              <br />i Göteborg
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-10">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="om-oss-rubrik" className="t-h2">
              {title}
            </h2>
          </div>
          <div className="t-lead max-w-[640px] space-y-4 text-ink-soft">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <figure className="flex gap-6 py-2">
            <span className="w-2 shrink-0 rounded-[8px] bg-butter" aria-hidden />
            <div className="flex flex-col gap-4">
              <blockquote className="font-display text-[clamp(1.625rem,1.67vw,2rem)] leading-[1.2] font-medium">
                “Vi älskar att baka och gör det alltid med mycket kärlek och hög kvalitet.”
              </blockquote>
              <figcaption className="t-body max-w-[560px] text-muted">
                Len choklad, vispad grädde, färska bär eller läcker marsipan – smakerna man minns.
              </figcaption>
            </div>
          </figure>
          {link && (
            <Link href={link.href} className="font-ui inline-flex items-center gap-2 pt-2 text-lg font-semibold">
              <span className="link-draw">{link.label}</span>
              <ArrowRight className="size-6" aria-hidden />
            </Link>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative aspect-[2/3] overflow-hidden rounded-[24px] border-[8px] border-white shadow-[var(--shadow-photo)] sm:border-12 ${className ?? ""}`}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 400px, 46vw" className="rounded-[16px] object-cover" />
    </div>
  );
}
