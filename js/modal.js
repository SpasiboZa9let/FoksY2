// js/modal.js
export function initGalleryModal() {
  const modal    = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("gallery-modal-img");
  const thumbs   = document.querySelectorAll(".gallery-img");
  const ANIM_PROP = 'opacity';

  if (!modal || !modalImg || thumbs.length === 0) return;

  // Открытие мгновенно по touchstart/pointerdown
  thumbs.forEach(thumb => {
    thumb.addEventListener("touchstart", openModal, { passive: false });
    thumb.addEventListener("pointerdown", openModal);
  });

  function openModal(e) {
    e.preventDefault();
    e.stopPropagation();
    modalImg.src = e.currentTarget.src;
    modal.classList.remove("closing");
    modal.classList.add("open");
  }

  // Закрытие по touchstart/pointerdown на фоне или картинке
  [modal, modalImg].forEach(el => {
    el.addEventListener("touchstart", closeModal, { passive: false });
    el.addEventListener("pointerdown", closeModal);
  });

  function closeModal(e) {
    e.preventDefault();
    e.stopPropagation();
    modal.classList.remove("open");
    modal.classList.add("closing");

    // По завершении opacity-перехода убираем .closing и возвращаем pointer-events: none
    modal.addEventListener("transitionend", function handler(ev) {
      if (ev.propertyName === ANIM_PROP) {
        modal.removeEventListener("transitionend", handler);
        modal.classList.remove("closing");
      }
    });
  }
}
