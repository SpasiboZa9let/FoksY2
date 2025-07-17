// js/ui/galleryAccordion.js
import { openGalleryModal } from '../modal.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-item[data-type="gallery"]').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const panel  = item.querySelector('.accordion-panel');

    header.addEventListener('click', () => {
      const opened = item.classList.toggle('open');
      if (opened) {
        const firstImg = panel.querySelector('.gallery-img');
        if (firstImg) openGalleryModal(firstImg);
      }
    });
  });
});

// main.js
import './ui/galleryAccordion.js';
