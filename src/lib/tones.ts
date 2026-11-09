/**
 * Bageriets färgtoner. Varje kategori har en egen pastell bakom produktbilderna,
 * så att sortimentet blir färgrikt utan att tävla med produkterna.
 * Klassnamnen skrivs ut i sin helhet så att Tailwind hittar dem.
 */
export type Tone =
  | "butter"
  | "wheat"
  | "honey"
  | "apricot"
  | "peach"
  | "raspberry"
  | "pistachio"
  | "sage"
  | "vanilla"
  | "cocoa";

export const toneBg: Record<Tone, string> = {
  butter: "bg-butter",
  wheat: "bg-wheat",
  honey: "bg-honey",
  apricot: "bg-apricot",
  peach: "bg-peach",
  raspberry: "bg-raspberry",
  pistachio: "bg-pistachio",
  sage: "bg-sage",
  vanilla: "bg-vanilla",
  cocoa: "bg-cocoa",
};
