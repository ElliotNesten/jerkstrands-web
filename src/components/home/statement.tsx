"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  text: string;
  /** Ord (exakt som i texten) som tänds i accentfärgen */
  accent?: string[];
  link?: { href: string; label: string };
}

/**
 * Moment "word-highlight" (tasteskill): ett påstående i halvt bläck som tänds ord för ord
 * när det passerar skärmens mitt, och släcks igen på väg upp.
 */
export function Statement({ text, accent = [], link }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>(".wh-word"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.6;
      for (const w of words) {
        const top = w.getBoundingClientRect().top;
        if (top < line) w.setAttribute("data-lit", "");
        else w.removeAttribute("data-lit");
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const words = text.split(" ");
  return (
    <section aria-label="Om Jerkstrands" data-moment="word-highlight" className="screen flex items-start">
      <div className="wrap">
        <h2 ref={ref} className="max-w-6xl text-[clamp(2.1rem,5.2vw,4.5rem)] leading-[1.06] font-[650]">
          {words.map((w, i) => (
            <span key={i}>
              <span className="wh-word" data-accent={accent.includes(w.replace(/[.,]/g, "")) ? "" : undefined}>
                {w}
              </span>{" "}
            </span>
          ))}
        </h2>
        {link && (
          <Link href={link.href} className="btn btn-outline mt-12">
            {link.label} <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
