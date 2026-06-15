// DATA SOUS CHEF — main.js v3.0
document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Scroll reveal
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Animated counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Code typewriter
  const lines = [
    [{ c:'code-comment', t:'# DataSousChief — Generated Cleaning Script' }],
    [],
    [{ c:'code-keyword', t:'import' }, { c:'code-var', t:' pandas ' }, { c:'code-keyword', t:'as' }, { c:'code-var', t:' pd' }],
    [{ c:'code-keyword', t:'from' }, { c:'code-var', t:' recipe_library ' }, { c:'code-keyword', t:'import' }, { c:'code-var', t:' *' }],
    [],
    [{ c:'code-comment', t:'# Load your dataset' }],
    [{ c:'code-var', t:'df = pd.' }, { c:'code-func', t:'read_csv' }, { c:'code-var', t:'(' }, { c:'code-string', t:'"school_census.csv"' }, { c:'code-var', t:')' }],
    [],
    [{ c:'code-comment', t:'# Apply cleaning recipes' }],
    [{ c:'code-var', t:'df = ' }, { c:'code-func', t:'strip_whitespace' }, { c:'code-var', t:'(df)' }],
    [{ c:'code-var', t:'df = ' }, { c:'code-func', t:'snake_case_columns' }, { c:'code-var', t:'(df)' }],
    [{ c:'code-var', t:'df = ' }, { c:'code-func', t:'recode_missing' }, { c:'code-var', t:'(df, codes=[' }, { c:'code-string', t:'"-99"' }, { c:'code-var', t:', ' }, { c:'code-string', t:'"N/A"' }, { c:'code-var', t:'])' }],
    [{ c:'code-var', t:'df = ' }, { c:'code-func', t:'deduplicate' }, { c:'code-var', t:'(df, key_cols=[' }, { c:'code-string', t:'"urn"' }, { c:'code-var', t:'])' }],
    [{ c:'code-var', t:'df = ' }, { c:'code-func', t:'validate_urn' }, { c:'code-var', t:'(df, col=' }, { c:'code-string', t:'"urn"' }, { c:'code-var', t:')' }],
  ];

  const codeBody = document.getElementById('code-body');
  const cursor = document.getElementById('typing-cursor');
  if (codeBody) {
    let i = 0;
    function nextLine() {
      if (i >= lines.length) {
        i = 0;
        setTimeout(() => { codeBody.innerHTML = ''; nextLine(); }, 3000);
        return;
      }
      const row = document.createElement('div');
      row.className = 'code-line';
      const ln = document.createElement('span');
      ln.className = 'ln';
      ln.textContent = String(i + 1).padStart(2, ' ');
      row.appendChild(ln);
      lines[i].forEach(p => {
        const s = document.createElement('span');
        s.className = p.c; s.textContent = p.t;
        row.appendChild(s);
      });
      codeBody.appendChild(row);
      if (cursor && lines[i].length > 0) row.appendChild(cursor);
      i++;
      setTimeout(nextLine, lines[i - 1] && lines[i - 1].length === 0 ? 80 : 180 + Math.random() * 120);
    }
    nextLine();
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = open ? 'none' : 'flex';
    });
  }

  // Smooth nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); if (mobileMenu) mobileMenu.style.display = 'none'; }
    });
  });

  // Recipe hover
  document.querySelectorAll('.recipe-item').forEach(item => {
    item.addEventListener('mouseenter', () => document.querySelectorAll('.recipe-item').forEach(i => i.style.opacity = i === item ? '1' : '0.5'));
    item.addEventListener('mouseleave', () => document.querySelectorAll('.recipe-item').forEach(i => i.style.opacity = '1'));
  });

});
