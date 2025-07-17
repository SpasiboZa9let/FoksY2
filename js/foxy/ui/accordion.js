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
  // найдём модалку
  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

  // функции показа/скрытия модалки
  function openModal(src) {
    modalImg.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalImg.classList.remove('scale-0');
  }
  function closeModal() {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalImg.classList.add('scale-0');
  }
  // закрытие по фону
  if (modal) modal.addEventListener('click', closeModal);

  // для каждого блока галереи
  document
    .querySelectorAll('.accordion-item[data-type="gallery"]')
    .forEach(item => {
      const header = item.querySelector('.accordion-header');
      const panel  = item.querySelector('.accordion-panel');
      if (!header || !panel) return;

      // скроем по умолчанию
      panel.classList.add('hidden');

      header.addEventListener('click', () => {
        // toggle панели и стрелки
        const isOpen = !panel.classList.contains('hidden');
        panel.classList.toggle('hidden',  isOpen);
        item.classList.toggle('open',    !isOpen);

        if (!isOpen) {
          // сразу покажем первое изображение
          const first = panel.querySelector('.gallery-img');
          first && openModal(first.src);
          // повесим клики на все миниатюры
          panel.querySelectorAll('.gallery-img').forEach(img =>
            img.addEventListener('click', () => openModal(img.src))
          );
        }
      });
    });
}
