document.addEventListener('DOMContentLoaded', () => {
  const timelineStops = document.querySelectorAll('.timeline-stop');
  // Metallic scroll sound (make sure metallic_scroll.mp3 is in assets/audio/)
  const audio = new Audio('assets/audio/metallic_scroll.mp3');
  
  timelineStops.forEach((stop) => {
    const minimizedCard = stop.querySelector('.minimized-card');
    const maximizedCard = stop.querySelector('.maximized-card');
    
    minimizedCard.addEventListener('click', () => {
      // Play metallic scroll sound
      audio.currentTime = 0;
      audio.play();
      
      // Close any other open cards
      timelineStops.forEach(otherStop => {
        if (otherStop !== stop) {
          const otherMax = otherStop.querySelector('.maximized-card');
          const otherMin = otherStop.querySelector('.minimized-card');
          otherMax.classList.remove('show');
          otherMin.classList.remove('active');
        }
      });
      
      // Toggle the current card
      minimizedCard.classList.toggle('active');
      maximizedCard.classList.toggle('show');
    });
  });
});
