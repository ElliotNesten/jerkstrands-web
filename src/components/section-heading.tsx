import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  title: ReactNode;
  /** Grå andra mening efter rubriken (Mobbin-stil) */
  muted?: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}

/** Rubrik på vänsterlinjen: tung rubrik, ev. grå andra mening, kort ingress. */
export function SectionHeading({ title, muted, intro, tone = "dark", className, as = "h2", id }: Props) {
  const Heading = as;
  return (
    <div className={cn("max-w-3xl", className)}>
      <Heading id={id} className={cn(as === "h1" ? "t-h1" : "t-h2", tone === "light" ? "text-canvas" : "text-ink")}>
        {title}
        {muted && (
          <>
            {" "}
            <span className={tone === "light" ? "text-canvas/65" : "text-ink/55"}>{muted}</span>
          </>
        )}
      </Heading>
      {intro && (
        <div className={cn("t-lead mt-5 max-w-2xl", tone === "light" ? "text-canvas/85" : "text-ink-soft")}>{intro}</div>
      )}
    </div>
  );
}
