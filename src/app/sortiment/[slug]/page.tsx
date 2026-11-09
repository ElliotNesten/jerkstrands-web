import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/page-hero";
import { EanBarcode } from "@/components/ean-barcode";
import { LabelForm } from "@/components/labels/label-form";
import { ProductCard, labelProduct, toSummary } from "@/components/product-card";
import {
  allergenLabels,
  formatNumber,
  formatWeight,
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
  if (!product) return { title: "Produkten hittades inte" };
  const weight = formatWeight(product.weightGrams);
  return {
    title: `${product.name}${weight ? ` ${weight}` : ""} – art.nr ${product.articleNo}`,
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
      <section className="paper-texture border-b border-cream-300/70">
        <div className="container-site py-8 sm:py-10">
          <Breadcrumbs
            crumbs={[
              { href: "/sortiment", label: "Sortiment" },
              ...(category ? [{ href: `/sortiment?kategori=${category.id}`, label: category.name }] : []),
              { label: product.name },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="product-stage relative aspect-square overflow-hidden rounded-[2rem] border border-cream-300/70">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  preload
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-contain p-10 drop-shadow-[0_24px_24px_rgba(42,32,25,0.22)] sm:p-14"
                />
                {product.tags.length > 0 && (
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                    {product.tags.map((t) => (
                      <span
                        key={t}
                        className={
                          t === "jul"
                            ? "rounded-full bg-berry-600 px-3 py-1 text-xs font-semibold text-cream-50"
                            : "rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold text-cream-50"
                        }
                      >
                        {tagLabels[t]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              {category && (
                <Link href={`/sortiment?kategori=${category.id}`} className="eyebrow hover:text-forest-700">
                  {category.name}
                </Link>
              )}
              <h1 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">{product.name}</h1>
              <p className="mt-3 text-espresso-600">
                Art.nr <span className="font-semibold text-espresso-900">{product.articleNo}</span>
                {weight && (
                  <>
                    {" "}
                    · <span className="font-semibold text-espresso-900">{weight}</span>
                  </>
                )}
              </p>
              {product.description && (
                <p className="mt-6 text-lg leading-relaxed text-espresso-800">{product.description}</p>
              )}

              {!product.hasProductData && (
                <div className="mt-6 flex gap-3 rounded-2xl border border-gold-300 bg-gold-100/70 p-4 text-sm">
                  <AlertTriangle className="size-5 shrink-0 text-gold-700" aria-hidden />
                  <p>
                    Fullständig produktinformation för den här artikeln publiceras inom kort. Kontakta oss på{" "}
                    <a href={site.phoneHref} className="font-semibold underline">
                      {site.phone}
                    </a>{" "}
                    för ingredienser och allergener.
                  </p>
                </div>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream-300 bg-cream-300 text-sm">
                <Fact label="Artikelnummer" value={product.articleNo} mono />
                <Fact label="Vikt" value={weight ?? "–"} />
                <div className="col-span-2 bg-cream-50 p-4 sm:p-5">
                  <dt className="text-xs font-semibold tracking-wide text-espresso-500 uppercase">EAN</dt>
                  {product.ean ? (
                    <dd className="mt-2 flex flex-wrap items-center gap-4">
                      <EanBarcode ean={product.ean} className="h-16 w-auto rounded" />
                      <span className="font-mono text-base tracking-wider">{product.ean}</span>
                    </dd>
                  ) : (
                    <dd className="mt-1 text-espresso-700">
                      {product.variants.some((v) => v.ean)
                        ? "Se EAN för respektive variant nedan."
                        : "Artikeln har ingen egen EAN-kod."}
                    </dd>
                  )}
                </div>
              </dl>

              {product.variants.length > 0 && <Variants product={product} />}

              <div className="mt-8">
                <LabelForm product={labelProduct(toSummary(product))} variants={product.variants.filter((v) => v.ean || v.weightGrams)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.hasProductData && (
        <section className="container-site py-14 sm:py-16">
          <div className="grid items-start gap-6 lg:grid-cols-3">
            <div className="card p-6 sm:p-7 lg:col-span-2">
              <h2 className="font-display text-2xl">Ingredienser</h2>
              {product.ingredientsShort && (
                <p className="mt-3 text-sm">
                  <span className="font-semibold">I korthet: </span>
                  {product.ingredientsShort}
                </p>
              )}
              {product.ingredients && (
                <>
                  <h3 className="mt-6 font-sans text-xs font-semibold tracking-wide text-espresso-500 uppercase">
                    Fullständig ingrediensförteckning
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-800">{product.ingredients}</p>
                  <p className="mt-3 text-xs text-espresso-600">Allergener skrivs med VERSALER.</p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="card p-6 sm:p-7">
                <h2 className="font-display text-2xl">Allergener</h2>
                <h3 className="mt-4 font-sans text-xs font-semibold tracking-wide text-espresso-500 uppercase">Innehåller</h3>
                {product.allergens.length ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {product.allergens.map((a) => (
                      <li key={a} className="rounded-full bg-forest-100 px-3 py-1 text-sm font-semibold text-forest-900">
                        {allergenLabels[a]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-espresso-700">Inga allergener enligt ingrediensförteckningen.</p>
                )}
                {product.traces && (
                  <>
                    <h3 className="mt-5 font-sans text-xs font-semibold tracking-wide text-espresso-500 uppercase">
                      Kan innehålla spår av
                    </h3>
                    <p className="mt-2 text-sm text-espresso-800 first-letter:uppercase">{product.traces}</p>
                  </>
                )}
              </div>

              {product.nutrition && (
                <div className="card p-6 sm:p-7">
                  <h2 className="font-display text-2xl">Näringsvärde</h2>
                  <p className="mt-1 text-xs text-espresso-600">Per 100 g</p>
                  <table className="mt-4 w-full text-sm">
                    <tbody className="divide-y divide-cream-300">
                      <NutritionRow
                        label="Energi"
                        value={`${formatNumber(product.nutrition.energyKj, 0)} kJ / ${formatNumber(product.nutrition.energyKcal, 0)} kcal`}
                      />
                      <NutritionRow label="Fett" value={grams(product.nutrition.fat)} />
                      <NutritionRow label="varav mättat fett" value={grams(product.nutrition.saturatedFat)} indent />
                      <NutritionRow label="Kolhydrat" value={grams(product.nutrition.carbohydrates)} />
                      <NutritionRow label="varav sockerarter" value={grams(product.nutrition.sugars)} indent />
                      {product.nutrition.fiber !== null && (
                        <NutritionRow label="Fiber" value={grams(product.nutrition.fiber)} />
                      )}
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

      <section className="container-site pb-14 sm:pb-16">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-forest-900 px-6 py-8 text-cream-100 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="font-display text-2xl text-cream-50">Vill du sälja {product.name}?</p>
            <p className="mt-1 text-sm text-cream-300">
              Befintliga kunder beställer i PCS före kl. {site.orderCutoff}. Nya kunder – hör av er!
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/aterforsaljare#bli-aterforsaljare" className="btn btn-gold">
              Bli återförsäljare <ArrowRight className="size-4" />
            </Link>
            <a href={site.phoneHref} className="btn btn-outline-light">
              <Phone className="size-4" /> {site.phone}
            </a>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream-200/60 py-14 sm:py-16">
          <div className="container-site">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl">Mer från {category?.name.toLowerCase() ?? "sortimentet"}</h2>
              {category && (
                <Link href={`/sortiment?kategori=${category.id}`} className="btn btn-ghost hidden text-forest-800 sm:inline-flex">
                  Visa alla <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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

function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-cream-50 p-4 sm:p-5">
      <dt className="text-xs font-semibold tracking-wide text-espresso-500 uppercase">{label}</dt>
      <dd className={mono ? "mt-1 font-mono text-base" : "mt-1 text-base font-semibold"}>{value}</dd>
    </div>
  );
}

function NutritionRow({ label, value, indent }: { label: string; value: string; indent?: boolean }) {
  return (
    <tr>
      <th scope="row" className={indent ? "py-2 pl-4 text-left font-normal text-espresso-600" : "py-2 text-left font-medium"}>
        {label}
      </th>
      <td className="py-2 text-right tabular-nums">{value}</td>
    </tr>
  );
}

function Variants({ product }: { product: Product }) {
  return (
    <div className="mt-8">
      <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-gold-700 uppercase">Storlekar & varianter</h2>
      <div className="mt-3 overflow-hidden rounded-3xl border border-cream-300 bg-cream-50">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-200/70 text-xs text-espresso-600 uppercase">
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
          <tbody className="divide-y divide-cream-300/70">
            {product.variants.map((v) => (
              <tr key={v.articleNo}>
                <td className="px-4 py-2.5 font-medium">
                  <span className="block first-letter:uppercase">{v.label}</span>
                  {v.ean && <span className="block font-mono text-[0.7rem] font-normal text-espresso-500 sm:hidden">EAN {v.ean}</span>}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">{v.articleNo}</td>
                <td className="px-4 py-2.5 whitespace-nowrap">{formatWeight(v.weightGrams) ?? "–"}</td>
                <td className="hidden px-4 py-2.5 font-mono text-xs sm:table-cell">{v.ean ?? "–"}</td>
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
    <section className="paper-texture border-b border-cream-300/70">
      <div className="container-site grid gap-10 py-16 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-[2rem] bg-cream-200" />
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-cream-200" />
          <div className="h-12 w-3/4 animate-pulse rounded bg-cream-200" />
          <div className="h-24 animate-pulse rounded bg-cream-200" />
        </div>
      </div>
    </section>
  );
}
