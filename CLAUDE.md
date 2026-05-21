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
| `npm run dev` | lokální dev server (Vite) |
| `npm run build` | produkční build do `dist/` |
| `npm run preview` | náhled buildu |

## Struktura

- `index.html`, `projects.html`, `gdpr.html` — stránky (každá je Vite vstup, viz `vite.config.js`)
- `style.css`, `design.css` — styly; `src/input.css` — Tailwind zdroj
- `script.js` — vanilla JS (mobilní menu, smooth scroll, interakce)
- `projects/` — náhledové obrázky referencí (`.webp`)
- `public/` — statická aktiva

## Build specifikum

`vite.config.js` má vlastní plugin `html-transform`, který v HTML nahrazuje
`%VAR%` placeholdery hodnotami z env proměnných při buildu.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) → **GitHub Pages**.
Push do `main` → build → deploy `dist/` přes `JamesIves/github-pages-deploy-action`.

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
