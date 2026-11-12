import { cacheLife } from "next/cache";

/**
 * Årtal som räknas ut på servern och cachas ett dygn, så att sidorna kan förrenderas
 * (Cache Components tillåter inte new Date() direkt i en förrenderad komponent).
 */
async function thisYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function CurrentYear() {
  return <>{await thisYear()}</>;
}

/** Antal år sedan ett årtal, t.ex. hur länge bageriet funnits. */
export async function YearsSince({ year }: { year: number }) {
  return <>{(await thisYear()) - year}</>;
}
