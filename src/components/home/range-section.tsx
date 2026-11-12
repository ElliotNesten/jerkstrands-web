import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Sparkle } from "@/components/decor";
import { cn } from "@/lib/cn";

const areas = [
  {
    no: "01",
    eyebrow: "Bageri",
    title: "Bageri",
    text: "Våra bagare skapar rustika och klassiska bröd och bakverk utifrån tradition och de finaste råvarorna.",
    href: "/sortiment?kategori=matbrod",
    image: "/images/site/brodsortiment-marmor.jpg",
    alt: "Rågbröd, surdegsbröd och baguetter på marmor",
    bg: "bg-cream",
    tag: { label: "Klassiker", className: "rotate-6 bg-forest text-cream" },
  },
  {
    no: "02",
    eyebrow: "Konditori",
    title: "Konditori",
    text: "Med öga för detaljer skapar våra konditorer delikata bakelser, kakor, tårtor och ätbara konstverk.",
    href: "/sortiment?kategori=tartor",
    image: "/images/site/hjartformad-tarta.jpg",
    alt: "Hjärtformad princesstårta på grön marmor",
    bg: "bg-blush",
    tag: { label: "Konstverk", className: "-rotate-5 bg-butter text-forest" },
  },
  {
    no: "03",
    eyebrow: "Foodservice",
    title: "Hotell & Restaurang",
    text: "Branschanpassade bröd och bakverk som är enkla att servera och fungerar till frukost, fika och dessert.",
    href: "/sortiment?kanal=hotell-restaurang",
    image: "/images/site/wienerbrod-disk.png",
    alt: "Wienerbröd och bullar i en bakverksdisk",
    bg: "bg-butter",
    tag: { label: "Frukostfavorit", className: "rotate-4 bg-white text-forest" },
  },
];

/** "Vårt sortiment" (Figma 822:378): tre klistermärkeskort för bageri, konditori och foodservice. */
export function RangeSection() {
  return (
    <section aria-labelledby="sortiment-rubrik" className="section relative bg-white">
      <Sparkle className="absolute top-[72px] right-[2.5%] hidden size-10 text-butter sm:block" />
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">Vårt sortiment</p>
            <h2 id="sortiment-rubrik" className="t-h2">
              Från bageriet, konditoriet
              <br className="hidden sm:block" /> och vår <em>foodservice</em>
            </h2>
          </div>
          <Link href="/sortiment" className="btn btn-outline self-start pr-6 md:self-auto">
            Se hela sortimentet <ArrowRight className="size-6" aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6 lg:mt-14">
          {areas.map((a) => (
            <li key={a.no}>
              <Link href={a.href} className={cn("sticker lift group flex h-full flex-col overflow-hidden p-4", a.bg)}>
                <div className="relative aspect-[489/440] overflow-hidden rounded-[24px]">
                  <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1700px) 490px, (min-width: 768px) 30vw, 92vw" className="zoom-img object-cover" />
                  <span className={cn("tag-tilt absolute bottom-4 left-5", a.tag.className)}>
                    <Sparkle className="size-4" />
                    {a.tag.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-8 px-2 pt-8 pb-2 sm:px-6 sm:pb-6">
                  <div>
                    <p className="t-label text-leaf">
                      {a.no} <span aria-hidden>&nbsp;·&nbsp;</span> {a.eyebrow}
                    </p>
                    <h3 className="t-h3 mt-5">{a.title}</h3>
                    <p className="t-body mt-3 text-ink-soft">{a.text}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-forest/12 pt-6">
                    <span className="font-ui text-lg font-semibold">Utforska</span>
                    <span className="icon-btn">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
