import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { ResellerSection } from "@/components/home/reseller-section";
import { RangeSection } from "@/components/home/range-section";
import { PhotoChapters } from "@/components/home/photo-chapters";
import { SeasonSection } from "@/components/home/season-section";
import { Statement } from "@/components/home/statement";
import { LabelsSection } from "@/components/home/labels-section";
import { FaqList } from "@/components/faq-list";
import { SectionHeading } from "@/components/section-heading";

/*
  Sidplan (tasteskill) – typ: product (grossistbageri), site-kind: other.
  Utseende: Mobbin DESIGN.md – vit galleriyta, bläck, ljusgrå toner, piller, inga skuggor;
  accent = Jerkstrands förpackningsgröna. Moment: photo-chapters + word-highlight.
  1 hero (produkten stort) · 2 återförsäljare · 3 sortimentet · 4–7 kvalitet (photo-chapters)
  · säsong (ljusgrå mark) · påstående (word-highlight) · hylletiketter · frågor · avslutning + sidfot.
*/
export default function Home() {
  return (
    <>
      <Hero />
      <ResellerSection />
      <RangeSection />
      <PhotoChapters
        id="kvalitet"
        title="Bageriet på Slakthusgatan."
        lead="Allt bakas av våra egna bagare och konditorer i Göteborg, med recept som följt staden sedan 1930."
        link={{ href: "/kvalitet", label: "Läs om kvalitetsarbetet" }}
        chapters={[
          {
            title: "Surdeg som får ta tid",
            text: "Levainbröd och surdegsfrallor jäser länge och svalt. Det ger mild syra, saftigt inkråm och en frasig skorpa.",
            image: "/images/site/surdegsbrod.jpg",
            alt: "Surdegsbröd med mjölad skorpa på en skärbräda",
            position: "50% 55%",
          },
          {
            title: "Bullar knutna för hand",
            text: "Kanel, kardemumma och vanilj, knutna en och en och toppade med pärlsocker.",
            image: "/images/site/kanelbullar.jpg",
            alt: "Kanelknutar med pärlsocker",
            position: "55% 62%",
          },
          {
            title: "Tårtor från konditoriet",
            text: "Princesstårta, jordgubbstårta och White Lady i 8, 12 och 20 bitar. Flera finns laktosfria.",
            image: "/images/site/princesstarta.jpg",
            alt: "Princesstårta på grön marmor",
            position: "50% 60%",
          },
          {
            title: "Packat för hyllan",
            text: "I Jerkstrands påse med EAN-kod och ingrediensförteckning, klart att ställa i butiken.",
            image: "/images/site/smakakor-packade.jpg",
            alt: "Småkakor i Jerkstrands påse",
            position: "50% 45%",
          },
        ]}
      />
      <SeasonSection />
      <Statement
        text="Sedan 1930 har göteborgarna firat med Jerkstrands tårtor. I dag bakar vi samma klassiker för butiker, caféer och hotell, i vårt eget bageri på Slakthusgatan."
        accent={["1930"]}
        link={{ href: "/om-oss", label: "Läs vår historia" }}
      />
      <LabelsSection />
      <section aria-labelledby="fragor-rubrik" className="screen">
        <div className="wrap grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-5">
            <SectionHeading
              id="fragor-rubrik"
              title="Frågor från återförsäljare."
              intro="Saknas svaret? Ring oss på 031-84 08 85."
            />
            <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-[24px]">
              <Image
                src="/images/site/kakor-pase.jpg"
                alt="Småkakor i Jerkstrands påse på en marmorskiva"
                fill
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
}
