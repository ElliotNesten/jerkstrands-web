import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Sparkle, Wave } from "@/components/decor";
import { AboutSection } from "@/components/home/about-section";
import { InstagramIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { customerHref, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Om oss: i Göteborg sedan 1930",
  description:
    "Sedan 1930 har göteborgarna ätit Jerkstrands bröd och bakverk. Om bageriet, hantverket och tårtorna som blivit tradition.",
  alternates: { canonical: "/om-oss" },
};

const work = [
  {
    title: "Bagarna",
    text: "Rustika och klassiska bröd, bakade efter tradition med noga utvalda råvaror.",
    image: "/images/site/flatbrod.jpg",
    alt: "Flätat vetebröd på en skärbräda",
    bg: "bg-white",
    tag: { label: "Bageri", className: "rotate-6 bg-forest text-cream" },
  },
  {
    title: "Konditorerna",
    text: "Bakelser, kakor och tårtor, från princesstårta till sachertårta.",
    image: "/images/site/princesstarta.jpg",
    alt: "Princesstårta på grön marmor",
    bg: "bg-butter",
    tag: { label: "Konditori", className: "-rotate-5 bg-white text-forest" },
  },
  {
    title: "Fikabrödet",
    text: "Kanel, kardemumma och vanilj, i bullar, flätor och kransar.",
    image: "/images/site/kanelflata.jpg",
    alt: "Kanelfläta med pärlsocker",
    bg: "bg-blush",
    tag: { label: "Fika", className: "rotate-4 bg-butter text-forest" },
  },
];

export default function OmOssPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Om oss" }]}
        eyebrow="Om oss"
        title={
          <>
            I Göteborg sedan <em>{site.founded}</em>
          </>
        }
        intro="Konditori och bageri på Slakthusgatan, med bröd och bakverk för hotell, restauranger, caféer och butiker."
        image={{ src: "/images/site/deg.jpg", alt: "Deg som knådas på ett mjölat bord" }}
      />

      <AboutSection
        eyebrow="Vår historia"
        title={
          <>
            Tårtkalas som blivit <em>tradition</em>
          </>
        }
        paragraphs={[
          <>
            Sedan {site.founded} har göteborgarna ätit våra bröd och bakverk. Vi träffar ofta kunder som minns tårtkalas från
            när de var barn.
          </>,
          <>
            Så har traditioner vuxit fram där Jerkstrands har en plats, och med minnena följer smakerna. Vi värnar om
            traditionen och hantverket och tar samtidigt in det nya.
          </>,
          <>I dag bakar vi i vårt bageri på Slakthusgatan i Göteborg för butiker, caféer, hotell och restauranger.</>,
        ]}
        link={{ href: "/kvalitet", label: "Så arbetar vi med kvalitet" }}
      >
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <InstagramIcon className="size-5" /> Följ bageriet på Instagram
        </a>
      </AboutSection>

      <section aria-labelledby="hantverk-rubrik">
        <Wave from="white" to="cream" />
        <div className="relative bg-cream py-16 lg:py-24">
          <Sparkle className="absolute top-14 right-[5%] size-8 text-butter" />
          <div className="wrap">
            <SectionHeading
              id="hantverk-rubrik"
              eyebrow="Hantverket"
              title={
                <>
                  Bagare och konditorer under samma <em>tak</em>
                </>
              }
            />
            <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
              {work.map((w) => (
                <li key={w.title} className={cn("sticker flex flex-col overflow-hidden p-4", w.bg)}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                    <Image src={w.image} alt={w.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
                    <span className={cn("tag-tilt absolute bottom-4 left-5", w.tag.className)}>
                      <Sparkle className="size-4" />
                      {w.tag.label}
                    </span>
                  </div>
                  <div className="px-2 pt-8 pb-4 sm:px-6">
                    <h3 className="t-h3">{w.title}</h3>
                    <p className="t-body mt-3 text-ink-soft">{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Wave from="cream" to="white" />
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sticker flex flex-col gap-8 bg-butter p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between lg:p-16">
            <SectionHeading
              title={
                <>
                  Hela sortimentet finns <em>online</em>
                </>
              }
              intro="Med artikelnummer, EAN, ingredienser och allergener för varje produkt."
            />
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link href="/sortiment" className="btn btn-primary">
                Se sortimentet <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href={customerHref} className="btn btn-outline">
                Bli kund hos oss
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
