import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone, ShoppingCart } from "lucide-react";
import { Sparkle } from "@/components/decor";
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
  { name: "namn", label: "Namn", required: true, autoComplete: "name", placeholder: "För- och efternamn" },
  { name: "foretag", label: "Företag", autoComplete: "organization", placeholder: "Ditt företag" },
  { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email", placeholder: "namn@foretag.se" },
  { name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel", placeholder: "070-000 00 00" },
  {
    name: "arende",
    label: "Ärende",
    type: "select",
    required: true,
    full: true,
    placeholder: "Välj ärende",
    options: ["Bli kund", "Beställning", "Produktfråga eller allergener", "Tårtbeställning", "Annat"],
  },
  { name: "meddelande", label: "Meddelande", type: "textarea", required: true, placeholder: "Vad kan vi hjälpa dig med?" },
];

export default function KontaktPage() {
  const rows = [
    { label: "Telefon", value: site.phone, href: site.phoneHref, icon: <Phone className="size-6" aria-hidden />, bg: "bg-butter" },
    { label: "E-post", value: site.email, href: `mailto:${site.email}`, icon: <Mail className="size-6" aria-hidden />, bg: "bg-cream" },
    {
      label: "Besöksadress",
      value: `${site.address.street}, ${site.address.postalCode} ${site.address.city}`,
      href: site.mapsUrl,
      external: true,
      icon: <MapPin className="size-6" aria-hidden />,
      bg: "bg-blush",
    },
    {
      label: "Instagram",
      value: site.instagramHandle,
      href: site.instagram,
      external: true,
      icon: <InstagramIcon className="size-6" />,
      bg: "bg-mint",
    },
    {
      label: "Beställning",
      value: "Logga in i PCS",
      href: site.orderPortalUrl,
      external: true,
      icon: <ShoppingCart className="size-6" aria-hidden />,
      bg: "bg-mist",
    },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Kontakt" }]}
        eyebrow="Kontakt"
        title={
          <>
            Hör av dig till <em>bageriet</em>
          </>
        }
        intro={`Ring, mejla eller skriv till oss – vi svarar på vardagar. Kunder beställer i PCS före kl. ${site.orderCutoff} för leverans nästa dag.`}
      />

      <section className="relative pt-6 pb-20 lg:pt-10 lg:pb-[120px]">
        <Sparkle className="absolute top-2 right-[5%] size-8 text-leaf" />
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-6">
          <ul className="flex flex-col gap-4 lg:col-span-5">
            {rows.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`sticker-sm lift flex items-center gap-5 rounded-[24px] p-5 ${r.bg}`}
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-forest text-butter">
                    {r.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="t-label block text-leaf">{r.label}</span>
                    <span className="font-ui mt-1 block text-lg font-semibold break-words">{r.value}</span>
                  </span>
                  {r.external && <ArrowUpRight className="size-5 shrink-0" aria-hidden />}
                </a>
              </li>
            ))}
          </ul>
          <div className="relative rounded-[32px] border-[1.5px] border-forest bg-white p-6 shadow-[var(--shadow-sticker)] sm:p-12 lg:col-span-7">
            <h2 className="t-h3">Skriv till oss</h2>
            <p className="t-body mt-3 mb-6 text-muted">Fyll i formuläret så återkommer vi så snart vi kan.</p>
            <MailtoForm fields={fields} subject="{arende} – {namn}" submitLabel="Skicka meddelandet" />
          </div>
        </div>
      </section>
    </>
  );
}
