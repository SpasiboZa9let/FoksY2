export function initPriceAccordion() {
  console.log('[Accordion] initPriceAccordion вызван');

  const items = document.querySelectorAll('.service-item');
  console.log(`[Accordion] найдено элементов: ${items.length}`);

  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(el => {
        if (el !== item) el.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}
// после initPriceAccordion
export function initGalleryAccordion() {
  // Находим элементы модалки
  const modal    = document.getElementById('gallery-modal');
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

  // Закрытие по клику на фон или на само изображение
  if (modal) {
    modal.addEventListener('click', () => closeModal());
  }

  // Инициализируем каждый блок галереи-аккордеона
  document
    .querySelectorAll('.accordion-item[data-type="gallery"]')
    .forEach(item => {
      const header = item.querySelector('.accordion-header');
      const panel  = item.querySelector('.accordion-panel');
      if (!header || !panel) return;

      // Скрываем содержимое по умолчанию
      panel.classList.add('hidden');

      // Вешаем клики на миниатюры для открытия/закрытия
      panel.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', e => {
          e.stopPropagation(); // чтобы не триггерить аккордеон
          const isOpen = !modal.classList.contains('opacity-0');
          if (isOpen && modalImg.src === img.src) {
            closeModal(); // если тот же кадр уже открыт, закрываем
          } else {
            openModal(img.src);
          }
        });
      });

      // Логика открытия/закрытия аккордеона
      header.addEventListener('click', () => {
        const isOpen = !panel.classList.contains('hidden');
        panel.classList.toggle('hidden', isOpen);
        item.classList.toggle('open', !isOpen);

        if (!isOpen) {
          // При разворачивании сразу открываем первое изображение
          const first = panel.querySelector('.gallery-img');
          if (first) openModal(first.src);
        }
      });
    });
}

