// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-list a');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
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

console.log("Martin Akulšin - Portfolio Loaded");
