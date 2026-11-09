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
              className="rounded-full px-3 py-2 text-[0.9375rem] font-semibold text-ink"
            >
              <span className={cn("link-draw", isActive && "bg-[length:100%_1.5px]")}>{item.label}</span>
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
