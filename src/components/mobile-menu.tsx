"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Sparkle } from "@/components/decor";
import { customerHref, mainNav, site } from "@/lib/site";

/** Helskärmsmeny för mobil, på grön mark som menyraden. */
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
        className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white lg:hidden"
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
        className="on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-forest p-0 text-white backdrop:bg-transparent"
        aria-label="Meny"
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          <Sparkle className="absolute top-28 right-8 size-8 text-butter" />
          <Sparkle className="absolute bottom-40 left-6 size-5 text-moss" />
          <div className="wrap flex h-[72px] items-center justify-between">
            <Logo className="w-[150px]" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/8"
              aria-label="Stäng menyn"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav aria-label="Mobilmeny" className="wrap flex-1 overflow-y-auto pt-8">
            <ul className="space-y-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-[2.75rem] leading-none font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap space-y-3 pt-6 pb-8">
            <Link href={customerHref} onClick={() => setOpen(false)} className="btn btn-light-outline w-full">
              Bli kund
            </Link>
            <a href={site.orderPortalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-butter w-full">
              Beställ i PCS <ArrowRight className="size-4" />
            </a>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-3 text-sm text-white/80">
              <a href={site.phoneHref} className="flex items-center gap-2">
                <Phone className="size-4" aria-hidden /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2">
                <Mail className="size-4" aria-hidden /> {site.email}
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
