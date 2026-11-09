import { Egg, HandHeart, ListChecks, Recycle, Timer, Wheat } from "lucide-react";

/** Kvalitetslöften – används på startsidan och kvalitetssidan. */
export const qualityPillars = [
  {
    icon: HandHeart,
    title: "Hantverk sedan 1930",
    text: "Våra bagare och konditorer bakar i vårt eget bageri i Göteborg – med recept och tekniker som förfinats i generationer.",
  },
  {
    icon: Timer,
    title: "Tid, surdeg & långa jäsningar",
    text: "Kalljästa surdegsbröd och långa jäsningar ger mild syra, rund smak, saftigt inkråm och en frasig skorpa.",
  },
  {
    icon: Egg,
    title: "Utvalda råvaror",
    text: "Vi bakar med de finaste råvarorna – smör, grädde, färska bär och svenska ägg i våra tårtor och bakverk.",
  },
  {
    icon: ListChecks,
    title: "Tydlig produktinformation",
    text: "Ingredienser, allergener, näringsvärden och EAN för varje artikel – alltid uppdaterat här på webben.",
  },
] as const;

/** Fördjupning på kvalitetssidan. */
export const qualityDetails = [
  {
    icon: Wheat,
    title: "Bröd med tid och tålamod",
    text: "Våra surdegsfrallor och levainbröd jäser länge och svalt. Den långa jäsningen ger brödet en mild syra, en rund smak och en härlig seghet i varje tugga – ett hantverksbröd som lyfter allt från frukostmackan till den lyxiga smörgåsen.",
  },
  {
    icon: HandHeart,
    title: "Konditorns öga för detaljer",
    text: "Med öga för detaljer skapar våra konditorer en färgglad palett av delikata bakelser, kakor, tårtor och ätbara konstverk. Len choklad, vispad grädde, färska bär och läcker marsipan – klassiker som väcker minnen.",
  },
  {
    icon: Recycle,
    title: "Smarta storlekar, mindre svinn",
    text: "Tillsammans med några av Sveriges ledande hotell- och restauranggrupper har vi utvecklat behovsanpassade bröd och bakverk i mindre portionsstorlekar – som minimerar svinn och maximerar lönsamhet.",
  },
  {
    icon: ListChecks,
    title: "Märkning du kan lita på",
    text: "Varje artikel har artikelnummer, EAN, fullständig ingrediensförteckning med allergener markerade, information om spår av allergener och näringsdeklaration per 100 gram. Laktosfria varianter finns för flera av våra tårtor.",
  },
] as const;
