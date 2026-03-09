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
  floatingButton.href = 'https://wa.me/1234567890';
  floatingButton.target = '_blank';
  floatingButton.rel = 'noopener';
  floatingButton.className = 'floating-whatsapp';
  floatingButton.setAttribute('aria-label', 'Chat on WhatsApp');
  floatingButton.setAttribute('title', 'Chat on WhatsApp');
  floatingButton.textContent = '🟢';

  document.body.appendChild(floatingButton);
};

injectFooterSocialIcons();
injectFloatingWhatsAppButton();
