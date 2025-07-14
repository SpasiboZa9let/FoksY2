// foxy/ui/accordion.js
export function initPriceAccordion() {
  const items = document.querySelectorAll('.service-item');
  if (!items.length) {
    console.warn('[Accordion] service-item not found');
    return;
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(el => {
        if (el !== item) el.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}
