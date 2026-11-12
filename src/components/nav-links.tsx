"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(href: string, pathname: string | null) {
  if (!pathname || href.includes("?")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Menyn som ett genomskinligt piller; aktiv sida får smörgul bakgrund. */
function Links({ pathname }: { pathname?: string | null }) {
  return (
    <ul className="flex items-center rounded-full border border-white/12 bg-white/8 p-1">
      {mainNav.map((item) => {
        const active = isActive(item.href, pathname ?? null);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "font-ui block rounded-full px-4 py-2 leading-[1.2] font-semibold transition-colors",
                active ? "bg-butter text-forest" : "text-white hover:bg-white/10",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavLinks() {
  const pathname = usePathname();
  return <Links pathname={pathname} />;
}

export function NavLinksStatic() {
  return <Links />;
}
