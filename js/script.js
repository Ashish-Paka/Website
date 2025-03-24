// Initialize Mobile Menu
const initMobileMenu = () => {
  const menuIcon = document.querySelector('.icon-menu');
  const menuBody = document.querySelector('.menu__body');

  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      document.documentElement.classList.toggle('menu-open');
      menuIcon.classList.toggle('active');
      menuBody.classList.toggle('active');
    });
  }
};

// Initialize Smooth Scroll
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Find the timeline stop that corresponds to this section and activate it
        const timelineStops = document.querySelectorAll('.timeline__stop');
        timelineStops.forEach((stop, index) => {
          const stopSection = stop.getAttribute('data-section');
          if (stopSection && targetId.substring(1) === stopSection) {
            updateTimeline(index);
          }
        });

        // Scroll to the section
        window.scrollTo({
          top: targetElement.offsetTop - 120, // Adjusted for header + timeline
          behavior: 'smooth'
        });
      }
    });
  });
};

// Initialize Dark Mode Toggle
const initDarkModeToggle = () => {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (!darkModeToggle) return;
  
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Set initial dark mode state
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
  }

  // Handle dark mode toggle
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
};

// Initialize Fade-in Animations
const initFadeAnimations = () => {
  const fadeObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  document.querySelectorAll('.card, .timeline__stop, .skill-card, .publication-card').forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
  });
};

// Setup Timeline Navigation
const setupTimeline = () => {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  
  const timelineStops = document.querySelectorAll('.timeline__stop');
  let currentStop = 0;
  let isAnimating = false;

  // Update timeline and scroll to section
  window.updateTimeline = function(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentStop = index;
    
    // Remove active class from all stops
    timelineStops.forEach(stop => {
      stop.classList.remove('active');
    });
    
    // Add active class to the current stop
    timelineStops[index].classList.add('active');
    
    // Get the section to scroll to
    const sectionId = timelineStops[index].getAttribute('data-section');
    const sectionElement = document.getElementById(sectionId);
    
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - 120, // Adjusted for header + timeline
        behavior: 'smooth'
      });
      
      // After animation completes
      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    } else {
      isAnimating = false;
    }
  };

  // Initialize timeline
  timelineStops.forEach((stop, index) => {
    stop.addEventListener('click', () => {
      updateTimeline(index);
    });
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && currentStop > 0) {
      updateTimeline(currentStop - 1);
    } else if (e.key === 'ArrowDown' && currentStop < timelineStops.length - 1) {
      updateTimeline(currentStop + 1);
    }
  });

  // Handle scroll events
  let lastScrollTime = 0;
  const scrollThreshold = 50; // Minimum time between scroll events

  document.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < scrollThreshold) return;
    lastScrollTime = now;

    if (e.deltaY > 0 && currentStop < timelineStops.length - 1) {
      updateTimeline(currentStop + 1);
    } else if (e.deltaY < 0 && currentStop > 0) {
      updateTimeline(currentStop - 1);
    }
  }, { passive: true });

  // Handle touch events for mobile
  let touchStartY = 0;
  let touchEndY = 0;
  const touchThreshold = 50; // Minimum swipe distance

  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchmove', (e) => {
    touchEndY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', () => {
    const swipeDistance = touchEndY - touchStartY;
    
    if (Math.abs(swipeDistance) < touchThreshold) return;
    
    if (swipeDistance > 0 && currentStop > 0) {
      updateTimeline(currentStop - 1);
    } else if (swipeDistance < 0 && currentStop < timelineStops.length - 1) {
      updateTimeline(currentStop + 1);
    }
  });

  // Intersection Observer for timeline stops
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(timelineStops).findIndex(
          stop => stop.dataset.section === entry.target.id
        );
        if (index !== -1 && !isAnimating) {
          // Just update the active state without scrolling
          timelineStops.forEach(stop => stop.classList.remove('active'));
          timelineStops[index].classList.add('active');
          currentStop = index;
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-120px 0px 0px 0px' // Adjust for header + timeline height
  });

  document.querySelectorAll('section[id]').forEach(section => {
    timelineObserver.observe(section);
  });
};

// Create Knowledge Graph
const createKnowledgeGraph = () => {
  const knowledgeMap = document.querySelector('.knowledge-map');
  if (!knowledgeMap) return;
  
  const nodes = knowledgeMap.querySelectorAll('.knowledge-node');
  const connections = knowledgeMap.querySelectorAll('.knowledge-connection');
  
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      // Highlight related nodes and connections
      const category = node.dataset.category;
      const relatedNodes = document.querySelectorAll(`.knowledge-node[data-category="${category}"]`);
      const relatedConnections = document.querySelectorAll(`.knowledge-connection[data-category="${category}"]`);
      
      relatedNodes.forEach(n => n.classList.add('active'));
      relatedConnections.forEach(c => c.classList.add('active'));
    });
    
    node.addEventListener('mouseleave', () => {
      // Remove highlights
      nodes.forEach(n => n.classList.remove('active'));
      connections.forEach(c => c.classList.remove('active'));
    });
  });
};

// Initialize Spoller (FAQ accordion)
const initSpollers = () => {
  const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");
  if (!spollerButtons.length) return;

  spollerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentItem = button.closest("[data-spoller]");
      const content = currentItem.querySelector(".spollers-faq__text");

      const parent = currentItem.parentNode;
      const isOneSpoller = parent.hasAttribute("data-one-spoller");

      if (isOneSpoller) {
        const allItems = parent.querySelectorAll("[data-spoller]");
        allItems.forEach((item) => {
          if (item !== currentItem) {
            const otherContent = item.querySelector(".spollers-faq__text");
            item.classList.remove("active");
            otherContent.style.maxHeight = null;
          }
        });
      }

      if (currentItem.classList.contains("active")) {
        currentItem.classList.remove("active");
        content.style.maxHeight = null;
      } else {
        currentItem.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
};

// Animate skill proficiency bars when in view
const animateProficiencyBars = () => {
  const proficiencySection = document.querySelector('.skills-proficiency');
  if (!proficiencySection) return;
  
  const proficiencyFills = document.querySelectorAll('.proficiency-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        proficiencySection.classList.add('animate-proficiency');
        
        // Set the correct width based on style attribute
        proficiencyFills.forEach(fill => {
          const width = fill.style.width;
          fill.style.setProperty('--fill-width', width);
        });
        
        observer.disconnect(); // Only animate once
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(proficiencySection);
};

// Contact form handling
const handleContactForm = () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address', 'error');
      return;
    }
    
    // Simulate form submission (replace with actual form submission)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Success response
      showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
      contactForm.reset();
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }, 1500);
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  // Helper function to show form messages
  function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    // Insert after the submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.parentNode.insertBefore(messageElement, submitButton.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.classList.add('form-message--fade-out');
      setTimeout(() => {
        messageElement.remove();
      }, 300);
    }, 5000);
  }
};

// Update copyright year
const updateCopyrightYear = () => {
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initDarkModeToggle();
  initFadeAnimations();
  setupTimeline();
  createKnowledgeGraph();
  initSpollers();
  animateProficiencyBars();
  handleContactForm();
  updateCopyrightYear();
});
