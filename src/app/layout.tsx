import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LabelQueuePanel } from "@/components/labels/label-queue-panel";
import { site } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Hantverksbageri i Göteborg sedan ${site.founded}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Jerkstrands",
    "konditori",
    "bageri",
    "Göteborg",
    "grossist bröd",
    "återförsäljare",
    "tårtor",
    "fikabröd",
    "hotell och restaurang",
  ],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: site.name,
    images: [{ url: "/images/site/kanelbullar.jpg", width: 2400, height: 1600 }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fff8ef",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/jerkstrands-logo-ljus-bakgrund.png`,
  image: `${site.url}/images/site/kanelbullar.jpg`,
  foundingDate: String(site.founded),
  telephone: "+46 31 84 08 85",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: "SE",
  },
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${bricolage.variable} ${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <LabelQueuePanel />
      </body>
    </html>
  );
}
