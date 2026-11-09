import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
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
    options: ["Bli återförsäljare", "Beställning / order", "Produktfråga / allergener", "Tårtbeställning", "Övrigt"],
  },
  { name: "meddelande", label: "Meddelande", type: "textarea", required: true },
];

export default function KontaktPage() {
  const cards = [
    { icon: Phone, label: "Telefon", value: site.phone, href: site.phoneHref },
    { icon: Mail, label: "E-post", value: site.email, href: `mailto:${site.email}` },
    {
      icon: MapPin,
      label: "Adress",
      value: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
      href: site.mapsUrl,
      external: true,
    },
    { icon: InstagramIcon, label: "Instagram", value: site.instagramHandle, href: site.instagram, external: true },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Kontakt" }]}
        eyebrow="Kontakt"
        title="Hör av dig – vi hjälper gärna till"
        intro={<p>Frågor om sortiment, beställningar eller att bli återförsäljare? Ring, mejla eller skriv till oss här.</p>}
      />

      <section className="py-14 sm:py-16">
        <div className="container-site">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card group flex h-full flex-col p-6 transition-shadow hover:shadow-soft"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-forest-100 text-forest-800">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="mt-5 text-xs font-semibold tracking-wide text-espresso-500 uppercase">{label}</span>
                  <span className="mt-1 font-display text-lg leading-snug group-hover:text-forest-700">{value}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div className="card p-6 sm:p-8">
              <h2 className="font-display text-3xl">Skicka ett meddelande</h2>
              <p className="mt-2 mb-6 text-espresso-700">Vi svarar så snart vi kan under vardagar.</p>
              <MailtoForm fields={fields} subject="{arende} – {namn}" submitLabel="Skicka meddelande" />
            </div>
            <aside className="space-y-5">
              <div className="rounded-3xl bg-forest-900 p-7 text-cream-100">
                <Clock className="size-6 text-gold-300" aria-hidden />
                <h2 className="mt-4 font-display text-2xl text-cream-50">Beställ före kl. {site.orderCutoff}</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream-300">
                  Befintliga kunder lägger order i vår orderportal PCS – före kl. {site.orderCutoff} för leverans nästa
                  dag.
                </p>
                <a
                  href={site.orderPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-sm mt-5"
                >
                  Butiksorder (PCS) <ArrowUpRight className="size-4" />
                </a>
              </div>
              <div
                className="relative overflow-hidden rounded-3xl border border-cream-300 p-7"
                style={{ backgroundImage: "url(/images/site/marmor-ljus.jpg)", backgroundSize: "cover" }}
              >
                <div className="absolute inset-0 bg-cream-50/70" aria-hidden />
                <div className="relative">
                  <MapPin className="size-6 text-gold-600" aria-hidden />
                  <h2 className="mt-4 font-display text-2xl">Bageriet</h2>
                  <p className="mt-2 leading-relaxed">
                    {site.legalName}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm mt-5"
                  >
                    Visa på karta <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
