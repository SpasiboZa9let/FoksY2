// FoksY2/js/main.js
import { initFoxyChat }          from './pseudo-ai.js';
import { initReviewsScroll }     from './reviews-scroll.js';
import { initPriceAccordion, initGalleryAccordion } from './foxy/ui/accordion.js';

async function loadSection(id, url) {
  const container = document.getElementById(id);
  if (!container) return;
  try {
    const res  = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:red">Ошибка загрузки ${url}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadSection('hero-container',    'sections/hero.html');
  await loadSection('chat-container',    'sections/chat.html');
  initFoxyChat();

  await loadSection('reviews-container', 'sections/reviews.html');
  initReviewsScroll();

  await loadSection('gallery-container', 'sections/gallery.html');
  initGalleryAccordion();

  await loadSection('services-container','sections/services.html');
  console.log('[main.js] services загружен, вызываем initPriceAccordion');
  initPriceAccordion();

  await loadSection('map-container',     'sections/map.html');
});
