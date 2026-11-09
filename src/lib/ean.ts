/** EAN-13 – validering och streckkodsmönster (används både i SVG och PDF). */

const EAN_L = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const EAN_G = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const EAN_R = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const EAN_PARITY = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

export function isValidEan13(ean: string | null | undefined): ean is string {
  if (!ean || !/^\d{13}$/.test(ean)) return false;
  const d = ean.split("").map(Number);
  const sum = d.slice(0, 12).reduce((acc, n, i) => acc + n * (i % 2 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === d[12];
}

/** 95 moduler: "1" = svart stapel. */
export function ean13Bits(ean: string) {
  const d = ean.split("").map(Number);
  const parity = EAN_PARITY[d[0]];
  let bits = "101";
  for (let i = 1; i <= 6; i++) bits += parity[i - 1] === "L" ? EAN_L[d[i]] : EAN_G[d[i]];
  bits += "01010";
  for (let i = 7; i <= 12; i++) bits += EAN_R[d[i]];
  bits += "101";
  return bits;
}

/** Är modulen en del av ett skyddsstreck (som ritas längre)? */
export const isGuardModule = (i: number) => i < 3 || (i >= 45 && i < 50) || i >= 92;

/** Sammanhängande staplar som [startmodul, bredd, ärSkyddsstreck]. */
export function ean13Bars(ean: string): [number, number, boolean][] {
  const bits = ean13Bits(ean);
  const bars: [number, number, boolean][] = [];
  let i = 0;
  while (i < bits.length) {
    if (bits[i] !== "1") {
      i++;
      continue;
    }
    let j = i;
    while (j < bits.length && bits[j] === "1" && isGuardModule(j) === isGuardModule(i)) j++;
    bars.push([i, j - i, isGuardModule(i)]);
    i = j;
  }
  return bars;
}
