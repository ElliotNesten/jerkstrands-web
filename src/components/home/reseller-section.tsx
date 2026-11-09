import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

const segments = [
  {
    title: "Dagligvaruhandel",
    text: "Packat bröd och bakverk med EAN, och hylletiketter som du skriver ut här på sajten.",
    href: "/aterforsaljare#butik",
    cta: "Se upplägget för butik",
    image: "/images/site/chokladkakor-packade.jpg",
    alt: "Chokladkakor i Jerkstrands påse",
    position: "50% 40%",
  },
  {
    title: "Café och konditori",
    text: "Tårtor i 8, 12 och 20 bitar, bakelser och handknutet fikabröd för disken.",
    href: "/aterforsaljare#cafe",
    cta: "Se upplägget för café",
    image: "/images/site/hjartformad-tarta.jpg",
    alt: "Hjärtformad princesstårta på grön marmor",
    position: "50% 50%",
  },
  {
    title: "Hotell och restaurang",
    text: "Minibröd och kondisbitar för frukost och konferens, i storlekar som minskar svinnet.",
    href: "/aterforsaljare#hotell",
    cta: "Se upplägget för hotell",
    image: "/images/site/konditoridisk.jpg",
    alt: "Bakverk uppställda i en disk",
    position: "50% 62%",
  },
];

/** Skärm två: återförsäljare – placerad högt upp, direkt efter heron. */
export function ResellerSection() {
  return (
    <section id="aterforsaljare" aria-labelledby="aterforsaljare-rubrik" className="screen max-sm:min-h-[200svh]">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="aterforsaljare-rubrik"
            title="Återförsäljare i tre branscher."
            muted="Leverans nästa dag till alla."
          />
          <a
            href={site.orderPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-soft self-start lg:self-auto"
          >
            Redan kund? Butiksorder <ArrowUpRight className="size-4" />
          </a>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {segments.map((s) => (
            <li key={s.title}>
              <Link href={s.href} className="lift group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-canvas-soft md:max-lg:aspect-[3/4]">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className="zoom-img object-cover"
                    style={{ objectPosition: s.position }}
                  />
                </div>
                <h3 className="t-h4 mt-5">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-semibold">
                  <span className="link-draw">{s.cta}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
