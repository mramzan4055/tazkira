(() => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Universal Dynamic Lazy Loading Helper
  function applyLazyLoading(root = document) {
    const images = root.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      if (!img.closest('.lux-hero-wrap, .hero-section, .page-header')) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    });

    const iframes = root.querySelectorAll('iframe:not([loading])');
    iframes.forEach(iframe => iframe.setAttribute('loading', 'lazy'));
  }

  if (prefersReducedMotion) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => applyLazyLoading());
    } else {
      applyLazyLoading();
    }
    return;
  }

  function initMotionSystem() {
    applyLazyLoading();

    // 1. HERO ENTRANCE
    const hero = document.querySelector('.lux-hero-wrap, .hero-section, .page-header, main > section:first-of-type');
    if (hero && !hero.dataset.heroInit) {
      hero.dataset.heroInit = 'true';
      const visual = hero.querySelector('.lux-hero-visual, .lux-hero-img-wrap, .hero-visual, img');
      const heroChildren = Array.from(hero.children).filter(child => child !== visual && !child.contains(visual));
      
      heroChildren.forEach((node, idx) => {
        node.classList.add('site-hero-enter');
        node.style.transitionDelay = `${idx * 75}ms`;
      });
      if (visual) visual.classList.add('site-hero-visual-enter');

      document.documentElement.dataset.heroMotion = 'ready';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroChildren.forEach(node => node.classList.add('is-hero-visible'));
          if (visual) visual.classList.add('is-hero-visible');
        });
      });
    }

    // 2. SECTION SCROLL REVEAL VIA INTERSECTION OBSERVER
    if (!('IntersectionObserver' in window)) return;

    const sections = Array.from(document.querySelectorAll('section, .lux-feature-strip, .lux-faq-section'));
    const revealTargets = sections.filter(section => {
      if (section.matches('[data-no-reveal]')) return false;
      if (hero && (section === hero || hero.contains(section))) return false;
      return true;
    });

    if (!revealTargets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-section-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '50px 0px', threshold: 0.05 });

    revealTargets.forEach(section => {
      section.classList.add('site-reveal');
      observer.observe(section);
    });

    document.documentElement.dataset.sectionMotion = 'ready';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotionSystem);
  } else {
    initMotionSystem();
  }
})();
