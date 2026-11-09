import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Dekorativ kringla/ornament i guld, används som avdelare. */
export function Ornament(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 12" fill="none" aria-hidden="true" {...props}>
      <path d="M0 6h46" stroke="currentColor" strokeWidth="1" />
      <path d="M74 6h46" stroke="currentColor" strokeWidth="1" />
      <path
        d="M60 1.5c2.2 0 3.6 1.9 3.6 4.5S62.2 10.5 60 10.5 56.4 8.6 56.4 6 57.8 1.5 60 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="51" cy="6" r="1.4" fill="currentColor" />
      <circle cx="69" cy="6" r="1.4" fill="currentColor" />
    </svg>
  );
}
