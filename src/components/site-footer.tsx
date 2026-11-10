import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { InstagramIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

/**
 * Avslutning + sidfot i en sektion (footer.closing): .wrap har exakt två barn – avslutningen med
 * huvudhandlingen, sedan länkarna med den juridiska raden. Espressofärgat band, en skärm hög.
 */
export function SiteFooter() {
  const shopCategories = categories.filter((c) => c.segment === "butik").slice(0, 6);
  return (
    <footer id="kontakt-info" className="closing flex min-h-[100svh] flex-col rounded-t-[24px] bg-ink text-canvas">
      <div className="wrap flex flex-1 flex-col justify-between gap-12 pt-20 pb-20">
        {/* Rad 1 – avslutningen */}
        <div className="grid gap-y-10 border-b border-canvas/15 pb-12 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="lg:col-span-7">
            <h2 className="t-display">Sälj Jerkstrands i din butik.</h2>
            <p className="t-lead mt-6 max-w-xl text-canvas/75">
              Berätta om din butik, ditt café eller ditt hotell. Vi föreslår sortiment och leveransdagar.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end">
            <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-primary">
              Bli återförsäljare <ArrowRight className="size-4" />
            </Link>
            <a href={site.phoneHref} className="btn btn-inverse-outline">
              Ring {site.phone}
            </a>
          </div>
        </div>

        {/* Rad 2 – länkar och den juridiska raden */}
        <div>
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="dark-bg" className="w-[220px]" />
            <p className="mt-6 max-w-xs text-sm text-canvas/75">
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
                className="inline-flex min-h-11 items-center gap-1 text-canvas/75 hover:text-canvas sm:min-h-0"
              >
                <span className="link-draw">Butiksorder (PCS)</span> <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Kontakt" className="lg:col-span-3">
            <li className="text-canvas/75">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="block py-2.5 hover:text-canvas sm:py-0">
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
                className="inline-flex min-h-11 items-center gap-2 text-canvas/75 hover:text-canvas sm:min-h-0"
              >
                <span className="link-draw">{site.instagramHandle}</span> <InstagramIcon className="size-4" />
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 text-[0.8125rem] text-canvas/75 sm:flex-row">
          <p>© {site.legalName}</p>
          <p>Allt bakas i vårt bageri på Slakthusgatan i Göteborg.</p>
        </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="text-[0.8125rem] font-semibold text-canvas/75">{title}</p>
      <ul className="mt-2 text-[0.9375rem] sm:mt-4 sm:space-y-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:");
  return (
    <li>
      {external ? (
        <a href={href} className="inline-flex min-h-11 items-center text-canvas/75 hover:text-canvas sm:min-h-0">
          <span className="link-draw">{children}</span>
        </a>
      ) : (
        <Link href={href} className="inline-flex min-h-11 items-center text-canvas/75 hover:text-canvas sm:min-h-0">
          <span className="link-draw">{children}</span>
        </Link>
      )}
    </li>
  );
}
