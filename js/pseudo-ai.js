// js/pseudo-ai.js

import { handleUserInput } from './foxy/handlers/mainHandler.js';
import { addTypingMessage, renderReactions } from './foxy/ui/dom.js';
import { emoji } from './foxy/core/services.js';
import { setUserName, lastIntent, setLastIntent } from './foxy/core/state.js';

const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

function randomGreeting(name) {
  const template = greetings[Math.floor(Math.random() * greetings.length)];
  return template.replace('%NAME%', name);
}

function showSuggestions(delay = 0) {
  setTimeout(() => {
    addTypingMessage(
      `<div class="foxy-suggestions">
         <div class="description">Вот что я могу показать прямо сейчас:</div>
         <div class="buttons-wrapper">
           <button class="ai-btn" data-action="прайс">💅 Заглянуть в прайс-лист</button>
           <button class="ai-btn" data-action="дизайн">🎨 Вдохновиться идеями дизайна</button>
           <button class="ai-btn" data-action="записаться">📅 Записаться на удобное время</button>
           <button class="ai-btn" data-action="что ты умеешь">❓ Узнать все мои возможности</button>
           <button class="ai-btn" data-action="скидка">🏷️ Получить скидку</button>
         </div>
         <div class="footer">Выбери, что тебе по душе, и я всё покажу 💖</div>
       </div>`,
      600,
      true
    );
  }, delay);
}

function checkPromoReminder(delay = 0) {
  setTimeout(() => {
    const promoCode = localStorage.getItem("promoCode");
    const promoExpires = localStorage.getItem("promoExpires");

    if (promoCode && promoExpires) {
      const now = Date.now();
      const expires = parseInt(promoExpires);

      if (now >= expires) {
        localStorage.removeItem("promoCode");
        localStorage.removeItem("promoExpires");
        localStorage.removeItem("promoUsed");
        return;
      }

      if (localStorage.getItem("promoUsed") !== 'true') {
        const deadline = new Date(expires).toLocaleDateString();
        addTypingMessage(
          `<div class="foxy-promo no-opacity">
             <p>🎁 Напоминаю: у тебя ещё действует промокод <strong>${promoCode}</strong><br><small>Срок до ${deadline}</small></p>
             <div class="buttons-wrapper mt-2">
               <button class="ai-btn" data-promo-action="used">✅ Активирован</button>
               <button class="ai-btn" data-promo-action="later">⏳ Пока нет</button>
             </div>
           </div>`,
          450,
          true
        );

        setTimeout(() => {
          const el = document.querySelector('.foxy-promo');
          if (el) {
            el.classList.remove('no-opacity');
            el.classList.add('foxy-fade-in');
          }
        }, 550);
      }
    }
  }, delay);
}

window.addEventListener('DOMContentLoaded', () => {
  const name = localStorage.getItem('foxy_userName');
  console.log('[DEBUG] DOMContentLoaded, имя:', name);

  if (!name || name.trim().length < 2) {
    addTypingMessage('🦊 Привет! Как тебя зовут?', 500);
    setLastIntent('askName');
    return;
  }

  setUserName(name);

  addTypingMessage(
    `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`,
    500,
    true
  );

  checkPromoReminder(1300);
  showSuggestions(2100);

  // FULLSCREEN кнопка
  const btn = document.getElementById("toggle-fullscreen");
  const chatWrapper = document.querySelector(".chat-wrapper");

  let expanded = false;

  btn?.addEventListener("click", () => {
    expanded = !expanded;
    chatWrapper.classList.toggle("fullscreen");

    const icon = btn.querySelector("i");
    icon.setAttribute("data-lucide", expanded ? "minimize" : "maximize");
    lucide.createIcons();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && expanded) {
      expanded = false;
      chatWrapper.classList.remove("fullscreen");
      const icon = btn.querySelector("i");
      icon.setAttribute("data-lucide", "maximize");
      lucide.createIcons();
    }
  });

  // ОБРАБОТКА ФОРМЫ
  const form = document.getElementById('pseudo-form');
  const input = document.getElementById('pseudo-input');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      handleUserInput(text);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    // 🔍 Если Фокси ждёт имя
    if (lastIntent === 'askName') {
      localStorage.setItem('foxy_userName', text);
      setUserName(text);
      setLastIntent(null);
      document.getElementById('pseudo-chat').innerHTML = '';
      window.location.reload(); // 🔁 Чисто и просто
    } else {
      form.dispatchEvent(new Event('submit'));
    }
  }
});
});

// ✅ ОБРАБОТКА КНОПОК с data-action
document.body.addEventListener('click', event => {
  const btn = event.target.closest('[data-action]');
  if (btn) {
    const cmd = btn.getAttribute('data-action');
    if (cmd) {
      console.log('[FOXY DEBUG] Клик по кнопке с data-action:', cmd);
      handleUserInput(cmd);
    }
  }
});

// ✅ ОБРАБОТКА ПРОМО-КНОПОК
document.body.addEventListener('click', event => {
  const promoBtn = event.target.closest('[data-promo-action]');
  if (!promoBtn) return;

  const action = promoBtn.getAttribute('data-promo-action');
  console.log('[FOXY DEBUG] Клик по промо-кнопке:', action);

  if (action === 'used') {
    localStorage.removeItem("promoCode");
    localStorage.removeItem("promoExpires");
    localStorage.setItem("promoUsed", "true");
    addTypingMessage(`Отлично! Промокод больше не будет беспокоить 😊`, 300);
    promoBtn.closest('.foxy-promo')?.remove();
  }

  if (action === 'later') {
    addTypingMessage(`Окей, напомню позже 😉`, 300);
  }
});


