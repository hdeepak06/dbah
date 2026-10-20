/**
 * DBAH QUAD DIGITAL LABS — INTERACTIVE MOTION & CLIENT CONTROLLER
 * High-Performance Editorial Edition
 * "Four Minds. One Vision. Infinite Innovation."
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intro Logo Reveal Animation & "Why Choose Us?" Badge
  initIntroOverlay();
  initWhyChooseUsTickers();
  initNavDisclaimerRotator();

  // 2. High-Performance Ambient Gold Particle Canvas & Parallax
  initParticlesCanvas();
  initParallaxEffects();

  // 3. Navigation & Header Controller
  initNavigation();

  // 4. Logo Interaction (Tilt, Popover Info, Escape Dismissal)
  initLogoInteraction();
  initPuzzleAssembly();

  // 5. Scroll Reveal Animations (IntersectionObserver)
  initScrollReveal();

  // 6. Portfolio Filtering & Project Modals
  initPortfolio();

  // 7. Pricing Plan Form Auto-fill
  initPricing();

  // 8. FAQ Accordion
  initFaqAccordion();

  // 9. Contact & Enquiry Form Validation & Dispatcher
  initContactForm();

  // 10. Back to Top Button
  initBackToTop();

  // 11. Dark / Light Mode Theme Toggle
  initThemeToggle();

  // 12. Cinematic Hero Background Video
  initHeroVideo();

  // 13. Dynamic Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   1. INTRO LOGO REVEAL & "WHY CHOOSE US?" ROTATING BADGE
   ========================================================================== */
function initIntroOverlay() {
  const overlay = document.getElementById('intro-overlay');
  const skipBtn = document.getElementById('intro-skip-btn');
  const enterBtn = document.getElementById('intro-enter-btn');

  if (!overlay) return;

  function hideIntro() {
    overlay.classList.add('hidden');
    sessionStorage.setItem('dbah_intro_seen', 'true');
    document.body.style.overflow = '';
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', hideIntro);
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', hideIntro);
  }

  // Dismiss on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      hideIntro();
    }
  });

  // Auto-hide after intro period
  setTimeout(() => {
    if (!overlay.classList.contains('hidden')) {
      hideIntro();
    }
  }, 7500);
}

function initWhyChooseUsTickers() {
  const tickerContainers = document.querySelectorAll('.why-ticker-container');
  if (!tickerContainers.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  tickerContainers.forEach((container) => {
    const items = container.querySelectorAll('.why-ticker-item');
    if (items.length <= 1) return;

    const parentBadge = container.closest('.intro-why-badge');
    const dots = parentBadge ? parentBadge.querySelectorAll('.why-dot') : [];

    let currentIndex = 0;
    let timer = null;

    function showItem(index) {
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

    function nextItem() {
      const next = (currentIndex + 1) % items.length;
      showItem(next);
    }

    if (!prefersReducedMotion) {
      function startRotation() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextItem, 2400);
      }

      function stopRotation() {
        if (timer) clearInterval(timer);
      }

      startRotation();

      container.addEventListener('mouseenter', stopRotation);
      container.addEventListener('mouseleave', startRotation);
      container.addEventListener('focusin', stopRotation);
      container.addEventListener('focusout', startRotation);
    }

    if (dots.length) {
      dots.forEach((dot, idx) => {
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', () => {
          showItem(idx);
        });
      });
    }
  });
}

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
      rotateInterval = setInterval(nextDisclaimer, 3500);
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
   2. HIGH-PERFORMANCE AMBIENT GOLD PARTICLES CANVAS
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

  // Pause when tab is inactive or user scrolled past hero to save battery
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
    'rgba(223, 196, 131, 0.65)',
    'rgba(197, 160, 82, 0.55)',
    'rgba(248, 246, 237, 0.45)'
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.8,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.05
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
   2B. GENTLE BACKGROUND PARALLAX
   ========================================================================== */
function initParallaxEffects() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 1024) {
    return;
  }

  const emblem = document.querySelector('.emblem-image');
  if (!emblem) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let isListening = false;

  window.addEventListener('mousemove', (e) => {
    if (window.scrollY > window.innerHeight) return;
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (!isListening) {
      isListening = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  function update() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    emblem.style.transform = `translate(${currentX * 6}px, ${currentY * 6}px)`;

    if (Math.abs(mouseX - currentX) > 0.001 || Math.abs(mouseY - currentY) > 0.001) {
      requestAnimationFrame(update);
    } else {
      isListening = false;
    }
  }
}

/* ==========================================================================
   3. NAVIGATION & HEADER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

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
    menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    mobileBackdrop.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    menuToggle.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* ==========================================================================
   4. LOGO INTERACTION (TILT, INFO POPOVER, ESCAPE DISMISSAL)
   ========================================================================== */
function initLogoInteraction() {
  const brandLink = document.querySelector('.brand-link');
  if (!brandLink) return;

  // Create subtle brand information popover card dynamically
  const popover = document.createElement('div');
  popover.className = 'brand-info-popover';
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-label', 'Brand Details');
  popover.innerHTML = `
    <div class="popover-badge">✦ OFFICIAL DIGITAL LABS</div>
    <div class="popover-heading">DBAH Quad Digital Labs</div>
    <p class="popover-text">Four Minds. One Vision. Infinite Innovation.</p>
    <div class="popover-meta">📍 Kondanayakana Halli (KN Halli) • Hosapete & Hampi, Karnataka</div>
  `;
  brandLink.appendChild(popover);

  let isPopoverOpen = false;

  function openPopover() {
    popover.classList.add('open');
    isPopoverOpen = true;
  }

  function closePopover() {
    popover.classList.remove('open');
    isPopoverOpen = false;
  }

  // Right-click or long-press or logo image touch triggers info popup
  const logoImg = brandLink.querySelector('.brand-logo-img');
  if (logoImg) {
    logoImg.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (isPopoverOpen) {
        closePopover();
      } else {
        openPopover();
      }
    });
  }

  // Dismiss on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPopoverOpen) {
      closePopover();
    }
  });

  // Dismiss when clicking outside
  document.addEventListener('click', (e) => {
    if (isPopoverOpen && !brandLink.contains(e.target)) {
      closePopover();
    }
  });
}

/* ==========================================================================
   4B. LOGO PUZZLE ASSEMBLY INTERACTIVE CONTROLLER
   ========================================================================== */
function initPuzzleAssembly() {
  const emblemCard = document.getElementById('emblem-card');
  const puzzleStage = document.getElementById('emblem-puzzle-stage');
  if (!emblemCard || !puzzleStage) return;

  emblemCard.addEventListener('click', () => {
    puzzleStage.classList.remove('replay');
    void puzzleStage.offsetWidth; // Force CSS reflow to re-trigger puzzle lock animation
    puzzleStage.classList.add('replay');
  });
}

/* ==========================================================================
   5. SCROLL REVEAL (INTERSECTION OBSERVER)
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
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('active'));
  }
}

/* ==========================================================================
   6. PORTFOLIO FILTERING & MODAL CONTROLLER
   ========================================================================== */
const projectData = {
  'sri-sai-blossom': {
    title: 'Sri Sai Blossom Kids Kindergarten & School',
    category: 'Education & Institution',
    badge: 'Live Website Verified',
    desc: 'Official website for Sri Sai Blossom Kids kindergarten and educational institution. Features rich event showcases, admission enquiries, gallery albums, and interactive contact points.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid', 'Vercel CDN'],
    github: 'https://github.com/hdeepak06/sri-sai-blossom-kids',
    live: 'https://sri-sai-blossom-kids.vercel.app',
    image: 'assets/images/projects/sri-sai-blossom.webp'
  },
  'maya-valley': {
    title: 'Maya Valley Resort Hampi',
    category: 'Hotel & Hospitality',
    badge: 'Live Website Verified',
    desc: 'A luxury resort and hospitality website in the world-heritage destination of Hampi, Karnataka. Showcases premium stay cottages, dining options, regional tour booking, and direct reservation enquiries.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Photo Gallery', 'Vercel CDN'],
    github: 'https://github.com/hdeepak06/maya-valley-resort-hampi',
    live: 'https://maya-valley-resort-hampi-sxdc.vercel.app',
    image: 'assets/images/projects/maya-valley-resort.webp'
  },
  'sri-manjunatha': {
    title: 'Sri Manjunatha Tours & Travels',
    category: 'Travel & Logistics',
    badge: 'GitHub Verified',
    desc: 'Premium travel and fleet rental portal for Hampi & Hosapete region. Features comprehensive vehicle fleet showcase (buses, travelers, sedans), tour package listings, and direct WhatsApp booking.',
    tech: ['React', 'Vite', 'TypeScript', 'Tailwind/CSS', 'WhatsApp API'],
    github: 'https://github.com/hdeepak06/sri-manjunatha-travels',
    live: null,
    image: 'assets/images/projects/sri-manjunatha-travels.webp'
  },
  'anil-bike': {
    title: 'Anil Bike Rental Hampi',
    category: 'Rental & Tourism',
    badge: 'Live Website Verified',
    desc: 'Online scooter and motorcycle rental booking platform serving tourists visiting Hampi. Includes transparent hourly/daily pricing, vehicle fleet showcase, safety guidelines, and quick booking integration.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'WhatsApp Booking Flow'],
    github: 'https://github.com/hdeepak06/anil-bike-rental-hampi',
    live: 'https://anil-bike-rental-hampi.vercel.app',
    image: 'assets/images/projects/anil-bike-rental.webp'
  },
  'finalmealmate': {
    title: 'FinalMealmate Food Delivery & Surplus Donation',
    category: 'Full-Stack Web App',
    badge: 'Live Web App Verified',
    desc: 'A Django-based dual-purpose web platform combining commercial food delivery ordering with a dedicated surplus food donation module to prevent food wastage across communities.',
    tech: ['Python', 'Django', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/hdeepak06/finalmealmate-food-delivery-app',
    live: 'https://finalmealmate-food-delivery-app.vercel.app',
    image: null
  },
  'medico': {
    title: 'Medico: Healthcare & Pharmacy Management',
    category: 'Healthcare Management',
    badge: 'Live Web App Verified',
    desc: 'Full-stack healthcare operations platform managing clinical appointments, patient medical histories, prescription tracking, inventory, and automated billing generation.',
    tech: ['Python', 'Django', 'MySQL', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/hdeepak06/medico',
    live: 'https://medico-six-sigma.vercel.app',
    image: null
  },
  'ballotbridge': {
    title: 'BallotBridge Secure E-Voting Platform',
    category: 'Digital Governance',
    badge: 'Live Web App Verified',
    desc: 'Secure digital electronic voting platform featuring cryptographic ballot hashing, multi-factor authentication, administrative election controls, and tamper-resistant real-time voter tallying.',
    tech: ['Python', 'Django', 'MySQL', 'Cryptographic Hashing', 'JavaScript'],
    github: 'https://github.com/hdeepak06/BALLOT-BRIDGE',
    live: 'https://ballot-bridge-lovat.vercel.app',
    image: null
  },
  'course-registration': {
    title: 'Academic Course Registration Portal',
    category: 'Academic Web App',
    badge: 'GitHub Verified',
    desc: 'Student course registration system with elective selection, prerequisite validation checks, instructor allocation, and student administrative dashboards.',
    tech: ['Python', 'Django', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/hdeepak06/course-registration',
    live: null,
    image: null
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
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
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
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   7. PRICING AUTO-FILL INTO CONTACT FORM
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
        detailsText.value = `Hello DBAH Quad Digital Labs team, I would like to request a quote for the ${plan} package. Looking forward to discussing details!`;
      }
    });
  });
}

/* ==========================================================================
   8. FAQ ACCORDION
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
   9. CONTACT FORM VALIDATION & DISPATCH
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
      name: nameInput.value.trim(),
      business: businessInput.value.trim() || 'N/A',
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: serviceInput.options[serviceInput.selectedIndex].text,
      budget: budgetInput.options[budgetInput.selectedIndex].text,
      details: detailsInput.value.trim()
    };

    if (dispatchModal) {
      document.getElementById('confirm-name').textContent = validatedPayload.name;
      document.getElementById('confirm-service').textContent = validatedPayload.service;
      dispatchModal.classList.add('open');
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
        `_Sent via dbahquad.com portfolio_`;

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
      document.body.style.overflow = '';
    }
  }

  if (dispatchCancelBtn) {
    dispatchCancelBtn.addEventListener('click', closeDispatchModal);
  }
}

/* ==========================================================================
   10. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btns = document.querySelectorAll('#back-to-top, .btn-top');
  if (!btns.length) return;

  const updateVisibility = () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isVisible = scrollPos > 250;
    btns.forEach(btn => {
      if (isVisible) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   11. DARK / LIGHT THEME TOGGLE CONTROLLER
   ========================================================================== */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('#theme-toggle-btn, #mobile-theme-toggle-btn, #dock-theme-toggle-btn');
  if (!toggleBtns.length) return;

  const THEME_KEY = 'dbah_theme_mode';

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    toggleBtns.forEach((btn) => {
      const labelSpan = btn.querySelector('.theme-toggle-label');
      if (isDark) {
        btn.setAttribute('aria-label', 'Switch to Light Mode');
        btn.setAttribute('title', 'Switch to Light Mode');
        btn.setAttribute('data-tooltip', 'Switch to Light Mode');
        if (labelSpan) {
          labelSpan.textContent = btn.classList.contains('mobile-theme-btn') ? 'Switch to Light Mode' : 'Light';
        }
      } else {
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
        btn.setAttribute('title', 'Switch to Dark Mode');
        btn.setAttribute('data-tooltip', 'Switch to Dark Mode');
        if (labelSpan) {
          labelSpan.textContent = btn.classList.contains('mobile-theme-btn') ? 'Switch to Dark Mode' : 'Dark';
        }
      }
    });
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    applyTheme(true);
  } else {
    applyTheme(false);
  }

  function handleToggleClick() {
    const willBeDark = !document.body.classList.contains('dark-theme');
    applyTheme(willBeDark);
    localStorage.setItem(THEME_KEY, willBeDark ? 'dark' : 'light');
  }

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', handleToggleClick);
  });
}

/* ==========================================================================
   12. CINEMATIC HERO BACKGROUND VIDEO CONTROLLER
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-bg-video');
  if (!video) return;

  // Respect reduced motion and low-bandwidth data saving preferences
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDataSaver = navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');

  if (prefersReduced || isDataSaver) {
    video.pause();
    video.removeAttribute('autoplay');
    video.style.display = 'none';
    return;
  }

  // IntersectionObserver to pause video playback when scrolled out of view
  if ('IntersectionObserver' in window) {
    const heroSection = document.getElementById('home');
    if (heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }
  }

  // Pause playback when browser tab is inactive / hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          video.play().catch(() => {});
        }
      }
    }
  });
}



