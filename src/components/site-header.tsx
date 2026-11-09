import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Truck } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavLinks, NavLinksStatic } from "@/components/nav-links";
import { MobileMenu } from "@/components/mobile-menu";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      {/* Informationsrad */}
      <div className="bg-forest-900 text-cream-100">
        <div className="container-site flex h-9 items-center justify-between gap-4 text-[0.78rem]">
          <p className="flex items-center gap-2 truncate">
            <Truck className="size-3.5 shrink-0 text-gold-400" aria-hidden />
            <span className="truncate">
              Beställ före kl. {site.orderCutoff} <span className="hidden sm:inline">– leverans nästa dag</span>
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a href={site.phoneHref} className="hidden items-center gap-1.5 hover:text-gold-300 md:flex">
              <Phone className="size-3.5 text-gold-400" aria-hidden />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hidden hover:text-gold-300 lg:block">
              {site.email}
            </a>
            <a
              href={site.orderPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-gold-300 hover:text-gold-100"
            >
              Butiksorder (PCS)
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* Huvudmeny */}
      <div className="border-b border-cream-300/70 bg-cream-100/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream-100/80">
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
          <Logo priority className="w-[150px] sm:w-[190px]" />

          <nav aria-label="Huvudmeny" className="hidden lg:block">
            <Suspense fallback={<NavLinksStatic />}>
              <NavLinks />
            </Suspense>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Bli återförsäljare
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
