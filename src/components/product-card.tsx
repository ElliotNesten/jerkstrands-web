import Image from "next/image";
import Link from "next/link";
import { AddLabelButton } from "@/components/labels/add-label-button";
import { categoryTone, formatWeight, tagLabels, type Product } from "@/lib/catalog";
import { toneBg } from "@/lib/tones";
import { cn } from "@/lib/cn";

export type ProductSummary = Pick<
  Product,
  | "slug"
  | "name"
  | "articleNo"
  | "image"
  | "weightGrams"
  | "ean"
  | "ingredientsShort"
  | "tags"
  | "categories"
  | "segments"
  | "allergens"
  | "variants"
>;

export function toSummary(p: Product): ProductSummary {
  return {
    slug: p.slug,
    name: p.name,
    articleNo: p.articleNo,
    image: p.image,
    weightGrams: p.weightGrams,
    ean: p.ean,
    ingredientsShort: p.ingredientsShort,
    tags: p.tags,
    categories: p.categories,
    segments: p.segments,
    allergens: p.allergens,
    variants: p.variants,
  };
}

export function labelProduct(p: ProductSummary) {
  return {
    slug: p.slug,
    name: p.name,
    articleNo: p.articleNo,
    weightGrams: p.weightGrams,
    ean: p.ean,
    ingredientsShort: p.ingredientsShort,
    image: p.image,
  };
}

interface Props {
  product: ProductSummary;
  showLabelButton?: boolean;
  className?: string;
  sizes?: string;
}

/** Galleriplatta: produkten på ljusgrå yta, namnet under. Lyfter 2px vid hover. */
export function ProductCard({ product, showLabelButton = true, className, sizes }: Props) {
  const weight = formatWeight(product.weightGrams);
  const sizesCount = product.variants.filter((v) => !v.lactoseFree).length;
  const badges = product.tags.filter((t) => t !== "mini");
  return (
    <article className={cn("lift group relative flex flex-col", className)}>
      <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[24px]", toneBg[categoryTone(product.categories[0])])}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"}
          className="zoom-img object-contain p-5 sm:p-7"
        />
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {badges.map((t) => (
              <span key={t} className={t === "jul" ? "badge-accent" : "badge-overlay"}>
                {tagLabels[t]}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <h3 className="text-[1.0625rem] leading-snug font-semibold">
          <Link href={`/sortiment/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-muted">
          Art.nr {product.articleNo}
          {weight && <> · {weight}</>}
          {sizesCount > 1 && <> · {sizesCount} storlekar</>}
        </p>
        {showLabelButton && (
          <div className="relative z-10 mt-auto pt-3">
            <AddLabelButton product={labelProduct(product)} />
          </div>
        )}
      </div>
    </article>
  );
}
