import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Download } from "lucide-react";
import { CustomerFormSection } from "@/components/customer-form-section";
import { Sparkle, Wave } from "@/components/decor";
import { FaqList } from "@/components/faq-list";
import { AudienceStrip } from "@/components/home/audience-strip";
import { LabelsSection } from "@/components/home/labels-section";
import { StepsSection } from "@/components/home/steps-section";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/catalog";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Bli kund: hotell, restaurang, café och butik",
  description:
    "Bli kund hos Jerkstrands. Bröd, fikabröd och tårtor till hotell, restauranger, caféer och livsmedelsbutiker. Beställ i PCS före kl. 14 för leverans nästa dag.",
  alternates: { canonical: "/aterforsaljare" },
};

const lactoseFreeCount = products.filter((p) => p.tags.includes("laktosfri")).length;

const segmentsDetail: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  text: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  contain?: boolean;
  tag: { label: string; className: string };
  link: { href: string; label: string };
}[] = [
  {
    id: "butik",
    eyebrow: "Livsmedelsbutik",
    title: (
      <>
        Packat bröd och bakverk för <em>hyllan</em>
      </>
    ),
    text: "Det packade sortimentet ligger i Jerkstrands gröna påse med EAN. Komplettera med lösviktsbröd, fikabröd och tårtor, så får butiken en bakavdelning med bageriets sortiment.",
    bullets: [
      "Packat bröd och bakverk med EAN-kod",
      "Hylletiketter med pris, jämförpris och QR-kod",
      "Tårtpärm att beställa ur, som ifyllbar PDF",
      "Säsongssortiment till jul, fastlagen och studenten",
    ],
    image: "/images/site/butterkaka-packad.webp",
    imageAlt: "Butterkaka i Jerkstrands gröna förpackning",
    contain: true,
    tag: { label: "Butiksklart", className: "rotate-6 bg-forest text-cream" },
    link: { href: "/sortiment?kategori=packat", label: "Se packat sortiment" },
  },
  {
    id: "cafe",
    eyebrow: "Café och konditori",
    title: (
      <>
        Tårtor, bakelser och fikabröd för <em>disken</em>
      </>
    ),
    text: "Konditoriets klassiker i den storlek disken behöver: tårtor i 8, 12 och 20 bitar, bakelser, mumsbitar och handknutna bullar.",
    bullets: [
      "Tårtor i 8, 12 och 20 bitar",
      `${lactoseFreeCount} tårtor finns även laktosfria`,
      "Bakelser och kondisbitar, från napoleon till semla",
      "Handknutet fikabröd, kransar och längder",
    ],
    image: "/images/site/jordgubbstarta.jpg",
    imageAlt: "Jordgubbstårta på grön marmor",
    tag: { label: "Konstverk", className: "-rotate-5 bg-butter text-forest" },
    link: { href: "/sortiment?kategori=tartor", label: "Se tårtor och längder" },
  },
  {
    id: "hotell",
    eyebrow: "Hotell och restaurang",
    title: (
      <>
        Minibröd och kakblock för <em>frukost</em> och konferens
      </>
    ),
    text: "Tillsammans med några av Sveriges ledande hotell- och restauranggrupper har vi tagit fram bröd och bakverk i portionsstorlekar som minskar svinnet.",
    bullets: [
      "Portionsbröd i ministorlek för frukostbuffén",
      "Bröd för landgång, toast och smörgåstårta",
      "Muffins, bullar och kondisbitar i ministorlek",
      "Mjuka kakblock att portionera själv",
    ],
    image: "/images/site/muffins.jpg",
    imageAlt: "Muffins på marmor",
    tag: { label: "Frukostfavorit", className: "rotate-4 bg-white text-forest" },
    link: { href: "/sortiment?kanal=hotell-restaurang", label: "Se hotellsortimentet" },
  },
];

const downloads = [
  { title: "Sortiment", text: "Butikssortimentet med artikelnummer, vikt och EAN.", href: site.downloads.sortiment, meta: "PDF, 11 sidor", bg: "bg-cream" },
  { title: "Tårtpärm", text: "Tårtor och bakelser. Fyll i ert pris direkt i PDF:en.", href: site.downloads.tartor, meta: "Ifyllbar PDF, 30 sidor", bg: "bg-blush" },
  { title: "Hotell och restaurang", text: "Portionsstorlekar med ingredienser.", href: site.downloads.hotell, meta: "PDF, 8 sidor", bg: "bg-butter" },
];

export default function BliKundPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Bli kund" }]}
        eyebrow="Bli kund"
        title={
          <>
            Bröd och bakverk till din <em>verksamhet</em>
          </>
        }
        intro={`Hotell, restauranger, caféer och livsmedelsbutiker i Göteborg får leverans dagen efter beställning. Beställ i PCS före kl. ${site.orderCutoff}.`}
        image={{ src: "/images/site/kanelbullar.jpg", alt: "Kanelknutar med pärlsocker", position: "55% 60%" }}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="#bli-kund" className="btn btn-primary">
            Skicka en förfrågan <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Beställ i PCS <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </PageHero>

      <AudienceStrip />

      {segmentsDetail.map((s, i) => {
        const tinted = i === 1;
        const body = (
          <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
            <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
              <SectionHeading eyebrow={s.eyebrow} title={s.title} intro={s.text} />
              <ul className="mt-8 flex flex-col gap-4">
                {s.bullets.map((b) => (
                  <li key={b} className="t-body flex items-start gap-4">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-butter text-forest">
                      <Check className="size-4" aria-hidden />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={s.link.href} className="btn btn-outline mt-10 pr-6">
                {s.link.label} <ArrowRight className="size-6" aria-hidden />
              </Link>
            </div>
            <div className={cn("lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
              <div className="sticker bg-white p-4">
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[24px]", s.contain && "bg-mint")}>
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className={s.contain ? "object-contain p-10" : "object-cover"}
                  />
                  <span className={cn("tag-tilt absolute bottom-4 left-5", s.tag.className)}>
                    <Sparkle className="size-4" />
                    {s.tag.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
        return tinted ? (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <Wave from="white" to="cream" />
            <div className="bg-cream py-16 lg:py-24">{body}</div>
            <Wave from="cream" to="white" />
          </section>
        ) : (
          <section key={s.id} id={s.id} className="section scroll-mt-24">
            {body}
          </section>
        );
      })}

      <LabelsSection />

      <StepsSection cta={{ href: "#bli-kund", label: "Skicka en förfrågan" }} />

      <section id="material" className="section scroll-mt-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Material"
            title={
              <>
                Sortimentsblad och <em>tårtpärm</em>
              </>
            }
            intro="Att skriva ut, skicka vidare eller visa kunderna i butiken."
          />
          <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {downloads.map((d) => (
              <li key={d.href}>
                <a href={d.href} target="_blank" rel="noopener" className={cn("sticker lift group flex h-full flex-col p-8", d.bg)}>
                  <h3 className="t-h3">{d.title}</h3>
                  <p className="t-body mt-3 text-ink-soft">{d.text}</p>
                  <span className="mt-auto flex items-center justify-between border-t border-forest/12 pt-6">
                    <span className="text-muted">{d.meta}</span>
                    <span className="font-ui inline-flex items-center gap-2 text-lg font-semibold">
                      Ladda ner
                      <span className="icon-btn size-10">
                        <Download className="size-4" aria-hidden />
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CustomerFormSection id="bli-kund" />

      <section className="pb-20 lg:pb-[120px]">
        <div className="wrap grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Vanliga frågor"
            title={
              <>
                Frågor och <em>svar</em>
              </>
            }
            intro={
              <>
                Saknas svaret? Ring{" "}
                <a href={site.phoneHref} className="font-semibold text-forest underline underline-offset-4">
                  {site.phone}
                </a>{" "}
                så hjälper vi dig.
              </>
            }
          />
          <div className="lg:col-span-7">
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
}
