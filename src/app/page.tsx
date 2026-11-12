import { Wave } from "@/components/decor";
import { CustomerFormSection } from "@/components/customer-form-section";
import { AboutSection } from "@/components/home/about-section";
import { AudienceStrip } from "@/components/home/audience-strip";
import { BusinessSection } from "@/components/home/business-section";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { RangeSection } from "@/components/home/range-section";
import { SeasonSection } from "@/components/home/season-section";
import { StepsSection } from "@/components/home/steps-section";

/*
  Startsidan enligt Figma "Web Designs" (nod 822:198):
  hero · vi bakar för · löpband · sortiment · för företag · säsong · om oss · tre steg · bli kund · sidfot.
*/
export default function Home() {
  return (
    <>
      <Hero />
      <Wave from="cream" to="white" />
      <AudienceStrip />
      <Marquee />
      <RangeSection />
      <BusinessSection />
      <SeasonSection />
      <AboutSection />
      <StepsSection />
      <CustomerFormSection />
    </>
  );
}
