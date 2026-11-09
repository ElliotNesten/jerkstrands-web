/**
 * Säsongskampanj på startsidan. Byt innehåll (eller sätt till null) när säsongen ändras.
 */
export interface SeasonCampaign {
  eyebrow: string;
  badge: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  productSlugs: string[];
  href: string;
  cta: string;
}

export const currentSeason: SeasonCampaign | null = {
  eyebrow: "Säsong",
  badge: "Julsortiment",
  title: "Julens dofter och smaker är här",
  text: "Med dofter och smaker som hör julen till bakar vi klassiska favoriter som lussekatter, saffransfläta och vörtbröd – med omsorg om tradition och råvaror.",
  image: "/images/site/julbord.jpg",
  imageAlt: "Julbord med lussekatter, saffransfläta och pepparkakor",
  productSlugs: ["lussekatt-saffran", "saffransflata", "vortbrod", "pepparkaksdeg"],
  href: "/sortiment?kategori=jul",
  cta: "Se julsortimentet",
};
