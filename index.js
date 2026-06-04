// Hero : photo + box contact à la hauteur du texte
(() => {
  const intro = document.querySelector('.hero-intro');
  const row = document.querySelector('.hero-intro-row');
  if (!intro || !row) return;

  const sync = () => {
    if (window.innerWidth < 901) {
      row.style.removeProperty('--hero-text-h');
      return;
    }
    row.style.setProperty('--hero-text-h', `${intro.offsetHeight}px`);
  };

  sync();
  window.addEventListener('resize', sync);

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(sync);
    ro.observe(intro);
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(sync);
  }
})();

