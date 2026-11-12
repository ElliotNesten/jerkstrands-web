import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  /** Rubriken; lägg ett ord i <em> för den kursiva markeringen */
  title: ReactNode;
  /** Överrubrik med kort linje före, t.ex. "Vårt sortiment" */
  eyebrow?: string;
  intro?: ReactNode;
  /** "light" på grön mark */
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}

/** Sektionsrubrik som i Figma: överrubrik, Barlow Condensed-rubrik med kursivt ord, ingress. */
export function SectionHeading({ title, eyebrow, intro, tone = "dark", align = "left", className, as = "h2", id }: Props) {
  const Heading = as;
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        tone === "light" && "on-dark",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading id={id} className={cn(as === "h1" ? "t-h1" : "t-h2", tone === "light" ? "text-white" : "text-forest")}>
        {title}
      </Heading>
      {intro && (
        <div className={cn("t-lead mt-2 max-w-[640px]", tone === "light" ? "text-white/80" : "text-ink-soft")}>{intro}</div>
      )}
    </div>
  );
}
