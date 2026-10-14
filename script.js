/**
 * LAKSHYA ROAT - PERSONAL PORTFOLIO JAVASCRIPT
 * B.Tech Mechanical Engineering | 1st Year
 * Standalone vanilla JavaScript compatible with local file:// execution.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark & Light Mode) with LocalStorage Persistence
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const getStoredTheme = () => {
    try {
      return localStorage.getItem('portfolio-theme');
    } catch (error) {
      return null;
    }
  };

  const setStoredTheme = (theme) => {
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch (error) {
      // Ignore storage failures when browsing via file:// or in restricted contexts.
    }
  };

  // Retrieve stored theme or detect system preference
  const savedTheme = getStoredTheme();
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    htmlRoot.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', targetTheme);
      setStoredTheme(targetTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Hamburger Menu
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu if user clicks outside of header
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Header Scroll Effect & Active Section ScrollSpy
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    // Add shadow styling to header on scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy: highlight active nav item
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on initial load

  // --------------------------------------------------------------------------
  // 4. Dynamic Typewriter Effect for Hero Subtitle
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const phrases = [
      'CAD & 3D Modeling.',
      'Mechanical Mechanisms.',
      'Robotics & Automation.',
      'Thermodynamics & Energy.',
      'Engineering Innovation.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of word
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }

    // Start typewriter effect after subtle delay
    setTimeout(type, 600);
  }

  // --------------------------------------------------------------------------
  // 5. Project Filtering (Tab buttons)
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. Interactive Project Details Modal
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const projectDetailBtns = document.querySelectorAll('.project-detail-btn');

  // Rich data dictionary for projects
  const projectsData = {
    '1': {
      title: 'Precision Compound Gear Train Assembly',
      badge: 'CAD Modeling & Kinematics',
      summary: 'A multi-stage gear reduction assembly designed in SolidWorks to demonstrate torque multiplication and angular velocity reduction.',
      specs: [
        'Module: 2.5 mm, Pressure Angle: 20° (Involute profile)',
        'Stage Reduction Ratio: 1:4 per stage, Total Reduction: 1:16',
        'Material Specified: AISI 1045 Carbon Steel',
        'Calculated pitch circle diameters and backlash clearances'
      ],
      impact: 'Verified smooth meshing with zero mechanical interference using SolidWorks Motion Study and generated complete 2D engineering drawing with manufacturing tolerances.'
    },
    '2': {
      title: 'Autonomous Obstacle-Avoiding Rover',
      badge: 'Mechatronics & Robotics',
      summary: 'A 4-wheel drive mobile rover equipped with ultrasonic distance mapping to autonomously detect obstructions and choose collision-free paths.',
      specs: [
        'Microcontroller: Arduino Uno (ATmega328P)',
        'Sensor: HC-SR04 Ultrasonic Distance Sensor mounted on micro servo',
        'Motor Driver: L298N Dual H-Bridge Driver module with DC gear motors',
        'Power Source: 7.4V Li-ion battery pack with regulated 5V step-down'
      ],
      impact: 'Implemented a real-time reactive scanning algorithm in C++ that scans 180° ahead and steers toward the maximum clearance vector.'
    },
    '3': {
      title: '3-DOF Hydraulic Articulated Robotic Arm',
      badge: 'Fluid Mechanics & Prototyping',
      summary: 'A hands-on physical demonstrator applying Pascal’s Law to transmit fluid pressure through closed conduits for multi-axis movement.',
      specs: [
        'Degrees of Freedom: 3 (Base rotation 120°, boom pitch, end-effector clamp)',
        'Actuation: Paired medical-grade hydraulic syringes connected with silicone tubing',
        'Working Medium: Incompressible colored distilled fluid',
        'Payload Capacity: 250 grams at maximum horizontal reach'
      ],
      impact: 'Demonstrated fundamental principles of fluid displacement, mechanical advantage (A2/A1 ratio), and linkage kinematics without requiring electrical power.'
    },
    '4': {
      title: 'Otto & Diesel Thermodynamic Cycle Simulator',
      badge: 'Thermodynamics & Python Computation',
      summary: 'A computational engineering program in Python that models ideal air-standard gas power cycles and generates automated thermodynamic charts.',
      specs: [
        'Languages & Libraries: Python 3, NumPy, Matplotlib',
        'Cycles Modeled: Otto Cycle (Spark Ignition), Diesel Cycle (Compression Ignition)',
        'Parameters Evaluated: Compression ratio (r), cut-off ratio (rc), adiabatic index (γ = 1.4)',
        'Output: Thermal efficiency comparison and plotted P-V & T-S state diagrams'
      ],
      impact: 'Allowed interactive parameter sweeping to analyze why Diesel cycles offer higher thermal efficiency at elevated compression ratios.'
    },
    '5': {
      title: 'Aerodynamic Micro Wind Turbine Blade Design',
      badge: 'Renewable Energy & CAD',
      summary: 'An aerodynamic analysis and 3D blade model designed for optimal kinetic energy harvesting in residential low-wind speed zones.',
      specs: [
        'Airfoil Profile: NACA 4412 modified for low Reynolds number flow',
        'Target Tip Speed Ratio (TSR): 6.0',
        'Calculated chord length distribution using Betz limit considerations',
        'Modeled in AutoCAD / SolidWorks with graduated twist angles from root to tip'
      ],
      impact: 'Achieved an estimated starting torque improvement of 18% over standard untwisted flat-plate blades in preliminary flow modeling.'
    },
    '6': {
      title: 'Interactive Engineering Portfolio Website',
      badge: 'Frontend Engineering & Responsive UI',
      summary: 'A custom, modern personal website engineered entirely from scratch using clean semantic HTML5, CSS3, and modular vanilla JavaScript.',
      specs: [
        'No external heavyweight frameworks; ultra-lightweight and fast loading',
        'Dark & Light theme system with smooth CSS variable transitions',
        'Responsive layout supporting mobile, tablet, and widescreen desktop displays',
        'Full offline and local file:// execution compatibility'
      ],
      impact: 'Provides an engaging, professional digital presence to present mechanical engineering projects, coursework, and contact channels to mentors and employers.'
    }
  };

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    modalContent.innerHTML = `
      <span class="modal-project-badge">${project.badge}</span>
      <h3 class="modal-title">${project.title}</h3>
      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">${project.summary}</p>
      
      <div class="modal-specs">
        <h4>Key Technical Specifications</h4>
        <ul>
          ${project.specs.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-top: 1.25rem;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">Engineering Takeaways &amp; Outcome</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${project.impact}</p>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectDetailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Resume Modal Controls
  // --------------------------------------------------------------------------
  const resumeBtn = document.getElementById('resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (resumeBtn) {
    resumeBtn.addEventListener('click', openResumeModal);
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  // Close modals on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
      if (resumeModal && resumeModal.classList.contains('active')) {
        closeResumeModal();
      }
    }
  });

  // --------------------------------------------------------------------------
  // 8. Contact Form Client-side Validation & Friendly Feedback Toast
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  function showToast(title, desc) {
    if (!toast) return;
    const titleEl = toast.querySelector('.toast-title');
    const descEl = toast.querySelector('.toast-desc');
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email (standard regex pattern)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (isValid) {
        const senderName = nameInput.value.trim();
        const senderEmail = emailInput.value.trim();
        const senderSubject = (subjectInput ? subjectInput.value.trim() : '').replace(/\s+/g, ' ');
        const senderMessage = messageInput.value.trim();

        const mailtoLink = `mailto:lakshya.roat.mech@gmail.com?subject=${encodeURIComponent(senderSubject || `Portfolio inquiry from ${senderName}`)}&body=${encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${senderMessage}`)}`;

        // Clear form
        contactForm.reset();

        // Remove any error classes
        nameInput.parentElement.classList.remove('has-error');
        emailInput.parentElement.classList.remove('has-error');
        messageInput.parentElement.classList.remove('has-error');

        // Launch the user's email client so the inquiry reaches Lakshya.
        window.location.href = mailtoLink;

        showToast(
          'Message Ready!',
          `Your email draft for ${senderName} is ready to send.`
        );
      }
    });

    // Clear error state on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.parentElement.classList.remove('has-error');
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. Back to Top Smooth Scroll
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
