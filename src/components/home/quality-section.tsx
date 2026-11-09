import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { qualityPillars } from "@/lib/quality";

export function QualitySection() {
  return (
    <section aria-labelledby="kvalitet-rubrik" className="py-16 sm:py-20 lg:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow">Kvalitet</p>
          <h2 id="kvalitet-rubrik" className="mt-4 text-[2.1rem] leading-[1.08] sm:text-5xl">
            Kvalitet i varje led – från deg till disk
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-espresso-700">
            Vi älskar att baka och gör det alltid med mycket kärlek och hög kvalitet. Det märks i smaken – och i
            hur enkelt det är att arbeta med oss.
          </p>
          <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/site/surdegsbrod.jpg"
              alt="Surdegsbröd med mjölad skorpa på en skärbräda"
              fill
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="object-cover"
            />
          </div>
          <Link href="/kvalitet" className="btn btn-outline mt-8">
            Så arbetar vi med kvalitet <ArrowRight className="size-4" />
          </Link>
        </div>
        <ol className="grid content-center gap-5 sm:grid-cols-2">
          {qualityPillars.map((pillar, i) => (
            <li key={pillar.title} className="card flex flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
                  <pillar.icon className="size-6" aria-hidden />
                </span>
                <span className="font-display text-3xl text-gold-500/80">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-xl">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso-700">{pillar.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
