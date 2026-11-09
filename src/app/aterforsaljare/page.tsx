import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { FaqList } from "@/components/faq-list";
import { LabelsSection } from "@/components/home/labels-section";
import { MailtoForm, type FormField } from "@/components/mailto-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "För återförsäljare: butik, café, hotell och restaurang",
  description:
    "Bli återförsäljare av Jerkstrands. Bröd, fikabröd och tårtor till dagligvaruhandel, caféer, hotell och restauranger. Beställ före kl. 14 för leverans nästa dag.",
  alternates: { canonical: "/aterforsaljare" },
};

const lactoseFreeCount = products.filter((p) => p.tags.includes("laktosfri")).length;

const segmentsDetail = [
  {
    id: "butik",
    eyebrow: "Dagligvaruhandel",
    title: "Packat bröd och bakverk för hyllan.",
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
    link: { href: "/sortiment?kategori=packat", label: "Se packat sortiment" },
  },
  {
    id: "cafe",
    eyebrow: "Café och konditori",
    title: "Tårtor, bakelser och fikabröd för disken.",
    text: "Konditoriets klassiker i den storlek disken behöver: tårtor i 8, 12 och 20 bitar, bakelser, mumsbitar och handknutna bullar.",
    bullets: [
      "Tårtor i 8, 12 och 20 bitar",
      `${lactoseFreeCount} tårtor finns även laktosfria`,
      "Bakelser och kondisbitar, från napoleon till semla",
      "Handknutet fikabröd, kransar och längder",
    ],
    image: "/images/site/jordgubbstarta.jpg",
    imageAlt: "Jordgubbstårta på grön marmor",
    link: { href: "/sortiment?kategori=tartor", label: "Se tårtor och längder" },
  },
  {
    id: "hotell",
    eyebrow: "Hotell och restaurang",
    title: "Minibröd och kakblock för frukost och konferens.",
    text: "Tillsammans med några av Sveriges ledande hotell- och restauranggrupper har vi tagit fram bröd och bakverk i portionsstorlekar som minskar svinnet.",
    bullets: [
      "Portionsbröd i ministorlek för frukostbuffén",
      "Bröd för landgång, toast och smörgåstårta",
      "Muffins, bullar och kondisbitar i ministorlek",
      "Mjuka kakblock att portionera själv",
    ],
    image: "/images/site/muffins.jpg",
    imageAlt: "Muffins på marmor",
    link: { href: "/sortiment?kanal=hotell-restaurang", label: "Se hotellsortimentet" },
  },
];

const steps = [
  { title: "Skicka en intresseanmälan", text: "Fyll i formuläret eller ring oss och berätta om er verksamhet." },
  { title: "Vi föreslår ett upplägg", text: "Sortiment, leveransdagar och villkor som passar butiken, caféet eller hotellet." },
  { title: "Beställ i PCS", text: `Lägg order i orderportalen före kl. ${site.orderCutoff}, leverans nästa dag.` },
];

const downloads = [
  { title: "Sortiment", text: "Butikssortimentet med artikelnummer, vikt och EAN.", href: site.downloads.sortiment, meta: "PDF, 11 sidor" },
  { title: "Tårtpärm", text: "Tårtor och bakelser. Fyll i ert pris direkt i PDF:en.", href: site.downloads.tartor, meta: "Ifyllbar PDF, 30 sidor" },
  { title: "Hotell och restaurang", text: "Portionsstorlekar med ingredienser.", href: site.downloads.hotell, meta: "PDF, 8 sidor" },
];

const formFields: FormField[] = [
  { name: "foretag", label: "Företag", required: true, autoComplete: "organization" },
  { name: "kontaktperson", label: "Kontaktperson", required: true, autoComplete: "name" },
  { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel" },
  {
    name: "verksamhet",
    label: "Verksamhet",
    type: "select",
    required: true,
    options: ["Dagligvaruhandel", "Café eller konditori", "Hotell", "Restaurang", "Storkök eller catering", "Annat"],
  },
  { name: "ort", label: "Ort", required: true, autoComplete: "address-level2" },
  {
    name: "intresse",
    label: "Intresserad av",
    type: "checkboxes",
    options: ["Matbröd och frallor", "Fikabröd", "Tårtor och bakelser", "Småkakor", "Packat", "Hotell och restaurang", "Säsong"],
  },
  { name: "meddelande", label: "Meddelande", type: "textarea", placeholder: "Volymer, önskade leveransdagar eller annat vi bör veta." },
];

export default function AterforsaljarePage() {
  return (
    <>
      <PageHero
        tone="apricot"
        crumbs={[{ label: "För återförsäljare" }]}
        title="För återförsäljare."
        muted="Dagligvaruhandel, caféer, hotell och restauranger får leverans dagen efter beställning."
      >
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="#bli-aterforsaljare" className="btn btn-primary">
            Bli återförsäljare
          </Link>
          <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Butiksorder (PCS) <ArrowUpRight className="size-4" />
          </a>
        </div>
      </PageHero>

      {segmentsDetail.map((s, i) => (
        <section key={s.id} id={s.id} className={i === 1 ? "band scroll-mt-24 bg-raspberry py-20 sm:py-28" : "scroll-mt-24 py-20 sm:py-28"}>
          <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-muted">{s.eyebrow}</p>
              <h2 className="t-h2 mt-3">{s.title}</h2>
              <p className="t-lead mt-5 text-ink-soft">{s.text}</p>
              <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
                {s.bullets.map((b) => (
                  <li key={b} className="py-3">
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={s.link.href} className="btn btn-outline mt-8">
                {s.link.label} <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div
                className={
                  s.contain
                    ? "relative aspect-[4/3] overflow-hidden rounded-[24px] bg-canvas-soft"
                    : "relative aspect-[4/3] overflow-hidden rounded-[24px]"
                }
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className={s.contain ? "object-contain p-10" : "object-cover"}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <LabelsSection />

      <section className="py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading title="Så blir du återförsäljare." />
          <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-[24px] bg-butter p-7">
                <span className="text-sm font-semibold text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-6">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="material" className="scroll-mt-24 py-20 sm:py-28">
        <div className="wrap">
          <SectionHeading title="Sortimentsblad och tårtpärm." intro="Att skriva ut, skicka vidare eller visa kunderna i butiken." />
          <ul className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
            {downloads.map((d) => (
              <li key={d.href}>
                <a href={d.href} target="_blank" rel="noopener" className="lift group flex h-full flex-col rounded-[24px] bg-peach p-7">
                  <h3 className="t-h4">{d.title}</h3>
                  <p className="mt-2 text-muted">{d.text}</p>
                  <span className="mt-auto flex items-center justify-between pt-8 text-sm">
                    <span className="text-muted">{d.meta}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <Download className="size-4" /> <span className="link-draw">Ladda ner</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="bli-aterforsaljare" className="scroll-mt-24 py-20 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHeading title="Intresseanmälan." intro="Vi svarar med förslag på sortiment och leveransdagar." />
            <dl className="mt-10 divide-y divide-hairline border-y border-hairline text-[0.9375rem]">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Telefon</dt>
                <dd>
                  <a href={site.phoneHref} className="link-draw font-semibold">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">E-post</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="link-draw font-semibold">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Beställning</dt>
                <dd className="font-semibold">Före kl. {site.orderCutoff}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-[24px] bg-vanilla p-6 sm:p-8 lg:col-span-7">
            <MailtoForm fields={formFields} subject="Intresseanmälan återförsäljare – {foretag}" submitLabel="Skicka intresseanmälan" />
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <SectionHeading className="lg:col-span-5" title="Frågor och svar." />
          <div className="lg:col-span-7">
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
}
