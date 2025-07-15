import { matchIntent } from "../core/intents.js";
import { matchService, emoji, services, randomReply } from "../core/services.js";
import {
  getLastInput, setLastInput,
  getLastIntent, setLastIntent,
  getLastService, setLastService,
  getUserName, setUserName
} from "../core/state.js";
import { calculateDiscount } from "../core/calc.js";

import { addMessage, clearButtons, clearChat } from "../ui/dom.js";
import { renderBookingOptions, renderServiceList } from "../ui/ui.js";
import { showCurrentPoints } from "../core/rewards.js";
import { addLoyaltyPoints, redeemCode } from "../core/rewards.js";

import { handleDesign } from "./design.js";
import { handleMood } from "./mood.js";
import { handleSmalltalk } from "./smalltalk.js";
import { handleServiceInput, showServiceDetails } from "./servicesHandler.js";
import { sendBooking } from "./booking.js";

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

export function startCalc() {
  setLastIntent("awaitingCalc");
  addMessage("Введи цену услуги и количество баллов через пробел, например:\n1500 300");
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
         <button class="ai-btn" data-action="калькулятор">🧮 Калькулятор скидки</button>
       </div>
       <div class="footer">Выбери, что тебе по душе, и я всё покажу 💖</div>
     </div>`,
    true
  );
}

// Главная функция обработки ввода
export async function handleUserInput(message) {
  clearButtons();

  const input = message.trim();
  if (!input || input.toLowerCase() === getLastInput()) return;

  setLastInput(input.toLowerCase());
  addMessage(`Вы: ${message}`, false, true);

  // Промокод
  if (handlePromoCode(input)) return;

  // Имя пользователя
  if (getLastIntent() === "askName") {
    const name = input;
    setUserName(name);
    localStorage.setItem("foxy_userName", name);
    clearChat();
    addMessage(`Приятно познакомиться, ${name}! 💖`, false);
    setLastIntent("");
    return;
  }

  // Калькулятор скидки
  if (getLastIntent() === "awaitingCalc") {
    const match = input.match(/(\d+)[^\d]+(\d+)/);
    if (match) {
      const price = parseInt(match[1]);
      const points = parseInt(match[2]);
      const res = calculateDiscount(points, price);
      addMessage(
        `🎯 Скидка: ${res.discountRub}₽ (${res.discountPercent}%)\n` +
        `Итоговая цена: ${res.finalPrice}₽\n` +
        `Будет списано: ${res.usedPoints} баллов`
      );
    } else {
      addMessage("Формат не понятен. Напиши, например:\n1200 300");
    }
    setLastIntent("");
    return;
  }

  const intent = matchIntent(input);
  setLastIntent(intent);

  if (intent === "confirm" && getLastService()) {
    showServiceDetails(getLastService());
    return;
  }

  if (handleSmalltalk(intent)) return;

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

  const inquireRe = /(сколько|сколк[оья]|стоимост|цена)/i;
  if (inquireRe.test(input)) {
    const svc2 = matchService(input);
    if (svc2) setLastService(svc2.name);

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

  if (intent === "booking" || intent === "confirmBooking") {
    const service = getLastService();
    const name = getUserName();
    const date = new Date().toISOString().split("T")[0];

    if (service && name) {
      addMessage(`Отправляю заявку на «${service}» для ${name}... 📨`);
      const res = await sendBooking({ name, service, date });

      if (res.success) {
        addMessage("📬 Заявка отправлена! Ждём подтверждения.");
      } else {
        addMessage("⚠️ Не удалось отправить заявку. Попробуй позже!");
      }
    } else if (!service) {
      addMessage(`На какую услугу тебя записать? 💅`);
      renderServiceList();
    } else {
      addMessage(`Как тебя зовут? 😊 Напиши своё имя.`);
      setLastIntent("askName");
    }
    return;
  }

  switch (intent) {
    case "design":
      handleDesign();
      break;
    case "points":
      showCurrentPoints();
      break;
    case "calc":
      startCalc();
      break;
    case "mood":
      handleMood();
      break;
    case "help":
      addMessage("🦊 Я помогу с выбором! Вот что могу предложить:");
      showSuggestions();
      break;
    default:
      addMessage(randomReply("fallback"));
      renderServiceList();
  }
}

// Обработка промокодов (например, AB94, FO
