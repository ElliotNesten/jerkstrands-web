import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Coffee, FileText, Hotel, ShoppingBasket, Tag } from "lucide-react";
import { site } from "@/lib/site";

const segments = [
  {
    icon: ShoppingBasket,
    title: "Dagligvaruhandel",
    text: "Packat bröd och bakverk med EAN, hylletiketter och produktblad som gör det enkelt att sälja.",
    href: "/aterforsaljare#butik",
  },
  {
    icon: Coffee,
    title: "Café & konditori",
    text: "Tårtor, bakelser och handknutet fikabröd med riktig hantverkskänsla – redo för disken.",
    href: "/aterforsaljare#cafe",
  },
  {
    icon: Hotel,
    title: "Hotell & restaurang",
    text: "Minisortiment för frukost, konferens och buffé som minskar svinnet och gläder gästerna.",
    href: "/aterforsaljare#hotell",
  },
];

const benefits = [
  { icon: Clock, text: `Beställ före kl. ${site.orderCutoff} – leverans nästa dag` },
  { icon: Tag, text: "Hylletiketter med EAN & QR direkt från webben" },
  { icon: FileText, text: "Ingredienser, allergener & näring för varje artikel" },
];

/** Återförsäljarsektionen – placerad högt upp på startsidan. */
export function ResellerSection() {
  return (
    <section id="aterforsaljare" aria-labelledby="aterforsaljare-rubrik" className="relative overflow-hidden bg-forest-900 text-cream-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{ backgroundImage: "url(/images/site/marmor.jpg)", backgroundSize: "cover" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="container-site relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow eyebrow-light">För återförsäljare</p>
            <h2 id="aterforsaljare-rubrik" className="mt-4 text-[2.1rem] leading-[1.08] text-cream-50 sm:text-5xl">
              Ett bageri att lita på – <em className="text-gold-300 italic">varje morgon.</em>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream-200">
              Vi levererar nybakat till butiker, caféer, hotell och restauranger. Med ett brett sortiment, tydlig
              märkning och enkel beställning blir det lätt att sälja Jerkstrands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-gold">
                Bli återförsäljare <ArrowRight className="size-4" />
              </Link>
              <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                Butiksorder (PCS) <ArrowUpRight className="size-4" />
              </a>
            </div>
            <p className="mt-5 text-sm text-cream-300">
              Redan kund? Lägg din order i orderportalen PCS före kl. {site.orderCutoff}.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {segments.map(({ icon: Icon, title, text, href }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col rounded-3xl border border-cream-50/10 bg-cream-50/[0.04] p-6 transition-colors hover:border-gold-400/40 hover:bg-cream-50/[0.08]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl text-cream-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-300">{text}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-gold-300">
                  Läs mer <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-4 border-t border-cream-50/10 pt-8 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-cream-200">
              <Icon className="size-5 shrink-0 text-gold-400" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
