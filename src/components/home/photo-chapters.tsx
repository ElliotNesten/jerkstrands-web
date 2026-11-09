"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface Chapter {
  title: string;
  text: string;
  image: string;
  alt: string;
  position?: string;
}

interface Props {
  id: string;
  title: string;
  muted?: string;
  lead: string;
  chapters: Chapter[];
  link?: { href: string; label: string };
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Moment "photo-chapters" (tasteskill): sektionen står kvar medan nästa foto avtäcks
 * underifrån över det förra, och panelen nere till vänster byter kapitel.
 * Reducerad rörelse eller en skärm under 600px hög: kapitlen står bredvid varandra.
 */
export function PhotoChapters({ id, title, muted, lead, chapters, link }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0 … chapters.length
  const [live, setLive] = useState(true);
  const [near, setNear] = useState(false);
  const n = chapters.length;

  // Ladda alla kapitelbilder i förväg när sektionen närmar sig – dolda (bortklippta) bilder
  // hämtas annars inte förrän de börjar avtäckas, och då hinner de inte visas i tid.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 599px)");
    const apply = () => setLive(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel) : 0;
      setProgress(p * n);
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
  }, [n]);

  // Bild i (i ≥ 1) avtäcks under k ∈ [i − 0.55, i − 0.1]; resten av steget håller bilden still.
  const reveal = (i: number) => (i === 0 ? 1 : clamp((progress - (i - 0.55)) / 0.45));
  const active = Math.min(n - 1, chapters.reduce((acc, _, i) => (reveal(i) > 0.5 ? i : acc), 0));

  const heading = (
    <div className="max-w-3xl">
      <h2 id={`${id}-rubrik`} className="t-h2">
        {title} {muted && <span className="text-faint">{muted}</span>}
      </h2>
      <p className="t-lead mt-4 text-muted">{lead}</p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-rubrik`}
      data-moment="photo-chapters"
      className={`chapters relative${live ? " is-live" : ""}`}
      style={{ ["--n" as string]: n }}
    >
      {/* Levande version */}
      <div className="chapters-live sticky top-0 flex h-[100svh] flex-col pt-[104px] pb-6 sm:pt-[120px]">
        <div className="wrap flex min-h-0 flex-1 flex-col">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            {heading}
            {link && (
              <Link href={link.href} className="btn btn-soft self-start lg:self-auto">
                {link.label} <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
          <div className="relative mt-8 min-h-[260px] flex-1 overflow-hidden rounded-[24px] bg-canvas-soft">
            {chapters.map((c, i) => {
              const r = reveal(i);
              return (
                <div
                  key={c.image}
                  className="absolute inset-0"
                  style={{ clipPath: `inset(${(1 - r) * 100}% 0 0 0)`, zIndex: i }}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    loading={i === 0 || near ? "eager" : "lazy"}
                    sizes="(min-width: 1440px) 1280px, 92vw"
                    className="object-cover will-change-transform"
                    style={{ objectPosition: c.position ?? "50% 50%", transform: `scale(${1.06 - 0.06 * r})` }}
                  />
                </div>
              );
            })}
            <div className="absolute bottom-3 left-3 z-20 w-[min(26rem,calc(100%-1.5rem))] rounded-[20px] bg-canvas p-5 sm:bottom-5 sm:left-5 sm:p-6" aria-live="polite">
              <div className="flex items-center justify-between text-sm font-semibold text-muted">
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <span className="flex gap-1" aria-hidden>
                  {chapters.map((c, i) => (
                    <span key={c.image} className={`h-1 w-5 rounded-full transition-colors ${i <= active ? "bg-ink" : "bg-hairline"}`} />
                  ))}
                </span>
              </div>
              <h3 className="t-h4 mt-3">{chapters[active].title}</h3>
              <p className="mt-2 text-muted">{chapters[active].text}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stilla version: reducerad rörelse eller låg skärm */}
      <div className="chapters-static screen">
        <div className="wrap">
          {heading}
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {chapters.map((c, i) => (
              <li key={c.image}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-canvas-soft">
                  <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" className="object-cover" style={{ objectPosition: c.position ?? "50% 50%" }} />
                </div>
                <p className="mt-4 text-sm font-semibold text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h4 mt-1">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
