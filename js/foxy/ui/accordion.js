// FoksY2/js/foxy/ui/accordion.js

// Прайс-аккордеон
export function initPriceAccordion() {
  const items = document.querySelectorAll('.service-item');
  if (!items.length) return;
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(el => el !== item && el.classList.remove('active'));
      item.classList.toggle('active');
    });
  });
}

// Галерея-аккордеон
export function initGalleryAccordion() {
  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

  function showModal(src) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modal.classList.remove('closing');
    modal.classList.add('open');
  }
  function hideModal() {
    if (!modal || !modalImg) return;
    modal.classList.remove('open');
    modal.classList.add('closing');
    modal.addEventListener('transitionend', () => {
      modal.classList.remove('closing');
    }, { once: true });
  }
  function toggleModal(src) {
    if (!modal || !modalImg) return;
    if (modal.classList.contains('open') && modalImg.src === src) hideModal();
    else showModal(src);
  }

  // Закрытие модалки по клику/тапу на фон или изображение
  ['click', 'touchend'].forEach(evt => {
    modal.addEventListener(evt, e => {
      if (e.target === modal || e.target === modalImg) {
        e.stopPropagation();
        hideModal();
      }
    });
  });

  document.querySelectorAll('.accordion-item[data-type="gallery"]').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) return;

    panel.classList.add('hidden');
    let ignoreClick = false;

    // Обработчики для миниатюр
    panel.querySelectorAll('.gallery-img').forEach(img => {
      img.style.cursor = 'pointer';
      // touchend первым, ставим флаг
      img.addEventListener('touchend', e => {
        e.preventDefault();
        e.stopPropagation();
        ignoreClick = true;
        toggleModal(img.src);
      }, { passive: false });
      // click срабатывает после touchend, игнорируем если был touch
      img.addEventListener('click', e => {
        if (ignoreClick) { ignoreClick = false; return; }
        e.stopPropagation();
        toggleModal(img.src);
      });
    });

    // Логика аккордеона
    header.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      item.classList.toggle('open', !isOpen);
    });
  });
}
