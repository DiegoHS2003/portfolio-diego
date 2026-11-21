document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // Tema claro/escuro (salvo no navegador)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light-theme');
    try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch (e) {}
  });

  // Menu mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  };
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Animação de entrada ao rolar
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Link ativo no menu conforme a seção visível
  const links = [...navLinks.querySelectorAll('a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));

  // Brilho do hero acompanha o mouse levemente
  const heroBg = document.querySelector('.hero-bg');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroBg && !reduce) {
    window.addEventListener('pointermove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      heroBg.style.setProperty('--mx', x + 'px');
      heroBg.style.setProperty('--my', y + 'px');
    }, { passive: true });
  }

  // Ano atual no rodapé
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
