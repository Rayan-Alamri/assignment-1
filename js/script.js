// ---------- Smooth scrolling ----------
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Only handle in-page links like <a href="#about">
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    // Optional: update hash without jump
    history.pushState(null, '', id);
  });
});

// ---------- Dark mode toggle with memory ----------
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const STORAGE_KEY = 'theme'; // 'dark' or 'light'

// Apply a theme ('dark' or 'light')
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggleBtn.setAttribute('aria-pressed', String(theme === 'dark'));
}

// Initialize: use saved theme or system preference
(function initTheme(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(systemDark ? 'dark' : 'light');
  }
})();

// Toggle on click and save
toggleBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
});
