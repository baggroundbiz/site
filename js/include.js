async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of elements) {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
                if (file.includes('header')) initNav(); // Start menu logic after loading
            }
        } catch (err) {
            console.error("Error loading component:", err);
        }
    }
}

function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            body.classList.toggle('lock-scroll');
        });
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);
window.addEventListener("load", () => document.body.classList.add("loaded"));

function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-links a'); // Select all links inside the menu

    if (toggle && nav) {
        // Toggle menu on hamburger click
        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            body.classList.toggle('lock-scroll');
        });

        // NEW: Close menu when any link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                body.classList.remove('lock-scroll');
            });
        });
    }
}
