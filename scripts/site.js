(() => {
  const nav = document.querySelector('nav.site-nav');
  if (!nav) return;

  const toggle = nav.querySelector('[data-nav-toggle]');
  const links = nav.querySelector('ul.nav-links');

  if (!toggle || !links) return;

  const setOpen = (open) => {
    nav.dataset.open = open ? 'true' : 'false';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  setOpen(false);

  toggle.addEventListener('click', () => {
    const open = nav.dataset.open === 'true';
    setOpen(!open);
  });

  links.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
