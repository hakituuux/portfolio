// Slider compétences : défilement infini continu (requestAnimationFrame)
(() => {
  const track = document.querySelector('.logo-slider .slide-track');
  if (!track || track.dataset.marqueeReady === 'true') return;

  const slides = [...track.children];
  if (slides.length === 0) return;

  slides.forEach((slide) => track.appendChild(slide.cloneNode(true)));

  track.classList.add('is-marquee');
  track.style.animation = 'none';

  let offset = 0;
  const speed = 0.7;
  let loopWidth = 0;

  const measureLoopWidth = () => {
    const kids = [...track.children];
    const half = kids.length / 2;
    if (half < 1) return 1;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    let width = 0;
    for (let i = 0; i < half; i += 1) {
      width += kids[i].getBoundingClientRect().width;
      if (i < half - 1) width += gap;
    }
    return width > 0 ? width : 1;
  };

  const resetMeasure = () => {
    loopWidth = 0;
  };

  const tick = () => {
    if (loopWidth <= 0) loopWidth = measureLoopWidth();
    offset += speed;
    if (offset >= loopWidth) offset -= loopWidth;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    requestAnimationFrame(tick);
  };

  window.addEventListener('resize', resetMeasure);

  const images = [...track.querySelectorAll('img')];
  let ready = 0;

  const start = () => {
    resetMeasure();
    requestAnimationFrame(tick);
  };

  if (images.length === 0) {
    start();
  } else {
    images.forEach((img) => {
      const done = () => {
        ready += 1;
        if (ready >= images.length) start();
      };
      if (img.complete) done();
      else {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });
  }

  track.dataset.marqueeReady = 'true';
})();
