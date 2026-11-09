import { Hero } from "@/components/home/hero";
import { ResellerSection } from "@/components/home/reseller-section";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { SeasonSection } from "@/components/home/season-section";
import { QualitySection } from "@/components/home/quality-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutTeaser } from "@/components/home/about-teaser";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <ResellerSection />
      <CategoryShowcase />
      <SeasonSection />
      <QualitySection />
      <FeaturedProducts />
      <AboutTeaser />
      <CtaBand />
    </>
  );
}
