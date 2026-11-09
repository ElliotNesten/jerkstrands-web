import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "dark", className, as = "h2" }: Props) {
  const Heading = as;
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow", tone === "light" && "eyebrow-light", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "mt-3 text-[2rem] leading-[1.08] sm:text-[2.6rem]",
          tone === "light" ? "text-cream-50" : "text-espresso-900",
        )}
      >
        {title}
      </Heading>
      {intro && (
        <div
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-cream-200" : "text-espresso-700",
          )}
        >
          {intro}
        </div>
      )}
    </div>
  );
}
