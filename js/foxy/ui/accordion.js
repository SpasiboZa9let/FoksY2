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
// FoksY2/js/foxy/ui/accordion.js

// FoksY2/js/foxy/ui/accordion.js

export function initGalleryAccordion() {
  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');

  // Функции открытия/закрытия модалки с учётом классов .open/.closing
  function openModal(src) {
    modalImg.src = src;
    modal.classList.remove('closing');
    modal.classList.add('open');
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.classList.add('closing');
    // по завершении transition удаляем класс closing
    modal.addEventListener('transitionend', () => {
      modal.classList.remove('closing');
    }, { once: true });
  }

  // Закрытие по клику/тапу на фон или на изображение
  ['click', 'touchstart'].forEach(evt => {
    modal.addEventListener(evt, e => {
      if (e.target === modal || e.target === modalImg) closeModal();
    });
  });

  // Инициализация одного блока галереи-аккордеона
  document.querySelectorAll('.accordion-item[data-type="gallery"]').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    if (!header || !panel) return;

    // скрываем панель по умолчанию
    panel.classList.add('hidden');

    // клики/тапы по миниатюрам
    panel.querySelectorAll('.gallery-img').forEach(img => {
      // Открытие модалки по клику или тачу
      img.addEventListener('click', e => {
        e.stopPropagation();
        toggleModal(img.src);
      });
      img.addEventListener('touchend', e => {
        e.preventDefault(); // предотвращаем последующий click
        e.stopPropagation();
        toggleModal(img.src);
      }, { passive: false });
    });
      });
    });

    // клик по заголовку аккордеона
    header.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      panel.classList.toggle('hidden', isOpen);
      item.classList.toggle('open', !isOpen);
    });
  });
}
