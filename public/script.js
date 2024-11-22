document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for tagline
    const tagline = "Navigating the DevOps Galaxy, One Deployment at a Time";
    const taglineElement = document.getElementById('tagline');
    let i = 0;
    function typeWriter() {
        if (!taglineElement) {
            console.error("Tagline element not found");
            return;
        }
        if (i < tagline.length) {
            taglineElement.innerHTML += tagline.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll to top button
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 100) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    }));
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-progress');
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            requestAnimationFrame(() => {
                bar.style.width = `${progress}%`;
            });
        });
    }
    animateSkillBars();

    // Project card expansion
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.project-card');
            card.classList.toggle('expanded');
            this.textContent = card.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(result => {
            console.log(result);
            alert("Thank you for your message! I will get back to you soon");
            contactForm.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was an error sending your message. Please try again later.");
        })
    });

    // Cosmic dust animation
    function createCosmicDust() {
        const dustContainer = document.querySelector('.cosmic-dust');
        for (let i = 0; i < 50; i++) {
            const dust = document.createElement('div');
            dust.className = 'dust-particle';
            dust.style.left = `${Math.random() * 100}%`;
            dust.style.top = `${Math.random() * 100}%`;
            dust.style.width = `${Math.random() * 2 + 1}px`;
            dust.style.height = dust.style.width;
            dust.style.animationDelay = `${Math.random() * 15}s`;
            dustContainer.appendChild(dust);
        }
    }
    createCosmicDust();

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    });
    revealElements.forEach(element => revealObserver.observe(element));

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    });
});