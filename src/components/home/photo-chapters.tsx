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
  lead: string;
  chapters: Chapter[];
  link?: { href: string; label: string };
}

/**
 * Moment "photo-chapters" (tasteskill, assets/moments/photo-chapters): markeringen följer kitets
 * sidmodell och kitets moment.js sköter rörelsen. Sektionen står kvar medan nästa foto avtäcks
 * underifrån över det förra; i vila (reducerad rörelse, låg skärm) står kapitlen bredvid varandra.
 */
export function PhotoChapters({ id, title, lead, chapters, link }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-rubrik`} data-moment="photo-chapters" className="screen">
      <div className="wrap mo-ph">
        <div className="mo-ph__head">
          <h2 id={`${id}-rubrik`} className="t-h2">
            {title}
          </h2>
          <p className="t-lead text-ink-soft">
            {lead}{" "}
            {link && (
              <Link href={link.href} className="inline-flex items-center gap-1 font-semibold whitespace-nowrap text-ink">
                <span className="link-draw">{link.label}</span>
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </p>
        </div>
        <ol className="mo-ph__list">
          {chapters.map((c, i) => (
            <li key={c.image} className="mo-ph__ch">
              <figure className="mo-ph__pic">
                <Image
                  src={c.image}
                  alt={c.alt}
                  width={2400}
                  height={1600}
                  loading="eager"
                  fetchPriority={i === 0 ? "auto" : "low"}
                  sizes="(max-width: 639px) 200vw, (min-width: 1700px) 1600px, 94vw"
                  style={{ objectPosition: c.position ?? "50% 50%" }}
                />
              </figure>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
