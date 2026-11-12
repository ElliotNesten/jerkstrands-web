import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShoppingCart, Star, Utensils, type LucideIcon } from "lucide-react";
import { Sparkle, Wave } from "@/components/decor";
import { customerHref, site } from "@/lib/site";

const benefits: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Branschanpassat sortiment", text: "Bröd och bakverk för frukost, lunch, fika och dessert.", icon: Utensils },
  { title: "Finaste råvarorna", text: "Traditionella recept och kvalitet i varje detalj.", icon: Star },
  { title: "Beställ smidigt i PCS", text: "Lägg och följ dina beställningar online.", icon: ShoppingCart },
  { title: "Personlig service", text: "Vi tar fram ett upplägg för just din verksamhet.", icon: Phone },
];

/** "För företag" (Figma 822:453): grön sektion mellan två vågor, foto till vänster, fyra löften till höger. */
export function BusinessSection() {
  return (
    <section aria-labelledby="foretag-rubrik" className="on-dark">
      <Wave from="white" to="forest" />
      <div className="relative overflow-hidden bg-forest py-16 text-white lg:py-24">
        <Sparkle className="absolute top-24 left-[5%] hidden size-10 text-butter lg:block" />
        <Sparkle className="absolute right-[3%] bottom-16 size-6 text-moss" />
        <div className="wrap flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-[72px]">
          <div className="relative min-h-[420px] shrink-0 overflow-hidden rounded-[32px] lg:w-[38.5%]">
            <Image
              src="/images/site/bagare-mjol.png"
              alt="Bagare som knådar en deg i ett moln av mjöl"
              fill
              sizes="(min-width: 1700px) 624px, (min-width: 1024px) 38vw, 92vw"
              className="object-cover object-[35%_50%]"
            />
            <p className="sticker-sm font-ui absolute bottom-8 left-8 inline-flex -rotate-3 items-center gap-2 rounded-[16px] bg-butter px-6 py-4 text-lg font-semibold text-forest">
              <Star className="size-6" aria-hidden />
              Hantverk sedan {site.founded}
            </p>
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
            <p className="eyebrow">För företag</p>
            <h2 id="foretag-rubrik" className="t-h2 -mt-2">
              En bagarpartner du kan
              <br className="hidden sm:block" /> lita på – varje <em>dag</em>
            </h2>
            <p className="t-lead max-w-[640px] text-white/80">
              Hotell, restauranger och butiker i Göteborg väljer Jerkstrands för bröd och bakverk som ser hembakade ut,
              smakar som de ska och är enkla att servera.
            </p>
            <ul className="grid w-full gap-4 pt-2 sm:grid-cols-2">
              {benefits.map(({ title, text, icon: Icon }) => (
                <li key={title} className="card-glass flex flex-col gap-5 p-6">
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-butter text-forest">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="t-title text-white">{title}</h3>
                    <p className="mt-3 text-white/65">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link href={customerHref} className="btn btn-butter">
                Bli kund hos oss <ArrowRight className="size-6" aria-hidden />
              </Link>
              <a href={site.phoneHref} className="font-ui inline-flex items-center gap-2 text-lg font-semibold">
                <Phone className="size-5" aria-hidden />
                <span className="link-draw">eller ring {site.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Wave from="forest" to="white" />
    </section>
  );
}
