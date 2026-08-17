# Tmavý redesign martinaku.cz

Datum: 2026-08-13
Stav: nasazeno

## Cíl

Překlopit web do tmavého vzhledu se svítivým zeleným akcentem, velkou centrovanou
typografií, pilulkovými tvary a velkorysými mezerami. Obsah a tón textů zůstávají
z předchozí fáze beze změny.

## Rozhodnutí a jejich důvody

**Celý web tmavý**, ne jen vybrané sekce. Riziko je vědomě přijaté: tmavý technický
vzhled sedí spíš na softwarové produkty než na malé firmy v Novém Jičíně, které
tvoří většinu klientely.

**Zesvětlení akcentu z `#3DBF9C` na `#45E588`** obrací rozhodnutí z předchozí fáze,
kdy se zelená ztlumovala. Není to rozpor: na bílém pozadí měla původní `#00CC98`
kontrast 2,1:1 a působila křiklavě, na `#011818` má `#45E588` kontrast 11:1. Světlá
zelená na tmavém pozadí se chová jinak než na světlém.

**Světlé pásy se nakonec zredukovaly na jeden**, a to pod pásem log klientů v hero
sekci. Sekce Proč já?, Reference, Ceny a FAQ byly zpočátku světlé, ale po sjednocení
barvy všech nadpisů na `#45E588` klesl jejich kontrast na 1,5:1, hluboko pod
minimum 3:1 pro velký text. Ztmavení sekcí bylo zvoleno před změnou barvy nadpisů.

**Nepoužívá se stack avatarů klientů.** Fotky klientů neexistují a nebudou se
vymýšlet. Hero místo toho ukazuje pás log klientů na světlém pruhu.

## Paleta

| Token | Hodnota | Použití |
|---|---|---|
| `--color-bg-primary` | `#011818` | pozadí stránky |
| `--color-bg-secondary` | `#0A1E1E` | střídavý pás sekcí |
| `--color-surface` | `#0F2222` | karty |
| `--color-text-primary` | `#FFFFFF` | nadpisy |
| `--color-text-secondary` | `rgba(255,255,255,.72)` | běžný text |
| `--color-border` | `rgba(255,255,255,.10)` | rámečky |
| `--color-border-strong` | `rgba(255,255,255,.18)` | zvýrazněné rámečky |
| `--color-accent` | `#45E588` | akcent, nadpisy, plochy tlačítek |
| `--color-accent-hover` | `#2FCB70` | hover |
| `--color-accent-text` | `#45E588` | akcent jako text |

Kontrasty: bílá na pozadí 18,2:1, akcent na pozadí 11,1:1, `#011818` na akcentu
11,1:1. Všechny přes AA i AAA pro běžný text.

Třída `.section-light` přepisuje tyto proměnné lokálně pro světlé pásy, takže se
obsah přebarví sám a nemusí se sahat do tříd v HTML. V ní má akcent jako text
tmavší variantu `#0C6B47`, protože svítivá zelená má na bílé kontrast 1,6:1.

## Struktura homepage

1. Hero: velký centrovaný nadpis, pozdrav s mávající rukou, pilulková CTA,
   pod tím pás log klientů na světlém pruhu
2. Psali o mně
3. Proč já?: ověřená čísla a štítky služeb s ikonami
4. Jak to probíhá
5. Reference: textové reference a vybrané projekty v jedné sekci
6. Ceny
7. FAQ
8. O mně: text, fotka, odkaz na LinkedIn, podpis
9. Kontakt

## Rozsah

Všech pět stránek: `index.html`, `projects.html`, `akcenj.html`, `domeny.html`,
`gdpr.html`. Částečná konverze není možná, proklik na case study by skočil na
bílou stránku.

## Známá úskalí

- Barvy jsou v HTML zapsané natvrdo v Tailwind třídách (`bg-white`,
  `text-[#022c22]`, `bg-[#00020a]`), ne všechny jdou přes proměnné.
- Mobilní menu mělo barvu pozadí zapsanou na třech místech současně, včetně
  inline `style` s `!important`. Přes proměnné se nedala změnit.
- Loga klientů jsou tmavá na průhledném pozadí. Na tmavém se invertují, na
  světlém pásu se invert ruší pravidlem `.section-light .invert`.
- `design.css` se generuje ručně přes `npx @tailwindcss/cli`, ne přes
  `npm run build`. Po každé změně tříd je nutná regenerace, jinak se nové třídy
  neprojeví.

## Ověření

- `npm run build` prochází
- HTML parser hlásí nula nespárovaných tagů na všech stránkách
- Žádná stránka na 375 px vodorovně nepřetéká
- Konzole prohlížeče bez chyb
- Všechny interní odkazy a kotvy vedou někam
- Kontrastní poměry změřené skriptem přes canvas, ne odhadnuté
