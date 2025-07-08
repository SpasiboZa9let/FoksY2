import { handleUserInput } from './foxy/handlers/mainHandler.js';
import { addMessage } from './foxy/ui/dom.js';
import { emoji } from './foxy/core/services.js';
import { setUserName, setLastIntent } from './foxy/core/state.js';

// Приветствия до ввода имени (без обращения)
const fallbackGreetings = [
  `Приветик, красавица! 💖 Давай выберем что-то стильное — нюд, блёстки или что-нибудь вау?`,
  `Салют! Я Фокси — твоя подружка в мире маникюра 💅 Спрашивай, не стесняйся!`,
  `Привет! Готова сделать твои ногти идеальными? 💫 Я помогу тебе выбрать лучшее ✨`,
  `Хэй, рада тебя видеть! 💖 Что сегодня выберем: нежный нюд или блестящий космос?`,
  `Добро пожаловать, любимка! 😘 Маникюр мечты уже рядом — расскажи, чего хочешь`,
  `Здравствуй! Фокси на связи — давай сотворим красоту для твоих ноготков 🌸`,
  `Йо! В мире маникюра сегодня всё для тебя — выбирай, что нужно 💖`,
  `Приветствую! Хочешь прайс, идеи дизайна или сразу запись? 📋`
];

// Приветствия с подстановкой имени
const greetingsWithName = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

function randomGreeting(name = null) {
  if (name) {
    const template = greetingsWithName[Math.floor(Math.random() * greetingsWithName.length)];
    return template.replace('%NAME%', name);
  } else {
    return fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
  }
}

function showSuggestions() {
  addMessage(
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
    true
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram?.WebApp;
  let name = localStorage.getItem('foxy_userName');

  console.log('[DEBUG] DOMContentLoaded, имя из localStorage:', name);

  if (!name || name.trim().length < 2) {
    console.log('[DEBUG] Имя не задано, спрашиваем у пользователя');
    addMessage('🦊 Привет! Как тебя зовут?', false);
    setLastIntent('askName');
    return;
  }

  setUserName(name);
  addMessage(
    `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`,
    true
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
