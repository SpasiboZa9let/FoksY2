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
import { showCurrentPoints } from "../core/rewards.js";

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
         <button class="ai-btn" data-action="баллы">⭐ Мои баллы</button>
       </div>
       <div class="footer">Выбери, что тебе по душе, и я всё покажу 💖</div>
     </div>`,
    true
  );
}

export function handleUserInput(message) {
  clearButtons();

  // Имя
  if (getLastIntent() === 'askName') {
    const name = message.trim();
    setUserName(name);
    localStorage.setItem('foxy_userName', name);
    clearChat();
    addMessage(`Приятно познакомиться, ${name}! 💖`, false);
    setLastIntent('');
    return;
  }

  const input = message.trim();
  if (!input || input.toLowerCase() === getLastInput()) return;

  const prevIntent = getLastIntent();
  setLastInput(input.toLowerCase());
  addMessage(`Вы: ${message}`, false, true);

  const intent = matchIntent(input);
  setLastIntent(intent);

  // Подтверждение услуги
  if (intent === 'confirm' && prevIntent === 'service') {
    showServiceDetails(getLastService());
    return;
  }

  // Промо / скидка
  if (intent === "discount") {
    handleDiscount();
    return;
  }

  // Smalltalk
  if (handleSmalltalk(intent)) return;

  // Показ услуг
  if (intent === "showSomething" || intent === "showServices") {
    const svc2 = matchService(input);
    if (svc2) {
      setLastService(svc2.name);
      setLastIntent("service");
      handleServiceInput(svc2.name);
      setTimeout(() => {
        addMessage(`Записать тебя на ${svc2.name}? 💖`);
      }, 1000);
    } else {
      renderServiceList();
    }
    return;
  }

  // Запрос цены
  const inquireRe = /(сколько|сколк[оья]|стоимост|цена)/i;
if (inquireRe.test(input)) {
  const svc2 = matchService(input);
  if (svc2) {
    setLastService(svc2.name);
  }

  const svcName = getLastService();
  if (svcName && services[svcName]) {
    addMessage(`${emoji()} ${randomReply("inquireDetails")}`, true);
    addMessage(`«${svcName}» 💅\n${services[svcName]}`);
    setTimeout(() => {
      addMessage(`Хочешь записаться на ${svcName}? 😊`);
    }, 1200);
    renderBookingOptions();
  } else {
    addMessage(randomReply("fallback"));
    renderServiceList();
  }
  return;
}

  // Ключевое слово-услуга
  const svc = matchService(input);
  if (svc) {
    setLastService(svc.name);
    setLastIntent("service");
    handleServiceInput(svc.name);
    setTimeout(() => {
      addMessage(`Записать тебя на ${svc.name}? 💖`);
    }, 1000);
    return;
  }

  // Явное "записаться"
  if (intent === "booking" || intent === "confirmBooking") {
    if (getLastService()) {
      addMessage(`Записываю на ${getLastService()}! 🗓️ Уточни дату, и я всё оформлю.`);
      renderBookingOptions();
    } else {
      addMessage(`На какую услугу тебя записать? 💅`);
      renderServiceList();
    }
    return;
  }


  // Остальное
  switch (intent) {
    case "design":
      handleDesign();
      break;
    case "points":
      showCurrentPoints();
      break;

    case "mood":
      handleMood();
      break;
    default:
      addMessage(randomReply("fallback"));
      renderServiceList();
  }
}
