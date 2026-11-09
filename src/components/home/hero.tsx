import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";
import { site } from "@/lib/site";

/**
 * Hero (product): huvudrad med rubrik till vänster, ingress och knappar till höger,
 * sedan produkten stort i ett foto ner till skärmens fot. Fyller exakt första skärmen.
 */
export function Hero() {
  return (
    <section className="band flex min-h-[100svh] flex-col bg-butter pt-[104px] pb-6 sm:h-[100svh] sm:min-h-[640px] sm:pt-[120px]">
      <div className="wrap flex min-h-0 flex-1 flex-col">
        <div className="hero-text flex min-h-0 flex-1 flex-col">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start" data-enter>
            <div className="lg:col-span-7">
              <p className="mb-4 text-sm font-semibold text-accent-deep">Beställ före kl. {site.orderCutoff}, leverans nästa dag</p>
              <h1 className="t-display">Bröd och bakverk till butik, café och hotell.</h1>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="t-lead text-ink-soft">
                Vi bakar {products.length} artiklar i eget bageri i Göteborg sedan {site.founded}. Allt levereras märkt med
                EAN, ingredienser och allergener.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-primary">
                  Bli återförsäljare
                </Link>
                <Link href="/sortiment" className="btn btn-outline">
                  Se sortimentet
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-8 min-h-[260px] flex-1 overflow-hidden rounded-[24px] sm:mt-10" data-enter>
            <Image
              src="/images/site/kanelflata.jpg"
              alt="Kanelfläta med pärlsocker på en skärbräda"
              fill
              preload
              quality={85}
              sizes="(max-width: 639px) 160vw, (min-width: 1700px) 1600px, 94vw"
              className="object-cover object-[50%_58%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
