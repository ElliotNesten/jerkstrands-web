import Image from "next/image";
import Link from "next/link";
import { AddLabelButton } from "@/components/labels/add-label-button";
import { formatWeight, tagLabels, type Product } from "@/lib/catalog";
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

export function ProductCard({ product, showLabelButton = true, className, sizes }: Props) {
  const weight = formatWeight(product.weightGrams);
  const sizesCount = product.variants.filter((v) => !v.lactoseFree).length;
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-cream-300/70 bg-cream-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-cream-400 hover:shadow-soft",
        className,
      )}
    >
      <div className="product-stage relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={sizes ?? "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"}
          className="object-contain p-5 drop-shadow-[0_14px_14px_rgba(42,32,25,0.18)] transition-transform duration-500 group-hover:scale-[1.04] sm:p-6"
        />
        {product.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.tags
              .filter((t) => t !== "mini")
              .map((t) => (
                <span
                  key={t}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.68rem] font-semibold",
                    t === "jul" ? "bg-berry-600 text-cream-50" : "bg-forest-800/90 text-cream-50",
                  )}
                >
                  {tagLabels[t]}
                </span>
              ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 pt-3 pb-4 sm:px-5">
        <h3 className="font-display text-lg leading-snug text-espresso-900">
          <Link href={`/sortiment/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-espresso-600">
          <span className="font-medium text-espresso-800">Art.nr {product.articleNo}</span>
          {weight && <> · {weight}</>}
          {sizesCount > 1 && <> · {sizesCount} storlekar</>}
        </p>
        {product.ean && <p className="font-mono text-[0.7rem] tracking-wide text-espresso-500">EAN {product.ean}</p>}
        {showLabelButton && (
          <div className="relative z-10 mt-auto flex pt-3">
            <AddLabelButton product={labelProduct(product)} compact />
          </div>
        )}
      </div>
    </article>
  );
}
