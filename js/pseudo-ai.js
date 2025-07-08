import { handleUserInput } from './foxy/handlers/mainHandler.js';
import { addMessage, addTypingMessage } from './foxy/ui/dom.js';
import { emoji } from './foxy/core/services.js';
import { setUserName, lastIntent, setLastIntent } from './foxy/core/state.js';

// Список приветствий с %NAME%
const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

// Функция случайного приветствия с подстановкой имени
function randomGreeting(name) {
  const template = greetings[Math.floor(Math.random() * greetings.length)];
  return template.replace('%NAME%', name);
}

// Подсказки
function showSuggestions() {
  addTypingMessage(
    `<div class="foxy-suggestions">
       <div class="description">Вот что я могу показать прямо сейчас:</div>
       <div class="buttons-wrapper">
         <button class="ai-btn" data-action="прайс">💅 Заглянуть в прайс-лист</button>
         <button class="ai-btn" data-action="дизайн">🎨 Вдохновиться идеями дизайна</button>
         <button class="ai-btn" data-action="записаться">📅 Записаться на удобное время</button>
         <button class="ai-btn" data-action="что ты умеешь">❓ Узнать все мои возможности</button>
       </div>
       <div class="footer">Выбери, что тебе по душе, и я всё покажу 💖</div>
     </div>`,
    500
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram?.WebApp;
  let name = localStorage.getItem('foxy_userName');

  console.log('[DEBUG] DOMContentLoaded');
  console.log('[DEBUG] foxy_userName =', name);

  if (!name || name.trim().length < 2) {
    console.log('[DEBUG] Спрашиваю имя');
    addTypingMessage('🦊 Привет! Как тебя зовут?', 400);
    setLastIntent('askName');
    return;
  }

  setUserName(name);
  addTypingMessage(
    `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`,
    400
  );
  showSuggestions();
});

// Навешиваем клики на подсказки
setTimeout(() => {
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      const cmd = el.getAttribute('data-action');
      if (cmd) handleUserInput(cmd);
    });
  });
}, 0);

// Обработка ввода формы
const form = document.getElementById('pseudo-form');
const input = document.getElementById('pseudo-input');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  handleUserInput(text);
  input.value = '';
});
