# Tmavý redesign martinaku.cz

Datum: 2026-08-13
Stav: schváleno, k implementaci

## Cíl

Přenést vizuální jazyk z <https://uiflip.com> na martinaku.cz. Ne kopie 1:1, ale
stejný „vibe": tmavé pozadí, svítivý zelený akcent, velká centrovaná typografie,
pilulkové tvary, velkorysé mezery. Obsah a tón textů zůstávají z předchozí fáze
beze změny.

## Rozhodnutí a jejich důvody

**Celý web tmavý**, ne jen vybrané sekce. Martin si tuto variantu zvolil poté, co
byl upozorněn na napětí: uiflip cílí na zahraniční SaaS zakladatele, Martin na
malé firmy v Novém Jičíně. Riziko je vědomě přijaté.

**Zesvětlení akcentu z `#3DBF9C` na `#45E588`** obrací rozhodnutí z předchozí
fáze, kdy se zelená ztlumovala. Není to rozpor: na bílém pozadí měla původní
`#00CC98` kontrast 2,1:1 a působila křiklavě, na `#011818` má `#45E588`
kontrast 11:1. Světlá zelená na tmavém pozadí se chová jinak než na světlém.

**Nepřebírá se rámeček „vybráno ve Figmě"** kolem slova v nadpisu. Je to vtip o
designérském nástroji, srozumitelný pro publikum uiflipu. Martin není design
studio, u něj by šlo o vypůjčenou hlášku bez významu.

**Nepřebírá se stack avatarů klientů** v hero sekci. Fotky klientů neexistují a
nebudou se vymýšlet. Nahrazuje je hvězdičkové hodnocení a počet skutečných
referencí.

## Paleta

Hodnoty odečtené z uiflip.com přes `getComputedStyle`.

| Token | Hodnota | Použití |
|---|---|---|
| `--color-bg-primary` | `#011818` | pozadí stránky |
| `--color-bg-secondary` | `#0A1E1E` | střídavý pás sekcí |
| `--color-surface` | `#0F2222` | karty |
| `--color-text-primary` | `#FFFFFF` | nadpisy |
| `--color-text-secondary` | `rgba(255,255,255,.72)` | běžný text |
| `--color-border` | `rgba(255,255,255,.10)` | rámečky |
| `--color-border-strong` | `rgba(255,255,255,.18)` | zvýrazněné rámečky |
| `--color-accent` | `#45E588` | akcent, plochy tlačítek |
| `--color-accent-hover` | `#2FCB70` | hover |
| `--color-accent-text` | `#45E588` | akcent jako text |

Kontrasty: bílá na pozadí 18,2:1, akcent na pozadí 11,1:1, `#011818` na akcentu
11,1:1. Všechny přes AA i AAA pro běžný text.

## Struktura homepage

Tučně jsou nové sekce, zbytek se překlápí do tmavého.

1. Plovoucí pilulková hlavička s CTA
2. Hero: velký centrovaný nadpis, zvýrazněná fráze, hvězdičky a počet referencí,
   pilulková CTA
3. Pás log klientů (na tmavém invertovaná)
4. **Řádek s čísly**: 12+ let v IT, 46 akcí za první týden, 4 500 prokliků,
   Bronzový partner Shoptet
5. Portfolio s **nakloněnými mockupy** (CSS 3D transform, žádné nové obrázky),
   akcenj.cz jako hlavní projekt
6. **Štítky služeb**: pilulky s jednotlivými dovednostmi
7. Služby, O mně, Jak to probíhá
8. **Velké karty referencí** přes celou šířku, klíčové fráze v citacích zeleně
9. Ceník webů, správa webu, FAQ
10. **Opakované CTA** před patičkou
11. Kontakt, patička

## Rozsah

Všech pět stránek: `index.html`, `projects.html`, `akcenj.html`, `domeny.html`,
`gdpr.html`. Částečná konverze není možná, proklik na case study by skočil na
bílou stránku.

## Známá rizika

- Barvy jsou v HTML zapsané natvrdo v Tailwind třídách (`bg-white`,
  `text-[#022c22]`, `bg-[#00020a]`), ne všechny jdou přes proměnné. Konverze se
  neobejde bez záměn v HTML.
- Loga klientů jsou tmavá na průhledném pozadí, na tmavém pozadí zaniknou.
  Řešení: `invert` filtr.
- Fotka Martina má bílé pozadí, na tmavém bude působit jako výřez.
- `design.css` se generuje ručně přes `npx @tailwindcss/cli`, ne přes
  `npm run build`. Po každé změně tříd je nutná regenerace, jinak se nové třídy
  neprojeví.

## Ověření

- `npm run build` prochází
- HTML parser hlásí nula nespárovaných tagů na všech stránkách
- Žádná stránka na 375 px vodorovně nepřetéká
- Konzole prohlížeče bez chyb
- Všechny interní odkazy a kotvy vedou někam
- Kontrastní poměry změřené, ne odhadnuté
