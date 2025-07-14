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
