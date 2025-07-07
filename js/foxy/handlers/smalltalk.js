import { randomReply } from "../core/services.js";
import { addMessage } from "../ui/dom.js";

export function handleSmalltalk(intent) {
  if (!intent) return false;

  if (intent === "thanks") {
    addMessage(randomReply("thanks"));
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
  
  return false;
}
