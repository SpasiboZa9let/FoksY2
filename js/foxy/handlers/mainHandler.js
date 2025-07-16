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
import { redeemCode } from "../core/rewards.js";

import { handleDesign } from "./design.js";
import { handleMood } from "./mood.js";
import { handleSmalltalk } from "./smalltalk.js";
import { handleServiceInput, showServiceDetails } from "./servicesHandler.js";

import {
  randomGreeting,
  fallbackReplies,
  promoReplies,
  pointsReplies,
  calcInstructions,
  helpIntro,
  randomFrom,
  askForName,
  askForService,
  bookingConfirmed,
  bookingFollowup,
  serviceConfirmTemplate,
  priceInquiryTemplate,
  priceInquiryFollowup,
  calcFormatError,
  userSaid
} from "../core/phrases.js";

export function startCalc() {
  setLastIntent("awaitingCalc");
  addMessage(calcInstructions);
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

function handlePromoCode(input) {
  const clean = input.trim().toUpperCase();
  if (/^[A-Z0-9]{4,10}$/.test(clean)) {
    redeemCode(clean);
    return true;
  }
  return false;
}

export async function handleUserInput(message) {
  clearButtons();

  const input = message.trim();
  if (!input || input.toLowerCase() === getLastInput()) return;

  setLastInput(input.toLowerCase());
  addMessage(userSaid(message), false, true);

  if (handlePromoCode(input)) return;

  if (getLastIntent() === "askName") {
    const name = input;
    setUserName(name);
    localStorage.setItem("foxy_userName", name);
    clearChat();
    addMessage(`Приятно познакомиться, ${name}! 💖`, false);
    setLastIntent("");
    return;
  }

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
      addMessage(calcFormatError);
    }
    setLastIntent("");
    return;
  }

  const intent = matchIntent(input);
  setLastIntent(intent);

  if (intent === "promoHint") {
    addMessage(promoReplies.hint);
    return;
  }

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
        addMessage(serviceConfirmTemplate(svc2.name));
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
      addMessage(priceInquiryTemplate(svcName, services[svcName]));
      setTimeout(() => {
        addMessage(priceInquiryFollowup(svcName));
      }, 1200);
      renderBookingOptions();
    } else {
      addMessage(randomFrom(fallbackReplies));
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
      addMessage(serviceConfirmTemplate(svc.name));
    }, 1000);
    return;
  }

  if (intent === "booking" || intent === "confirmBooking") {
    const service = getLastService();
    const name = getUserName();

    if (service && name) {
      addMessage(bookingConfirmed(service, name));
      addMessage(bookingFollowup);
    } else if (!service) {
      addMessage(askForService);
      renderServiceList();
    } else {
      addMessage(askForName);
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
      addMessage(helpIntro);
      showSuggestions();
      break;
    default:
      addMessage(randomFrom(fallbackReplies));
      renderServiceList();
  }
}
