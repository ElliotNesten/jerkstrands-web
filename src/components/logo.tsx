import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "light-bg" | "dark-bg";
  className?: string;
  priority?: boolean;
}

/**
 * Jerkstrands logotyp. "light-bg" är en djupare guldton med något kraftigare linjer, så att
 * skriptet syns i liten storlek på ljus bakgrund (5:1 mot menyraden, originalguldet når 2,4:1).
 * "dark-bg" är originalguldet, som har god kontrast mot den mörka sidfoten.
 */
export function Logo({ variant = "light-bg", className, priority }: LogoProps) {
  const src =
    variant === "light-bg"
      ? "/brand/jerkstrands-logo-djupguld.png"
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
        sizes="(min-width: 640px) 184px, 150px"
      />
    </Link>
  );
}
