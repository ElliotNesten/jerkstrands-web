import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavLinks, NavLinksStatic } from "@/components/nav-links";
import { MobileMenu } from "@/components/mobile-menu";
import { site } from "@/lib/site";

/** Svävande menyrad (pill) – lossad från sidans kant, centrerad på .wrap. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="wrap">
        <div className="flex h-14 items-center justify-between gap-4 rounded-full bg-canvas-soft/95 pr-2 pl-5 backdrop-blur-md sm:h-[60px] sm:pl-6">
          <Logo priority className="w-[118px] sm:w-[136px]" />

          <nav aria-label="Huvudmeny" className="hidden lg:block">
            <Suspense fallback={<NavLinksStatic />}>
              <NavLinks />
            </Suspense>
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={site.orderPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1 rounded-full px-3 py-2 text-[0.9375rem] font-semibold text-ink xl:inline-flex"
            >
              <span className="link-draw">Butiksorder</span>
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
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
