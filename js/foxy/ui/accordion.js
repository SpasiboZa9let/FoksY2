// FoksY2/js/foxy/ui/accordion.js

// 1) Существующая функция прайс-аккордеона
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

// 2) Новая функция галерея-аккордеона
export function initGalleryAccordion() {
  console.log('[Accordion] initGalleryAccordion вызван');

  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

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
  // закрытие по клику на фон или саму картинку в модалке
  if (modal) modal.addEventListener('click', e => {
    if (e.target === modal || e.target === modalImg) closeModal();
  });

  const items = document.querySelectorAll('.accordion-item[data-type="gallery"]');
  console.log(`[Accordion] gallery items found: ${items.length}`);
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) return;

    // скрываем по умолчанию
    panel.classList.add('hidden');

    // клики по миниатюрам: открываем/закрываем модалку
    panel.querySelectorAll('.gallery-img').forEach(img => {
      img.addEventListener('click', e => {
        e.stopPropagation();
        const alreadyOpen = !modal.classList.contains('opacity-0') && modalImg.src === img.src;
        if (alreadyOpen) closeModal();
        else           openModal(img.src);
      });
    });

    // клик по заголовку аккордеона
    header.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      item.classList.toggle('open', !isOpen);

      if (!isOpen) {
        // сразу показать первое изображение
        const first = panel.querySelector('.gallery-img');
        if (first) openModal(first.src);
      }
    });
  });
}
