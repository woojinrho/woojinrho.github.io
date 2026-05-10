// ── nav.js: inject shared header + footer, highlight active link ──

(function() {
  const pages = [
    { href: '/index.html',    label: 'Home'     },
    { href: '/projects.html', label: 'Projects' },
    { href: '/research.html', label: 'Research' },
    { href: '/blog.html',     label: 'Blog'     },
    { href: '/cv.html',       label: 'CV'       },
  ];

  // Detect active page
  const path = window.location.pathname;
  const baseName = path.split('/').pop() || 'index.html';

  function navLink(p) {
    const isActive = (baseName === p.href.replace('/','')) ||
                     (baseName === '' && p.href === '/index.html');
    return `<li><a href="${p.href}" ${isActive ? 'class="active"' : ''}>${p.label}</a></li>`;
  }

  const headerHTML = `
<header id="site-header">
  <div class="container nav-inner">
    <a class="nav-logo" href="/index.html">Woojin<span>.</span></a>
    <nav aria-label="Main navigation">
      <ul>${pages.map(navLink).join('')}</ul>
    </nav>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
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

  // Sticky shadow on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  });

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  toggle.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
