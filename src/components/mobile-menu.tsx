"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { mainNav, site } from "@/lib/site";

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
        className="inline-flex size-11 items-center justify-center rounded-full border border-cream-300 text-espresso-900 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Öppna meny"
        aria-haspopup="dialog"
      >
        <Menu className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(false);
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(24rem,100vw)] max-w-none bg-cream-50 p-0 text-espresso-900 shadow-lift backdrop:bg-espresso-950/40 backdrop:backdrop-blur-sm"
        aria-label="Meny"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-cream-300 px-5 py-4">
            <span className="font-display text-xl">Meny</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cream-200"
              aria-label="Stäng meny"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobilmeny" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="divide-y divide-cream-300/70">
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="block py-3.5 font-display text-2xl">
                  Start
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 font-display text-2xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-cream-300 bg-cream-100 px-5 py-5">
            <Link
              href="/aterforsaljare#bli-aterforsaljare"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full"
            >
              Bli återförsäljare
            </Link>
            <a
              href={site.orderPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline w-full"
            >
              Butiksorder (PCS) <ArrowUpRight className="size-4" />
            </a>
            <a href={site.phoneHref} className="flex items-center justify-center gap-2 pt-1 text-sm">
              <Phone className="size-4 text-gold-600" /> {site.phone}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
