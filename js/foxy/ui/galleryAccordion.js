/* FoksY2/js/foxy/ui/galleryAccordion.js */
console.log('galleryAccordion.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  const items = document.querySelectorAll('.accordion-item[data-type="gallery"]');
  console.log('gallery items found:', items.length);

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');
    console.log('item:', item, 'header:', header, 'panel:', panel);
    if (!header || !panel) return;

    // скрываем панель
    panel.style.display = 'none';

    header.addEventListener('click', () => {
      const isOpen = panel.style.display !== 'none';
      console.log('toggle click, was open?', isOpen);
      // переключаем видимость панели и класс open
      panel.style.display = isOpen ? 'none' : '';
      item.classList.toggle('open', !isOpen);

      if (!isOpen) {
        const firstImg = panel.querySelector('.gallery-img');
        if (firstImg) {
          console.log('opening modal for:', firstImg.src);
          openModal(firstImg.src);
        }
        panel.querySelectorAll('.gallery-img').forEach(img => {
          img.addEventListener('click', () => {
            console.log('modal click on img:', img.src);
            openModal(img.src);
          });
        });
      }
    });
  });
});

// Модалка
const modal    = document.getElementById('gallery-modal');
const modalImg = document.getElementById('gallery-modal-img');

function openModal(src) {
  if (!modal || !modalImg) return console.error('modal elements missing');
  modalImg.src = src;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modalImg.classList.remove('scale-0');
}

function closeModal() {
  modal && modal.classList.add('opacity-0', 'pointer-events-none');
  modalImg && modalImg.classList.add('scale-0');
}

if (modal) modal.addEventListener('click', closeModal);
