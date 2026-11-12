# Jerkstrands Konditori & Bageri – webbplats

Ny webbplats för Jerkstrands Konditori AB, byggd med **Next.js 16** (App Router, Cache Components),
**TypeScript** och **Tailwind CSS 4**. Gjord för att publiceras på **Vercel** och förberedd för att
senare byggas ut med inloggning och beställning direkt på sidan.

## Innehåll

| Sida | Beskrivning |
| --- | --- |
| `/` | Startsida enligt Figma: hero, vi bakar för, sortiment (bageri, konditori, foodservice), för företag, säsong (jul), om oss, tre steg och formuläret Bli kund |
| `/sortiment` | Produktkatalog med sök (namn, artikelnummer, EAN), filter (kanal, kategori, egenskaper, allergener), rutnät/lista och delbara filterlänkar |
| `/sortiment/[produkt]` | Produktsida: bild, säljtext, art.nr, EAN-streckkod, varianter, ingredienser, allergener, näringsvärde och **hylletikett** |
| `/aterforsaljare` | **Bli kund**: för butik, café och hotell/restaurang, hylletiketter, material (PDF), förfrågan och vanliga frågor. Alla Bli kund-knappar leder hit |
| `/kvalitet` | Kvalitetslöften och fördjupning (hantverk, surdeg, råvaror, märkning) |
| `/om-oss`, `/kontakt` | Historia, värderingar och kontaktuppgifter med formulär |

### Hylletiketter

Etiketterna (150 × 39 mm och 150 × 45 mm) skapas som vektor-PDF direkt i webbläsaren med samma
upplägg som den tidigare etikettgeneratorn: packshot, logga, produktnamn, ingredienser, styckpris,
vikt/art.nr/jämförpris, QR-kod till produktsidan och EAN-13. Produkter kan samlas i en utskriftskö
(sparas i webbläsaren) och skrivas ut tillsammans på A4.

### Gamla adresser

Alla adresser från den tidigare webbplatsen (t.ex. `/barkis`, `/julsortiment`) omdirigeras permanent
till de nya sidorna – så att QR-koder på redan utskrivna etiketter fortsätter fungera.
Listan finns i `data/source/omdirigeringar.json`.

## Design

Designen kommer från Figma-filen **Web Designs** (startsidan, nod `822:198`) och beskrivs i
[`DESIGN.md`](DESIGN.md): skogsgrönt och grädde, smörgult som accent, rubriker i Barlow Condensed med
kursiva ord, kort som klistermärken med grön kant och hård skugga, vågor och gnistor mellan sektionerna.
Tokens och klasser finns i `src/app/globals.css`, dekoren i `src/components/decor.tsx`.

## Kom igång

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produktionsbygge
npm run lint
```

Sätt gärna miljövariabeln `NEXT_PUBLIC_SITE_URL` (standard `https://jerkstrands.se`) i Vercel. Den
används för QR-koder, sitemap och delningslänkar.

## Uppdatera sortimentet

Produktdata hämtas från samma CSV-export som den tidigare webbplatsen använde
(`data.jerkstrands.se/flavour/flavour.php`).

1. Spara en ny export som `data/source/produktdata.csv` (eller ange sökvägen som argument).
2. Kör `npm run import:products` – det skapar `src/data/products.json`.
3. Vill du lägga till eller flytta en produkt? Redigera `data/source/katalog.json`
   (artikelnummer, slug, namn, kategorier och bildfil) och lägg bilden i `public/images/products/`.

Allergener läses ut automatiskt från ingrediensförteckningen (ord skrivna med VERSALER).

## Ändra texter och uppgifter

- Kontaktuppgifter, orderportal, beställningstid och PDF:er: `src/lib/site.ts`
- Säsongskampanj på startsidan och i menyn: `src/lib/season.ts` (sätt till `null` för att dölja)
- Kategorier: `src/lib/catalog.ts`
- Kvalitetstexter: `src/lib/quality.ts`
- Färger och typografi: `src/app/globals.css` (följer `DESIGN.md`)

## Struktur

```
data/source/        CSV, katalogkoppling och omdirigeringar
scripts/            import-products.mjs
public/brand/       logotyper
public/images/      produktbilder (WebP) och miljöbilder
public/files/       sortiment, tårtpärm och hotellsortiment (PDF)
public/fonts/       Barlow Condensed för etiketterna (OFL)
src/app/            sidor
src/components/     UI-komponenter, katalog och etiketter
src/lib/            data, kategorier och hjälpfunktioner
```
