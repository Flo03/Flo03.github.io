gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Typing animation
    const phrases = [
        "Ambitious Overachiever (Coffee-Dependent)",
        "Computer Science Enthusiast",
        "Data Science Explorer",
        "Machine Learning Practitioner"

    ];

    let currentPhrase = 0;
    const typingText = document.querySelector(".typing-text");

    function typeWriter(text, i = 0) {
        if (!typingText) return;
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (!typingText) return;
        if (typingText.textContent.length > 0) {
            typingText.textContent = typingText.textContent.slice(0, -1);
            setTimeout(eraseText, 50);
        } else {
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(() => typeWriter(phrases[currentPhrase]), 500);
        }
    }

    if (typingText) {
        typeWriter(phrases[0]);
    }

    // Navbar scroll effect
    const nav = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if the link is a hash link (#section)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Section animations
    gsap.utils.toArray('.card').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
});
