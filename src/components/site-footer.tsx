import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { InstagramIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

/**
 * Avslutning + sidfot i en sektion: rad 1 är avslutningen med huvudhandlingen,
 * rad 2 länkarna och den juridiska raden. Bläckfärgat band med rundade övre hörn.
 */
export function SiteFooter() {
  const shopCategories = categories.filter((c) => c.segment === "butik").slice(0, 6);
  return (
    <footer id="kontakt-info" className="mt-0 rounded-t-[24px] bg-ink text-canvas">
      <div className="wrap pt-20 pb-10 sm:pt-28">
        {/* Rad 1 – avslutningen */}
        <div className="grid gap-y-10 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-7">
            <h2 className="t-display">Sälj Jerkstrands i din butik.</h2>
            <p className="t-lead mt-6 max-w-xl text-white/70">
              Berätta om din butik, ditt café eller ditt hotell. Vi föreslår sortiment och leveransdagar.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-inverse btn-lg">
              Bli återförsäljare <ArrowRight className="size-5" />
            </Link>
            <a href={site.phoneHref} className="btn btn-inverse-outline btn-lg">
              Ring {site.phone}
            </a>
          </div>
        </div>

        {/* Rad 2 – länkar */}
        <div className="grid gap-x-6 gap-y-12 pt-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="dark-bg" className="w-[220px]" />
            <p className="mt-6 max-w-xs text-sm text-white/55">
              Konditori och bageri i Göteborg sedan {site.founded}.
            </p>
          </div>

          <FooterColumn title="Sortiment" className="lg:col-span-3">
            {shopCategories.map((c) => (
              <FooterLink key={c.id} href={`/sortiment?kategori=${c.id}`}>
                {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/sortiment?kanal=hotell-restaurang">Hotell & restaurang</FooterLink>
          </FooterColumn>

          <FooterColumn title="För företag" className="lg:col-span-2">
            <FooterLink href="/aterforsaljare">Återförsäljare</FooterLink>
            <FooterLink href="/aterforsaljare#material">Sortimentsblad (PDF)</FooterLink>
            <FooterLink href="/sortiment">Hylletiketter</FooterLink>
            <FooterLink href="/kvalitet">Kvalitet</FooterLink>
            <FooterLink href="/om-oss">Om oss</FooterLink>
            <li>
              <a
                href={site.orderPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/55 hover:text-white"
              >
                <span className="link-draw">Butiksorder (PCS)</span> <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Kontakt" className="lg:col-span-3">
            <li className="text-white/55">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <span className="link-draw">{site.address.street}</span>
                <br />
                {site.address.postalCode} {site.address.city}
              </a>
            </li>
            <FooterLink href={site.phoneHref}>{site.phone}</FooterLink>
            <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/55 hover:text-white"
              >
                <InstagramIcon className="size-4" /> <span className="link-draw">{site.instagramHandle}</span>
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 text-[0.8125rem] text-white/40 sm:flex-row">
          <p>© {site.legalName}</p>
          <p>Allt bakas i vårt bageri på Slakthusgatan i Göteborg.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-[0.8125rem] font-semibold text-white/40">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:");
  return (
    <li>
      {external ? (
        <a href={href} className="text-white/55 hover:text-white">
          <span className="link-draw">{children}</span>
        </a>
      ) : (
        <Link href={href} className="text-white/55 hover:text-white">
          <span className="link-draw">{children}</span>
        </Link>
      )}
    </li>
  );
}
