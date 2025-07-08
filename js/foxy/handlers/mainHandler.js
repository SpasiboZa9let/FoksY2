import { matchIntent } from "../core/intents.js";
import { matchService, emoji, services, randomReply } from "../core/services.js";
import {
  lastInput, setLastInput, setLastIntent,
  lastIntent, setLastService, lastService,
  setUserName
} from "../core/state.js";

import { addMessage, clearButtons } from "../ui/dom.js";
import { renderBookingOptions, renderServiceList } from "../ui/ui.js";

import { handleDesign } from "./design.js";
import { handleMood } from "./mood.js";
import { handleSmalltalk } from "./smalltalk.js";
import { handleServiceInput } from "./servicesHandler.js";

// главный обработчик ввода
export function handleUserInput(message) {
  clearButtons();

  // 📝 Обработка ввода имени пользователя
  if (lastIntent === "askName") {
    const name = message.trim();
    setUserName(name);
    localStorage.setItem("foxy_userName", name);
    addMessage(`Приятно познакомиться, ${name}! 💖`, false);
    renderServiceList(); // или showSuggestions()
    setLastIntent(null);
    return;
  }

  const input = message.trim().toLowerCase();
  if (!input || input === lastInput) return;
  setLastInput(input);

  addMessage(`Вы: ${message}`);

  // 🤖 Классификация интента
  const intent = matchIntent(input);
  setLastIntent(intent);

  // 🦊 Smalltalk-интенты
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

  // 🔍 Уточняющие вопросы (цена, стоимость и опечатки)
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

  // 🔎 Попытка угадать услугу напрямую
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
