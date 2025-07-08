import { matchIntent } from "../core/intents.js";
import { matchService, emoji, services, randomReply } from "../core/services.js";
import {
  lastInput, setLastInput, setLastIntent,
  setLastService, lastService
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

  const input = message.trim().toLowerCase();
  if (!input || input === lastInput) return;
  setLastInput(input);

  addMessage(`Вы: ${message}`);

  // 🤖 Классификация интента (smalltalk, showSomething и т.п.)
  const intent = matchIntent(input);
  setLastIntent(intent);

  // 🦊 Smalltalk-интенты
  if (handleSmalltalk(intent)) return;

  // 🗂 Показать услуги или «покажи» (с прямым выбором сервиса)
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

  // 📝 Уточняющие вопросы (любые «сколько», «цена», «стоимость» и опечатки)
  const inquireRe = /(сколько|сколк[оья]|стоимост|цена)/i;
  if (inquireRe.test(input)) {
    // запоминаем услугу, если упомянута в этой же фразе
    const svc2 = matchService(input);
    if (svc2) setLastService(svc2.name);

    if (lastService && services[lastService]) {
      // выводим рандомный заголовок из inquireDetails
      addMessage(`${emoji()} ${randomReply("inquireDetails")}`, true);
      // детали услуги
      addMessage(`«${lastService}» 💅\n${services[lastService]}`);
      renderBookingOptions();
    } else {
      addMessage(randomReply("fallback"));
      renderServiceList();
    }
    return;
  }

  // 🔍 Попытка угадать услугу напрямую
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
