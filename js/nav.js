// ── nav.js: inject shared header + footer, highlight active link, theme toggle ──
//test
(function() {
  const pages = [
    { href: '/index.html',    label: 'Home'     },
    { href: '/projects.html', label: 'Projects' },
    { href: '/research.html', label: 'Research' },
    { href: '/blog.html',     label: 'Blog'     },
    { href: '/cv.html',       label: 'CV'       },
  ];

  // ── Apply saved theme BEFORE paint to avoid flash ──
  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Detect active page
  const path = window.location.pathname;
  const baseName = path.split('/').pop() || 'index.html';

  function navLink(p) {
    const isActive = (baseName === p.href.replace('/','')) ||
                     (baseName === '' && p.href === '/index.html');
    return `<li><a href="${p.href}" ${isActive ? 'class="active"' : ''}>${p.label}</a></li>`;
  }

  // SVG icons
  const sunSVG = `<svg class="icon-sun" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2"  x2="12" y2="5"/>
    <line x1="12" y1="19" x2="12" y2="22"/>
    <line x1="2"  y1="12" x2="5"  y2="12"/>
    <line x1="19" y1="12" x2="22" y2="12"/>
    <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"/>
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
    <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66"/>
    <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"/>
  </svg>`;

  const moonSVG = `<svg class="icon-moon" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  const headerHTML = `
<header id="site-header">
  <div class="container nav-inner">
    <a class="nav-logo" href="/index.html">Woojin<span>.</span></a>
    <nav aria-label="Main navigation">
      <ul>${pages.map(navLink).join('')}</ul>
    </nav>
    <div style="display:flex;align-items:center;gap:0.75rem;">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
        ${sunSVG}${moonSVG}
      </button>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
  <ul>${pages.map(navLink).join('')}</ul>
</nav>`;

  const footerHTML = `
<footer>
  <div class="container footer-inner">
    <p>© ${new Date().getFullYear()} Woojin — Built with GitHub Pages</p>
    <div class="footer-links">
      <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener">GitHub</a>
      <a href="https://linkedin.com/in/YOUR_PROFILE" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:your@email.com">Email</a>
    </div>
  </div>
</footer>`;

  // Inject into page
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── Sticky shadow on scroll ──
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  });

  // ── Theme toggle ──
  const themeBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Sync with OS preference changes (if user hasn't manually set a preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ── Mobile toggle ──
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
