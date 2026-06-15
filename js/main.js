// DATA SOUS CHEF — main.js v3.1 (no animations)
document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll shadow only
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = open ? 'none' : 'flex';
    });
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (mobileMenu) mobileMenu.style.display = 'none';
      }
    });
  });

  // Recipe hover highlight (simple, no animation)
  document.querySelectorAll('.recipe-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.querySelectorAll('.recipe-item').forEach(i => i.style.opacity = i === item ? '1' : '0.45');
    });
    item.addEventListener('mouseleave', () => {
      document.querySelectorAll('.recipe-item').forEach(i => i.style.opacity = '1');
    });
  });

});
