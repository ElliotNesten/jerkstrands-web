import { Check, Mail, Phone } from "lucide-react";
import { Sparkle } from "@/components/decor";
import { MailtoForm, type FormField } from "@/components/mailto-form";
import { site } from "@/lib/site";

const fields: FormField[] = [
  { name: "foretag", label: "Företagsnamn", required: true, autoComplete: "organization", placeholder: "Ditt företag" },
  { name: "kontaktperson", label: "Kontaktperson", required: true, autoComplete: "name", placeholder: "För- och efternamn" },
  { name: "epost", label: "E-post", type: "email", required: true, autoComplete: "email", placeholder: "namn@foretag.se" },
  { name: "telefon", label: "Telefon", type: "tel", autoComplete: "tel", placeholder: "070-000 00 00" },
  {
    name: "verksamhet",
    label: "Typ av verksamhet",
    type: "select",
    required: true,
    placeholder: "Välj hotell, restaurang, café, butik…",
    options: ["Hotell", "Restaurang", "Café eller konditori", "Livsmedelsbutik", "Catering eller event", "Annat"],
  },
  {
    name: "meddelande",
    label: "Meddelande",
    type: "textarea",
    placeholder: "Vad behöver ni? Ungefärliga volymer, leveransdagar…",
  },
];

const promises = ["Personlig kontakt med vårt bageri", "Sortiment anpassat för foodservice och handel", "Enkel beställning online i PCS"];

/**
 * "Bli kund" (Figma 822:642): stort grönt kort med erbjudandet till vänster och förfrågan
 * i ett vitt kort med smörgul skugga till höger. Formuläret öppnar besökarens e-post.
 */
export function CustomerFormSection({ id = "bli-kund" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-rubrik`} className="relative scroll-mt-24 bg-white py-16 lg:py-[120px]">
      <Sparkle className="absolute top-8 left-[4%] size-8 text-leaf lg:top-16 lg:size-10" />
      <div className="wrap">
        <div className="on-dark flex flex-col gap-14 rounded-[32px] bg-forest px-6 py-12 text-white sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:gap-20 lg:rounded-[40px] lg:p-20">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-8">
            <p className="eyebrow">Bli kund</p>
            <h2 id={`${id}-rubrik`} className="t-h2 leading-none">
              Få ett erbjudande
              <br /> anpassat för din
              <br /> <em>verksamhet</em>
            </h2>
            <p className="t-lead max-w-[640px] text-white/80">
              Berätta om ditt hotell, din restaurang eller butik så tar vi fram sortiment, priser och leveranser som passar er.
            </p>
            <ul className="t-lead flex flex-col gap-4">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-4 leading-snug">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-butter text-forest">
                    <Check className="size-4" aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={site.phoneHref} className="btn btn-ghost-light px-6">
                <Phone className="size-4" aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost-light px-6">
                <Mail className="size-4" aria-hidden /> {site.email}
              </a>
            </div>
          </div>

          <div className="relative w-full rounded-[32px] bg-white p-6 text-forest shadow-[0_8px_0_0_var(--color-butter)] max-sm:pt-12 sm:p-12 lg:w-[608px] lg:shrink-0">
            <p className="absolute -top-7 right-4 inline-flex -rotate-6 items-center gap-2 rounded-full bg-butter py-2 pr-6 pl-4 sm:-top-[43px] sm:right-5">
              <Sparkle className="size-4 text-forest" />
              <span className="font-display text-[1.75rem] leading-tight font-semibold italic">Välkommen!</span>
            </p>
            <h3 className="t-h3">Skicka en förfrågan</h3>
            <p className="t-body mt-3 mb-6 text-muted">Fyll i formuläret så kontaktar vi dig.</p>
            <MailtoForm fields={fields} subject="Förfrågan om att bli kund – {foretag}" submitLabel="Skicka förfrågan" />
          </div>
        </div>
      </div>
    </section>
  );
}
