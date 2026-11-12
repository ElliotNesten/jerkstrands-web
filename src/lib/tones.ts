/**
 * Bageriets färgtoner från designen. Varje kategori har en egen ton bakom produktbilderna,
 * så att sortimentet blir färgrikt utan att tävla med produkterna.
 * Klassnamnen skrivs ut i sin helhet så att Tailwind hittar dem.
 */
export type Tone = "cream" | "butter" | "blush" | "mint" | "mist";

export const toneBg: Record<Tone, string> = {
  cream: "bg-cream",
  butter: "bg-butter",
  blush: "bg-blush",
  mint: "bg-mint",
  mist: "bg-mist",
};
