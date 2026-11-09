import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ornament } from "@/components/icons";
import { site } from "@/lib/site";

export function AboutTeaser() {
  return (
    <section aria-labelledby="om-rubrik" className="py-16 sm:py-20 lg:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/images/site/brodsortiment-marmor.jpg"
              alt="Rågbröd, surdegsbröd och baguetter från Jerkstrands"
              fill
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 max-w-[16rem] rounded-3xl bg-cream-50 p-5 shadow-lift sm:-right-8">
            <p className="font-display text-4xl text-forest-800">{site.founded}</p>
            <p className="mt-1 text-sm leading-snug text-espresso-700">
              Året då göteborgarna började njuta av Jerkstrands bröd och bakverk.
            </p>
          </div>
        </div>
        <div>
          <p className="eyebrow">Om Jerkstrands</p>
          <h2 id="om-rubrik" className="mt-4 text-[2.1rem] leading-[1.08] sm:text-5xl">
            I Göteborg sedan {site.founded}
          </h2>
          <div className="prose-jerk mt-6 max-w-xl text-lg leading-relaxed text-espresso-700">
            <p>
              Ofta träffar vi människor som berättar om härliga minnen av tårtkalas när de var barn. Det har skapat
              traditioner där Jerkstrands har spelat en betydelsefull roll.
            </p>
            <p>
              Vi är stolta över att få vara en del av våra kunders liv – och fortsätter värna om traditionen och
              kärleken till hantverket, samtidigt som vi låter oss inspireras av det nya.
            </p>
          </div>
          <Ornament className="mt-8 w-36 text-gold-500" />
          <Link href="/om-oss" className="btn btn-ghost mt-6 text-forest-800">
            Läs vår historia <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
