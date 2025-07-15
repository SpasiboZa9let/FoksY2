// js/pseudo-ai.js

import { handleUserInput } from './foxy/handlers/mainHandler.js';
import { addTypingMessage, addMessage, clearChat } from './foxy/ui/dom.js';
import { emoji } from './foxy/core/services.js';
import {
  setUserName,
  getLastIntent,
  setLastIntent
} from './foxy/core/state.js';

import { checkVisitPoints } from './foxy/core/rewards.js';

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
           <button class="ai-btn" data-action="баллы">⭐ Мои баллы</button>
           <button class="ai-btn" data-action="калькулятор">🧮 Калькулятор скидки</button>
         </div>
         <div class="footer">Выбери что-то, и я покажу 💖</div>
       </div>`,
      600,
      true
    );

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

  checkVisitPoints(); // 🎯 начисление баллов
  showSuggestions(2100);
}

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

  document.body.addEventListener('click', event => {
    const actionBtn = event.target.closest('[data-action]');
    if (actionBtn) {
      handleUserInput(actionBtn.getAttribute('data-action'));
      return;
    }
  });

  const resetBtn = document.getElementById('foxy-reset');
  resetBtn?.addEventListener('click', () => {
    if (!confirm('Вы точно хотите сбросить все ваши данные?')) return;
    ['foxy_userName', 'foxy_points', 'foxy_pointsLast']
      .forEach(key => localStorage.removeItem(key));
    setLastIntent('');
    clearChat();
    input.value = '';
    addTypingMessage('🦊 Данные сброшены. Привет! Как тебя зовут?', 300);
    setLastIntent('askName');
  });

  const abilitiesBtn = document.getElementById('foxy-show-abilities');
  abilitiesBtn?.addEventListener('click', () => {
    handleUserInput('что ты умеешь');
  });
}
