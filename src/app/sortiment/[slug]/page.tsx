import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/page-hero";
import { EanBarcode } from "@/components/ean-barcode";
import { LabelForm } from "@/components/labels/label-form";
import { ProductCard, labelProduct, toSummary } from "@/components/product-card";
import { toneBg } from "@/lib/tones";
import {
  allergenLabels,
  formatNumber,
  formatWeight,
  categoryTone,
  getCategory,
  getProduct,
  products,
  tagLabels,
  type Product,
} from "@/lib/catalog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sortiment/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produkten finns inte" };
  const weight = formatWeight(product.weightGrams);
  return {
    title: `${product.name}${weight ? ` ${weight}` : ""}, art.nr ${product.articleNo}`,
    description:
      product.description ||
      `${product.name} från Jerkstrands Konditori & Bageri. Artikelnummer ${product.articleNo}${product.ean ? `, EAN ${product.ean}` : ""}.`,
    alternates: { canonical: `/sortiment/${product.slug}` },
    openGraph: { images: [{ url: product.image }] },
  };
}

export default function ProductPage({ params }: PageProps<"/sortiment/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Pick<PageProps<"/sortiment/[slug]">, "params">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categories[0]);
  const weight = formatWeight(product.weightGrams);
  const related = products
    .filter((p) => p.slug !== product.slug && p.categories.includes(product.categories[0]))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.articleNo,
    ...(product.ean ? { gtin13: product.ean } : {}),
    image: `${site.url}${product.image}`,
    description: product.description || undefined,
    brand: { "@type": "Brand", name: "Jerkstrands" },
    manufacturer: { "@type": "Organization", name: site.legalName },
    ...(product.weightGrams
      ? { weight: { "@type": "QuantitativeValue", value: product.weightGrams, unitCode: "GRM" } }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="pt-28 pb-16 sm:pt-32">
        <div className="wrap">
          <Breadcrumbs
            crumbs={[
              { href: "/sortiment", label: "Sortiment" },
              ...(category ? [{ href: `/sortiment?kategori=${category.id}`, label: category.name }] : []),
              { label: product.name },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
              <div className={`relative aspect-square overflow-hidden rounded-[24px] ${toneBg[categoryTone(product.categories[0])]}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  preload
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-contain p-10 sm:p-16"
                />
                {product.tags.length > 0 && (
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                    {product.tags.map((t) => (
                      <span key={t} className={t === "jul" ? "badge-accent" : "badge-overlay"}>
                        {tagLabels[t]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              {category && (
                <Link href={`/sortiment?kategori=${category.id}`} className="link-draw text-sm font-semibold text-muted">
                  {category.name}
                </Link>
              )}
              <h1 className="t-h1 mt-3">{product.name}.</h1>
              <p className="t-lead mt-3 text-ink-soft">
                Art.nr {product.articleNo}
                {weight && <> · {weight}</>}
              </p>
              {product.description && <p className="mt-6 text-[1.0625rem] leading-relaxed">{product.description}</p>}

              {!product.hasProductData && (
                <p className="mt-6 rounded-[16px] bg-canvas-soft p-4 text-sm">
                  Ingredienser och allergener för den här artikeln får du av oss på{" "}
                  <a href={site.phoneHref} className="font-semibold underline">
                    {site.phone}
                  </a>
                  .
                </p>
              )}

              <dl className="mt-8 divide-y divide-hairline-soft border-y border-hairline-soft text-[0.9375rem]">
                <Fact label="Artikelnummer" value={product.articleNo} />
                <Fact label="Vikt" value={weight ?? "–"} />
                <div className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <dt className="text-muted">EAN</dt>
                  {product.ean ? (
                    <dd className="flex items-center gap-3">
                      <span className="tabular-nums">{product.ean}</span>
                      <EanBarcode ean={product.ean} className="h-10 w-auto" />
                    </dd>
                  ) : (
                    <dd className="text-muted">
                      {product.variants.some((v) => v.ean) ? "Se varianterna nedan" : "Ingen egen EAN"}
                    </dd>
                  )}
                </div>
              </dl>

              {product.variants.length > 0 && <Variants product={product} />}

              <div className="mt-8">
                <LabelForm
                  product={labelProduct(toSummary(product))}
                  variants={product.variants.filter((v) => v.ean || v.weightGrams)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.hasProductData && (
        <section className="pb-20">
          <div className="wrap grid items-start gap-6 lg:grid-cols-12">
            <div className="rounded-[24px] bg-vanilla p-6 sm:p-8 lg:col-span-7">
              <h2 className="t-h3">Ingredienser.</h2>
              {product.ingredientsShort && (
                <p className="mt-4 text-[1.0625rem]">
                  <span className="font-semibold">I korthet: </span>
                  {product.ingredientsShort}
                </p>
              )}
              {product.ingredients && (
                <>
                  <h3 className="mt-6 text-[0.8125rem] font-semibold text-muted">Fullständig ingrediensförteckning</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{product.ingredients}</p>
                  <p className="mt-3 text-xs text-muted">Allergener skrivs med versaler.</p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="rounded-[24px] bg-peach p-6 sm:p-8">
                <h2 className="t-h3">Allergener.</h2>
                <h3 className="mt-4 text-[0.8125rem] font-semibold text-muted">Innehåller</h3>
                {product.allergens.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {product.allergens.map((a) => (
                      <li key={a} className="rounded-full bg-canvas px-3.5 py-1.5 text-sm font-semibold">
                        {allergenLabels[a]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm">Inga allergener enligt ingrediensförteckningen.</p>
                )}
                {product.traces && (
                  <>
                    <h3 className="mt-5 text-[0.8125rem] font-semibold text-muted">Kan innehålla spår av</h3>
                    <p className="mt-2 text-sm first-letter:uppercase">{product.traces}</p>
                  </>
                )}
              </div>

              {product.nutrition && (
                <div className="rounded-[24px] bg-sage p-6 sm:p-8">
                  <h2 className="t-h3">Näringsvärde.</h2>
                  <p className="mt-1 text-sm text-muted">Per 100 g</p>
                  <table className="mt-4 w-full text-sm">
                    <tbody>
                      <NutritionRow
                        label="Energi"
                        value={`${formatNumber(product.nutrition.energyKj, 0)} kJ / ${formatNumber(product.nutrition.energyKcal, 0)} kcal`}
                      />
                      <NutritionRow label="Fett" value={grams(product.nutrition.fat)} />
                      <NutritionRow label="varav mättat fett" value={grams(product.nutrition.saturatedFat)} indent />
                      <NutritionRow label="Kolhydrat" value={grams(product.nutrition.carbohydrates)} />
                      <NutritionRow label="varav sockerarter" value={grams(product.nutrition.sugars)} indent />
                      {product.nutrition.fiber !== null && <NutritionRow label="Fiber" value={grams(product.nutrition.fiber)} />}
                      <NutritionRow label="Protein" value={grams(product.nutrition.protein)} />
                      <NutritionRow label="Salt" value={grams(product.nutrition.salt, 2)} />
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="pb-24">
          <div className="wrap">
            <div className="flex items-end justify-between gap-4">
              <h2 className="t-h2">Fler från {category?.name.toLowerCase() ?? "sortimentet"}</h2>
              {category && (
                <Link href={`/sortiment?kategori=${category.id}`} className="btn btn-soft hidden sm:inline-flex">
                  Se hela kategorin <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={toSummary(p)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function grams(n: number | null, digits = 1) {
  return n === null ? "–" : `${formatNumber(n, digits)} g`;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function NutritionRow({ label, value, indent }: { label: string; value: string; indent?: boolean }) {
  return (
    <tr className="border-t border-hairline first:border-0">
      <th scope="row" className={indent ? "py-2 pl-4 text-left font-normal text-muted" : "py-2 text-left font-semibold"}>
        {label}
      </th>
      <td className="py-2 text-right tabular-nums">{value}</td>
    </tr>
  );
}

function Variants({ product }: { product: Product }) {
  return (
    <div className="mt-8">
      <h2 className="text-[0.8125rem] font-semibold text-muted">Storlekar och varianter</h2>
      <div className="mt-3 overflow-hidden rounded-[24px] border border-hairline">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas-soft text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Variant
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Art.nr
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Vikt
              </th>
              <th scope="col" className="hidden px-4 py-2.5 font-semibold sm:table-cell">
                EAN
              </th>
            </tr>
          </thead>
          <tbody>
            {product.variants.map((v) => (
              <tr key={v.articleNo} className="border-t border-hairline-soft">
                <td className="px-4 py-2.5 font-semibold">
                  <span className="block first-letter:uppercase">{v.label}</span>
                  {v.ean && <span className="block text-[0.7rem] font-normal text-muted tabular-nums sm:hidden">EAN {v.ean}</span>}
                </td>
                <td className="px-4 py-2.5 tabular-nums">{v.articleNo}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">{formatWeight(v.weightGrams) ?? "–"}</td>
                <td className="hidden px-4 py-2.5 text-muted tabular-nums sm:table-cell">{v.ean ?? "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <section className="pt-32 pb-16">
      <div className="wrap grid gap-10 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-[24px] bg-canvas-soft" />
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-full bg-canvas-soft" />
          <div className="h-14 w-3/4 animate-pulse rounded-full bg-canvas-soft" />
          <div className="h-24 animate-pulse rounded-[24px] bg-canvas-soft" />
        </div>
      </div>
    </section>
  );
}
