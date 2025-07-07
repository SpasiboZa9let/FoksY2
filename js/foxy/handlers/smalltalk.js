import { randomReply } from "../core/services.js";
import { addMessage } from "../ui/dom.js";
import { renderServiceList } from "../ui/ui.js"; // ← добавим для "abilities" и "confirmation"

export function handleSmalltalk(intent) {
  if (!intent) return false;

  if (intent === "thanks") {
    addMessage(randomReply("thanks"));
    return true;
  }

  if (intent === "abilities") {
    addMessage("🦊 Вот чем могу быть полезна прямо сейчас:");
    renderServiceList(); // ← показать кнопки
    return true;
  }

  if (intent === "greeting") {
    addMessage(randomReply("greeting"));
    return true;
  }

  if (intent === "bye") {
    addMessage(randomReply("bye"));
    return true;
  }

  if (intent === "softWarning") {
    addMessage("🧸 Хочу оставаться вежливой. Давай говорить по-доброму?");
    return true;
  }

  if (intent === "mood") {
    addMessage(randomReply("mood"));
    return true;
  }

  if (intent === "confirmation") {
    addMessage("Супер! Тогда выбери, с чего начнём 💅");
    renderServiceList();
    return true;
  }

  return false;
}
