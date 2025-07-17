// FoksY2/js/foxy/ui/accordion.js

// Прайс-аккордеон
export function initPriceAccordion() {
  console.log('[Accordion] initPriceAccordion вызван');
  const items = document.querySelectorAll('.service-item');
  console.log(`[Accordion] найдено элементов: ${items.length}`);
  if (!items.length) return;
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(el => { if (el !== item) el.classList.remove('active'); });
      item.classList.toggle('active');
    });
  });
}

// Галерея-аккордеон
export function initGalleryAccordion() {
  console.log('[Accordion] initGalleryAccordion вызван');

  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

  // Показ и скрытие модалки
  function openModal(src) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalImg.classList.remove('scale-0');
  }
  function closeModal() {
    if (!modal || !modalImg) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalImg.classList.add('scale-0');
  }

  // Закрытие по клику на фон или на изображение
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target === modalImg) {
        closeModal();
      }
    });
  }

  // Инициализация аккордеона-галереи
  const items = document.querySelectorAll('.accordion-item[data-type="gallery"]');
  console.log(`[Accordion] gallery items found: ${items.length}`);
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel = item.querySelector('.accordion-panel');
    if (!header || !panel) return;

    // Скрываем панель по умолчанию
    panel.classList.add('hidden');

    // Обработчики для миниатюр
    panel.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', e => {
        e.stopPropagation();
        // Переключаем модалку
        if (!modal || !modalImg) return;
        const isOpen = !modal.classList.contains('opacity-0');
        if (isOpen && modalImg.src === img.src) {
          closeModal();
        } else {
          openModal(img.src);
        }
      });
    });

    // Открытие/закрытие аккордеона
    header.addEventListener('click', () => {
      const isOpenPanel = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpenPanel);
      item.classList.toggle('open', !isOpenPanel);

      if (!isOpenPanel) {
        const first = panel.querySelector('.gallery-img');
        if (first) openModal(first.src);
      }
    });
  });
}
