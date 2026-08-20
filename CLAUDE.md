# CLAUDE.md — freelancer

Doplňuje globální `~/DevProjects/CLAUDE.md`. Kde se liší stack, platí toto.

## Co to je

Portfolio / landing page freelancera a Shoptet partnera (Martin Akulšin).
Statický vícestránkový web v češtině, bez frameworku.

## Stack

- **Vanilla HTML/CSS/JS** — žádný framework, čisté HTML stránky
- **Vite 7** — build a dev server, multi-page (`index.html`, `projects.html`, `gdpr.html`)
- **Tailwind CSS v4** — přes `@tailwindcss/cli`, zdroj `src/input.css`
- **zod** — validace
- **Hosting:** GitHub Pages

## Příkazy

| Příkaz | Účel |
|---|---|
| `npm run dev` | Tailwind + lokální dev server (Vite) |
| `npm run build` | Tailwind + produkční build do `dist/` |
| `npm run build:css` | jen vygenerovat `design.css` z `src/input.css` |
| `npm run watch:css` | Tailwind ve watch režimu (pusť vedle `npm run dev`) |
| `npm run preview` | náhled buildu |

## Struktura

- `index.html`, `projects.html`, `akcenj.html`, `domeny.html`, `gdpr.html` — stránky
  (každá je Vite vstup, viz `vite.config.js`)
- `style.css`, `design.css` — styly; `src/input.css` — Tailwind zdroj
- `script.js` — vanilla JS (mobilní menu, smooth scroll, „zpět nahoru", interakce).
  Načítají ho všechny stránky; každá funkce si hlídá vlastní prvky, takže je bezpečný
  i na stránce bez navigace.
- `projects/` — náhledové obrázky referencí (`.webp`)
- `public/` — statická aktiva

## Tailwind

`design.css` je **generovaný soubor — needituj ho ručně.** Vzniká z `src/input.css`
a Tailwind CLI je součástí `npm run dev` i `npm run build`, takže se generuje sám.
Při psaní stylů si vedle dev serveru pusť `npm run watch:css`.

## Build specifikum

`vite.config.js` má vlastní plugin `html-transform`, který v HTML nahrazuje
`%VAR%` placeholdery hodnotami z env proměnných při buildu.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) → **GitHub Pages**.
Push do `main` → build → deploy `dist/` přes `JamesIves/github-pages-deploy-action`.
Na pull requestech běží jen build (ověření), nedeployuje se.

Doména `martinaku.cz` je registrovaná u WEDOSu, kde běží i DNS.
E-mail hostuje **Seznam Email Profi** (MX `*.emailprofi.seznam.cz`) — při jakémkoli
zásahu do DNS musí MX, SPF a DMARC zůstat nedotčené, jinak přestane chodit pošta.

### Připraveno pro Cloudflare Pages (zatím nečinné)

`public/_headers` a `public/_redirects` jsou konfigurace pro Cloudflare Pages.
GitHub Pages je ignoruje, takže dokud web běží tam, nemají žádný efekt.
`.nvmrc` (Node 24) drží verzi Node konzistentní s polem `engines`.

## Env proměnné

Předávají se do HTML přes `%VAR%` placeholdery při buildu:

- `VITE_GTM_ID` — Google Tag Manager ID
- `VITE_GTM_CONTAINER_ID` — GTM container ID
- `VITE_COOKIEYES_ID` — CookieYes consent ID

V CI jako GitHub Secrets, lokálně v `.env`.

## Konvence

- Web je v češtině — copy i UI texty česky.
- Žádný framework — drž se čistého HTML/CSS/JS, nepřidávej React apod.
- Nové stránky = nový `.html` + zaregistrovat jako vstup ve `vite.config.js`.
