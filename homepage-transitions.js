(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  function initHomeMotion() {
    const hero = document.querySelector('.lux-hero-wrap');
    if (hero && !hero.dataset.homeInit) {
      hero.dataset.homeInit = 'true';
      const visual = hero.querySelector('.lux-hero-visual, .lux-hero-img-wrap');
      const textNodes = Array.from(hero.children).filter(node => node !== visual && !node.contains(visual));
      textNodes.forEach((node, idx) => {
        node.classList.add('home-hero-enter');
        node.style.transitionDelay = `${idx * 75}ms`;
      });
      if (visual) visual.classList.add('home-hero-visual-enter');
      document.documentElement.dataset.homeMotion = 'ready';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        textNodes.forEach(node => node.classList.add('is-home-visible'));
        if (visual) visual.classList.add('is-home-visible');
      }));
    }

    if (!('IntersectionObserver' in window)) return;
    const selectors = [
      '.lux-course-grid', '.lux-teacher-grid', '.lux-testimonial-grid',
      '.lux-process-grid', '.lux-pricing-grid', '.lux-faq-section',
      '.lux-teacher-card-wrap', '.lux-process-card'
    ];
    const targets = Array.from(document.querySelectorAll(selectors.join(','))).filter((node, index, list) => list.indexOf(node) === index);
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-home-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '50px 0px', threshold: 0.01 });

    targets.forEach(node => {
      node.classList.add('home-stagger');
      observer.observe(node);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeMotion);
  } else {
    initHomeMotion();
  }
})();
