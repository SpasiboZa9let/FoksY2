// foxy/handlers/mainHandler.js

import { matchIntent } from "../core/intents.js";
import { matchService, emoji, services } from "../core/services.js";
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

  // 💬 Уточнение цены, подробностей
  if (/сколько.*стоит|цена|подробн|узна|это с|можно|а где|а когда|подойдет/i.test(input)) {
    if (lastService && services[lastService]) {
      addMessage(`${emoji()} Ага, это «${lastService}» 💅\n${services[lastService]}`);
      renderBookingOptions();
      return;
    }
  }

  // 🔍 Попытка угадать услугу напрямую
  const svc = matchService(input);
  if (svc) {
    setLastService(svc.name);
    setLastIntent("service");
    handleServiceInput(svc.name);
    return;
  }

  // 🤖 Классификация интента
  const intent = matchIntent(input);
  setLastIntent(intent);

  // 🎯 Роутинг по интентам
  switch (intent) {
    case "design":
      handleDesign();
      break;

    case "mood":
      handleMood();
      break;

    case "showServices":
      renderServiceList();
      break;

    case "booking":
      renderBookingOptions();
      break;

    default:
      if (!handleSmalltalk(intent)) {
        addMessage(`${emoji()} Не совсем поняла… Давай выберем из списка? 💅`);
        renderServiceList();
      }
  }
}
