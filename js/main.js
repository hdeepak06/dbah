/**
 * DBAH QUAD DIGITAL LABS — INTERACTIVE MOTION & CLIENT CONTROLLER
 * "Four Minds. One Vision. Infinite Innovation."
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intro Logo Reveal Animation
  initIntroOverlay();

  // 2. Ambient Gold Particle Canvas
  initParticlesCanvas();

  // 3. Navigation & Header Controller
  initNavigation();

  // 4. Scroll Reveal Animations (IntersectionObserver)
  initScrollReveal();

  // 5. Portfolio Filtering & Project Modals
  initPortfolio();

  // 6. Pricing Plan Form Auto-fill
  initPricing();

  // 7. FAQ Accordion
  initFaqAccordion();

  // 8. Contact & Enquiry Form Validation & Dispatcher
  initContactForm();

  // 9. Back to Top Button
  initBackToTop();

  // 10. Dynamic Current Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   1. INTRO LOGO REVEAL
   ========================================================================== */
function initIntroOverlay() {
  const overlay = document.getElementById('intro-overlay');
  const skipBtn = document.getElementById('intro-skip-btn');
  const progressFill = document.querySelector('.intro-progress-fill');

  if (!overlay) return;

  const hasSeenIntro = sessionStorage.getItem('dbah_intro_seen');

  if (hasSeenIntro === 'true') {
    overlay.classList.add('hidden');
    return;
  }

  // Trigger progress bar fill
  if (progressFill) {
    setTimeout(() => {
      progressFill.style.width = '100%';
    }, 100);
  }

  function hideIntro() {
    overlay.classList.add('hidden');
    sessionStorage.setItem('dbah_intro_seen', 'true');
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', hideIntro);
  }

  // Auto hide after 1.8 seconds for crisp premium feel
  setTimeout(hideIntro, 1800);
}

/* ==========================================================================
   2. AMBIENT GOLD PARTICLES CANVAS
   ========================================================================== */
function initParticlesCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(window.innerWidth < 768 ? 25 : 55, 60);
  const particles = [];

  const goldColors = [
    'rgba(245, 222, 140, 0.65)',
    'rgba(212, 175, 55, 0.55)',
    'rgba(184, 134, 11, 0.45)',
    'rgba(255, 255, 255, 0.35)'
  ];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.1,
      alpha: Math.random() * 0.7 + 0.2
    });
  }

  function animate() {
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
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
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

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Link Highlight
    let current = '';
    const scrollPos = window.pageYOffset + 120;

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
  });

  // Mobile drawer toggle
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
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
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
    desc: 'Official website for Sri Sai Blossom Kids kindergarten and educational institution. Features rich event showcases, admission enquiries, gallery albums, and interactive contact points.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid', 'Vercel CDN'],
    github: 'https://github.com/hdeepak06/sri-sai-blossom-kids',
    live: 'https://sri-sai-blossom-kids.vercel.app',
    image: 'assets/images/projects/sri-sai-blossom.png'
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
    image: 'assets/images/projects/sri-manjunatha-travels.png'
  },
  'anil-bike': {
    title: 'Anil Bike Rental Hampi',
    category: 'Rental & Tourism',
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

  // Project Modals
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('[data-project-key]');

  function openProjectModal(key) {
    const data = projectData[key];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-desc').textContent = data.desc;

    // Tech pills
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach((t) => {
      const pill = document.createElement('span');
      pill.className = 'tech-pill';
      pill.textContent = t;
      techContainer.appendChild(pill);
    });

    // Action buttons
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
   6. PRICING AUTO-FILL INTO CONTACT FORM
   ========================================================================== */
function initPricing() {
  const quoteBtns = document.querySelectorAll('[data-plan-name]');
  const serviceSelect = document.getElementById('enquiry-service');
  const detailsText = document.getElementById('enquiry-details');

  quoteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const plan = btn.getAttribute('data-plan-name');
      const budget = btn.getAttribute('data-plan-budget');

      if (serviceSelect) {
        // match service option
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
   7. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach((other) => other.classList.remove('active'));

      // Toggle current
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

    // Validation helper
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

    // Open dispatch choice modal
    if (dispatchModal) {
      document.getElementById('confirm-name').textContent = validatedPayload.name;
      document.getElementById('confirm-service').textContent = validatedPayload.service;
      dispatchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Action: Send via WhatsApp
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

  // Action: Send via Email (mailto)
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
   9. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
