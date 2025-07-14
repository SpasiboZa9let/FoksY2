export async function initReviewsScroll() {
  const wrapper = document.getElementById('reviews-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = '';

  const res = await fetch('reviews.html');
  const html = await res.text();

  const track = document.createElement('div');
  track.classList.add('reviews-track', 'flex', 'items-center');
  track.innerHTML = html + html; // удвоение — бесконечный цикл
  wrapper.appendChild(track);

  // Пауза при наведении/таче
  track.addEventListener('pointerenter', () => track.classList.add('paused'));
  track.addEventListener('pointerleave', () => track.classList.remove('paused'));
  track.addEventListener('pointerdown',  () => track.classList.add('paused'));
  track.addEventListener('pointerup',    () => track.classList.remove('paused'));

  // Клик по картинке — модалка
  track.addEventListener('click', e => {
    const img = e.target.closest('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/80 z-50 grid place-items-center';

    overlay.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-full rounded-xl shadow-xl">
      <button class="absolute top-4 right-4 text-white text-4xl font-bold select-none">&times;</button>
    `;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener('click', ev => {
      if (ev.target === overlay || ev.target.tagName === 'BUTTON') close();
    });

    document.addEventListener('keydown', function esc(ev) {
      if (ev.key === 'Escape') {
        close();
        document.removeEventListener('keydown', esc);
      }
    });
  });
}
