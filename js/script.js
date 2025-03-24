// Mobile Menu Toggle
const menuIcon = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
    menuIcon.classList.toggle('active');
    menuBody.classList.toggle('active');
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for Fade-in Animation
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .timeline__stop, .skill-card, .publication-card').forEach(element => {
  element.classList.add('fade-in');
  observer.observe(element);
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.classList.add('dark-mode-toggle');
darkModeToggle.innerHTML = '🌓';
document.body.appendChild(darkModeToggle);

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Timeline Navigation
const timelineStops = document.querySelectorAll('.timeline__stop');
let currentStop = 0;

function updateTimeline() {
  timelineStops.forEach((stop, index) => {
    if (index === currentStop) {
      stop.classList.add('active');
    } else {
      stop.classList.remove('active');
    }
  });
}

timelineStops.forEach((stop, index) => {
  stop.addEventListener('click', () => {
    currentStop = index;
    updateTimeline();
  });
});

// Knowledge Map Visualization
const knowledgeMap = document.querySelector('.knowledge-map');
if (knowledgeMap) {
  const nodes = knowledgeMap.querySelectorAll('.knowledge-node');
  
  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const relatedNodes = document.querySelectorAll(
        `.knowledge-node[data-category="${node.dataset.category}"]`
      );
      relatedNodes.forEach(related => related.classList.add('highlight'));
    });
    
    node.addEventListener('mouseleave', () => {
      nodes.forEach(n => n.classList.remove('highlight'));
    });
  });
}

// Form Validation
const contactForm = document.querySelector('.form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Add your form submission logic here
    console.log('Form data:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('form__success');
    successMessage.textContent = 'Message sent successfully!';
    contactForm.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  });
}

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

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
