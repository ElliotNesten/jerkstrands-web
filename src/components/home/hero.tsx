import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Wheat } from "lucide-react";
import { products } from "@/lib/catalog";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="paper-texture relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-gold-300/20 blur-3xl"
        aria-hidden
      />
      <div className="container-site relative grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Konditori & bageri i Göteborg · sedan {site.founded}</p>
          <h1 className="mt-5 text-[2.75rem] leading-[1.02] text-espresso-950 sm:text-6xl lg:text-[4.4rem]">
            Bakat med kärlek.
            <br />
            <em className="font-normal text-forest-800 italic">Levererat i morgon.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-espresso-700">
            Jerkstrands bakar bröd, fikabröd, tårtor och bakverk för dagligvaruhandel, caféer, hotell och
            restauranger. Beställ före kl. {site.orderCutoff} – så står det nybakat hos dig nästa dag.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-primary">
              Bli återförsäljare
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/sortiment" className="btn btn-outline">
              Utforska sortimentet
            </Link>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-cream-300 pt-6 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Wheat className="size-5 shrink-0 text-gold-600" aria-hidden />
              <div>
                <dt className="sr-only">Sortiment</dt>
                <dd>
                  <span className="font-semibold text-espresso-900">{products.length} artiklar</span>
                  <br />
                  <span className="text-espresso-600">i sortimentet</span>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 shrink-0 text-gold-600" aria-hidden />
              <div>
                <dt className="sr-only">Leverans</dt>
                <dd>
                  <span className="font-semibold text-espresso-900">Före kl. {site.orderCutoff}</span>
                  <br />
                  <span className="text-espresso-600">leverans nästa dag</span>
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="size-5 shrink-0 text-gold-600" aria-hidden />
              <div>
                <dt className="sr-only">Bageri</dt>
                <dd>
                  <span className="font-semibold text-espresso-900">Eget bageri</span>
                  <br />
                  <span className="text-espresso-600">i Göteborg</span>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] shadow-lift sm:aspect-[5/5.4]">
            <Image
              src="/images/site/kanelbullar.jpg"
              alt="Nybakade kanelknutar med pärlsocker på en skärbräda"
              fill
              preload
              quality={85}
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover object-[55%_60%]"
            />
          </div>
          <div className="absolute -bottom-6 -left-3 w-[42%] rotate-[-4deg] overflow-hidden rounded-[1.5rem] border-[6px] border-cream-50 shadow-lift sm:-left-8">
            <div className="relative aspect-square">
              <Image
                src="/images/site/princesstarta.jpg"
                alt="Princesstårta på grön marmor"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="scale-[1.6] object-cover object-[50%_58%]"
              />
            </div>
          </div>
          <div className="absolute -top-5 -right-2 flex size-28 flex-col items-center justify-center rounded-full bg-forest-900 text-center text-cream-50 shadow-lift ring-4 ring-cream-100 sm:-right-5 sm:size-32">
            <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-gold-300 uppercase">Sedan</span>
            <span className="font-display text-3xl leading-none sm:text-4xl">{site.founded}</span>
            <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] text-gold-300 uppercase">Göteborg</span>
          </div>
        </div>
      </div>
    </section>
  );
}
