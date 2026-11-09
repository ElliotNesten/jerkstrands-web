"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { site } from "@/lib/site";

export interface FormField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "checkboxes";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  autoComplete?: string;
  full?: boolean;
}

interface Props {
  fields: FormField[];
  /** Ämnesrad, t.ex. "Ansökan – {foretag}" där {namn} ersätts med fältvärden */
  subject: string;
  submitLabel: string;
  intro?: ReactNode;
}

/**
 * Formulär som öppnar besökarens e-postprogram med ett färdigifyllt mejl till info@.
 * Fungerar även utan JavaScript via action="mailto:".
 */
export function MailtoForm({ fields, subject, submitLabel, intro }: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    for (const f of fields) {
      values[f.name] = f.type === "checkboxes" ? data.getAll(f.name).join(", ") : String(data.get(f.name) ?? "").trim();
    }
    const body = fields
      .filter((f) => values[f.name])
      .map((f) => (f.type === "textarea" ? `\n${f.label}:\n${values[f.name]}` : `${f.label}: ${values[f.name]}`))
      .join("\n");
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject.replace(/\{(\w+)\}/g, (_, k: string) => values[k] || "").replace(/\s+[–-]\s*$/, ""),
    )}&body=${encodeURIComponent(
      `${body}\n\n— Skickat via jerkstrands.se`,
    )}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <form
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      {intro && <div className="sm:col-span-2">{intro}</div>}
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const label = (
          <>
            {f.label}
            {f.required && <span className="text-muted"> *</span>}
          </>
        );
        if (f.type === "checkboxes") {
          return (
            <fieldset key={f.name} className="text-sm sm:col-span-2">
              <legend className="font-semibold">{label}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {f.options?.map((o) => (
                  <label
                    key={o}
                    className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-canvas px-4 font-semibold transition-colors has-[:checked]:bg-ink has-[:checked]:text-canvas"
                  >
                    <input type="checkbox" name={f.name} value={o} className="sr-only" />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }
        return (
          <label key={f.name} htmlFor={id} className={f.full || f.type === "textarea" ? "text-sm sm:col-span-2" : "text-sm"}>
            <span className="font-semibold">{label}</span>
            {f.type === "textarea" ? (
              <textarea id={id} name={f.name} required={f.required} rows={5} placeholder={f.placeholder} className="field mt-1.5 bg-canvas" />
            ) : f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} defaultValue="" className="field mt-1.5 h-12 bg-canvas">
                <option value="" disabled>
                  Välj
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                className="field mt-1.5 h-12 bg-canvas"
              />
            )}
          </label>
        );
      })}
      <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary">
          <Send className="size-4" /> {submitLabel}
        </button>
        <p className="text-xs text-muted">Ditt e-postprogram öppnas med meddelandet ifyllt till {site.email}.</p>
      </div>
      {sent && (
        <div role="status" className="flex gap-3 rounded-[16px] bg-canvas p-4 text-sm sm:col-span-2">
          <CheckCircle2 className="size-5 shrink-0 text-accent" aria-hidden />
          <p>
            Meddelandet ligger i ditt e-postprogram. Öppnades det inte? Mejla{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline">
              {site.email}
            </a>{" "}
            eller ring{" "}
            <a href={site.phoneHref} className="font-semibold underline">
              {site.phone}
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
