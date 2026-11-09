import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { MailtoForm, type FormField } from "@/components/mailto-form";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontakta Jerkstrands Konditori & Bageri på ${site.address.street}, ${site.address.city}. Telefon ${site.phone}, e-post ${site.email}.`,
  alternates: { canonical: "/kontakt" },
};

const fields: FormField[] = [
  { name: "namn", label: "Namn", required: true, autoComplete: "name" },
  { name: "foretag", label: "Företag", autoComplete: "organization" },
  { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email" },
  { name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel" },
  {
    name: "arende",
    label: "Ärende",
    type: "select",
    required: true,
    full: true,
    options: ["Bli återförsäljare", "Beställning", "Produktfråga eller allergener", "Tårtbeställning", "Annat"],
  },
  { name: "meddelande", label: "Meddelande", type: "textarea", required: true },
];

export default function KontaktPage() {
  const rows = [
    { label: "Telefon", value: site.phone, href: site.phoneHref },
    { label: "E-post", value: site.email, href: `mailto:${site.email}` },
    { label: "Adress", value: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`, href: site.mapsUrl, external: true },
    { label: "Instagram", value: site.instagramHandle, href: site.instagram, external: true },
    { label: "Butiksorder", value: "Orderportalen PCS", href: site.orderPortalUrl, external: true },
  ];

  return (
    <>
      <PageHero tone="vanilla" crumbs={[{ label: "Kontakt" }]} title="Kontakt." muted="Ring, mejla eller skriv till bageriet." />

      <section className="pb-24">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <dl className="divide-y divide-hairline border-y border-hairline">
              {rows.map((r) => (
                <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <dt className="text-muted">{r.label}</dt>
                  <dd>
                    <a
                      href={r.href}
                      {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-1 text-[1.0625rem] font-semibold"
                    >
                      <span className="link-draw">{r.value}</span>
                      {r.external && <ArrowUpRight className="size-4 text-muted" aria-hidden />}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 rounded-[16px] bg-apricot p-5 text-[0.9375rem]">
              Kunder beställer i orderportalen PCS före kl. {site.orderCutoff} för leverans nästa dag.
            </p>
          </div>
          <div className="rounded-[24px] bg-butter p-6 sm:p-8 lg:col-span-7">
            <h2 className="t-h3">Skriv till oss.</h2>
            <p className="mt-2 mb-6 text-muted">Vi svarar på vardagar.</p>
            <MailtoForm fields={fields} subject="{arende} – {namn}" submitLabel="Skicka meddelandet" />
          </div>
        </div>
      </section>
    </>
  );
}
