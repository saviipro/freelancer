# Freelance Portfolio - Martin Akulšin

Profesionální, plně responzivní landing page pro freelancera a Shoptet partnera. Web je postaven na moderních technologiích s důrazem na čistý design, rychlost a snadnou editovatelnost.

## 🛠 Použité technologie

-   **HTML5**: Sémantická struktura a přístupnost.
-   **Tailwind CSS (v4)**: Moderní utility-first CSS framework (v kompilované formě).
-   **JavaScript (Vanilla)**: Pro mobilní menu, smooth scroll a drobné interakce.
-   **Google Fonts**: Font family `Outfit`.

## 🚀 Jak začít (Instalace a Spuštění)

Tento projekt využívá `npm` pro správu závislostí a kompilaci CSS.

### 1. Prvotní nastavení
Ujistěte se, že máte nainstalovaný [Node.js](https://nodejs.org/). Poté v kořenové složce projektu spusťte:

```bash
npm install
```

### 2. Spuštění lokálního vývoje
Projekt používá Tailwind CSS CLI, které sleduje změny v `src/input.css` a `index.html` a automaticky generuje výsledný `design.css`.

Pro spuštění build procesu (generování CSS):
```bash
npm run build
```
*(Poznámka: Ve verzi Tailwind v4 je build extrémně rychlý. Pro vývoj stačí tento příkaz spouštět po změnách v CSS, nebo si nastavit `watch` skript, pokud plánujete časté změny stylů).*

### 3. Zobrazení webu
Otevřete soubor `index.html` přímo v prohlížeči. Není potřeba lokální server (pokud nepotřebujete testovat specifické chování vyžadující HTTP protokol).

## 📂 Struktura projektu

-   **`index.html`**: Hlavní soubor webu. Zde upravujete veškerý obsah a HTML strukturu.
-   **`src/input.css`**: Vstupní CSS soubor pro vaše vlastní styly a Tailwind direktivy.
-   **`design.css`**: **NEDITOVAT**. Toto je vygenerovaný soubor, který vznikne příkazem `npm run build`.
-   **`script.js`**: JavaScript pro logiku menu a scrollování.
-   **`logos/`**: Složka s logy partnerů (pro sekci Reference).
-   **`martin.jpg`, `logo.png`...**: Obrázky a grafika webu.

## 🎨 Jak upravovat web

### Změna barev a fontů
Hlavní barvy jsou definovány jako CSS proměnné (CSS Variables) přímo v Tailwind konfiguraci nebo v `src/input.css` (blok `@theme`).
-   `--color-accent`: Hlavní zelená barva (tlačítka, zvýraznění).
-   `--color-bg-dark`: Tmavé pozadí (sekce Kontakt, Domény).

### Úprava textů a obsahu
Většinu změn provedete přímo v `index.html`.
*   **Texty**: Najděte příslušný tag (např. `<h1>`, `<p>`) a přepište text.
*   **Obrázky**: Nahrajte nový obrázek do složky a změňte `src="..."` v `index.html`.

### Reference (Marquee efekt)
Sekce Reference používá efekt nekonečného posouvání.
*   Loga se nachází v `div`u s třídou `animate-scroll`.
*   **Důležité**: Aby smyčka fungovala plynule bez mezer, je potřeba mít v kódu sadu log **zduplikovanou** (dvakrát za sebou).

## 📱 Mobilní zobrazení
Web je plně responzivní.
*   **Menu**: Na mobilu se klasické menu schová a objeví se "hamburger" tlačítko.
*   **Styling**: Používají se Tailwind prefixy `md:` (pro desktop) a výchozí třídy (pro mobil). Např. `text-4xl md:text-6xl` znamená "na mobilu 4xl, na desktopu 6xl".

## 🌍 Nasazení (Deployment)

Web je připraven pro okamžité nasazení na **GitHub Pages**.

1.  Nahrajte kód na GitHub.
2.  V nastavení repozitáře (Settings -> Pages) vyberte jako zdroj (Source) větev `main` (nebo `master`).
3.  GitHub automaticky nasadí web na adrese `vas-uzivatel.github.io/nazev-repozitare`.
4.  Pokud máte vlastní doménu, zadejte ji v sekci "Custom domain".

---
&copy; 2026 Martin Akulšin
