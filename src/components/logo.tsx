import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "light-bg" | "dark-bg";
  className?: string;
  priority?: boolean;
}

/** Jerkstrands guldlogotyp. "light-bg" har mörk undertext för ljus bakgrund. */
export function Logo({ variant = "light-bg", className, priority }: LogoProps) {
  const src =
    variant === "light-bg"
      ? "/brand/jerkstrands-logo-ljus-bakgrund.png"
      : "/brand/jerkstrands-logo-guld.png";
  return (
    <Link href="/" className={cn("inline-block shrink-0", className)} aria-label="Jerkstrands – till startsidan">
      <Image
        src={src}
        alt="Jerkstrands Konditori & Bageri"
        width={708}
        height={153}
        preload={priority}
        className="h-auto w-full"
        sizes="240px"
      />
    </Link>
  );
}
