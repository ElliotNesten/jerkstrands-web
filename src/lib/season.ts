/**
 * Säsongskampanj på startsidan. Byt innehåll (eller sätt till null) när säsongen ändras.
 */
export interface SeasonCampaign {
  badge: string;
  title: string;
  muted: string;
  image: string;
  imageAlt: string;
  productSlugs: string[];
  href: string;
  cta: string;
}

export const currentSeason: SeasonCampaign | null = {
  badge: "Julsortiment",
  title: "Julsortimentet finns att beställa.",
  muted: "Lussekatter, saffransfläta, vörtbröd och pepparkaksdeg från vårt bageri.",
  image: "/images/site/julbord.jpg",
  imageAlt: "Julbord med lussekatter, saffransfläta och pepparkakor",
  productSlugs: ["lussekatt-saffran", "saffransflata", "vortbrod", "pepparkaksdeg"],
  href: "/sortiment?kategori=jul",
  cta: "Se julsortimentet",
};
