(() => {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  function initContentMotion() {
    const phrases = [
      'CURRICULUM EXCELLENCE',
      'Quran Recitation & Hifz',
      'Arabic Language',
      'Islamic Studies',
      'Not Sure Where to Begin',
      'New to Islam',
      'UNBROKEN IJAZAH SANAD',
      'Why families choose Tazkirah'
    ];
    const sectionFor = node => node && (node.closest('section') || node.closest('[class*="section"]'));
    const candidateNodes = Array.from(document.querySelectorAll('h1,h2,h3,h4,p,span,a,div'));
    const targets = [];
    
    phrases.forEach(phrase => {
      const lowerPhrase = phrase.toLowerCase();
      const node = candidateNodes.find(element => (element.textContent || '').toLowerCase().includes(lowerPhrase));
      const section = sectionFor(node);
      if (section && !targets.includes(section)) targets.push(section);
    });
    if (!targets.length) return;

    targets.forEach(section => {
      section.classList.add('home-targeted-section');
      const heading = section.querySelector('h1,h2,h3,.lux-section-title,.lux-eyebrow');
      if (heading) heading.classList.add('home-targeted-heading');
      section.querySelectorAll('p,.lux-section-desc').forEach(node => node.classList.add('home-targeted-copy'));
      section.querySelectorAll('.lux-course-card,.lux-process-card,.lux-pricing-card,.lux-teacher-card-wrap,a[href$="courses.html"],a[href$="free-class.html"],a[href$="course-new-muslims.html"]').forEach(node => node.classList.add('home-targeted-card'));
      section.querySelectorAll('img,.lux-hero-visual,.lux-hero-img-wrap').forEach(node => node.classList.add('home-targeted-media'));
    });

    document.documentElement.dataset.targetMotion = 'ready';
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-target-visible');
        observer.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -5% 0px', threshold: 0.05});

    targets.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add('is-target-visible');
      } else {
        observer.observe(section);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentMotion);
  } else {
    initContentMotion();
  }
})();

