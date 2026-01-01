async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of elements) {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
                // Initialize nav logic ONLY if header was loaded
                if (file.includes('header')) initNav(); 
            }
        } catch (err) {
            console.error("Error loading component:", err);
        }
    }
}

function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const closeBtn = document.querySelector('.nav-close');
  const body = document.body;
  const links = document.querySelectorAll('.nav-main');

  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    nav.classList.add('open');
    body.classList.add('lock-scroll');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      nav.classList.remove('open');
      body.classList.remove('lock-scroll');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      body.classList.remove('lock-scroll');
    });
  });
}


document.addEventListener('DOMContentLoaded', includeHTML);
window.addEventListener("load", () => document.body.classList.add("loaded"));
