// js/foxy/handlers/mainHandler.js
import { matchIntent } from "../core/intents.js";
import { matchService, emoji, services, randomReply } from "../core/services.js";
import {
  getLastInput, setLastInput,
  getLastIntent, setLastIntent,
  getLastService, setLastService,
  getUserName, setUserName
} from "../core/state.js";

import { addMessage, clearButtons } from "../ui/dom.js";
import { renderBookingOptions, renderServiceList } from "../ui/ui.js";

import { handleDesign } from "./design.js";
import { handleMood } from "./mood.js";
import { handleSmalltalk } from "./smalltalk.js";
import { handleServiceInput, showServiceDetails } from "./servicesHandler.js";
import { handleDiscount } from "./discount.js";

const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

function randomGreeting(name) {
  const tpl = greetings[Math.floor(Math.random() * greetings.length)];
  return tpl.replace("%NAME%", name);
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
         <button class="ai-btn" data-action="скидка">🏷️ Скидка</button>
       </div>
       <div class="footer">Выбери, что тебе по душе, и я всё покажу 💖</div>
     </div>`,
    true
  );
}

export function handleUserInput(message) {
  clearButtons();

  // Фаза ввода имени
  if (getLastIntent() === 'askName') {
    const name = message.trim();
    setUserName(name);
    localStorage.setItem('foxy_userName', name);
    addMessage(`Приятно познакомиться, ${name}! 💖`, false);
    addTypingMessage(`<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`, 300, true);
    showSuggestions();
    setLastIntent('');        // сброс интента
    return;
  }

  const input = message.trim();
  if (!input || input.toLowerCase() === getLastInput()) return;
  const prevIntent = getLastIntent();
  setLastInput(input.toLowerCase());

  addMessage(`Вы: ${message}`, false, true);

  // Определяем новый интент
  const intent = matchIntent(input);
  setLastIntent(intent);

  // 🚦 Подтверждение услуги
  if (intent === 'confirm' && prevIntent === 'service') {
    showServiceDetails(getLastService());
    return;
  }

  // 🎁 Промо / скидка
  if (intent === "discount") {
    handleDiscount();
    return;
  }

  // Общение
  if (handleSmalltalk(intent)) return;

  // Показ услуг
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

  // Уточнение цены
  const inquireRe = /(сколько|сколк[оья]|стоимост|цена)/i;
  if (inquireRe.test(input)) {
    const svc2 = matchService(input);
    if (svc2) setLastService(svc2.name);

    if (getLastService() && services[getLastService()]) {
      addMessage(`${emoji()} ${randomReply("inquireDetails")}`, true);
      addMessage(`«${getLastService()}» 💅\n${services[getLastService()]}`);
      renderBookingOptions();
    } else {
      addMessage(randomReply("fallback"));
      renderServiceList();
    }
    return;
  }

  // Прямая услуга по ключевому слову
  const svc = matchService(input);
  if (svc) {
    setLastService(svc.name);
    setLastIntent("service");
    handleServiceInput(svc.name);
    return;
  }

  // Остальные команды
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
