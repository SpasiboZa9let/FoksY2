// js/pseudo-ai.js
import { handleUserInput }      from './foxy/handlers/mainHandler.js';
import { addTypingMessage, addMessage, clearChat } from './foxy/ui/dom.js';
import { emoji }               from './foxy/core/services.js';
import {
  setUserName,
  getLastIntent,
  setLastIntent
} from './foxy/core/state.js';

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

    // Автоскрытие через 8 сек
    setTimeout(() => {
      const sugg = document.querySelector('.foxy-suggestions');
      if (!sugg) return;

      const bubble = sugg.closest('.chat-bubble');
      if (!bubble) return;

      sugg.style.transition = 'opacity 0.5s ease';
      sugg.style.opacity = '0';

      setTimeout(() => bubble.remove(), 500);
    }, 8000);
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

      // 1. Показ блока
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

      // 2. Плавное появление
      setTimeout(() => {
        const el = document.querySelector('.foxy-promo');
        if (el) {
          el.classList.remove('no-opacity');
          el.classList.add('foxy-fade-in');
        }
      }, 550);

      // 3. Автоматическое скрытие
      setTimeout(() => {
        const promo = document.querySelector('.foxy-promo');
        if (!promo || localStorage.getItem('promoUsed') === 'true') return;

        promo.style.transition = 'opacity 0.6s ease';
        promo.style.opacity = '0';

        setTimeout(() => {
          promo.remove();
        }, 600);
      }, 7000);
    }
  }, delay);
}


function initFoxyAfterName(name) {
  const bubbleHTML = `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`;
addTypingMessage(bubbleHTML, 500, true, false);

setTimeout(() => {
  const bubble = document.querySelector('.chat-bubble.welcome-message');
  if (!bubble) return;

  bubble.style.transition = 'opacity 0.5s ease';
  bubble.style.opacity = '0';

  setTimeout(() => bubble.remove(), 500);
}, 5500);


  checkPromoReminder(1300);
  showSuggestions(2100);
}

// Объявляем главную функцию инициализации чата
export function initFoxyChat() {
  lucide.createIcons();
  console.log('[DEBUG] Инициализация Фокси-чата');

  const name = localStorage.getItem('foxy_userName');
  if (!name || name.trim().length < 2) {
    addTypingMessage('🦊 Привет! Как тебя зовут?', 500);
    setLastIntent('askName');
  } else {
    setUserName(name);
    initFoxyAfterName(name);
  }

  // Fullscreen-кнопка
  const btn = document.getElementById("toggle-fullscreen");
  const wrapper = document.querySelector(".chat-wrapper");
  let expanded = false;

  btn?.addEventListener("click", () => {
    expanded = !expanded;
    wrapper.classList.toggle("fullscreen");
    document.body.classList.toggle("no-scroll", expanded);
    document.body.classList.toggle("fullscreen-fix", expanded);

    const icon = btn.querySelector("i");
    if (icon) {
      icon.setAttribute("data-lucide", expanded ? "minimize" : "maximize");
      lucide.createIcons();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && expanded) {
      expanded = false;
      wrapper.classList.remove("fullscreen");
      document.body.classList.remove("no-scroll");
      document.body.classList.remove("fullscreen-fix");

      const icon = btn.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", "maximize");
        lucide.createIcons();
      }
    }
  });

  // Обработка ввода без <form>
  const input = document.getElementById('pseudo-input');
  const submitBtn = document.getElementById('pseudo-submit');

  function handleSubmit() {
    const text = input.value.trim();
    if (!text) return;

    const intent = getLastIntent();
    console.log('[DEBUG] Submit intent:', intent);

    if (intent === 'askName') {
      localStorage.setItem('foxy_userName', text);
      setLastIntent('');
      clearChat();
      input.value = '';
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

  // Обработка кнопок и промо-кнопок через делегирование
  document.body.addEventListener('click', event => {
    const actionBtn = event.target.closest('[data-action]');
    if (actionBtn) {
      handleUserInput(actionBtn.getAttribute('data-action'));
      return;
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

  /  // Сброс данных
  const resetBtn = document.getElementById('foxy-reset');
  resetBtn?.addEventListener('click', () => {
    if (!confirm('Вы точно хотите сбросить все ваши данные?')) return;
    ['foxy_userName', 'promoCode', 'promoExpires', 'promoUsed']
      .forEach(key => localStorage.removeItem(key));
    setLastIntent('');
    clearChat();
    input.value = '';
    addTypingMessage('🦊 Данные сброшены. Привет! Как тебя зовут?', 300);
    setLastIntent('askName');
  });

  // Кнопка "что ты умеешь"
  const abilitiesBtn = document.getElementById('foxy-show-abilities');
  abilitiesBtn?.addEventListener('click', () => {
    handleUserInput('что ты умеешь');
  });

}); // ← ЗАКРЫВАЕТ window.addEventListener('DOMContentLoaded', ...)
