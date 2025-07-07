import { handleUserInput } from "./foxy/handlers/mainHandler.js";
import { addMessage }       from "./foxy/ui/dom.js";
import { emoji }            from "./foxy/core/services.js"; // emoji теперь в core/services

const greetings = [
  `Приветик, красотка! 💖 Давай выберем что-то стильное — нюд, блёстки или что-то вау?`,
  `Салют! Я Фокси — твоя подружка в мире маникюра 💅 Спрашивай всё, что хочешь!`,
  `Привет! Готова сделать твои ногти идеальными? 💫 Я помогу ✨`,
  `Хэй, рада тебя видеть! 💖 Что выберем сегодня: нюд или блестящий космос?`,
  `Добро пожаловать, любимка! 😘 Маникюр мечты уже рядом — спроси меня о чём угодно`,
  `Приветик, рада тебя видеть! 💖`
];

function randomGreeting() {
  const index = Math.floor(Math.random() * greetings.length);
  return greetings[index];
}

window.addEventListener("DOMContentLoaded", () => {
  // 1. Приветствие
  addMessage(
    `<div class="foxy-fade-in"><strong>${emoji()} Фокси:</strong> ${randomGreeting()}</div>`,
    true
  );

  // 2. Подсказки-опции
  addMessage(
    `<p class="text-sm leading-relaxed foxy-suggestions">
      Вот чем могу быть полезна прямо сейчас:
      <br>💅 <strong data-action="прайс">Показать весь прайс</strong>
      <br>🎨 <strong data-action="дизайн">Подобрать дизайн под настроение</strong>
      <br>📅 <strong data-action="записаться">Записать тебя на удобное время</strong>
      <br>❓ <strong data-action="что ты умеешь">Что я умею?</strong>
      <br><br>Спроси меня, и всё покажу 💖
    </p>`,
    true
  );

  // 3. Интеркативные клики
  setTimeout(() => {
    document.querySelectorAll("[data-action]").forEach(el => {
      el.addEventListener("click", () => {
        const value = el.getAttribute("data-action");
        if (value) handleUserInput(value);
      });
    });
  }, 0);

  // 4. Обработка формы ввода
  const form  = document.getElementById("pseudo-form");
  const input = document.getElementById("pseudo-input");
  if (form && input) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      handleUserInput(text);
      input.value = "";
    });
  }
});
