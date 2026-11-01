/**
 * DBAH QUAD DIGITAL LABS — INTERACTIVE CONTROLLER
 * High-Performance Vanilla JavaScript
 * "Four Minds. One Vision. Infinite Innovation."
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Cinematic DBAH Logo Intro (7–8s Master Brand Reveal)
  initCinematicIntro();

  // 1. Notice / Disclaimer Rotator
  initNavDisclaimerRotator();

  // 2. Ambient Canvas Particles
  initParticlesCanvas();

  // 3. Navigation & Mobile Drawer
  initNavigation();

  // 4. Scroll Reveal Animations (IntersectionObserver)
  initScrollReveal();

  // 5. Portfolio Filtering & Project Details Modal
  initPortfolio();

  // 6. Pricing Package Auto-Fill
  initPricing();

  // 7. FAQ Accordion
  initFaqAccordion();

  // 8. Contact & Enquiry Form Validation & Dispatch
  initContactForm();

  // 9. Compact Floating Contact FAB & Back-to-Top
  initFloatingContactWidget();

  // 10. Dark / Light Theme Mode
  initThemeToggle();

  // 11. Hero Background Video
  initHeroVideo();

  // 12. Hero Cinematic Logo Animation (Directly inside Homepage Hero)
  initHeroCinematicLogo();

  // 13. Dynamic Copyright Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   1. NOTICE & DISCLAIMER ROTATOR
   ========================================================================== */
function initNavDisclaimerRotator() {
  const rotator = document.getElementById('nav-ticker-rotator');
  if (!rotator) return;

  const items = rotator.querySelectorAll('.nav-ticker-item');
  const dots = document.querySelectorAll('.nav-ticker-dot');
  if (items.length <= 1) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  let rotateInterval = null;

  function showDisclaimer(index) {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-hidden', 'true');
      }
    });

    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    currentIndex = index;
  }

  function nextDisclaimer() {
    const next = (currentIndex + 1) % items.length;
    showDisclaimer(next);
  }

  if (!prefersReducedMotion) {
    function start() {
      if (rotateInterval) clearInterval(rotateInterval);
      rotateInterval = setInterval(nextDisclaimer, 4000);
    }

    function stop() {
      if (rotateInterval) clearInterval(rotateInterval);
    }

    start();

    const tickerContainer = rotator.closest('.nav-disclaimer-ticker');
    if (tickerContainer) {
      tickerContainer.addEventListener('mouseenter', stop);
      tickerContainer.addEventListener('mouseleave', start);
      tickerContainer.addEventListener('focusin', stop);
      tickerContainer.addEventListener('focusout', start);
    }
  }

  if (dots.length) {
    dots.forEach((dot, idx) => {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        showDisclaimer(idx);
      });
    });
  }
}

/* ==========================================================================
   2. AMBIENT GOLD PARTICLES CANVAS
   Optimized: Low CPU, paused when scrolled past hero or hidden tab
   ========================================================================== */
function initParticlesCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let isRunning = true;
  let animationId = null;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // Pause when tab is inactive or user scrolled past hero to conserve energy
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 1.5) {
      if (isRunning) stop();
    } else {
      if (!isRunning && !document.hidden) start();
    }
  }, { passive: true });

  const particleCount = window.innerWidth < 768 ? 12 : 24;
  const particles = [];

  const goldColors = [
    'rgba(223, 196, 131, 0.45)',
    'rgba(197, 160, 89, 0.35)',
    'rgba(255, 255, 255, 0.25)'
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.6,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2 - 0.04
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    if (isRunning) {
      animationId = requestAnimationFrame(render);
    }
  }

  function start() {
    if (!isRunning) {
      isRunning = true;
      animationId = requestAnimationFrame(render);
    }
  }

  function stop() {
    isRunning = false;
    if (animationId) cancelAnimationFrame(animationId);
  }

  animationId = requestAnimationFrame(render);
}

/* ==========================================================================
   3. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = document.getElementById('mobile-nav-close-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow & Active nav link tracking
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  function toggleMobileMenu() {
    if (!mobileNav) return;
    const isOpen = mobileNav.classList.toggle('open');
    if (menuToggle) {
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close Mobile Menu' : 'Open Mobile Menu');
    }
    if (mobileBackdrop) {
      mobileBackdrop.classList.toggle('open', isOpen);
    }
    document.body.classList.toggle('modal-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (!mobileNav || !mobileNav.classList.contains('open')) return;
    if (menuToggle) {
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open Mobile Menu');
    }
    mobileNav.classList.remove('open');
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('open');
    }
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close when ANY link inside drawer is clicked
  if (mobileNav) {
    const allDrawerLinks = mobileNav.querySelectorAll('a');
    allDrawerLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Dismiss on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Auto-close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('open')) {
      closeMobileMenu();
    }
  }, { passive: true });
}

/* ==========================================================================
   4. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   5. PORTFOLIO FILTERING & MODAL CONTROLLER
   ========================================================================== */
const projectData = {
  'sri-sai-blossom': {
    title: 'Sri Sai Blossom Kids Kindergarten & School',
    category: 'Education & Institution',
    badge: 'Live Website Verified',
    desc: 'Official website for Sri Sai Blossom Kids kindergarten and educational institution. Features event showcases, admissions enquiries, curriculum gallery albums, and responsive mobile architecture.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid', 'Vercel CDN'],
    github: 'https://github.com/hdeepak06/sri-sai-blossom-kids',
    live: 'https://sri-sai-blossom-kids.vercel.app',
    image: 'assets/images/projects/sri-sai-blossom.png'
  },
  'maya-valley': {
    title: 'Maya Valley Resort Hampi',
    category: 'Hotel & Hospitality',
    badge: 'Live Website Verified',
    desc: 'A luxury resort and hospitality website in the world-heritage destination of Hampi, Karnataka. Showcases accommodation suites, on-site dining, regional tour booking, and direct reservation enquiries via WhatsApp.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Photo Gallery', 'Vercel CDN'],
    github: 'https://github.com/hdeepak06/maya-valley-resort-hampi',
    live: 'https://maya-valley-resort-hampi-sxdc.vercel.app',
    image: 'assets/images/projects/maya-valley-resort.webp'
  },
  'sri-manjunatha': {
    title: 'Sri Manjunatha Tours & Travels',
    category: 'Travel & Fleet Booking',
    badge: 'GitHub Verified',
    desc: 'Travel and vehicle fleet rental portal for Hampi & Hosapete region. Features comprehensive vehicle fleet showcase (buses, tempo travelers, sedans), tour package listings, and direct WhatsApp booking.',
    tech: ['React', 'Vite', 'TypeScript', 'WhatsApp API'],
    github: 'https://github.com/hdeepak06/sri-manjunatha-travels',
    live: null,
    image: 'assets/images/projects/sri-manjunatha-travels.png'
  },
  'anil-bike': {
    title: 'Anil Bike Rental Hampi',
    category: 'Vehicle Rental & Tourism',
    badge: 'Live Website Verified',
    desc: 'Online scooter and motorcycle rental booking platform serving tourists visiting Hampi. Includes transparent hourly/daily pricing, vehicle fleet showcase, safety guidelines, and quick booking integration.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'WhatsApp Booking Flow'],
    github: 'https://github.com/hdeepak06/anil-bike-rental-hampi',
    live: 'https://anil-bike-rental-hampi.vercel.app',
    image: 'assets/images/projects/anil-bike-rental.png'
  },
  'finalmealmate': {
    title: 'FinalMealmate Food Delivery & Surplus Donation',
    category: 'Full-Stack Web App',
    badge: 'Live Web App Verified',
    desc: 'A Django-based dual-purpose web platform combining commercial food delivery ordering with a dedicated surplus food donation module to prevent commercial food wastage across communities.',
    tech: ['Python', 'Django', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/hdeepak06/finalmealmate-food-delivery-app',
    live: 'https://finalmealmate-food-delivery-app.vercel.app',
    image: 'assets/images/projects/finalmealmate.jpg'
  },
  'medico': {
    title: 'Medico: Healthcare & Pharmacy Management',
    category: 'Healthcare Management',
    badge: 'Live Web App Verified',
    desc: 'Full-stack healthcare operations platform managing clinical appointments, patient medical histories, prescription tracking, inventory, and automated billing generation.',
    tech: ['Python', 'Django', 'MySQL', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/hdeepak06/medico',
    live: 'https://medico-six-sigma.vercel.app',
    image: 'assets/images/projects/medico-clinic.jpg'
  },
  'ballotbridge': {
    title: 'BallotBridge Secure E-Voting Platform',
    category: 'Digital Governance',
    badge: 'Live Web App Verified',
    desc: 'Secure digital electronic voting platform featuring cryptographic ballot hashing, multi-factor authentication, administrative election controls, and tamper-resistant real-time voter tallying.',
    tech: ['Python', 'Django', 'MySQL', 'Cryptographic Hashing', 'JavaScript'],
    github: 'https://github.com/hdeepak06/BALLOT-BRIDGE',
    live: 'https://ballot-bridge-lovat.vercel.app',
    image: 'assets/images/projects/ballotbridge.jpg'
  },
  'course-registration': {
    title: 'Academic Course Registration Portal',
    category: 'Academic Web App',
    badge: 'GitHub Verified',
    desc: 'Student course registration system with elective selection, prerequisite validation checks, instructor allocation, and student administrative dashboards.',
    tech: ['Python', 'Django', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/hdeepak06/course-registration',
    live: null,
    image: 'assets/images/projects/course-registration.jpg'
  }
};

function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('[data-project-key]');

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.desc;

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach((t) => {
      const pill = document.createElement('span');
      pill.className = 'tech-pill';
      pill.textContent = t;
      techContainer.appendChild(pill);
    });

    const actionsContainer = document.getElementById('modal-actions');
    actionsContainer.innerHTML = '';

    if (data.live) {
      const liveBtn = document.createElement('a');
      liveBtn.href = data.live;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'btn btn-gold btn-sm';
      liveBtn.innerHTML = `<span>Visit Live Website</span> <span class="btn-arrow">↗</span>`;
      actionsContainer.appendChild(liveBtn);
    }

    if (data.github) {
      const ghBtn = document.createElement('a');
      ghBtn.href = data.github;
      ghBtn.target = '_blank';
      ghBtn.rel = 'noopener noreferrer';
      ghBtn.className = 'btn btn-gold-outline btn-sm';
      ghBtn.innerHTML = `<span>View GitHub Repository</span> <span class="btn-arrow">↗</span>`;
      actionsContainer.appendChild(ghBtn);
    }

    modalOverlay.classList.add('open');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      openProjectModal(key);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. PRICING AUTO-FILL INTO CONTACT FORM
   ========================================================================== */
function initPricing() {
  const quoteBtns = document.querySelectorAll('[data-plan-name]');
  const serviceSelect = document.getElementById('enquiry-service');
  const detailsText = document.getElementById('enquiry-details');

  quoteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan-name');
      const budget = btn.getAttribute('data-plan-budget');

      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(plan.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      const budgetSelect = document.getElementById('enquiry-budget');
      if (budgetSelect && budget) {
        budgetSelect.value = budget;
      }

      if (detailsText) {
        detailsText.value = `Hello DBAH Quad Digital Labs team, I would like to request a quote for the ${plan} package. Looking forward to discussing specifications!`;
      }
    });
  });
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((other) => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & DISPATCH
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('project-enquiry-form');
  const dispatchModal = document.getElementById('dispatch-modal');
  const dispatchWhatsAppBtn = document.getElementById('dispatch-whatsapp');
  const dispatchEmailBtn = document.getElementById('dispatch-email');
  const dispatchCancelBtn = document.getElementById('dispatch-cancel');

  if (!form) return;

  let validatedPayload = null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById('enquiry-name');
    const businessInput = document.getElementById('enquiry-business');
    const emailInput = document.getElementById('enquiry-email');
    const phoneInput = document.getElementById('enquiry-phone');
    const serviceInput = document.getElementById('enquiry-service');
    const budgetInput = document.getElementById('enquiry-budget');
    const detailsInput = document.getElementById('enquiry-details');

    function checkField(input, condition, errorId) {
      const errEl = document.getElementById(errorId);
      if (!condition) {
        input.classList.add('error');
        if (errEl) errEl.classList.add('visible');
        isValid = false;
      } else {
        input.classList.remove('error');
        if (errEl) errEl.classList.remove('visible');
      }
    }

    checkField(nameInput, nameInput.value.trim().length >= 2, 'err-name');
    checkField(
      emailInput,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()),
      'err-email'
    );
    checkField(phoneInput, phoneInput.value.trim().length >= 8, 'err-phone');
    checkField(serviceInput, serviceInput.value !== '', 'err-service');
    checkField(detailsInput, detailsInput.value.trim().length >= 10, 'err-details');

    if (!isValid) return;

    validatedPayload = {
      name: nameInput ? nameInput.value.trim() : '',
      business: (businessInput && businessInput.value.trim()) ? businessInput.value.trim() : 'N/A',
      email: emailInput ? emailInput.value.trim() : '',
      phone: phoneInput ? phoneInput.value.trim() : '',
      service: (serviceInput && serviceInput.selectedIndex >= 0) ? serviceInput.options[serviceInput.selectedIndex].text : 'General Enquiry',
      budget: (budgetInput && budgetInput.selectedIndex >= 0) ? budgetInput.options[budgetInput.selectedIndex].text : 'Flexible',
      details: detailsInput ? detailsInput.value.trim() : ''
    };

    if (dispatchModal) {
      document.getElementById('confirm-name').textContent = validatedPayload.name;
      document.getElementById('confirm-service').textContent = validatedPayload.service;
      dispatchModal.classList.add('open');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
  });

  if (dispatchWhatsAppBtn) {
    dispatchWhatsAppBtn.addEventListener('click', () => {
      if (!validatedPayload) return;

      const text =
        `*DBAH QUAD DIGITAL LABS — NEW PROJECT ENQUIRY*\n` +
        `-----------------------------------------\n` +
        `👤 *Client Name:* ${validatedPayload.name}\n` +
        `🏢 *Business / Org:* ${validatedPayload.business}\n` +
        `📧 *Email:* ${validatedPayload.email}\n` +
        `📞 *Phone:* ${validatedPayload.phone}\n` +
        `🛠️ *Service Needed:* ${validatedPayload.service}\n` +
        `💰 *Estimated Budget:* ${validatedPayload.budget}\n` +
        `📝 *Project Overview:*\n${validatedPayload.details}\n` +
        `-----------------------------------------\n` +
        `_Sent via dbah.vercel.app portfolio_`;

      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/918088381775?text=${encodedText}`, '_blank');
      closeDispatchModal();
      form.reset();
    });
  }

  if (dispatchEmailBtn) {
    dispatchEmailBtn.addEventListener('click', () => {
      if (!validatedPayload) return;

      const subject = encodeURIComponent(
        `[Project Enquiry] ${validatedPayload.service} - ${validatedPayload.name}`
      );
      const body = encodeURIComponent(
        `Hello DBAH Quad Digital Labs Team,\n\n` +
        `Here are my project enquiry details:\n\n` +
        `Client Name: ${validatedPayload.name}\n` +
        `Business/Brand: ${validatedPayload.business}\n` +
        `Email: ${validatedPayload.email}\n` +
        `Phone: ${validatedPayload.phone}\n` +
        `Requested Service: ${validatedPayload.service}\n` +
        `Estimated Budget: ${validatedPayload.budget}\n\n` +
        `Project Details:\n${validatedPayload.details}\n\n` +
        `Regards,\n${validatedPayload.name}`
      );

      window.location.href = `mailto:hdeepak.ise.rymec@gmail.com?subject=${subject}&body=${body}`;
      closeDispatchModal();
      form.reset();
    });
  }

  function closeDispatchModal() {
    if (dispatchModal) {
      dispatchModal.classList.remove('open');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
  }

  if (dispatchCancelBtn) {
    dispatchCancelBtn.addEventListener('click', closeDispatchModal);
  }

  if (dispatchModal) {
    dispatchModal.addEventListener('click', (e) => {
      if (e.target === dispatchModal) closeDispatchModal();
    });
  }
}

/* ==========================================================================
   9. COMPACT FLOATING CONTACT FAB & CONTEXTUAL BACK-TO-TOP
   ========================================================================== */
function initFloatingContactWidget() {
  const widget = document.getElementById('floating-contact-widget');
  const launcherToggle = document.getElementById('contact-launcher-toggle');
  const backToTopBtn = document.getElementById('back-to-top');

  if (!widget || !launcherToggle) return;

  // Toggle Contact Menu
  launcherToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isExpanded = widget.classList.toggle('expanded');
    launcherToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (widget.classList.contains('expanded') && !widget.contains(e.target)) {
      widget.classList.remove('expanded');
      launcherToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('expanded')) {
      widget.classList.remove('expanded');
      launcherToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Back to Top button visibility (context-aware: only when scrolled > 350px)
  if (backToTopBtn) {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   10. DARK / LIGHT THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('#theme-toggle-btn, #mobile-theme-toggle-btn');
  if (!toggleBtns.length) return;

  const THEME_KEY = 'dbah_theme_mode';

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    toggleBtns.forEach((btn) => {
      const labelSpan = btn.querySelector('.theme-toggle-label');
      if (labelSpan) {
        if (btn.classList.contains('mobile-theme-btn')) {
          labelSpan.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        } else {
          labelSpan.textContent = isDark ? 'Light' : 'Dark';
        }
      }
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') {
    applyTheme(false);
  } else {
    applyTheme(true); // Default to Dark mode
  }

  function handleToggle() {
    const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextDark = !isCurrentlyDark;
    applyTheme(nextDark);
    localStorage.setItem(THEME_KEY, nextDark ? 'dark' : 'light');
  }

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', handleToggle);
  });
}

/* ==========================================================================
   11. CINEMATIC HERO VIDEO CONTROLLER
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-bg-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;

  function playVideo() {
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }

  playVideo();

  // Pause playback when hero is scrolled out of view to preserve resources
  if ('IntersectionObserver' in window) {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }
  }

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      playVideo();
    }
  });
}

/* ==========================================================================
   12. HERO CINEMATIC LOGO ANIMATION (HOMEPAGE ONLY)
   4-Stage Precision Timeline (0–4.0s):
   - Stage 1: Ambient Introduction (0–0.8s)
   - Stage 2: Golden Light Sweep (0.8–1.8s)
   - Stage 3: Precision Reveal (1.8–3.0s)
   - Stage 4: Tagline "BUILDING DIGITAL EXPERIENCES" Reveal (3.0–4.0s)
   Session persistence, prefers-reduced-motion support, non-blocking execution.
   ========================================================================== */
function initHeroCinematicLogo() {
  const showcase = document.getElementById('hero-logo-showcase');
  if (!showcase) return;

  const replayBtn = document.getElementById('hero-anim-replay');
  const footerReplayBtn = document.getElementById('footer-replay-intro-btn');
  const SESSION_KEY = 'dbah_hero_logo_revealed';

  let animTimeouts = [];

  function clearPendingTimeouts() {
    animTimeouts.forEach(t => clearTimeout(t));
    animTimeouts = [];
  }

  function playAnimation(force = false) {
    clearPendingTimeouts();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !force) {
      showcase.classList.remove('is-animating', 'stage-1', 'stage-2', 'stage-3', 'stage-4');
      showcase.classList.add('is-finished');
      return;
    }

    // Reset classes
    showcase.classList.remove('is-finished', 'stage-1', 'stage-2', 'stage-3', 'stage-4');
    showcase.classList.add('is-animating');

    // Stage 1: Ambient Introduction (0.0s – 0.8s)
    showcase.classList.add('stage-1');

    // Stage 2: Golden Light Sweep (0.8s – 1.8s)
    animTimeouts.push(setTimeout(() => {
      showcase.classList.add('stage-2');
    }, 800));

    // Stage 3: Precision Reveal (1.8s – 3.0s)
    animTimeouts.push(setTimeout(() => {
      showcase.classList.add('stage-3');
    }, 1800));

    // Stage 4: Final Presentation & Tagline (3.0s – 4.0s)
    animTimeouts.push(setTimeout(() => {
      showcase.classList.add('stage-4');
    }, 3000));

    // Settle into Finished State (4.0s+)
    animTimeouts.push(setTimeout(() => {
      showcase.classList.remove('is-animating', 'stage-1', 'stage-2', 'stage-3', 'stage-4');
      showcase.classList.add('is-finished');
      sessionStorage.setItem(SESSION_KEY, 'true');
    }, 4200));
  }

  const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === 'true';

  if (!alreadyPlayed) {
    playAnimation(false);
  } else {
    showcase.classList.add('is-finished');
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      playAnimation(true);
    });
  }

  if (footerReplayBtn) {
    footerReplayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const heroSection = document.getElementById('home');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        playAnimation(true);
      }, 400);
    });
  }
}

/* ==========================================================================
   14. CINEMATIC FOUNDERS FILM & 3D PUZZLE LOGO ASSEMBLY (7.8s)
   Scene 01: Darkness & Golden Lens Spark (0.0–1.0s)
   Scene 02: Four Friends Reveal: Deepak • Bharath • Adarsh • Hari (1.0–3.2s)
   Scene 03: Golden Puzzle Seams & 3D Piece Separation (3.2–4.5s)
   Scene 04: Magnetic Puzzle Convergence & Interlocking Snap (4.5–5.8s)
   Scene 05: Fusion, 3D Inflating Typography & Specular Sweep (5.8–6.6s)
   Scene 06: QUAD DIGITAL LABS Studio Reveal & Smooth Website Launch (6.6–7.8s)
   ========================================================================== */
function initCinematicIntro() {
  const introEl = document.getElementById('cinematic-intro');
  if (!introEl) return;

  const canvas = document.getElementById('intro-canvas');
  const skipBtn = document.getElementById('intro-skip-btn');
  const progressFill = document.getElementById('intro-progress-fill');
  const footerReplayBtn = document.getElementById('footer-replay-intro-btn');
  const heroReplayBtn = document.getElementById('hero-anim-replay');
  const audioEl = document.getElementById('intro-audio');
  const soundBtn = document.getElementById('intro-sound-btn');
  const SESSION_KEY = 'dbah_cinematic_intro_seen';

  let isMuted = false;

  function updateSoundUI() {
    if (!soundBtn) return;
    if (isMuted) {
      soundBtn.classList.add('is-muted');
      const text = soundBtn.querySelector('.sound-status-text');
      if (text) text.textContent = 'Muted';
    } else {
      soundBtn.classList.remove('is-muted');
      const text = soundBtn.querySelector('.sound-status-text');
      if (text) text.textContent = 'Sound';
    }
  }

  let audioFadeInterval = null;

  function rampAudioVolume(targetVol = 0.85, step = 0.05, intervalMs = 60) {
    if (!audioEl) return;
    if (audioFadeInterval) clearInterval(audioFadeInterval);
    let vol = audioEl.volume;
    audioFadeInterval = setInterval(() => {
      if (!audioEl) {
        clearInterval(audioFadeInterval);
        return;
      }
      if (vol < targetVol) {
        vol = Math.min(targetVol, vol + step);
        audioEl.volume = vol;
      } else {
        clearInterval(audioFadeInterval);
        audioFadeInterval = null;
      }
    }, intervalMs);
  }

  function startAudio() {
    if (!audioEl) return;
    if (audioFadeInterval) clearInterval(audioFadeInterval);
    
    // Default: unmuted by default when opening the link
    isMuted = false;
    audioEl.muted = false;
    audioEl.currentTime = 0;
    audioEl.volume = 0.05;
    updateSoundUI();

    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Direct unmuted playback succeeded! Ramp volume smoothly to 85%
        rampAudioVolume(0.85, 0.04, 70);
      }).catch((err) => {
        // Autoplay policy prevented unmuted start without prior user gesture.
        // Maintain unmuted state intent (isMuted = false) and unlock unmuted on first interaction:
        audioEl.muted = true;
        audioEl.play().catch(() => {});

        const unlockAudio = () => {
          if (audioEl && isRunning && !isMuted) {
            audioEl.muted = false;
            if (audioEl.paused) {
              audioEl.play().catch(() => {});
            }
            rampAudioVolume(0.85, 0.08, 40);
            updateSoundUI();
          }
        };

        window.addEventListener('pointerdown', unlockAudio, { once: true, capture: true, passive: true });
        window.addEventListener('touchstart', unlockAudio, { once: true, capture: true, passive: true });
        window.addEventListener('click', unlockAudio, { once: true, capture: true, passive: true });
        window.addEventListener('keydown', unlockAudio, { once: true, capture: true, passive: true });
      });
    }
  }

  function stopAudio(fade = true) {
    if (!audioEl) return;
    if (audioFadeInterval) clearInterval(audioFadeInterval);
    if (fade && !audioEl.paused && audioEl.volume > 0.05) {
      const step = 0.08;
      audioFadeInterval = setInterval(() => {
        if (audioEl.volume > step) {
          audioEl.volume -= step;
        } else {
          clearInterval(audioFadeInterval);
          audioFadeInterval = null;
          audioEl.pause();
          audioEl.currentTime = 0;
          audioEl.volume = 0.85;
        }
      }, 40);
    } else {
      audioEl.pause();
      audioEl.currentTime = 0;
      audioEl.volume = 0.85;
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isMuted = !isMuted;
      if (audioEl) {
        audioEl.muted = isMuted;
        if (!isMuted && isRunning) {
          if (audioEl.paused) {
            audioEl.play().catch(() => {});
          }
          rampAudioVolume(0.85, 0.08, 40);
        }
      }
      updateSoundUI();
    });
  }

  let ctx = null;
  let animFrameId = null;
  let startTime = null;
  let isRunning = false;
  let timeouts = [];
  let sparksTriggered = false;

  const TOTAL_DURATION = 16500; // 16.5s Majestic slow-motion cinematic founders & 3D puzzle arc (0.5x speed)

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem(SESSION_KEY) === 'true';

  if (canvas) {
    ctx = canvas.getContext('2d');
  }

  let width = 0;
  let height = 0;
  let stardust = [];
  let puzzleSparks = [];
  const STARDUST_COUNT = 50;

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }

  function initStardust() {
    stardust = [];
    for (let i = 0; i < STARDUST_COUNT; i++) {
      stardust.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        z: 0.3 + Math.random() * 1.4,
        radius: 0.8 + Math.random() * 1.8,
        color: Math.random() > 0.35 ? '#C6A45B' : '#FFF5D9',
        alpha: 0.15 + Math.random() * 0.75,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  function triggerPuzzleSparks(cx, cy) {
    puzzleSparks = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.0 + Math.random() * 6.5;
      puzzleSparks.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.2 + Math.random() * 2.4,
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.022,
        color: Math.random() > 0.3 ? '#C6A45B' : '#FFF5D9',
        gravity: 0.05
      });
    }
  }

  function drawCanvasScene(elapsed) {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // Ambient Stardust
    stardust.forEach((pt) => {
      pt.x += pt.speedX * pt.z;
      pt.y += pt.speedY * pt.z;
      pt.pulse += pt.pulseSpeed;

      if (pt.x < -20) pt.x = width + 20;
      if (pt.x > width + 20) pt.x = -20;
      if (pt.y < -20) pt.y = height + 20;
      if (pt.y > height + 20) pt.y = -20;

      const alphaPulse = pt.alpha * (0.65 + 0.35 * Math.sin(pt.pulse));
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, alphaPulse));
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius * pt.z, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Scene 01: Darkness & Golden Flare (0 - 2200ms)
    if (elapsed < 2200) {
      const p = elapsed / 2200;
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160 * p);
      glowGrad.addColorStop(0, 'rgba(255, 245, 217, ' + (0.9 * p) + ')');
      glowGrad.addColorStop(0.3, 'rgba(198, 164, 91, ' + (0.6 * p) + ')');
      glowGrad.addColorStop(1, 'rgba(198, 164, 91, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 160 * p, 0, Math.PI * 2);
      ctx.fill();
    }
    // Scene 03: Puzzle Separation Sparks (6800 - 9600ms)
    else if (elapsed >= 6800 && elapsed < 9600) {
      puzzleSparks.forEach((sp) => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += sp.gravity * 0.7; // slower gravity drift
        sp.vx *= 0.99;
        sp.vy *= 0.99;
        sp.alpha -= sp.decay * 0.55; // slower spark decay

        if (sp.alpha > 0) {
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.alpha);
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
    }
    // Scene 04: Interlocking Magnetic Snap Flash (9600 - 12400ms)
    else if (elapsed >= 9600 && elapsed < 12400) {
      const snapElapsed = elapsed - 9600;
      if (snapElapsed < 600) {
        const flashAlpha = Math.max(0, 0.45 * (1 - snapElapsed / 600));
        ctx.fillStyle = 'rgba(255, 245, 217, ' + flashAlpha + ')';
        ctx.fillRect(0, 0, width, height);
      }
      // Central ambient gold glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260);
      glowGrad.addColorStop(0, 'rgba(198, 164, 91, 0.45)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 260, 0, Math.PI * 2);
      ctx.fill();
    }
    // Scene 05 & 06: Settling ambient halo (12400ms+)
    else if (elapsed >= 12400) {
      const p = (elapsed - 12400) / (TOTAL_DURATION - 12400);
      const alpha = Math.max(0, 0.35 * (1 - p));
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
      glowGrad.addColorStop(0, 'rgba(198, 164, 91, ' + alpha + ')');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 300, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function setSceneClasses(elapsed) {
    // Scene 01: Darkness & Golden Stardust Lens Flare (0 - 2200ms)
    if (elapsed < 2200) {
      introEl.className = 'cinematic-intro scene-1';
    }
    // Scene 02: The Four Friends Reveal (Deepak • Bharath • Adarsh • Hari) (2200 - 6800ms)
    else if (elapsed < 6800) {
      introEl.className = 'cinematic-intro scene-2';
    }
    // Scene 03: Golden Puzzle Seams & 3D Piece Separation (6800 - 9600ms)
    else if (elapsed < 9600) {
      introEl.className = 'cinematic-intro scene-3';
      if (!sparksTriggered) {
        sparksTriggered = true;
        triggerPuzzleSparks(window.innerWidth / 2, window.innerHeight / 2);
      }
    }
    // Scene 04: Magnetic Puzzle Convergence & Interlocking Snap (9600 - 12400ms)
    else if (elapsed < 12400) {
      introEl.className = 'cinematic-intro scene-4';
    }
    // Scene 05: Fusion, 3D Inflating Typography & Specular Sweep (12400 - 14400ms)
    else if (elapsed < 14400) {
      introEl.className = 'cinematic-intro scene-5';
    }
    // Scene 06: QUAD DIGITAL LABS Studio Reveal & Smooth Website Launch (14400 - 16500ms)
    else {
      introEl.className = 'cinematic-intro scene-6';
    }
  }

  function finishIntro(instant = false) {
    if (!instant && !isRunning && !introEl.classList.contains('scene-1')) return;
    isRunning = false;

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    timeouts.forEach((t) => clearTimeout(t));
    timeouts = [];

    sessionStorage.setItem(SESSION_KEY, 'true');
    document.body.classList.remove('intro-active');
    stopAudio(true);

    if (instant) {
      introEl.classList.add('hidden');
      introEl.className = 'cinematic-intro hidden';
    } else {
      introEl.classList.add('fade-out');
      setTimeout(() => {
        introEl.classList.add('hidden');
        introEl.className = 'cinematic-intro hidden';
      }, 750);
    }

    // Ensure hero video playback starts immediately
    const heroVideo = document.getElementById('hero-bg-video');
    if (heroVideo && heroVideo.paused) {
      heroVideo.play().catch(() => {});
    }
  }

  function loop(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    if (progressFill) {
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      progressFill.style.width = pct + '%';
    }

    // Smooth soundtrack fade-out during Scene 06 into the live site
    if (elapsed >= 14400 && audioEl && !audioEl.paused && !isMuted) {
      const remaining = Math.max(0, TOTAL_DURATION - elapsed);
      const fadeFraction = Math.max(0, Math.min(1, remaining / 2100));
      audioEl.volume = 0.85 * fadeFraction;
    }

    setSceneClasses(elapsed);
    drawCanvasScene(elapsed);

    if (elapsed < TOTAL_DURATION) {
      animFrameId = requestAnimationFrame(loop);
    } else {
      finishIntro(false);
    }
  }

  function playIntro() {
    isRunning = true;
    startTime = null;
    sparksTriggered = false;
    document.body.classList.add('intro-active');
    introEl.classList.remove('hidden', 'fade-out');
    resizeCanvas();
    initStardust();
    startAudio();
    animFrameId = requestAnimationFrame(loop);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      finishIntro(false);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isRunning) {
      finishIntro(false);
    }
  });

  if (footerReplayBtn) {
    footerReplayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem(SESSION_KEY);
      isMuted = false;
      if (audioEl) audioEl.muted = false;
      updateSoundUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playIntro();
    });
  }

  if (heroReplayBtn) {
    heroReplayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem(SESSION_KEY);
      isMuted = false;
      if (audioEl) audioEl.muted = false;
      updateSoundUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playIntro();
    });
  }

  window.addEventListener('resize', () => {
    if (isRunning) resizeCanvas();
  });

  if (prefersReducedMotion || alreadySeen) {
    finishIntro(true);
  } else {
    playIntro();
  }
}
