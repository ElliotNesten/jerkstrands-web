import { products } from "@/lib/catalog";
import { site } from "@/lib/site";

const lactoseFree = products.filter((p) => p.tags.includes("laktosfri")).length;

/** Vanliga frågor från återförsäljare – används på startsidan och återförsäljarsidan. */
export const faq = [
  {
    q: "Hur beställer jag som kund?",
    a: `I vår orderportal PCS. Beställ före kl. ${site.orderCutoff} så levererar vi nästa dag.`,
  },
  {
    q: "Hur skriver jag ut hylletiketter?",
    a: "Tryck på Hylletikett vid produkterna i sortimentet, fyll i styckpris och välj 150 × 39 eller 150 × 45 mm. Du får en PDF med EAN-streckkod, jämförpris och en QR-kod till produktens innehållsdeklaration.",
  },
  {
    q: "Var hittar jag ingredienser och allergener?",
    a: "På varje produktsida: fullständig ingrediensförteckning, allergener, spår av allergener och näringsvärde per 100 gram.",
  },
  {
    q: "Har ni laktosfria tårtor?",
    a: `Ja, ${lactoseFree} av våra tårtor finns även laktosfria. Filtrera på ”Finns laktosfri” i sortimentet.`,
  },
  {
    q: "Vad kostar det att bli återförsäljare?",
    a: "Priser och villkor beror på sortiment och volym. Skicka en intresseanmälan så tar vi fram ett förslag.",
  },
];
