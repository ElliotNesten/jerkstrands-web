import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

interface Props {
  title?: string;
  text?: string;
}

export function CtaBand({
  title = "Vill du sälja Jerkstrands?",
  text = "Berätta om din butik, ditt café eller ditt hotell så återkommer vi med ett förslag på sortiment och leveransupplägg.",
}: Props) {
  return (
    <section className="pb-16 sm:pb-20 lg:pb-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-gold-100 via-cream-200 to-gold-300/60 px-6 py-12 sm:px-12 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-cream-50/60 blur-2xl" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-[2rem] leading-[1.08] sm:text-[2.6rem]">{title}</h2>
              <p className="mt-4 max-w-xl text-lg text-espresso-700">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-primary">
                Bli återförsäljare <ArrowRight className="size-4" />
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-espresso-800">
                <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-forest-700">
                  <Phone className="size-4 text-gold-700" /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-forest-700">
                  <Mail className="size-4 text-gold-700" /> {site.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
