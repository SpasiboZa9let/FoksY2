// foxy/handlers/smalltalk.js

import { addMessage } from "../ui/dom.js";
import { randomReply, emoji } from "../core/services.js";
import { renderServiceList } from "../ui/ui.js";

export function handleSmalltalk(intent) {
  switch (intent) {
    case "thanks":
    case "bye":
    case "smalltalkLite":
      addMessage(randomReply(intent));
      break;

    case "abilities":
    case "help":
      addMessage(`${emoji()} Я умею подбирать дизайн, рассказывать про услуги и помогать с записью на маникюр.`);

      renderServiceList(); // показываем кнопки: прайс, дизайн, модное
      break;

    case "about":
      addMessage(`${emoji()} Я — Фокси, твоя милая помощница по маникюру 💅✨`);
      break;

    default:
      return false;
  }

  return true;
}

