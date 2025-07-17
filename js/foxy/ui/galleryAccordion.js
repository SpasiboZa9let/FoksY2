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
    modal.removeEventListener('click', closeModal);
  }

  document.querySelectorAll('.accordion-item[data-type="gallery"]').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');

    header.addEventListener('click', () => {
      const opened = item.classList.toggle('open');
      panel.classList.toggle('hidden');
      if (opened) {
        // сразу показываем первое изображение
        const firstImg = panel.querySelector('.gallery-img');
        if (firstImg) openModal(firstImg.src);
        // вешаем клики на все миниатюры
        panel.querySelectorAll('.gallery-img').forEach(img =>
          img.addEventListener('click', () => openModal(img.src))
        );
      }
    });
  });

  // закрытие модалки по фону/клику
  modal.addEventListener('click', closeModal);
});
