import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { InstagramIcon } from "@/components/icons";
import { CurrentYear } from "@/components/current-year";
import { BurstBadge, Sparkle, Wave } from "@/components/decor";
import { customerHref, mainNav, site } from "@/lib/site";

const pages = [
  ...mainNav.slice(0, -2),
  { href: customerHref, label: "Bli kund" },
  { href: "/kvalitet", label: "Kvalitet" },
  ...mainNav.slice(-2),
];

/**
 * Sidfot på grön mark under en vågkant: tack-rubrik, logga och tre kolumner, en prickad linje
 * och "Jerkstrands" i konturtext längst ner med stämpeln "Sedan 1930".
 */
export function SiteFooter() {
  return (
    <footer id="kontakt-info" className="on-dark">
      <Wave from="white" to="forest" />
      <div className="relative overflow-hidden bg-forest text-white">
        <Sparkle className="absolute top-12 right-[6%] size-6 text-moss" />
        <Sparkle className="absolute bottom-[22%] left-[5%] hidden size-6 text-butter sm:block" />
        <Sparkle className="absolute right-[24%] bottom-[24%] hidden size-8 text-moss sm:block" />

        <div className="wrap pt-14 lg:pt-20">
          <div className="relative inline-block">
            <p className="font-display text-[clamp(2.5rem,3.34vw,4rem)] leading-[1.1] font-semibold tracking-[-0.01em]">
              Tack för <em>besöket!</em>
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- dekor-SVG från designen */}
            <img src="/images/decor/underline-footer.svg" alt="" width={240} height={16} className="mt-2 h-4 w-[240px]" />
            <Sparkle className="absolute top-2 left-full ml-7 size-8 text-butter" />
          </div>

          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto_auto_16rem] lg:gap-x-24">
            <div>
              <Logo className="w-[200px] sm:w-[228px]" sizes="228px" />
              <p className="t-body mt-6 max-w-[340px] text-white/65">
                Konditori &amp; bageri i Göteborg sedan {site.founded}. Bröd och bakverk till hotell, restauranger, caféer och
                butiker.
              </p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rotate-2 items-center gap-4 rounded-full border-[1.5px] border-butter/60 py-2 pr-6 pl-2 transition-colors hover:border-butter"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-butter">
                  <InstagramIcon className="size-6" />
                </span>
                <span className="font-ui text-lg font-semibold">{site.instagramHandle}</span>
              </a>
            </div>

            <FooterColumn title="Sidor">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-white/80 hover:text-white">
                    <span className="link-draw">{p.label}</span>
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Kontakt">
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-white/80 hover:text-white">
                  <MapPin className="mt-[0.3em] size-4 shrink-0" aria-hidden />
                  <span className="link-draw">
                    {site.address.street}, {site.address.postalCode} {site.address.city}
                  </span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2 text-white/80 hover:text-white">
                  <Phone className="size-4 shrink-0" aria-hidden />
                  <span className="link-draw">{site.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-white/80 hover:text-white">
                  <Mail className="size-4 shrink-0" aria-hidden />
                  <span className="link-draw">{site.email}</span>
                </a>
              </li>
            </FooterColumn>

            <div>
              <FooterTitle>Beställning</FooterTitle>
              <p className="t-body mt-6 text-white/80">Befintlig kund? Logga in och lägg din beställning i PCS.</p>
              <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-butter mt-6 px-6">
                Logga in i PCS <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="rule-dots mt-14" aria-hidden />
          <div className="mt-5 flex flex-col justify-between gap-2 text-white/65 sm:flex-row">
            <p>
              © <CurrentYear /> {site.name}
            </p>
            <p>Allt bakas i vårt bageri på Slakthusgatan i Göteborg.</p>
          </div>
        </div>

        <div className="wrap relative mt-12 lg:mt-14">
          <p
            aria-hidden="true"
            className="font-display text-outline pb-[0.1em] leading-[0.8] font-semibold whitespace-nowrap select-none"
            style={{ fontSize: "calc(min(100vw - 2 * var(--gut), 1620px) * 0.2327)" }}
          >
            Jerkstrands
          </p>
          <div className="absolute -top-6 right-[4%] hidden rotate-10 sm:block sm:scale-75 lg:scale-90 xl:scale-100">
            <BurstBadge top="SEDAN" bottom={String(site.founded)} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: ReactNode }) {
  return <p className="font-display text-[1.75rem] leading-tight font-semibold text-butter italic">{children}</p>;
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={title}>
      <FooterTitle>{title}</FooterTitle>
      <ul className="t-body mt-6 space-y-4">{children}</ul>
    </nav>
  );
}
