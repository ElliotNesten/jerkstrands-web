/**
 * Säsongskampanj på startsidan och i menyn. Byt innehåll (eller sätt till null) när säsongen ändras.
 */
export interface SeasonCampaign {
  /** Menylänkens namn */
  badge: string;
  /** Överrubrik, t.ex. "Säsong · Jul" */
  eyebrow: string;
  /** Rubrik; ord inom *stjärnor* blir kursiva */
  title: string;
  text: string;
  /** Ordet i den runda stämpeln på bilden */
  stamp: string;
  image: string;
  imageAlt: string;
  /** Produkter som visas som taggar */
  highlights: { label: string; slug: string }[];
  href: string;
  cta: string;
}

export const currentSeason: SeasonCampaign | null = {
  badge: "Julsortiment",
  eyebrow: "Säsong · Jul",
  title: "Julsortimentet är *här*",
  text: "Med dofter och smaker som hör julen till bakar vi klassiska favoriter som lussekatter, saffransbröd och vörtbröd – med omsorg om tradition och råvaror.",
  stamp: "Jul",
  image: "/images/site/julbord.jpg",
  imageAlt: "Julbord med lussekatter, saffransfläta och pepparkakor",
  highlights: [
    { label: "Lussekatter", slug: "lussekatt-saffran" },
    { label: "Saffransbröd", slug: "saffransflata" },
    { label: "Vörtbröd", slug: "vortbrod" },
  ],
  href: "/sortiment?kategori=jul",
  cta: "Se julsortimentet",
};
