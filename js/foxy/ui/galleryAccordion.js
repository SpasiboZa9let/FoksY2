// FoksY2/js/foxy/ui/galleryAccordion.js
document.addEventListener('DOMContentLoaded', () => {
  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

  function openModal(src) {
    modalImg.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalImg.classList.remove('scale-0');
  }
  function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalImg.classList.add('scale-0');
  }
  if (modal) modal.addEventListener('click', closeModal);

  document.querySelectorAll('.accordion-item[data-type="gallery"]').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) return;

    // скрываем панель по умолчанию
    panel.style.display = 'none';

    header.addEventListener('click', () => {
      const isOpen = panel.style.display !== 'none';
      if (isOpen) {
        // закрываем
        panel.style.display = 'none';
        item.classList.remove('open');
      } else {
        // открываем
        panel.style.display = '';
        item.classList.add('open');
        // сразу модалку первого изображения
        const firstImg = panel.querySelector('.gallery-img');
        if (firstImg) openModal(firstImg.src);
        // клики по миниатюрам
        panel.querySelectorAll('.gallery-img').forEach(imgEl =>
          imgEl.addEventListener('click', () => openModal(imgEl.src))
        );
      }
    });
  });
});
