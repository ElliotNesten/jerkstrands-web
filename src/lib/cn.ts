/** Slår ihop klassnamn och hoppar över falska värden. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
