import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * Jerkstrands logotyp i guld med ljus undertext, för den gröna menyraden och sidfoten.
 * Bredden styrs med className (w-*).
 */
export function Logo({ className, priority, sizes = "(min-width: 640px) 181px, 150px" }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-block shrink-0", className)} aria-label="Jerkstrands – till startsidan">
      <Image
        src="/brand/jerkstrands-logo-guld.png"
        alt="Jerkstrands Konditori & Bageri"
        width={708}
        height={153}
        preload={priority}
        className="h-auto w-full"
        sizes={sizes}
      />
    </Link>
  );
}
