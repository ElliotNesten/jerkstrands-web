"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav, site } from "@/lib/site";

/** Helskärmsmeny för mobil. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full bg-canvas text-ink lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Öppna menyn"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Menu className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-canvas p-0 text-ink backdrop:bg-transparent"
        aria-label="Meny"
      >
        <div className="flex h-full flex-col">
          <div className="wrap flex h-[84px] items-center justify-between">
            <span className="text-lg font-semibold">Meny</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-canvas-soft"
              aria-label="Stäng menyn"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobilmeny" className="wrap flex-1 overflow-y-auto pt-4">
            <ul className="space-y-1">
              {[{ href: "/", label: "Start" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-[2rem] leading-tight font-[650]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap space-y-3 pt-6 pb-8">
            <Link
              href="/aterforsaljare#bli-aterforsaljare"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Bli återförsäljare
            </Link>
            <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-soft w-full">
              Butiksorder (PCS) <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
