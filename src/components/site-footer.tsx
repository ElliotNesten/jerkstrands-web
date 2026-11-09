import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { InstagramIcon, Ornament } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { site } from "@/lib/site";

export function SiteFooter() {
  const shopCategories = categories.filter((c) => c.segment === "butik").slice(0, 6);
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-cream-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{ backgroundImage: "url(/images/site/marmor.jpg)", backgroundSize: "cover" }}
        aria-hidden
      />
      <div className="container-site relative pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo variant="dark-bg" className="w-[220px]" />
            <p className="mt-6 text-sm leading-relaxed text-cream-300">
              Konditori och bageri i Göteborg sedan {site.founded}. Vi bakar med kärlek, tradition och de finaste
              råvarorna – för butiker, caféer, hotell och restauranger.
            </p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-300 hover:text-gold-100"
            >
              <InstagramIcon className="size-5" /> {site.instagramHandle}
            </a>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">Sortiment</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {shopCategories.map((c) => (
                <li key={c.id}>
                  <Link href={`/sortiment?kategori=${c.id}`} className="link-underline hover:text-cream-50">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sortiment?kanal=hotell-restaurang" className="link-underline hover:text-cream-50">
                  Hotell & restaurang
                </Link>
              </li>
              <li>
                <Link href="/sortiment" className="font-semibold text-cream-50 link-underline">
                  Hela sortimentet →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">
              För företag
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <Link href="/aterforsaljare#bli-aterforsaljare" className="link-underline hover:text-cream-50">
                  Bli återförsäljare
                </Link>
              </li>
              <li>
                <a
                  href={site.orderPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 link-underline hover:text-cream-50"
                >
                  Butiksorder (PCS) <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <Link href="/sortiment" className="link-underline hover:text-cream-50">
                  Hylletiketter
                </Link>
              </li>
              <li>
                <Link href="/aterforsaljare#material" className="link-underline hover:text-cream-50">
                  Sortiment & tårtpärm (PDF)
                </Link>
              </li>
              <li>
                <Link href="/kvalitet" className="link-underline hover:text-cream-50">
                  Kvalitet
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="link-underline hover:text-cream-50">
                  Om oss
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">Kontakt</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream-50">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <a href={site.phoneHref} className="hover:text-cream-50">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-cream-50">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Ornament className="mx-auto mt-14 w-40 text-gold-600/60" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-cream-400 sm:flex-row">
          <p>
            © {site.legalName} · Göteborg sedan {site.founded}
          </p>
          <p>Nybakat varje dag – med kärlek till hantverket.</p>
        </div>
      </div>
    </footer>
  );
}
