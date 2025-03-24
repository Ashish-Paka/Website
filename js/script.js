// DOM Elements
const header = document.querySelector('.header');
const menuBurger = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const themeToggle = document.querySelector('.theme-toggle');
const categoryCards = document.querySelectorAll('.category-card');
const activeCardContainer = document.querySelector('.active-card-content');
const activeCardTitle = document.querySelector('.active-card-title');
const activeCardSubtitle = document.querySelector('.active-card-subtitle');
const hiddenContent = document.querySelector('.hidden-content');

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDarkModeToggle();
  initCardSelection();
  updateCopyrightYear();
  initFadeAnimations();
  handleContactForm();
});

// Mobile menu
function initMobileMenu() {
  if (!menuBurger) return;
  
  menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('active');
    menuBody.classList.toggle('active');
    document.body.classList.toggle('lock');
  });
}

// Dark mode toggle
function initDarkModeToggle() {
  if (!themeToggle) return;
  
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
  }
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save preference
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Card selection handling
function initCardSelection() {
  if (!categoryCards.length || !activeCardContainer) return;
  
  // Set About as default active card
  updateActiveCard('about-modal');
  
  // Handle card click events
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      // Get the modal ID
      const modalId = card.getAttribute('data-modal');
      
      // Update active card visual state
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      // Update the active card content
      updateActiveCard(modalId);
    });
  });

  // Also handle menu link clicks
  document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Extract section from href (e.g., "#about" -> "about")
      const section = link.getAttribute('href').substring(1);
      const modalId = `${section}-modal`;
      
      // Find the corresponding card and trigger its click event
      const card = document.querySelector(`.category-card[data-modal="${modalId}"]`);
      if (card) {
        e.preventDefault();
        card.click();
      }
    });
  });
}

// Update the active card content
function updateActiveCard(modalId) {
  if (!modalId || !hiddenContent) return;
  
  // Find the modal content
  const modalElement = hiddenContent.querySelector(`#${modalId}`);
  if (!modalElement) return;
  
  // Extract title and subtitle
  const title = modalElement.querySelector('h2').textContent;
  let subtitle = '';
  
  // Set subtitle based on the section
  switch (modalId) {
    case 'about-modal':
      subtitle = 'Robotics & Autonomous Systems Engineer';
      break;
    case 'education-modal':
      subtitle = 'Academic Background & Qualifications';
      break;
    case 'experience-modal':
      subtitle = 'Professional Journey & Work History';
      break;
    case 'projects-modal':
      subtitle = 'Research & Development Portfolio';
      break;
    case 'skills-modal':
      subtitle = 'Technical Expertise & Capabilities';
      break;
    case 'publications-modal':
      subtitle = 'Research Papers & Intellectual Property';
      break;
    case 'resume-modal':
      subtitle = 'Career Overview & Resume Downloads';
      break;
    case 'contact-modal':
      subtitle = 'Get in Touch & Connect';
      break;
    default:
      subtitle = '';
  }
  
  // Update the header
  activeCardTitle.textContent = title;
  activeCardSubtitle.textContent = subtitle;
  
  // Clone the content and add to the active card
  const contentClone = modalElement.querySelector('.modal-body').cloneNode(true);
  activeCardContainer.innerHTML = '';
  activeCardContainer.appendChild(contentClone);
  
  // Scroll to top of active card content
  activeCardContainer.scrollTop = 0;
}

// Update copyright year
function updateCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Fade-in animations
function initFadeAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (!fadeElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Handle contact form submission
function handleContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Simple validation
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      alert('Please fill in all fields');
      return;
    }
    
    // Disable form during submission
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Collect form data
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - you would replace this with actual API call
      console.log('Form data:', formData);
      
      // Clear form
      form.reset();
      
      // Show success message
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      // Re-enable form
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}
