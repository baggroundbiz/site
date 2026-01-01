async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of elements) {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.innerHTML = await response.text();
                
                // Initialize Header Logic
                if (file.includes('header')) initNav(); 
                
                // Initialize Footer Logic (New)
                if (file.includes('footer')) initFooter();
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

// New Function to handle the Email Link
function initFooter() {
  var emailLink = document.getElementById('email-link');
  if (!emailLink) return;

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isMobile) {
    // Force Gmail on Desktop
    emailLink.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=bagground.biz@gmail.com';
    emailLink.target = '_blank';
  }
}

document.addEventListener('DOMContentLoaded', includeHTML);
window.addEventListener("load", () => document.body.classList.add("loaded"));
