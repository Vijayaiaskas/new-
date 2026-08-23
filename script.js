(() => {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('#site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    }));
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-carousel]').forEach((carousel, index) => {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-btn.prev');
    const next = carousel.querySelector('.carousel-btn.next');
    const firstItem = carousel.querySelector('.carousel-item');
    if (!track || !prev || !next || !firstItem) return;

    const getStep = () => {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || 0) || 0;
      return firstItem.getBoundingClientRect().width + gap;
    };

    const goNext = () => {
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: getStep(), behavior: 'smooth' });
    };

    const goPrev = () => {
      const atStart = track.scrollLeft <= 8;
      if (atStart) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      else track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    };

    prev.addEventListener('click', goPrev);
    next.addEventListener('click', goNext);

    if (!prefersReducedMotion) {
      let timer = setInterval(goNext, 5200 + index * 500);
      const pause = () => clearInterval(timer);
      const resume = () => {
        clearInterval(timer);
        timer = setInterval(goNext, 5200 + index * 500);
      };
      carousel.addEventListener('mouseenter', pause);
      carousel.addEventListener('mouseleave', resume);
      carousel.addEventListener('focusin', pause);
      carousel.addEventListener('focusout', resume);
    }
  });
})();
