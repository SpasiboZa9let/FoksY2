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

  function openModal(src) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modal.classList.remove('closing');
    modal.classList.add('open');
  }
  function closeModal() {
    if (!modal || !modalImg) return;
    modal.classList.remove('open');
    modal.classList.add('closing');
    modal.addEventListener('transitionend', () => modal.classList.remove('closing'), { once: true });
  }

  // Закрытие по клику на фон или по самому изображению
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target === modalImg) {
        closeModal();
      }
    });
  }

  // Обработка кликов по миниатюрам в галерее
  document.querySelectorAll('.accordion-item[data-type="gallery"] .gallery-img')
    .forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', e => {
        e.stopPropagation();
        // если модалка уже открыта тем же изображением — закрыть
        if (modal.classList.contains('open') && modalImg.src === img.src) {
          closeModal();
        } else {
          openModal(img.src);
        }
      });
    });

  // Логика аккордеона
  document.querySelectorAll('.accordion-item[data-type="gallery"]').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) return;
    panel.classList.add('hidden');
    header.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      item.classList.toggle('open', !isOpen);
    });
  });
}
