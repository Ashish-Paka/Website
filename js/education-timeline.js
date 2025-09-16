// Interactive Education Timeline Logic
// Handles circle selection, info card animation, and horizontal line animation
// Uses vanilla JS and CSS transitions (no external animation library required)

document.addEventListener('DOMContentLoaded', function () {
  const circles = document.querySelectorAll('.vertical-timeline .timeline-circle');
  const cards = document.querySelectorAll('.timeline-info-card');
  const hlines = [
    document.getElementById('timeline-hline-0'),
    document.getElementById('timeline-hline-1'),
    document.getElementById('timeline-hline-2')
  ];
  let activeIndex = 0;
  let animating = false;

  function setActive(index) {
    if (animating || index === activeIndex) return;
    animating = true;

    // Animate out current card
    const prevCard = cards[activeIndex];
    prevCard.classList.remove('active');
    // Animate out horizontal line
    hlines[activeIndex].classList.remove('visible');

    // Animate in new card after short delay
    setTimeout(() => {
      // Remove active from previous circle
      circles[activeIndex].classList.remove('active');
      // Add active to new circle
      circles[index].classList.add('active');
      // Animate in horizontal line
      hlines[index].classList.add('visible');
      // Animate in new card
      cards[index].classList.add('active');
      activeIndex = index;
      // Allow new animation after transition
      setTimeout(() => {
        animating = false;
      }, 500);
    }, 350);
  }

  // Initial state: show first horizontal line
  hlines[0].classList.add('visible');

  // Add click and keyboard handlers
  circles.forEach((circle, idx) => {
    circle.addEventListener('click', () => setActive(idx));
    circle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setActive(idx);
      }
    });
  });
});
