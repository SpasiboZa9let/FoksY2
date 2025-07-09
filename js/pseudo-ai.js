// js/pseudo-ai.js
import { handleUserInput } from './foxy/handlers/mainHandler.js';
import { addTypingMessage }  from './foxy/ui/dom.js';
import { emoji }             from './foxy/core/services.js';
import { setUserName }       from './foxy/core/state.js';

const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

function randomGreeting(name) {
  return greetings[Math.floor(Math.random() * greetings.length)]
    .replace('%NAME%', name);
}

function showSuggestions(delay = 0) {
  setTimeout(() => {
    addTypingMessage(
      `<div class="foxy-suggestions">
         <div class="description">Вот что я могу показать прямо сейчас:</div>
         <div class="buttons-wrapper">
           <button class="ai-btn" data-action="прайс">💅 Прайс-лист</button>
           <button class="ai-btn" data-action="дизайн">🎨 Идеи дизайна</button>
           <button class="ai-btn" data-action="записаться">📅 Запись на время</button>
           <button class="ai-btn" data-action="что ты умеешь">❓ Возможности</button>
           <button class="ai-btn" data-action="скидка">🏷️ Скидка</button>
         </div>
         <div class="footer">Выбери что-то, и я покажу 💖</div>
       </div>`,
      600,
      true
    );
  }, delay);
}

function checkPromoReminder(delay = 0) {
  setTimeout(() => {
    const promoCode    = localStorage.getItem("promoCode");
    const promoExpires = localStorage.getItem("promoExpires");
    if (!promoCode || !promoExpires) return;

    const now     = Date.now();
    const expires = +promoExpires;
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
           <p>🎁 Промокод <strong>${promoCode}</strong> до ${deadline}</p>
           <div class="buttons-wrapper mt-2">
             <button class="ai-btn" data-promo-action="used">✅ Активирован</button>
             <button class="ai-btn" data-promo-action="later">⏳ Напомнить позже</button>
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
  }, delay);
}

function initFoxyAfterName(name) {
  addTypingMessage(
    `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`,
    500,
    true
  );
  checkPromoReminder(1300);
  showSuggestions(2100);
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('[DEBUG] pseudo-ai.js загружен!');

  const name = localStorage.getItem('foxy_userName');
  if (!name || name.trim().length < 2) {
    addTypingMessage('🦊 Привет! Как тебя зовут?', 500);
    localStorage.setItem('foxy_lastIntent', 'askName');
  } else {
    setUserName(name);
    initFoxyAfterName(name);
  }

  // Fullscreen-кнопка
  const btn     = document.getElementById("toggle-fullscreen");
  const wrapper = document.querySelector(".chat-wrapper");
  let expanded = false;
  btn?.addEventListener("click", () => {
    expanded = !expanded;
    wrapper.classList.toggle("fullscreen");
    const icon = btn.querySelector("i");
    icon.setAttribute("data-lucide", expanded ? "minimize" : "maximize");
    lucide.createIcons();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && expanded) {
      expanded = false;
      wrapper.classList.remove("fullscreen");
      btn.querySelector("i").setAttribute("data-lucide","maximize");
      lucide.createIcons();
    }
  });

  // ОБРАБОТКА ВВОДА БЕЗ <form>
  const input     = document.getElementById('pseudo-input');
  const submitBtn = document.getElementById('pseudo-submit');

  function handleSubmit() {
    const text = input.value.trim();
    if (!text) return;
    const intent = localStorage.getItem('foxy_lastIntent');
    console.log('[DEBUG] Submit intent:', intent);

    if (intent === 'askName') {
      localStorage.setItem('foxy_userName', text);
      localStorage.removeItem('foxy_lastIntent');
      document.getElementById('pseudo-chat').innerHTML = '';
      setUserName(text);
      initFoxyAfterName(text);
    } else {
      handleUserInput(text);
      input.value = '';
    }
  }

  submitBtn.addEventListener('click', handleSubmit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  });

  // Обработка меню и промо-кнопок
  document.body.addEventListener('click', event => {
    const actionBtn = event.target.closest('[data-action]');
    if (actionBtn) {
      handleUserInput(actionBtn.getAttribute('data-action'));
    }
    const promoBtn = event.target.closest('[data-promo-action]');
    if (promoBtn) {
      const action = promoBtn.getAttribute('data-promo-action');
      if (action === 'used') {
        localStorage.removeItem("promoCode");
        localStorage.removeItem("promoExpires");
        localStorage.setItem("promoUsed", "true");
        addTypingMessage(`Отлично! Промокод больше не будет напоминать.`, 300);
        promoBtn.closest('.foxy-promo')?.remove();
      } else {
        addTypingMessage(`Хорошо, напомню позже 😉`, 300);
      }
    }
  });
});
