"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/cn";

function Links({ active }: { active?: string | null }) {
  return (
    <ul className="flex items-center gap-1">
      {mainNav.map((item) => {
        const isActive = active ? active === item.href || active.startsWith(`${item.href}/`) : false;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                isActive ? "text-forest-800" : "text-espresso-800 hover:text-forest-700",
              )}
            >
              {item.label}
              {isActive && (
                <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold-500" aria-hidden />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavLinks() {
  const pathname = usePathname();
  return <Links active={pathname} />;
}

export function NavLinksStatic() {
  return <Links />;
}
