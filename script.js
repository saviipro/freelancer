const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

function closeMenu() {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    menuToggle.classList.remove('active');
    body.classList.remove('overflow-hidden');
}

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('translate-x-0');

        if (isOpen) {
            closeMenu();
        } else {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            menuToggle.classList.add('active');
            body.classList.add('overflow-hidden');
        }
    });

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Holé "#" (logo v hlavičce) není platný selektor, znamená návrat nahoru.
        if (href === '#') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        // Adjust offset for fixed header
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Marquee Resume Logic
// On touch devices, 'hover' can stick. We ensure that tapping interaction doesn't permanently pause it.
const marquee = document.querySelector('.marquee-content');
if (marquee) {
    // If user clicks/touches, we want to ensure it's not paused stuck.
    // CSS hover handles the pause.
    // We can force a resume if needed by momentarily removing class or handling events,
    // but actually, default CSS :hover varies.
    // Let's add a listener to 'touchstart' to unpause if it was stuck? 
    // Actually, simple trick: remove 'hover' state logic via JS if clicked? 
    // No, easiest is just to listen for click and 'reset'.

    marquee.addEventListener('click', () => {
        // Just a dummy action, effectively interaction usually resets hover state on some mobile browsers
        // or we can strictly control animation state.

        // Force unpause by toggling a class if we really wanted manual control, 
        // but user asked "If I click... it starts running again". 
        // This usually implies standard behavior, but let's be safe.
        marquee.style.animationPlayState = 'running';
        setTimeout(() => {
            marquee.style.animationPlayState = ''; // Revert to CSS control
        }, 100);
    });
}

// Czech Typography Fixer (Prevent orphans)
function fixCzechTypography() {
    const prepositions = ['k', 's', 'v', 'z', 'o', 'u', 'i', 'a'];
    const regex = new RegExp(`\\b(${prepositions.join('|')})\\s+`, 'gmi');

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                // Skip script and style tags
                if (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    let node;
    const nodesToReplace = [];

    while (node = walker.nextNode()) {
        if (regex.test(node.nodeValue)) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(node => {
        const newValue = node.nodeValue.replace(regex, '$1\u00A0'); // Replace space with &nbsp;
        if (node.nodeValue !== newValue) {
            node.nodeValue = newValue;
        }
    });
}

// Nasvícení skupin karet, když se dostanou do pohledu.
// Třída .reveal se přidává až tady, aby byl obsah vidět i bez JS.
function revealOnScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    // Mřížky, které by jinak naskočily naráz.
    const groups = [
        '#reference .grid > figure',
        '#reference .grid > a',
    ];
    const items = groups.flatMap(sel => [...document.querySelectorAll(sel)]);
    if (!items.length) return;

    items.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries, obs) => {
        let step = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Karty ve stejném řádku nasvítit po sobě, ne všechny současně.
                setTimeout(() => entry.target.classList.add('is-visible'), step++ * 50);
                obs.unobserve(entry.target);
            } else if (entry.boundingClientRect.bottom < 0) {
                // Prvek už je nad výřezem, uživatel k němu přišel odkazem na kotvu
                // nebo obnovením stránky. Zobrazit hned, bez animace, ať nezmizí obsah.
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    items.forEach(el => observer.observe(el));
}

// Zpět nahoru. Stránka je na mobilu hodně dlouhá, tohle zkracuje cestu k patičce.
function backToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const show = () => {
        const past = window.scrollY > window.innerHeight * 1.5;
        btn.classList.toggle('opacity-0', !past);
        btn.classList.toggle('invisible', !past);
    };

    btn.addEventListener('click', () => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    window.addEventListener('scroll', show, { passive: true });
    show();
}

document.addEventListener('DOMContentLoaded', () => {
    fixCzechTypography();
    revealOnScroll();
    backToTop();
});
