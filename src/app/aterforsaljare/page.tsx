import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Download,
  FileText,
  Layers,
  Mail,
  Phone,
  Tag,
  Truck,
} from "lucide-react";
import { MailtoForm, type FormField } from "@/components/mailto-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "För återförsäljare – butik, café, hotell & restaurang",
  description:
    "Bli återförsäljare av Jerkstrands. Nybakat bröd, fikabröd och tårtor till dagligvaruhandel, caféer, hotell och restauranger. Beställ före kl. 14 – leverans nästa dag.",
  alternates: { canonical: "/aterforsaljare" },
};

const lactoseFreeCount = products.filter((p) => p.tags.includes("laktosfri")).length;

const benefits = [
  {
    icon: Truck,
    title: "Leverans nästa dag",
    text: `Beställ före kl. ${site.orderCutoff} så levererar vi nybakat nästa dag.`,
  },
  {
    icon: Layers,
    title: `${products.length} artiklar`,
    text: "Matbröd, frallor, fikabröd, tårtor, bakelser, småkakor och säsongsfavoriter.",
  },
  {
    icon: Tag,
    title: "Säljstöd som sparar tid",
    text: "Skriv ut hylletiketter med pris, jämförpris, EAN och QR-kod direkt från sortimentet.",
  },
  {
    icon: FileText,
    title: "Tydlig märkning",
    text: "Ingredienser, allergener, näringsvärden och EAN – för varje artikel, alltid uppdaterat.",
  },
];

const segmentsDetail = [
  {
    id: "butik",
    eyebrow: "Dagligvaruhandel",
    title: "Hantverksbröd som får hyllan att sälja",
    text: "Vårt packade sortiment kommer i Jerkstrands gröna förpackning med EAN – redo att ställa på hyllan. Komplettera med lösviktsbröd, fikabröd och tårtor för en bakavdelning som känns som ett riktigt bageri.",
    bullets: [
      "Packat bröd och bakverk med EAN-kod",
      "Hylletiketter 150×39 / 150×45 mm med pris, jämförpris och QR-kod",
      "Tårtpärm som kunderna kan beställa ur – ifyllbar PDF",
      "Säsongssortiment för jul, fastlagen och studenten",
    ],
    image: "/images/site/butterkaka-packad.webp",
    imageAlt: "Butterkaka i Jerkstrands gröna förpackning",
    imageContain: true,
    link: { href: "/sortiment?kategori=packat", label: "Se packat sortiment" },
  },
  {
    id: "cafe",
    eyebrow: "Café & konditori",
    title: "Konditorns klassiker – redo för disken",
    text: "Med öga för detaljer skapar våra konditorer bakelser, kakor och tårtor som får gästerna att stanna kvar lite längre. Handknutna bullar, mumsbitar och festtårtor med riktig hantverkskänsla.",
    bullets: [
      "Tårtor i 8, 12 och 20 bitar",
      `${lactoseFreeCount} tårtor finns även i laktosfri variant`,
      "Bakelser och kondisbitar – från napoleon till semla",
      "Handknutet fikabröd, kransar och längder",
    ],
    image: "/images/site/jordgubbstarta.jpg",
    imageAlt: "Jordgubbstårta på grön marmor",
    link: { href: "/sortiment?kategori=tartor", label: "Se tårtor & längder" },
  },
  {
    id: "hotell",
    eyebrow: "Hotell & restaurang",
    title: "Branschanpassat – mindre svinn, gladare gäster",
    text: "Med några av Sveriges ledande hotell- och restauranggrupper utvecklar vi behovsanpassade bröd och bakverk som minimerar svinn och maximerar lönsamhet. Samtidigt får era gäster uppleva smaken av ett lokalt hantverksbageri – utan kompromisser på kvalitet.",
    bullets: [
      "Portionsbröd i ministorlek för frukost och konferens",
      "Bröd för landgång, toast och smörgåstårta",
      "Muffins, bullar och kondisbitar i lagom storlek",
      "Mjuka kakblock att portionera själv",
    ],
    image: "/images/site/konditoridisk.jpg",
    imageAlt: "Fikabröd i en disk",
    link: { href: "/sortiment?kanal=hotell-restaurang", label: "Se hotell- & restaurangsortimentet" },
  },
];

const steps = [
  {
    title: "Ta kontakt",
    text: "Fyll i formuläret nedan eller ring oss. Berätta om din verksamhet och vad dina kunder efterfrågar.",
  },
  {
    title: "Vi tar fram ett upplägg",
    text: "Tillsammans väljer vi sortiment, leveransdagar och villkor som passar din butik, ditt café eller hotell.",
  },
  {
    title: "Beställ enkelt",
    text: `Lägg order i vår orderportal PCS före kl. ${site.orderCutoff} – så står det nybakat hos dig nästa dag.`,
  },
];

const downloads = [
  {
    title: "Sortiment",
    text: "Hela butikssortimentet med artikelnummer, vikt och EAN.",
    href: site.downloads.sortiment,
    meta: "PDF · 11 sidor",
  },
  {
    title: "Tårtor & bakelser – tårtpärm",
    text: "Ladda ned, fyll i ert pris direkt i PDF:en och skriv ut.",
    href: site.downloads.tartor,
    meta: "Ifyllbar PDF · 30 sidor",
  },
  {
    title: "Hotell & restaurang",
    text: "Portionsstorlekar för frukost, konferens och buffé – med ingredienser.",
    href: site.downloads.hotell,
    meta: "PDF · 8 sidor",
  },
];

const faq = [
  {
    q: "Hur beställer jag som kund?",
    a: `Du lägger din order i vår orderportal PCS. Beställ före kl. ${site.orderCutoff} så levererar vi nästa dag.`,
  },
  {
    q: "Hur skriver jag ut hylletiketter?",
    a: "Gå till sortimentet, klicka på Etikett vid de produkter du vill ha, fyll i styckpris och välj storlek (150×39 eller 150×45 mm). Du får en PDF med EAN-streckkod, jämförpris och QR-kod till produktens innehållsdeklaration.",
  },
  {
    q: "Var hittar jag ingredienser och allergener?",
    a: "Varje produkt i sortimentet har en egen sida med fullständig ingrediensförteckning, allergener, information om spår av allergener och näringsvärde per 100 gram.",
  },
  {
    q: "Har ni laktosfria alternativ?",
    a: `Ja – ${lactoseFreeCount} av våra tårtor finns även i laktosfri variant. Filtrera på ”Finns laktosfri” i sortimentet.`,
  },
  {
    q: "Vad kostar det?",
    a: "Priser och villkor beror på sortiment och volym. Kontakta oss så tar vi fram ett förslag för just din verksamhet.",
  },
];

const formFields: FormField[] = [
  { name: "foretag", label: "Företag", required: true, autoComplete: "organization" },
  { name: "kontaktperson", label: "Kontaktperson", required: true, autoComplete: "name" },
  { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel" },
  {
    name: "verksamhet",
    label: "Typ av verksamhet",
    type: "select",
    required: true,
    options: ["Dagligvaruhandel", "Café / konditori", "Hotell", "Restaurang", "Storkök / catering", "Annat"],
  },
  { name: "ort", label: "Ort", required: true, autoComplete: "address-level2" },
  {
    name: "intresse",
    label: "Intresserad av",
    type: "checkboxes",
    options: ["Matbröd & frallor", "Fikabröd", "Tårtor & bakelser", "Småkakor", "Packat sortiment", "Hotell & restaurang", "Säsong"],
  },
  { name: "meddelande", label: "Meddelande", type: "textarea", placeholder: "Berätta gärna om er verksamhet, volymer och önskade leveransdagar." },
];

export default function AterforsaljarePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "För återförsäljare" }]}
        eyebrow="För återförsäljare"
        title={
          <>
            Sälj Jerkstrands – <em className="text-forest-800 italic">nybakat hantverk</em> som kunderna älskar
          </>
        }
        intro={
          <p>
            Vi bakar för dagligvaruhandel, caféer, hotell och restauranger. Ett brett sortiment, tydlig märkning och
            leverans nästa dag gör det enkelt att erbjuda kunderna riktigt bageri.
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#bli-aterforsaljare" className="btn btn-primary">
            Bli återförsäljare <ArrowRight className="size-4" />
          </Link>
          <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Butiksorder (PCS) <ArrowUpRight className="size-4" />
          </a>
        </div>
      </PageHero>

      {/* Fördelar */}
      <section className="py-14 sm:py-16">
        <ul className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-espresso-700">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Segment */}
      <div className="space-y-4 pb-6">
        {segmentsDetail.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-32 py-10 sm:py-14">
            <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 ? "lg:order-last" : undefined}>
                <div
                  className={
                    s.imageContain
                      ? "product-stage relative aspect-[4/3] overflow-hidden rounded-[2rem]"
                      : "relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift"
                  }
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className={s.imageContain ? "object-contain p-8" : "object-cover"}
                  />
                </div>
              </div>
              <div>
                <p className="eyebrow">{s.eyebrow}</p>
                <h2 className="mt-4 text-3xl leading-tight sm:text-[2.6rem]">{s.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-espresso-700">{s.text}</p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href={s.link.href} className="btn btn-outline mt-8">
                  {s.link.label} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Hylletiketter */}
      <section className="bg-forest-900 py-16 text-cream-100 sm:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-light">Säljstöd</p>
            <h2 className="mt-4 text-3xl leading-tight text-cream-50 sm:text-[2.6rem]">Hylletiketter på ett par klick</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream-200">
              Välj produkter i sortimentet, fyll i ert styckpris och skriv ut. Etiketten räknar ut jämförpriset och får
              EAN-streckkod och en QR-kod som leder kunden till fullständig innehållsdeklaration.
            </p>
            <Link href="/sortiment" className="btn btn-gold mt-8">
              Skapa hylletiketter <ArrowRight className="size-4" />
            </Link>
          </div>
          <figure className="rounded-[1.75rem] bg-cream-50 p-3 shadow-lift sm:p-5">
            <Image
              src="/images/site/hylletikett-exempel.png"
              alt="Exempel på hylletikett för Jordgubbstårta med pris, EAN-streckkod och QR-kod"
              width={1819}
              height={507}
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 text-center text-xs text-espresso-600">
              Hylletikett 150 × 39 mm – även 150 × 45 mm
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Steg */}
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Kom igång" title="Så blir du återförsäljare" align="center" />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="card relative p-7">
                <span className="font-display text-5xl text-gold-500">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-700">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Material */}
      <section id="material" className="scroll-mt-32 bg-cream-200/60 py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Material"
            title="Sortimentsblad & tårtpärm"
            intro="Ladda ner våra sortimentsblad för att visa kollegor och kunder."
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {downloads.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col rounded-3xl border border-cream-300 bg-cream-50 p-6 transition-shadow hover:shadow-soft"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-berry-100 text-berry-700">
                    <FileText className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-700">{d.text}</p>
                  <span className="mt-auto flex items-center justify-between pt-6 text-sm">
                    <span className="text-espresso-500">{d.meta}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-forest-800">
                      <Download className="size-4" /> Ladda ner
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formulär */}
      <section id="bli-aterforsaljare" className="scroll-mt-32 py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <p className="eyebrow">Bli återförsäljare</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-[2.6rem]">Berätta om din verksamhet</h2>
            <p className="mt-5 text-lg leading-relaxed text-espresso-700">
              Skicka en intresseanmälan så återkommer vi med förslag på sortiment och leveransupplägg.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-gold-600" aria-hidden />
                <a href={site.phoneHref} className="font-semibold hover:text-forest-700">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-gold-600" aria-hidden />
                <a href={`mailto:${site.email}`} className="font-semibold hover:text-forest-700">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-5 text-gold-600" aria-hidden />
                Beställ före kl. {site.orderCutoff} – leverans nästa dag
              </li>
            </ul>
            <div className="mt-8 rounded-3xl bg-forest-900 p-6 text-cream-100">
              <p className="font-display text-xl text-cream-50">Redan kund?</p>
              <p className="mt-1 text-sm text-cream-300">Lägg din order direkt i orderportalen.</p>
              <a
                href={site.orderPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm mt-4"
              >
                Butiksorder (PCS) <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <MailtoForm fields={formFields} subject="Ansökan återförsäljare – {foretag}" submitLabel="Skicka intresseanmälan" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="Vanliga frågor" title="Frågor & svar" align="center" />
          <div className="mt-10 divide-y divide-cream-300 rounded-3xl border border-cream-300 bg-cream-50">
            {faq.map((f) => (
              <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg">
                  {f.q}
                  <span className="text-2xl leading-none text-gold-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-espresso-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
