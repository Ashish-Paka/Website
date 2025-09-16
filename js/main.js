// Apple-style Portfolio with Latch Scrolling

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Apple-style portfolio with latch scrolling...');

    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initLatchScrolling();
    initSmoothNavigation();
    initContactForm();
    initScrollAnimations();
    initAdaptiveLayouts();
    initExpertiseCarousel();
    initFloatingNavButton();
    initProgressIndicator();
    initOpportunityRibbon();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleInputs = document.querySelectorAll('.theme-toggle-input');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    // Set initial checkbox states based on saved theme
    themeToggleInputs.forEach(input => {
        input.checked = savedTheme === 'dark';
    });

    // Add event listeners to all theme toggle checkboxes
    themeToggleInputs.forEach(input => {
        input.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Sync all other theme toggle checkboxes
            themeToggleInputs.forEach(otherInput => {
                otherInput.checked = this.checked;
            });

            console.log('Theme changed to:', newTheme);
        });
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

    if (menuToggle && mobileNav) {
        // Toggle mobile menu
        menuToggle.addEventListener('click', function() {
            const isActive = menuToggle.classList.contains('active');

            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInsideMenu = mobileNav.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);

            if (!isClickInsideMenu && !isClickOnToggle && menuToggle.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        menuToggle.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scroll
    }
}

// Latch Scrolling Implementation
function initLatchScrolling() {
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    // Throttle function for better performance
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounce function for scroll end detection
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Get current section based on scroll position
    function getCurrentSection() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const currentIndex = Math.round(scrollTop / windowHeight);
        return Math.max(0, Math.min(currentIndex, sections.length - 1));
    }

    // Scroll to specific section
    function scrollToSection(index, smooth = true) {
        if (index < 0 || index >= sections.length) return;

        const targetPosition = index * window.innerHeight;

        if (smooth) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(0, targetPosition);
        }

        currentSectionIndex = index;
        updateActiveNavLink(sections[index].id);
    }

    // Handle wheel events for latch scrolling
    function handleWheel(e) {
        e.preventDefault();

        if (isScrolling) return;

        const delta = e.deltaY > 0 ? 1 : -1;
        const newIndex = currentSectionIndex + delta;

        if (newIndex >= 0 && newIndex < sections.length) {
            isScrolling = true;
            scrollToSection(newIndex);

            // Reset scrolling flag after animation
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Handle touch events for mobile latch scrolling
    let touchStartY = 0;
    let touchEndY = 0;
    let touchMoved = false;

    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
    }

    function handleTouchMove(e) {
        touchMoved = true;
        e.preventDefault(); // Prevent default scrolling
    }

    function handleTouchEnd(e) {
        if (!touchMoved) return;

        touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(deltaY) > threshold && !isScrolling) {
            const direction = deltaY > 0 ? 1 : -1;
            const newIndex = currentSectionIndex + direction;

            if (newIndex >= 0 && newIndex < sections.length) {
                isScrolling = true;
                scrollToSection(newIndex);

                // Reset scrolling flag
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        }
    }

    // Handle keyboard navigation
    function handleKeyDown(e) {
        if (isScrolling) return;

        let newIndex = currentSectionIndex;

        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ': // Spacebar
                e.preventDefault();
                newIndex = currentSectionIndex + 1;
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                newIndex = currentSectionIndex - 1;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = sections.length - 1;
                break;
        }

        if (newIndex !== currentSectionIndex && newIndex >= 0 && newIndex < sections.length) {
            isScrolling = true;
            scrollToSection(newIndex);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    // Handle scroll events (for manual scrolling and ensuring we're latched)
    const handleScroll = debounce(() => {
        if (isScrolling) return;

        const newSectionIndex = getCurrentSection();
        if (newSectionIndex !== currentSectionIndex) {
            currentSectionIndex = newSectionIndex;
            updateActiveNavLink(sections[currentSectionIndex].id);
        }

        // Ensure we're properly latched to a section
        const scrollTop = window.pageYOffset;
        const targetPosition = currentSectionIndex * window.innerHeight;
        const tolerance = 10; // Allow small variations

        if (Math.abs(scrollTop - targetPosition) > tolerance) {
            scrollToSection(currentSectionIndex, false);
        }
    }, 150);

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    // Handle window resize
    window.addEventListener('resize', throttle(() => {
        // Recalculate current section and snap to it
        const newSectionIndex = getCurrentSection();
        scrollToSection(newSectionIndex, false);
    }, 250));

    // Initialize current section on load
    setTimeout(() => {
        const initialSection = getCurrentSection();
        scrollToSection(initialSection, false);
    }, 100);

    // Expose scrollToSection for navigation clicks
    window.latchScrollToSection = scrollToSection;
}

// Navigation Integration with Latch Scrolling
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile, .logo');
    const sections = document.querySelectorAll('.section');

    // Create section ID to index mapping
    const sectionMap = new Map();
    sections.forEach((section, index) => {
        sectionMap.set(section.id, index);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal anchor link
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const sectionIndex = sectionMap.get(targetId);

                if (sectionIndex !== undefined && window.latchScrollToSection) {
                    window.latchScrollToSection(sectionIndex);
                }
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default to handle both submissions

            // Get form data for validation
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // First, send to CSV backup function
            const csvData = { name, email, subject, message };

            fetch('/.netlify/functions/csv-backup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(csvData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('CSV backup successful:', data);
            })
            .catch(error => {
                console.error('CSV backup failed:', error);
                // Continue with main form submission even if backup fails
            });

            // Then submit to Netlify forms
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    // Redirect to thank you page on success
                    window.location.href = '/thank-you.html';
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.education-card, .experience-card, .project-card, .highlight-item, .achievement-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state and observe elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Utility Functions

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-family: var(--font-family);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;

    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#34C759';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#FF3B30';
    } else {
        notification.style.backgroundColor = '#007AFF';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Adaptive Layouts Functionality
function initAdaptiveLayouts() {
    console.log('Initializing adaptive layouts...');
    initEducationTabs();
    initExperienceAccordion();
    initSkillsCollapse();
    initProjectModals();
}

// Education Tabs
function initEducationTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active to clicked tab and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Experience Section (No accordion functionality)
function initExperienceAccordion() {
    // No accordion functionality needed - all content is visible
    console.log('Experience section initialized without accordion');
}

// Skills Section (No collapsible functionality)
function initSkillsCollapse() {
    // No collapsible functionality needed - all content is visible
    console.log('Skills section initialized without collapsible categories');
}

// Project Modals
function openProjectModal(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal(projectId) {
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initProjectModals() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// Education Details Modal
function showEducationDetails(level) {
    // This can be expanded to show more detailed information in a modal
    // For now, just log the action
    console.log(`Showing details for ${level}`);
}

// Expertise Carousel Functionality
function initExpertiseCarousel() {
    const carousel = document.querySelector('.expertise-carousel');
    const container = document.querySelector('.expertise-carousel-container');

    if (!carousel || !container) return;

    let currentSlide = 0;
    const totalSlides = carousel.children.length;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    // Touch/Mouse event handlers
    function handleStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        carousel.style.transition = 'none';
    }

    function handleMove(e) {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diffX = currentX - startX;

        // Get responsive values
        const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        let slideWidth, centerOffset;

        if (isTablet) {
            slideWidth = 45;
            centerOffset = 27.5;
        } else if (isMobile) {
            slideWidth = 65;
            centerOffset = 17.5;
        } else {
            slideWidth = 65;
            centerOffset = 17.5;
        }

        const currentTransform = centerOffset - (currentSlide * slideWidth);
        const newTransform = currentTransform + (diffX / container.offsetWidth * 100);

        carousel.style.transform = `translateX(${newTransform}%)`;
    }

    function handleEnd() {
        if (!isDragging) return;

        isDragging = false;
        carousel.style.transition = 'transform 0.3s ease';

        const diffX = currentX - startX;
        const threshold = container.offsetWidth * 0.3; // 30% of container width

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe right - go to previous slide
                currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            } else {
                // Swipe left - go to next slide
                currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            }
        }

        updateCarousel();
    }

    function updateCarousel() {
        // Responsive slide widths and offsets
        const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches;
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        let slideWidth, centerOffset;

        if (isTablet) {
            slideWidth = 45; // 45% width for tablet
            centerOffset = 27.5; // Center offset for tablet (100-45)/2 = 27.5
        } else if (isMobile) {
            slideWidth = 65; // 65% width for mobile
            centerOffset = 17.5; // Center offset for mobile (100-65)/2 = 17.5
        } else {
            // Desktop - shouldn't reach here but fallback
            slideWidth = 65;
            centerOffset = 17.5;
        }

        const translateX = centerOffset - (currentSlide * slideWidth);
        carousel.style.transform = `translateX(${translateX}%)`;
    }

    // Add event listeners for touch devices
    container.addEventListener('touchstart', handleStart, { passive: false });
    container.addEventListener('touchmove', handleMove, { passive: false });
    container.addEventListener('touchend', handleEnd);

    // Add event listeners for mouse (desktop testing)
    container.addEventListener('mousedown', handleStart);
    container.addEventListener('mousemove', handleMove);
    container.addEventListener('mouseup', handleEnd);
    container.addEventListener('mouseleave', handleEnd);

    // Initialize carousel position
    updateCarousel();

    // Handle window resize to update carousel positioning
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Auto-advance every 7 seconds (optional)
    setInterval(() => {
        if (!isDragging) {
            currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            updateCarousel();
        }
    }, 7000);

    console.log('Expertise carousel initialized');
}

// Floating Navigation Button Functionality
function initFloatingNavButton() {
    const floatingBtn = document.getElementById('floatingNavBtn');
    const arrowDown = floatingBtn.querySelector('.nav-arrow-down');
    const arrowUp = floatingBtn.querySelector('.nav-arrow-up');
    const navText = floatingBtn.querySelector('.nav-text');
    const sections = document.querySelectorAll('.section');

    let currentSectionIndex = 0;
    let isAtBottom = false;

    function updateButtonState() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check if we're at the bottom of the page
        isAtBottom = scrollPosition + windowHeight >= documentHeight - 50;

        if (isAtBottom) {
            // Show "Top" with up arrow
            arrowDown.style.display = 'none';
            arrowUp.style.display = 'block';
            navText.textContent = 'Top';
        } else {
            // Show "Next" with down arrow
            arrowDown.style.display = 'block';
            arrowUp.style.display = 'none';
            navText.textContent = 'Next';
        }
    }

    function scrollToNextSection() {
        if (isAtBottom) {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Find current section based on scroll position
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            let currentIndex = -1;

            // Find which section we're currently viewing
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop - 100; // Account for header
                const sectionBottom = sectionTop + section.offsetHeight;

                // Check if the section is currently in view
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentIndex = i;
                    break;
                }
            }

            // If no current section found, find the next section below current scroll
            if (currentIndex === -1) {
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const sectionTop = section.offsetTop - 100;

                    if (sectionTop > scrollPosition) {
                        currentIndex = i - 1;
                        break;
                    }
                }
            }

            // Scroll to next section
            const nextIndex = currentIndex + 1;
            if (nextIndex < sections.length) {
                const nextSection = sections[nextIndex];
                const targetPosition = nextSection.offsetTop - 80; // Account for header
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            } else {
                // If we're at the last section, scroll to bottom
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            }
        }
    }

    // Update button state on scroll
    window.addEventListener('scroll', updateButtonState);

    // Handle button click
    floatingBtn.addEventListener('click', scrollToNextSection);

    // Initial state
    updateButtonState();

    console.log('Floating navigation button initialized');
}

// Progress Indicator Functionality
function initProgressIndicator() {
    const progressBar = document.getElementById('progressBar');

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Ensure the percentage is between 0 and 100
        const clampedPercent = Math.min(100, Math.max(0, scrollPercent));

        progressBar.style.width = clampedPercent + '%';
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);

    // Initial progress calculation
    updateProgress();

    console.log('Progress indicator initialized');
}

// Opportunity Ribbon Functionality
function initOpportunityRibbon() {
    const opportunityRibbon = document.getElementById('opportunityRibbon');
    const contactSection = document.getElementById('contact');

    if (opportunityRibbon && contactSection) {
        opportunityRibbon.addEventListener('click', function() {
            // Scroll to contact section with smooth behavior
            const targetPosition = contactSection.offsetTop - 80; // Account for header
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }

    console.log('Opportunity ribbon initialized');
}