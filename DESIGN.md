# Jerkstrands – designspråk

Källa: Figma-filen **Web Designs**, startsidan (nod `822:198`). Startsidan följer designen sektion för
sektion; övriga sidor är byggda av samma delar. Allt nedan finns som tokens och klasser i
`src/app/globals.css` och som komponenter i `src/components/decor.tsx`.

## Färger

| Token | Värde | Används till |
| --- | --- | --- |
| `forest` / `ink` | `#1A5036` | Text, primärknappar, menyrad, sidfot, kanter och skuggor på kort |
| `leaf` / `accent` | `#257850` | Kursiva ord i rubriker, överrubriker, nummer |
| `moss` | `#5C9A7C` | Gnistor, punkten i heroets etikett |
| `butter` | `#F0E2A6` | Toppband, aktiv menypunkt, sekundärknappar, kursiva ord på grön mark |
| `cream` / `canvas-soft` | `#FFF6D8` | Hero, stegsektionen, kort |
| `blush`, `mint`, `mist` | `#ECE4E1`, `#E2EDE7`, `#EDF1EF` | Kort och kategoritoner |
| `muted` | `#1A5036` @ 65 % | Sekundär text |
| `ink-soft` | `#1A5036` @ 80 % | Ingresser och brödtext |

## Typografi

- **Barlow Condensed** 600 (och 600 kursiv) – rubriker. Ett ord per rubrik kan markeras med `<em>`:
  kursivt och `leaf`-grönt, smörgult på grön mark (`.on-dark`).
- **Barlow** 500/600 – knappar, meny, etiketter, korttitlar (`font-ui`).
- **Heebo** 400/500/600 – brödtext.

| Klass | Figma (1920 px) |
| --- | --- |
| `.t-display` | 120 px / 0,9 |
| `.t-h1` | 96 px / 0,95 (undersidornas rubrik) |
| `.t-h2` | 64 px / 1,1 |
| `.t-h3` | 40 px / 1,1 |
| `.t-h4` | 32 px / 1,1 |
| `.t-title` | Barlow 24 px |
| `.t-lead` | Heebo 20 px / 1,6 |
| `.t-body` | Heebo 18 px / 1,6 |
| `.eyebrow` | Heebo 600 16 px, versaler, 0,16 em spärrning, 32 × 2 px linje före |

Storlekarna skalar ned med `clamp()` på mindre skärmar.

## Former

- **Klistermärken** (`.sticker`, `.sticker-sm`): 1,5 px grön kant och en hård skugga rakt nedåt
  (8 px för kort, 4 px för små piller). Kort har 32 px hörn.
- **Knappar** (`.btn` + `btn-primary` / `btn-outline` / `btn-butter` / `btn-light-outline` /
  `btn-ghost-light`): piller, 1,5 px kant, Barlow 600 18 px, 56 px höga. `btn-sm` är 40 px.
- **Sneda märken** på bilder (`.tag-tilt`): Barlow Condensed kursiv med en gnista, roterade några grader.
- **Fält** (`.field`): vita med tunn grön kant och 16 px hörn.
- **Glaskort** på grön mark (`.card-glass`).

## Dekor

- `Wave` – vågkant mellan sektioner (`from` = färgen ovanför, `to` = färgen nedanför).
- `Sparkle` – fyruddig gnista i `butter`, `moss` eller `leaf`.
- `BurstBadge` – taggig stämpel "SEDAN 1930".
- SVG-filer från designen i `public/images/decor/`: understrykningar och streckade pilar.

## Layout

- Innehållet är högst 1620 px brett (`.wrap`), dvs. 150 px marginal på en 1920-skärm.
- Menyraden är grön och stannar kvar överst; toppbandet med telefon och e-post rullar bort.
- Sektioner växlar mellan vitt, grädde och grönt, med vågor emellan.
