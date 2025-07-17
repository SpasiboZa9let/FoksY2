// FoksY2/js/foxy/ui/accordion.js

// Прайс-аккордеон остаётся без изменений…
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

// Галерея-аккордеон с Fullscreen API
export function initGalleryAccordion() {
  // Найти все блоки галереи
  const items = document.querySelectorAll('.accordion-item[data-type="gallery"]');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) return;

    // Скрыть по умолчанию
    panel.classList.add('hidden');

    // Клик по заголовку: toggle аккордеон
    header.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      item.classList.toggle('open', !isOpen);
    });

    // Клики по миниатюрам → Fullscreen API
    panel.querySelectorAll('.gallery-img').forEach(img => {
      img.style.cursor = 'pointer'; // подсказка, что кликабельно
      img.addEventListener('click', e => {
        e.stopPropagation(); // чтобы не трогать аккордеон

        // Если сейчас нет full-screen, запрашиваем его
        if (!document.fullscreenElement) {
          img.requestFullscreen().catch(err => {
            console.error('Не смог открыть Fullscreen:', err);
          });
        } else {
          document.exitFullscreen().catch(err => {
            console.error('Не смог выйти из Fullscreen:', err);
          });
        }
      });
    });
  });
}
