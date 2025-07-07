// foxy/handlers/mainHandler.js

import { matchIntent } from "../core/intents.js";
import { services, matchService, replies } from "../core/services.js"; // ← вот это
import { lastInput, setLastInput, setLastIntent, setLastService, lastService, lastIntent } from "../core/state.js";
import { addMessage, clearButtons } from "../ui/dom.js";
import { renderServiceList, renderBookingOptions } from "../ui/ui.js";


// ветки
import { handleDesign } from "./design.js";
import { handleService, handleServiceDetail } from "./services.js";
import { handleMood } from "./mood.js";
import { handleSmalltalk } from "./smalltalk.js";

export function handleUserInput(message) {
  clearButtons();

  const input = message.trim();
  if (!input || input.toLowerCase() === lastInput) return;
  setLastInput(input.toLowerCase());

  addMessage(`Вы: ${message}`);

  // определить интент
  const intent = matchIntent(input.toLowerCase());
  setLastIntent(intent);

  // маршрутизация по интентам
  switch (intent) {
    case "design":
      return handleDesign(input);

    case "service":
      return handleService(input);

    case "serviceDetail":
      return handleServiceDetail(input);

    case "mood":
      return handleMood(input);

    default:
      return handleSmalltalk(intent, input);
  }
}

