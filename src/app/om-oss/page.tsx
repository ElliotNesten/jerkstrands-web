import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, History, Sparkles } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { InstagramIcon, Ornament } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om oss – i Göteborg sedan 1930",
  description:
    "Sedan 1930 har göteborgarna njutit av Jerkstrands bröd och bakverk. Läs om vår historia, vårt hantverk och vår kärlek till bakningen.",
  alternates: { canonical: "/om-oss" },
};

const values = [
  {
    icon: History,
    title: "Tradition",
    text: "Recept och smaker som följt göteborgarna i generationer – från vardagsbrödet till kalasets tårta.",
  },
  {
    icon: HandHeart,
    title: "Hantverk",
    text: "Våra bagare skapar rustika och klassiska bröd. Våra konditorer bakelser, kakor och ätbara konstverk.",
  },
  {
    icon: Sparkles,
    title: "Nyfikenhet",
    text: "Vi värnar om traditionen – och låter oss samtidigt inspireras av det nya.",
  },
];

const gallery = [
  { src: "/images/site/flatbrod.jpg", alt: "Flätat vetebröd" },
  { src: "/images/site/kanelflata.jpg", alt: "Kanelfläta med pärlsocker" },
  { src: "/images/site/brod-med-snore.jpg", alt: "Fruktbröd knutet med snöre" },
  { src: "/images/site/muffins.jpg", alt: "Muffins på marmor" },
];

export default function OmOssPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Om oss" }]}
        eyebrow="Om Jerkstrands"
        title={
          <>
            I Göteborg <em className="text-forest-800 italic">sedan {site.founded}</em>
          </>
        }
        intro={<p>Ett konditori och bageri med rötterna i Göteborg – och med kärlek till hantverket i varje deg.</p>}
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              <Image
                src="/images/site/brodsortiment-marmor.jpg"
                alt="Rågbröd, surdegsbröd och baguetter"
                fill
                preload
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="prose-jerk text-lg leading-relaxed text-espresso-800">
            <p className="font-display text-2xl leading-snug text-espresso-950 sm:text-3xl">
              Sedan {site.founded} har göteborgarna njutit av våra goda bröd och bakverk.
            </p>
            <p>
              Ofta träffar vi kunder som berättar om härliga minnen av tårtkalas när de var barn. Det har skapat
              traditioner där Jerkstrands har spelat en betydelsefull roll. Fina minnen av stunder tillsammans lockar
              också fram minnen av smakerna man älskar – len choklad, vispad grädde, färska bär eller läcker marsipan.
            </p>
            <p>
              Vi är stolta och glada över att få vara en del av våra kunders liv och kommer att fortsätta värna om
              traditionen och kärleken till hantverket, samtidigt som vi låter oss inspireras av det nya. Njutningen av
              att äta en riktigt god tårta tillsammans kommer alltid att vara densamma.
            </p>
            <p>
              Idag bakar vi i vårt bageri på Slakthusgatan i Göteborg – för dagligvaruhandel, caféer, hotell och
              restauranger. Med samma kärlek och höga kvalitet som alltid.
            </p>
            <Ornament className="mt-10 w-36 text-gold-500" />
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-16 text-cream-100 sm:py-20">
        <div className="container-site">
          <p className="eyebrow eyebrow-light">Det vi står för</p>
          <h2 className="mt-4 max-w-2xl text-3xl leading-tight text-cream-50 sm:text-[2.6rem]">
            Vi älskar att baka – och det ska märkas
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-3xl border border-cream-50/10 bg-cream-50/[0.04] p-7">
                <Icon className="size-7 text-gold-300" aria-hidden />
                <h3 className="mt-5 font-display text-2xl text-cream-50">{title}</h3>
                <p className="mt-2 leading-relaxed text-cream-300">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-site">
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {gallery.map((g) => (
              <li key={g.src} className="relative aspect-square overflow-hidden rounded-3xl">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-lg text-espresso-700">Följ oss för det senaste från bageriet</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <InstagramIcon className="size-5" /> {site.instagramHandle}
              </a>
              <Link href="/sortiment" className="btn btn-primary">
                Upptäck sortimentet <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
