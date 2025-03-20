document.addEventListener('DOMContentLoaded', () => {
  const timelineStops = document.querySelectorAll('.timeline-stop');
  const audio = new Audio('assets/audio/metallic_scroll.mp3');
  
  timelineStops.forEach((stop) => {
    const minimizedCard = stop.querySelector('.minimized-card');
    const maximizedCard = stop.querySelector('.maximized-card');
  
    minimizedCard.addEventListener('click', () => {
      audio.currentTime = 0;
      audio.play();
      timelineStops.forEach(otherStop => {
        if(otherStop !== stop) {
          otherStop.querySelector('.maximized-card').classList.remove('show');
          otherStop.querySelector('.minimized-card').classList.remove('active');
        }
      });
      minimizedCard.classList.toggle('active');
      maximizedCard.classList.toggle('show');
    });
  });
});
