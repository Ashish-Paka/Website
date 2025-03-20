const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem('theme', mode);
  themeIcon.src = mode === 'dark-mode' 
    ? 'assets/icons/dark_mode_icon.svg' 
    : 'assets/icons/light_mode_icon.svg';
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
  const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
  setTheme(newTheme);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light-mode';
  setTheme(savedTheme);
});
