import { matchIntent } from "../core/intents.js";
import { matchService, emoji, services, randomReply } from "../core/services.js";
import {
  lastInput, setLastInput, lastIntent, setLastIntent,
  lastService, setLastService,
  userName, setUserName
} from "../core/state.js";

import { addMessage, clearButtons } from "../ui/dom.js";
import { renderBookingOptions, renderServiceList } from "../ui/ui.js";

import { handleDesign } from "./design.js";
import { handleMood } from "./mood.js";
import { handleSmalltalk } from "./smalltalk.js";
import { handleServiceInput, showServiceDetails } from "./servicesHandler.js";

// Варианты приветствий (в core/state можно вынести, если нужно)
const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

// Функция для рандомного выбора и подстановки имени
function randomGreeting(name) {
  const tpl = greetings[Math.floor(Math.random() * greetings.length)];
  return tpl.replace("%NAME%", name);
}

// Единый блок показа подсказок
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

// главный обработчик ввода
export function handleUserInput(message) {
  clearButtons();

  // 1) Если мы только что спросили имя — сохраняем и показываем подсказки
  if (lastIntent === 'askName') {
    const name = message.trim();
    setUserName(name);
    localStorage.setItem('foxy_userName', name);
    addMessage(`Приятно познакомиться, ${name}! 💖`, false);

    addMessage(
      `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`,
      true
    );
    showSuggestions();
    setLastIntent(null);
    return;
  }

  // 2) Обычная логика
  const input = message.trim();
  if (!input || input.toLowerCase() === lastInput) return;
  const prevIntent = lastIntent; // сохраняем предыдущий интент
  setLastInput(input.toLowerCase());

  addMessage(`Вы: ${message}`);

  // 🤖 Классификация интента
  const intent = matchIntent(input);
  setLastIntent(intent);

  // 🚦 Подтверждение выбора услуги
  if (intent === 'confirm' && prevIntent === 'service') {
    showServiceDetails(lastService);
    return;
  }

  // 🦊 Smalltalk
  if (handleSmalltalk(intent)) return;

  // 🗂 Показать услуги или «покажи»
  if (intent === "showSomething" || intent === "showServices") {
    const svc2 = matchService(input);
    if (svc2) {
      setLastService(svc2.name);
      setLastIntent("service");
      handleServiceInput(svc2.name);
    } else {
      renderServiceList();
    }
    return;
  }

  // 📝 Уточнения цены/подробностей
  const inquireRe = /(сколько|сколк[оья]|стоимост|цена)/i;
  if (inquireRe.test(input)) {
    const svc2 = matchService(input);
    if (svc2) setLastService(svc2.name);

    if (lastService && services[lastService]) {
      addMessage(`${emoji()} ${randomReply("inquireDetails")}`, true);
      addMessage(`«${lastService}» 💅\n${services[lastService]}`);
      renderBookingOptions();
    } else {
      addMessage(randomReply("fallback"));
      renderServiceList();
    }
    return;
  }

  // 🔍 Попытка угадать услугу
  const svc = matchService(input);
  if (svc) {
    setLastService(svc.name);
    setLastIntent("service");
    handleServiceInput(svc.name);
    return;
  }

  // 🎯 Остальные интенты
  switch (intent) {
    case "design":
      handleDesign();
      break;
    case "mood":
      handleMood();
      break;
    case "booking":
    case "confirmBooking":
      renderBookingOptions();
      break;
    default:
      addMessage(randomReply("fallback"));
      renderServiceList();
  }
}
