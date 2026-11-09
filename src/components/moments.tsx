"use client";

import { useEffect } from "react";

/** Designverktygets laddare för momenten (kopia av kitet i public/assets/moments). */
const LOADER: string = "/assets/moments/moments.js";

interface MomentsModule {
  ready: Promise<Element[]>;
  mount: (el: Element) => Promise<unknown>;
  unmountAll: (root?: Document | Element) => void;
}

/**
 * Startar sidans moment ([data-moment]) med kitets egen moments.js efter hydreringen,
 * så att React och momentens DOM-ändringar inte krockar. Vid klientnavigering
 * monteras nya sektioner och de gamla städas bort.
 */
export function Moments() {
  useEffect(() => {
    let alive = true;
    let mod: MomentsModule | null = null;
    import(/* webpackIgnore: true */ LOADER).then(async (m: MomentsModule) => {
      mod = m;
      await m.ready;
      if (!alive) return;
      document.querySelectorAll("[data-moment]:not([data-moment-mounted])").forEach((el) => {
        if (!el.parentElement?.closest("[data-moment]")) void m.mount(el);
      });
    });
    return () => {
      alive = false;
      mod?.unmountAll(document);
    };
  }, []);
  return null;
}
