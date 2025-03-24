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
  initGridScroll();
  updateCopyrightYear();
  initFadeAnimations();
  animateProficiencyBars();
  handleContactForm();
  initPopupModals();
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
  console.log('Theme toggle button:', themeToggle);
  
  if (!themeToggle) {
    console.error('Theme toggle button not found');
    return;
  }
  
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  console.log('Saved theme:', savedTheme, 'Prefers dark:', prefersDark);
  
  // Apply theme based on saved preference or system preference
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    console.log('Setting light theme based on saved preference');
  } else if (savedTheme === 'dark' || prefersDark) {
    // Default to dark mode if saved or system preference
    document.body.classList.add('dark-theme');
    console.log('Setting dark theme based on preference');
  } else {
    // Otherwise default to light mode
    document.body.classList.remove('dark-theme');
    console.log('Defaulting to light theme');
  }
  
  // Update icon visibility based on current theme
  updateThemeIcons();
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save preference
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log('Theme toggled:', isDark ? 'dark' : 'light');
    
    // Update icon visibility
    updateThemeIcons();
  });
}

// Update visibility of theme icons based on current theme
function updateThemeIcons() {
  const lightIcon = document.querySelector('.light-icon');
  const darkIcon = document.querySelector('.dark-icon');
  const isDark = document.body.classList.contains('dark-theme');
  
  console.log('Updating theme icons, dark mode:', isDark);
  
  if (lightIcon && darkIcon) {
    // In dark theme: show sun icon, hide moon icon
    if (isDark) {
      lightIcon.style.opacity = '1';
      darkIcon.style.opacity = '0';
    } 
    // In light theme: hide sun icon, show moon icon
    else {
      lightIcon.style.opacity = '0';
      darkIcon.style.opacity = '1';
    }
  }
}

// Initialize popup modals for Resume and Contact
function initPopupModals() {
  // Get the popup modals
  const resumePopup = document.getElementById('resume-popup');
  const contactPopup = document.getElementById('contact-popup');
  
  // Get the modal content from hidden content
  const resumeContent = document.getElementById('resume-modal')?.querySelector('.modal-body');
  const contactContent = document.getElementById('contact-modal')?.querySelector('.modal-body');
  
  // Populate modal content
  if (resumeContent && resumePopup) {
    const resumePopupBody = resumePopup.querySelector('.popup-body');
    if (resumePopupBody) {
      resumePopupBody.innerHTML = resumeContent.innerHTML;
    }
  }
  
  if (contactContent && contactPopup) {
    const contactPopupBody = contactPopup.querySelector('.popup-body');
    if (contactPopupBody) {
      contactPopupBody.innerHTML = contactContent.innerHTML;
    }
  }
  
  // Set up event listeners for resume and contact nav links
  const resumeLink = document.querySelector('.menu__link[href="#resume"]');
  const contactLink = document.querySelector('.menu__link[href="#contact"]');
  
  if (resumeLink) {
    resumeLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumePopup);
    });
  }
  
  if (contactLink) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(contactPopup);
    });
  }
  
  // Set up close buttons for all modals
  const closeButtons = document.querySelectorAll('.close-popup');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.popup-modal');
      closeModal(modal);
    });
  });
  
  // Close modal when clicking outside of content
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup-modal')) {
      closeModal(e.target);
    }
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.popup-modal[style="display: block;"]');
      openModals.forEach(modal => closeModal(modal));
    }
  });
}

// Helper function to open a modal
function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
}

// Helper function to close a modal
function closeModal(modal) {
  if (!modal) return;
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
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
      
      // Ensure the card is visible by scrolling it into view
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Handle menu link clicks
  document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Extract section from href (e.g., "#about" -> "about")
      const section = link.getAttribute('href').substring(1);
      
      // If it's resume or contact, handle in initPopupModals
      if (section === 'resume' || section === 'contact') {
        return; // Let the other handler take care of this
      }
      
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

// Enable grid scrolling on category cards
function initGridScroll() {
  const categoryCardsContainer = document.querySelector('.category-cards');
  if (!categoryCardsContainer) return;
  
  // Mouse wheel scrolling for horizontal grid
  categoryCardsContainer.addEventListener('wheel', (e) => {
    // Prevent default scrolling behavior
    e.preventDefault();
    
    // Determine scroll direction and amount
    const scrollAmount = e.deltaY > 0 ? 150 : -150;
    
    // Scroll horizontally instead of vertically
    categoryCardsContainer.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    // Find the card at the center of the viewport after scrolling
    setTimeout(() => {
      const containerRect = categoryCardsContainer.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      let closestCard = null;
      let closestDistance = Infinity;
      
      categoryCards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });
      
      // Activate the closest card if it's not already active
      if (closestCard && !closestCard.classList.contains('active')) {
        closestCard.click();
      }
    }, 300); // Wait for the scroll to complete
  }, { passive: false });
  
  // Touch scrolling for mobile
  let touchStartX;
  let touchEndX;
  
  categoryCardsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  categoryCardsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    
    // Detect swipe direction
    const deltaX = touchEndX - touchStartX;
    
    if (Math.abs(deltaX) > 50) {
      // Find current active card
      const activeCard = document.querySelector('.category-card.active');
      if (!activeCard) return;
      
      // Get all cards as an array
      const cards = Array.from(categoryCards);
      const currentIndex = cards.indexOf(activeCard);
      
      // Calculate new index based on swipe direction
      let newIndex = currentIndex;
      if (deltaX > 0) {
        // Swiped right, go to previous card
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        // Swiped left, go to next card
        newIndex = Math.min(cards.length - 1, currentIndex + 1);
      }
      
      // Click the new card
      if (newIndex !== currentIndex) {
        cards[newIndex].click();
      }
    }
  }, { passive: true });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const activeCard = document.querySelector('.category-card.active');
    if (!activeCard) return;
    
    const cards = Array.from(categoryCards);
    const currentIndex = cards.indexOf(activeCard);
    let newIndex = currentIndex;
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft') {
      newIndex = Math.max(0, currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      newIndex = Math.min(cards.length - 1, currentIndex + 1);
    }
    
    // Click the new card
    if (newIndex !== currentIndex) {
      cards[newIndex].click();
    }
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
    
    // Disable the submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      form.reset();
      alert('Message sent successfully!');
    } catch (error) {
      // Show error message
      alert('Failed to send message. Please try again later.');
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}

// Animate proficiency bars
function animateProficiencyBars() {
  const proficiencyBars = document.querySelectorAll('.proficiency-fill');
  if (!proficiencyBars.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset the animation by removing and adding the element
        const bar = entry.target;
        const parent = bar.parentNode;
        const width = bar.style.width;
        
        // Create a new element
        const newBar = document.createElement('div');
        newBar.className = 'proficiency-fill';
        newBar.style.width = width;
        
        // Replace the old bar with the new one
        parent.removeChild(bar);
        parent.appendChild(newBar);
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  proficiencyBars.forEach(bar => {
    observer.observe(bar);
  });
}
