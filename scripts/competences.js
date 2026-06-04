(() => {
  const dialog = document.getElementById('competences-lightbox');
  const trigger = document.querySelector('[data-lightbox-open]');
  if (!dialog || !trigger) return;

  const closeBtn = dialog.querySelector('[data-lightbox-close]');

  const open = () => {
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  trigger.addEventListener('click', open);

  closeBtn?.addEventListener('click', close);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
})();
