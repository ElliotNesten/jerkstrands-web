import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

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
  },
  {
    title: "Konditorerna",
    text: "Bakelser, kakor och tårtor, från princesstårta till sachertårta.",
    image: "/images/site/hjartformad-tarta.jpg",
    alt: "Hjärtformad princesstårta",
  },
  {
    title: "Fikabrödet",
    text: "Kanel, kardemumma och vanilj, i bullar, flätor och kransar.",
    image: "/images/site/kanelflata.jpg",
    alt: "Kanelfläta med pärlsocker",
  },
];

export default function OmOssPage() {
  return (
    <>
      <PageHero tone="raspberry" crumbs={[{ label: "Om oss" }]} title={`I Göteborg sedan ${site.founded}.`} muted="Konditori och bageri på Slakthusgatan." />

      <section className="pb-20 sm:pb-28">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-5 text-[1.0625rem] leading-relaxed lg:col-span-5">
            <p className="t-lead text-ink">
              Sedan {site.founded} har göteborgarna ätit våra bröd och bakverk. Vi träffar ofta kunder som minns tårtkalas
              från när de var barn.
            </p>
            <p className="text-muted">
              Så har traditioner vuxit fram där Jerkstrands har en plats, och med minnena följer smakerna: len choklad,
              vispad grädde, färska bär och marsipan.
            </p>
            <p className="text-muted">
              Vi värnar om traditionen och hantverket och tar samtidigt in det nya. I dag bakar vi i vårt bageri på
              Slakthusgatan i Göteborg för butiker, caféer, hotell och restauranger.
            </p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-soft mt-4">
              <InstagramIcon className="size-5" /> Följ bageriet på Instagram
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
              <Image
                src="/images/site/brodsortiment-marmor.jpg"
                alt="Rågbröd, surdegsbröd och baguetter"
                fill
                preload
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="band bg-wheat py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading title="Bagare och konditorer under samma tak." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {work.map((w) => (
              <li key={w.title}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                  <Image src={w.image} alt={w.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
                </div>
                <h3 className="t-h4 mt-5">{w.title}</h3>
                <p className="mt-2 text-muted">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="wrap flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading title="Hela sortimentet finns online." intro="Med artikelnummer, EAN, ingredienser och allergener för varje produkt." />
          <Link href="/sortiment" className="btn btn-primary self-start lg:self-auto">
            Se sortimentet <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
