// FoksY2/js/foxy/ui/accordion.js

// Прайс-аккордеон
export function initPriceAccordion() {
  console.log('[Accordion] initPriceAccordion вызван');
  const items = document.querySelectorAll('.service-item');
  console.log(`[Accordion] найдено элементов: ${items.length}`);
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
  console.log('[Accordion] initGalleryAccordion вызван');

  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

  // Показ и скрытие модалки
  function openModal(src) {
    console.log('[GalleryAccordion] openModal', src);
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalImg.classList.remove('scale-0');
  }
  function closeModal() {
    console.log('[GalleryAccordion] closeModal');
    if (!modal || !modalImg) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalImg.classList.add('scale-0');
  }
  // Закрытие по клику на фоне или изображении внутри модалки
  if (modal) {
    modal.addEventListener('click', e => {
      console.log('[GalleryAccordion] modal click target', e.target);
      if (e.target === modal || e.target === modalImg) closeModal();
    });
  }

  const items = document.querySelectorAll('.accordion-item[data-type="gallery"]');
  console.log(`[Accordion] gallery items found: ${items.length}`);
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) {
      console.warn('[GalleryAccordion] Missing header or panel', item);
      return;
    }

    // Скрываем панель по умолчанию
    panel.classList.add('hidden');

    // Получаем все миниатюры
    const images = panel.querySelectorAll('.gallery-img');
    console.log('[GalleryAccordion] images found in panel:', images.length);
    images.forEach(img => {
      console.log('[GalleryAccordion] attach click handler to image', img);
      img.addEventListener('click', e => {
        console.log('[GalleryAccordion] image clicked', img.src);
        e.stopPropagation();
        if (!modal || !modalImg) return;
        const currentlyOpen = !modal.classList.contains('opacity-0');
        if (currentlyOpen && modalImg.src === img.src) {
          closeModal();
        } else {
          openModal(img.src);
        }
      });
    });

    // Клик по заголовку — открытие/закрытие аккордеона
    header.addEventListener('click', () => {
      console.log('[GalleryAccordion] header clicked');
      const isOpenPanel = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpenPanel);
      item.classList.toggle('open', !isOpenPanel);
      console.log('[GalleryAccordion] panel toggled, now hidden=', panel.classList.contains('hidden'));

      if (!isOpenPanel) {
        const first = images[0];
        console.log('[GalleryAccordion] opening first image', first.src);
        openModal(first.src);
      }
    });
  });
}
