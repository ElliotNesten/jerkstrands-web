import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LabelQueuePanel } from "@/components/labels/label-queue-panel";
import { site } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
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
  themeColor: "#1b4231",
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
    <html lang="sv" className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-cream-50"
        >
          Hoppa till innehållet
        </a>
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
