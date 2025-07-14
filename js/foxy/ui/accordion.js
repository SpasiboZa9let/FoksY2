// foxy/ui/accordion.js

export function initPriceAccordion() {
  document.querySelectorAll(".service-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".service-item").forEach(el => {
        if (el !== item) el.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
}
