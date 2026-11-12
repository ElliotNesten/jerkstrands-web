import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BurstBadge, Sparkle } from "@/components/decor";
import { customerHref, site } from "@/lib/site";

const stats = [
  { value: String(site.founded), label: "Grundat i Göteborg" },
  { value: "3", label: "Bageri, konditori & foodservice" },
  { value: "PCS", label: "Smidig beställning online" },
];

/**
 * Hero (Figma 822:238): rubriken med understruket kursivt ord, ingress, knappar och tre nyckeltal
 * till vänster; fotot med smörgul skuggplatta, stämpeln och ett svävande kort till höger.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Sparkle className="absolute top-6 left-[3.75%] size-10 text-butter sm:size-14" />
      <Sparkle className="absolute top-24 left-[45.8%] hidden size-10 text-moss lg:block" />
      <Sparkle className="absolute top-[560px] left-[52%] hidden size-6 text-leaf lg:block" />
      <Sparkle className="absolute right-[2.1%] bottom-[96px] hidden size-6 text-moss lg:block" />

      <div className="wrap flex flex-col gap-14 pt-14 pb-16 lg:flex-row lg:items-center lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-8" data-enter>
          <div className="flex flex-col items-start gap-4 pb-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-butter bg-white px-4 py-2 text-sm font-medium sm:text-base">
              <span className="size-2 rounded-full bg-moss" aria-hidden />
              Konditori &amp; bageri i Göteborg sedan {site.founded}
            </p>
            <h1 className="t-display">
              <span className="block">Bröd och bakverk</span>
              <span className="block">som lyfter varje</span>
              <span className="relative inline-block">
                <em>servering.</em>
                {/* eslint-disable-next-line @next/next/no-img-element -- dekor-SVG från designen */}
                <img
                  src="/images/decor/underline-hero.svg"
                  alt=""
                  width={416}
                  height={24}
                  className="absolute top-full left-0 h-[0.2em] w-[102%] -translate-y-[0.06em]"
                />
              </span>
            </h1>
          </div>
          <p className="t-lead max-w-[540px] text-ink-soft">
            Vi bakar rustika bröd, delikata bakelser och tårtor för hotell, restauranger, caféer och livsmedelsbutiker – med
            hantverk, tradition och de finaste råvarorna.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/sortiment" className="btn btn-primary">
              Se vårt sortiment <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href={customerHref} className="btn btn-outline">
              Bli kund hos oss
            </Link>
          </div>
          <dl className="flex flex-wrap gap-x-6 gap-y-4 pt-4 sm:gap-x-10">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  i > 0
                    ? "relative flex flex-col-reverse gap-1 sm:pl-10 sm:before:absolute sm:before:top-1/2 sm:before:left-0 sm:before:h-14 sm:before:w-px sm:before:-translate-y-1/2 sm:before:bg-forest/20"
                    : "flex flex-col-reverse gap-1"
                }
              >
                <dt className="text-muted max-sm:text-sm">{s.label}</dt>
                <dd className="font-display text-[2rem] leading-[1.1] font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-[calc(100%-2rem)] max-w-[600px] shrink-0 lg:mx-0 lg:w-[37%]" data-enter>
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px] bg-butter sm:translate-x-8 sm:translate-y-8 sm:rounded-[40px]" aria-hidden />
          <div className="relative aspect-[600/720] overflow-hidden rounded-[28px] sm:rounded-[40px]">
            <Image
              src="/images/site/disk-kanelknutar.png"
              alt="Kanelknutar plockas med tång ur en bakverksdisk"
              fill
              preload
              quality={85}
              sizes="(min-width: 1700px) 600px, (min-width: 1024px) 37vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-4 -left-6 origin-center -rotate-10 scale-75 sm:top-8 sm:-left-14 sm:scale-100">
            <BurstBadge top="SEDAN" bottom={String(site.founded)} />
          </div>
          <div className="absolute right-[-0.75rem] bottom-[6%] w-max rotate-4 sm:right-auto sm:bottom-auto sm:left-[56%] sm:top-[79%]">
            <div className="flex items-center gap-4 rounded-[24px] bg-white p-3 pr-5 shadow-[var(--shadow-float)] sm:p-4 sm:pr-8">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-[16px] sm:size-16">
                <Image src="/images/site/hjartformad-tarta.jpg" alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="whitespace-nowrap">
                <p className="font-ui text-base font-semibold sm:text-lg">Tårtor &amp; bakelser</p>
                <p className="text-sm text-muted sm:mt-1.5 sm:text-base">Till möten, fika och event</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
