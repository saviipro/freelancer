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
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if (target) {
                // Adjust offset for fixed header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
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

document.addEventListener('DOMContentLoaded', () => {
    fixCzechTypography();
});

console.log("Martin Akulšin - Portfolio Loaded");
