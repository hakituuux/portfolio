// Slider compétences : défilement continu sans interruption
(() => {
  const track = document.querySelector('.logo-slider .slide-track');
  if (!track || track.dataset.loopReady === 'true') return;

  const ensureDuplicateSeries = () => {
    const slides = [...track.children];
    if (slides.length === 0) return;

    const midpoint = Math.floor(slides.length / 2);
    const firstHalf = slides.slice(0, midpoint);
    const secondHalf = slides.slice(midpoint);

    const sameLength = firstHalf.length === secondHalf.length && firstHalf.length > 0;
    const sameOrder =
      sameLength &&
      firstHalf.every((slide, i) => slide.querySelector('img')?.src === secondHalf[i].querySelector('img')?.src);

    if (!sameOrder) {
      slides.forEach((slide) => track.appendChild(slide.cloneNode(true)));
    }
  };

  const setScrollDistance = () => {
    const loopWidth = track.scrollWidth / 2;
    if (loopWidth > 0) {
      track.style.setProperty('--scroll-distance', `${loopWidth}px`);
    }
  };

  ensureDuplicateSeries();
  setScrollDistance();

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(setScrollDistance);
    ro.observe(track);
  } else {
    window.addEventListener('resize', setScrollDistance);
  }

  track.dataset.loopReady = 'true';
})();
