// Typewriter Effect
const typewriterSpan = document.getElementById('typewriter');
const roles = ["MCA Graduate", "Aspiring Full Stack Developer", "Java Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        // Erase character
        typewriterSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type character
        typewriterSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at completion
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next role
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// Start Typewriter
if (typewriterSpan) {
    typeEffect();
}

// Smooth scroll for nav links & Active Link Highlighting
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Download Resume button
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = 'resume/resume.pdf'; // place your resume PDF inside the "resume" folder with this name
        link.download = 'Bindu_K_R_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Check for saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeIcon) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Save choice
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        if (themeIcon) {
            if (isDark) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });
}

// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const subject = document.getElementById('formSubject').value.trim();
        const message = document.getElementById('formMessage').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFeedback('Please fill out all fields.', 'error');
            return;
        }
        
        // Simple client email check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }
        
        // Mock successful email sending
        showFeedback('Sending message...', 'success');
        
        setTimeout(() => {
            showFeedback('Message sent successfully! Thank you for writing.', 'success');
            contactForm.reset();
        }, 1500);
    });
}

function showFeedback(text, type) {
    if (formFeedback) {
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`;
    }
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100; // trigger point

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Run once on load
revealOnScroll();