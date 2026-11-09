"use client";

import { useSyncExternalStore } from "react";
import type { LabelSize } from "@/components/labels/label-pdf";

/** Det som behövs för att rita en hylletikett för en artikel. */
export interface LabelProduct {
  slug: string;
  name: string;
  articleNo: string;
  weightGrams: number | null;
  ean: string | null;
  ingredientsShort: string;
  image: string;
}

export interface LabelQueueItem extends LabelProduct {
  id: string;
  price: string;
  size: LabelSize;
}

interface QueueState {
  items: LabelQueueItem[];
  open: boolean;
}

const STORAGE_KEY = "jerkstrands:hylletiketter:v1";
const serverState: QueueState = { items: [], open: false };
let state: QueueState = serverState;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const items = JSON.parse(raw) as LabelQueueItem[];
      if (Array.isArray(items)) state = { ...state, items };
    }
  } catch {
    /* privat läge eller blockerad lagring – kön fungerar ändå under besöket */
  }
}

function setState(next: Partial<QueueState>) {
  state = { ...state, ...next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    /* ignorera */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return state;
}

function getServerSnapshot() {
  return serverState;
}

let counter = 0;
const newId = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

export const labelQueue = {
  add(product: LabelProduct, opts: { price?: string; size?: LabelSize } = {}) {
    const item: LabelQueueItem = {
      ...product,
      id: newId(),
      price: opts.price ?? "",
      size: opts.size ?? lastSize(),
    };
    setState({ items: [...state.items, item], open: true });
  },
  update(id: string, patch: Partial<Pick<LabelQueueItem, "price" | "size">>) {
    setState({ items: state.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) });
  },
  setAllSizes(size: LabelSize) {
    setState({ items: state.items.map((i) => ({ ...i, size })) });
  },
  remove(id: string) {
    setState({ items: state.items.filter((i) => i.id !== id) });
  },
  clear() {
    setState({ items: [], open: false });
  },
  setOpen(open: boolean) {
    setState({ open });
  },
};

function lastSize(): LabelSize {
  return state.items.at(-1)?.size ?? "39";
}

export function useLabelQueue() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function labelUrl(slug: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jerkstrands.se";
  return `${base.replace(/\/$/, "")}/sortiment/${slug}`;
}
