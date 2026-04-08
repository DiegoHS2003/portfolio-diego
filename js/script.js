document.addEventListener('DOMContentLoaded', () => {
  // Toggle theme functionality
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.classList.add('light-theme');
    themeToggle.textContent = 'Modo escuro';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-theme');
    themeToggle.textContent = isLight ? 'Modo escuro' : 'Modo claro';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Animação de entrada para cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Aplicar animação inicial
  const cards = document.querySelectorAll('.skill-item, .stat');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Efeito de hover nos botões
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      if (button.classList.contains('button-primary')) {
        button.style.boxShadow = isLight 
          ? '0 25px 50px rgba(0, 0, 0, 0.2)' 
          : '0 25px 50px rgba(255, 255, 255, 0.2)';
      } else {
        button.style.boxShadow = isLight 
          ? '0 25px 50px rgba(0, 0, 0, 0.1)' 
          : '0 25px 50px rgba(255, 255, 255, 0.1)';
      }
    });
    button.addEventListener('mouseleave', () => {
      button.style.boxShadow = '';
    });
  });

  // Smooth scroll para links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});