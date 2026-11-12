import { currentSeason } from "@/lib/season";

/** Företagsuppgifter – ändra här så uppdateras hela webbplatsen. */
export const site = {
  name: "Jerkstrands Konditori & Bageri",
  legalName: "Jerkstrands Konditori AB",
  shortName: "Jerkstrands",
  founded: 1930,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jerkstrands.se",
  description:
    "Konditori och bageri i Göteborg sedan 1930. Nybakat bröd, fikabröd, tårtor och bakverk till butiker, caféer, hotell och restauranger.",
  phone: "031-84 08 85",
  phoneHref: "tel:+4631840885",
  email: "info@jerkstrands.se",
  address: {
    street: "Slakthusgatan 12, hus K",
    postalCode: "415 02",
    city: "Göteborg",
    country: "Sverige",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Slakthusgatan+12+415+02+G%C3%B6teborg",
  instagram: "https://instagram.com/jerkstrands",
  instagramHandle: "@jerkstrands",
  /** Orderportal för befintliga kunder */
  orderPortalUrl: "https://ib.pcs.se/#!/",
  orderCutoff: "14.00",
  downloads: {
    sortiment: "/files/jerkstrands-sortiment.pdf",
    tartor: "/files/jerkstrands-tartor-och-bakelser.pdf",
    hotell: "/files/jerkstrands-hotell-och-restaurang.pdf",
  },
} as const;

/** Dit alla "Bli kund"-knappar leder */
export const customerHref = "/aterforsaljare";

/** Huvudmenyn. Säsongslänken visas bara när en säsongskampanj är aktiv (src/lib/season.ts). */
export const mainNav: { href: string; label: string }[] = [
  { href: "/", label: "Start" },
  { href: "/sortiment", label: "Sortiment" },
  ...(currentSeason ? [{ href: currentSeason.href, label: currentSeason.badge }] : []),
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];
