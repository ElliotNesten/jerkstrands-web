import { ean13Bars, isValidEan13 } from "@/lib/ean";

/** EAN-13 som skarp SVG. */
export function EanBarcode({ ean, className }: { ean: string; className?: string }) {
  if (!isValidEan13(ean)) return null;
  const pad = 9;
  const width = 95 + pad + 2;
  const barH = 50;
  return (
    <svg
      viewBox={`0 0 ${width} ${barH + 14}`}
      className={className}
      role="img"
      aria-label={`EAN-streckkod ${ean}`}
    >
      <rect width={width} height={barH + 14} fill="#fff" />
      {ean13Bars(ean).map(([start, w, guard]) => (
        <rect key={start} x={pad + start} y={2} width={w} height={barH + (guard ? 5 : 0)} fill="#1d1611" />
      ))}
      <g fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#1d1611" textAnchor="middle">
        <text x={4} y={barH + 11}>
          {ean[0]}
        </text>
        <text x={pad + 24} y={barH + 11}>
          {ean.slice(1, 7)}
        </text>
        <text x={pad + 70} y={barH + 11}>
          {ean.slice(7)}
        </text>
      </g>
    </svg>
  );
}
