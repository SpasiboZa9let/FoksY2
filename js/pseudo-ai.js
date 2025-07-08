// js/pseudo-ai.js

import { handleUserInput } from './foxy/handlers/mainHandler.js';
import { addTypingMessage } from './foxy/ui/dom.js';
import { emoji } from './foxy/core/services.js';
import { setUserName, lastIntent, setLastIntent } from './foxy/core/state.js';

// Список приветствий с подстановкой имени
const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

// Рандомное приветствие с именем
function randomGreeting(name) {
  const template = greetings[Math.floor(Math.random() * greetings.length)];
  return template.replace('%NAME%', name);
}

// Блок подсказок
function showSuggestions() {
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
}


window.addEventListener('DOMContentLoaded', () => {
  let name = localStorage.getItem('foxy_userName');
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
  showSuggestions();
});

// — Убираем старый setTimeout() и вместо него — делегируем клики по всему документу —
document.body.addEventListener('click', event => {
  const btn = event.target.closest('[data-action]');
  if (btn) {
    const cmd = btn.getAttribute('data-action');
    if (cmd) handleUserInput(cmd);
  }
});

// Обработка формы ввода
const form = document.getElementById('pseudo-form');
const input = document.getElementById('pseudo-input');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  handleUserInput(text);
  input.value = '';
});
