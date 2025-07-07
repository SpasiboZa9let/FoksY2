import { handleUserInput } from "./foxy/handlers/mainHandler.js";
import { addMessage }       from "./foxy/ui/dom.js";
import { emoji }            from "./foxy/core/services.js";

const greetings = [
  `Приветик, красавица! 💖 Давай выберем что-то стильное — нюд, блёстки или что-нибудь вау?`,
  `Салют! Я Фокси — твоя подружка в мире маникюра 💅 Спрашивай, не стесняйся!`,
  `Привет! Готова сделать твои ногти идеальными? 💫 Я помогу тебе выбрать лучшее ✨`,
  `Хэй, рада тебя видеть! 💖 Что сегодня выберем: нежный нюд или блестящий космос?`,
  `Добро пожаловать, любимка! 😘 Маникюр мечты уже рядом — расскажи, чего хочешь`,
  `Здравствуй! Фокси на связи — давай сотворим красоту для твоих ноготков 🌸`,
  `Йо! В мире маникюра сегодня всё для тебя — выбирай, что нужно 💖`,
  `Приветствую! Хочешь прайс, идеи дизайна или сразу запись? 📋`
];

function randomGreeting() {
  return greetings[Math.floor(Math.random() * greetings.length)];
}

window.addEventListener("DOMContentLoaded", () => {
  // 1. Рандомное приветствие
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
