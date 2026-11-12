import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavLinks, NavLinksStatic } from "@/components/nav-links";
import { MobileMenu } from "@/components/mobile-menu";
import { Sparkle } from "@/components/decor";
import { customerHref, site } from "@/lib/site";

/**
 * Smörgult toppband med kontaktuppgifter och en grön menyrad som stannar kvar överst.
 * Menyn ligger i ett genomskinligt piller i mitten, knapparna till höger.
 */
export function SiteHeader() {
  return (
    <>
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-butter focus:px-4 focus:py-2 focus:font-semibold focus:text-forest"
      >
        Hoppa till innehållet
      </a>

      <div className="bg-butter text-sm font-medium text-forest">
        <div className="wrap flex h-8 items-center justify-between gap-4">
          <p className="hidden items-center gap-2 md:flex">
            <Sparkle className="size-4 text-leaf" />
            Grossist i bröd &amp; bakverk för hotell, restauranger, caféer och butiker
          </p>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
            <a href={site.phoneHref} className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden />
              <span className="link-draw">{site.phone}</span>
            </a>
            <span className="h-4 w-px bg-forest/30" aria-hidden />
            <a href={`mailto:${site.email}`} className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden />
              <span className="link-draw">{site.email}</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-forest text-white">
        <div className="wrap flex h-[72px] items-center gap-6 lg:h-20">
          <div className="flex min-w-0 flex-1 items-center">
            <Logo priority className="w-[150px] sm:w-[181px]" />
          </div>

          <nav aria-label="Huvudmeny" className="hidden lg:block">
            <Suspense fallback={<NavLinksStatic />}>
              <NavLinks />
            </Suspense>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-2">
            <Link href={customerHref} className="btn btn-sm btn-light-outline hidden md:inline-flex">
              Bli kund
            </Link>
            <a
              href={site.orderPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-butter hidden sm:inline-flex"
            >
              Beställ i PCS <ArrowRight className="size-4" aria-hidden />
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
