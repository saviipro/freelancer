# Freelance Web - Martin Akulšin

Profesionální landing page pro freelancera a Shoptet partnera.

## Jak spustit web
Jednoduše otevřete soubor `index.html` ve svém webovém prohlížeči (Chrome, Safari, Firefox).

## Struktura souborů
- **index.html**: Hlavní obsah stránky (texty, struktura sekcí).
- **style.css**: Styly, barvy, animace a responzivní design.
- **script.js**: Skripty pro plynulé scrollování a interakce.
- **logo.png**: Hlavní logo v hlavičce.
- **favicon.png**: Ikonka v záložce prohlížeče.
- **logos/**: Složka obsahující loga partnerů pro sekci Reference.

## Nové funkce a úpravy
- **Sekce Reference**: Nekonečný pás logujících firem (marquee efekt). Loga se nacházejí ve složce `logos/`.
- **Design**: Použita barva `#00CC98`, tučnější nadpisy a výraznější ohraničení sekcí.
- **Assets**: Přidáno vlastní logo a favicona.

## Jak upravovat
1. **Texty**: Otevřete `index.html` v textovém editoru a upravte texty uvnitř tagů (např. `<h1>`, `<p>`).
2. **Loga partnerů**:
   - Nahrajte nové obrázky do složky `logos/`.
   - V `index.html` v sekci `marquee-content` přidejte nebo upravte řádky `<img src="logos/vase-logo.png" alt="...">`.
   - **Pozor**: Pro plynulou smyčku je potřeba sadu log v kódu zduplikovat (vložit dvakrát za sebou).
