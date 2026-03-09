const themeToggleButton = document.querySelector('.theme-toggle');
const rootElement = document.documentElement;

if (themeToggleButton) {
  const preferredTheme = localStorage.getItem('theme');
  const initialTheme = preferredTheme === 'dark' || preferredTheme === 'light' ? preferredTheme : 'light';

  const applyTheme = (theme) => {
    rootElement.setAttribute('data-theme', theme);
    themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggleButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggleButton.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  applyTheme(initialTheme);

  themeToggleButton.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

const navToggleButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggleButton && navMenu) {
  navToggleButton.addEventListener('click', () => {
    const isExpanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!isExpanded));
    navToggleButton.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggleButton.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    const clickedOutsideMenu = !navMenu.contains(event.target) && !navToggleButton.contains(event.target);

    if (clickedOutsideMenu) {
      navMenu.classList.remove('open');
      navToggleButton.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    const targetElement = targetId ? document.querySelector(targetId) : null;

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    const phonePattern = /^[0-9+\-\s()]{7,}$/;

    if (!name.value.trim() || !phone.value.trim() || !message.value.trim()) {
      formFeedback.textContent = 'Please fill in all fields before submitting.';
      formFeedback.className = 'form-feedback error';
      return;
    }

    if (!phonePattern.test(phone.value.trim())) {
      formFeedback.textContent = 'Please enter a valid phone number.';
      formFeedback.className = 'form-feedback error';
      return;
    }

    formFeedback.textContent = 'Thanks! Your enquiry has been recorded.';
    formFeedback.className = 'form-feedback success';
    contactForm.reset();
  });
}

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 60, 260)}ms`;
    observer.observe(element);
  });
}

const injectFooterSocialIcons = () => {
  const footerBrandBlock = document.querySelector('.footer-grid > div:first-child');

  if (!footerBrandBlock || footerBrandBlock.querySelector('.footer-social')) {
    return;
  }

  const socialWrap = document.createElement('div');
  socialWrap.className = 'footer-social';
  socialWrap.innerHTML = `
    <a href="#" aria-label="Facebook" title="Facebook">f</a>
    <a href="#" aria-label="Instagram" title="Instagram">◎</a>
    <a href="#" aria-label="LinkedIn" title="LinkedIn">in</a>
  `;

  footerBrandBlock.appendChild(socialWrap);
};

const injectFloatingWhatsAppButton = () => {
  if (document.querySelector('.floating-whatsapp')) {
    return;
  }

  const floatingButton = document.createElement('a');
  floatingButton.href = 'https://wa.me/919876543210';
  floatingButton.target = '_blank';
  floatingButton.rel = 'noopener';
  floatingButton.className = 'floating-whatsapp whatsapp-float';
  floatingButton.setAttribute('aria-label', 'Chat on WhatsApp');
  floatingButton.setAttribute('title', 'Chat on WhatsApp');
  floatingButton.innerHTML = `
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M19.11 17.31c-.26-.13-1.5-.74-1.73-.83-.23-.09-.4-.13-.57.13-.17.26-.66.83-.8 1-.15.17-.29.2-.55.07-.26-.13-1.09-.4-2.07-1.28-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.29.39-.44.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.46.07-.7.33-.24.26-.92.9-.92 2.18s.94 2.52 1.07 2.7c.13.17 1.84 2.81 4.46 3.94.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.5-.07 1.5-.61 1.71-1.21.21-.6.21-1.11.15-1.21-.06-.1-.23-.16-.49-.29z"/>
      <path d="M16.04 3.2c-7.06 0-12.78 5.72-12.78 12.78 0 2.25.59 4.46 1.71 6.41L3 29.8l7.61-1.99c1.87 1.02 3.98 1.56 6.13 1.56h.01c7.06 0 12.79-5.72 12.79-12.78 0-3.42-1.33-6.63-3.75-9.05A12.69 12.69 0 0 0 16.04 3.2zm0 23.89h-.01c-1.91 0-3.77-.52-5.39-1.51l-.39-.23-4.51 1.18 1.2-4.4-.25-.4a10.47 10.47 0 0 1-1.62-5.58c0-5.79 4.71-10.5 10.5-10.5 2.8 0 5.43 1.09 7.41 3.08a10.41 10.41 0 0 1 3.08 7.42c0 5.79-4.71 10.5-10.5 10.5z"/>
    </svg>
  `;

  document.body.appendChild(floatingButton);

  const footer = document.querySelector('.site-footer');

  if (!footer) {
    return;
  }

  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      floatingButton.classList.toggle('is-above-footer', entry.isIntersecting);
    });
  }, { threshold: 0.05 });

  footerObserver.observe(footer);
};

injectFooterSocialIcons();
injectFloatingWhatsAppButton();
