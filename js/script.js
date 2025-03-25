// script.js

// DOM elements
const bodyEl = document.querySelector("body");
const themeToggleBtn = document.querySelector(".theme-toggle");
const activeCardContainer = document.querySelector(".active-card-container");
const categoryCards = document.querySelectorAll(".category-card[data-modal]");
const menuLinks = document.querySelectorAll(".menu__link");
const logoAboutLink = document.getElementById("logo-about-link");
const popupTriggers = document.querySelectorAll(".popup-trigger");
const hiddenModals = document.querySelectorAll(".hidden-content > div");
const resumePopup = document.getElementById("resume-popup");
const contactPopup = document.getElementById("contact-popup");
const closeButtons = document.querySelectorAll(".close-popup");
const yearSpan = document.getElementById("current-year");
const contactForm = document.getElementById("contact-form");
const aboutContent = document.getElementById("active-content").innerHTML; // Store original About content

// Set current year
const currentYear = new Date().getFullYear();
if (yearSpan) {
  yearSpan.textContent = currentYear;
}

// THEME TOGGLE
themeToggleBtn.addEventListener("click", () => {
  bodyEl.classList.toggle("dark-theme");
});

// Function to update active menu link and logo state
function updateActiveMenuLink(sectionId) {
  // Check if we're highlighting the About section
  const isAboutActive = sectionId === "about";
  
  // Update the logo styling to show it's active for the About section
  if (logoAboutLink) {
    logoAboutLink.classList.toggle('active', isAboutActive);
  }
  
  // Update other menu links
  menuLinks.forEach(link => {
    if (!link.classList.contains('popup-trigger')) {
      const href = link.getAttribute('href').substring(1); // Remove #
      link.classList.toggle('active', href === sectionId);
    }
  });
}

// Function to open popup
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }
}

// Function to close popup
function closePopup(popup) {
  popup.style.display = "none";
  document.body.style.overflow = ""; // Restore scrolling
}

// Function to ensure about content is properly loaded
function loadAboutContent() {
  const contentEl = activeCardContainer.querySelector(".active-card-content");
  if (contentEl) {
    // Restore the original About content
    contentEl.innerHTML = aboutContent;
    
    // Make sure the header is properly set up
    const headerEl = activeCardContainer.querySelector(".active-card-header");
    if (headerEl) {
      headerEl.innerHTML = `
        <div class="profile-container">
          <div class="profile-photo-wrapper">
            <img src="img/Home-Me.jpg" alt="Ashish Paka" class="profile-photo">
          </div>
          <h2 class="active-card-title">Hi, I am Ashish. Nice to meet you!</h2>
        </div>
        <div class="subtitle-wrapper" style="text-align: center; margin-bottom: 2rem;">
          <div class="active-card-subtitle">
            Robotics & Autonomous Systems Engineer
          </div>
        </div>
      `;
    }
  }
}

// ACTIVATE CARD + LOAD CONTENT with animations
categoryCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    // Clear 'active' class from all cards
    categoryCards.forEach((c) => c.classList.remove("active"));
    
    // Add active class to clicked card
    card.classList.add("active");

    const modalId = card.getAttribute("data-modal");
    const sectionTitle = card.getAttribute("data-section") || "";
    const sectionId = modalId.replace('-modal', '');
    
    // Update active menu link
    updateActiveMenuLink(sectionId);

    // Add animation class to content
    const contentEl = activeCardContainer.querySelector(".active-card-content");
    if (contentEl) {
      contentEl.style.opacity = 0;
      setTimeout(() => {
        // Find the matching modal content
        if (modalId === "about-modal") {
          loadAboutContent();
        } else {
          const matchingModal = document.getElementById(modalId);
          if (!matchingModal) return;

          // Update the left side with that modal's HTML
          const titleEl = activeCardContainer.querySelector(".active-card-title");
          
          if (titleEl) {
            titleEl.textContent = sectionTitle;
          }

          // Only copy the modal body content, not the title
          const modalBody = matchingModal.querySelector(".modal-body");
          if (modalBody) {
            contentEl.innerHTML = modalBody.innerHTML;
          }
          
          // Reset header for non-about sections
          const headerEl = activeCardContainer.querySelector(".active-card-header");
          if (headerEl) {
            headerEl.innerHTML = `
              <h2 class="active-card-title">${sectionTitle}</h2>
            `;
          }
        }
        
        // Fade in content
        contentEl.style.opacity = 1;
        contentEl.style.transition = "opacity 0.5s ease";
        
        // Scroll content to top
        activeCardContainer.scrollTop = 0;
      }, 300);
    }

    // Ensure the card is visible in the viewport
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  });
});

// Handle logo About link click
if (logoAboutLink) {
  logoAboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    const aboutCard = document.querySelector('[data-modal="about-modal"]');
    if (aboutCard) {
      aboutCard.click();
    }
  });
}

// Handle regular menu link clicks
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href').substring(1); // Remove #
    
    // Handle popup links
    if (href === 'resume') {
      openPopup('resume-popup');
      return;
    }
    
    if (href === 'contact') {
      openPopup('contact-popup');
      return;
    }
    
    // Handle regular section links
    const modalId = `${href}-modal`;
    const card = document.querySelector(`[data-modal="${modalId}"]`);
    if (card) {
      card.click();
    }
  });
});

// CLOSE POPUP
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup(btn.closest(".popup-modal"));
  });
});

// Close popup if user clicks outside content
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-modal")) {
    closePopup(e.target);
  }
});

// Handle contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    const formData = new FormData(contactForm);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Message sent successfully!');
    contactForm.reset();
    closePopup(contactPopup);
  });
}

// Handle escape key to close popups
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openPopup = document.querySelector('.popup-modal[style*="display: block"]');
    if (openPopup) {
      closePopup(openPopup);
    }
  }
});

// Set initial active card (About section)
window.addEventListener('load', () => {
  const aboutCard = document.querySelector('[data-modal="about-modal"]');
  if (aboutCard) {
    aboutCard.classList.add('active');
    aboutCard.click();
  }
});

// Function to get the next or previous card
function getAdjacentCard(direction) {
  const cards = Array.from(categoryCards);
  const activeCard = document.querySelector('.category-card.active');
  const currentIndex = cards.indexOf(activeCard);
  
  if (direction === 'next') {
    return cards[currentIndex + 1] || cards[0]; // Loop to first if at end
  } else {
    return cards[currentIndex - 1] || cards[cards.length - 1]; // Loop to last if at start
  }
}

// Function to handle mouse wheel scrolling
function handleWheel(event) {
  // Don't handle wheel events if they occur in the active card content
  if (event.target.closest('.active-card-content')) {
    return;
  }
  
  // If we're in the active card container but not in the content
  // or if we're anywhere else in the browse container
  if (event.target.closest('.browse-container')) {
    event.preventDefault();
    
    // Determine scroll direction
    const direction = event.deltaY > 0 ? 'next' : 'prev';
    
    // Get the next/previous card
    const targetCard = getAdjacentCard(direction);
    
    // Simulate click on the target card
    if (targetCard) {
      targetCard.click();
    }
  }
}

// Add wheel event listener to the container
const browseContainer = document.querySelector('.browse-container');
if (browseContainer) {
  browseContainer.addEventListener('wheel', handleWheel, { passive: false });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  // Don't handle keyboard events if focus is in a form element
  if (e.target.matches('input, textarea')) {
    return;
  }
  
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    const nextCard = getAdjacentCard('next');
    if (nextCard) nextCard.click();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    const prevCard = getAdjacentCard('prev');
    if (prevCard) prevCard.click();
  }
});
