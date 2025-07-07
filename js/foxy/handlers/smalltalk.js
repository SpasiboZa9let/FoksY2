// foxy/handlers/smalltalk.js

import { randomReply, emoji } from "../core/services.js";
import { addMessage, renderReactions } from "../ui/dom.js";
import { renderServiceList, renderBookingOptions } from "../ui/ui.js";
import { handleDesign } from "./design.js";

export function handleSmalltalk(intent) {
  if (!intent) return false;

  const handlers = {
    greeting:      () => addMessage(randomReply("greeting")),
    smalltalkLite: () => addMessage(randomReply("smalltalkLite")),
    thanks:        () => addMessage(randomReply("thanks")),
    bye:           () => addMessage(randomReply("bye")),
    mood:          () => addMessage(randomReply("mood")),
    softWarning:   () => addMessage("🧸 Хочу оставаться вежливой. Давай говорить по-доброму?"),
    // Заменили поведение abilities:
    abilities: () => {
      addMessage(`${emoji()} Вот что я умею:`);
      renderReactions([
        {
          text: "💅 Показать прайс",
          callback: () => renderServiceList()
        },
        {
          text: "🎨 Идеи дизайна",
          callback: () => handleDesign()
        },
        {
          text: "📅 Записаться",
          callback: () => renderBookingOptions()
        }
      ]);
    },
    help: () => {
      addMessage(`${emoji()} Я помогу с выбором! Вот мои команды:`);
      renderReactions([
        { text: "💅 Прайс",        callback: () => renderServiceList()    },
        { text: "🎨 Дизайн",      callback: () => handleDesign()        },
        { text: "📅 Запись",      callback: () => renderBookingOptions() },
        { text: "❓ Что я умею?",  callback: () => handlers.abilities()   }
      ]);
    },
    about: () => {
      addMessage("🦊 Я Фокси — виртуальная подружка и мастер маникюра 💅");
      renderReactions([
        { text: "❓ Что я умею?", callback: () => handlers.abilities() }
      ]);
    },
    confirmation:  () => {
      addMessage("Супер! Тогда выбери, с чего начнём 💅");
      renderServiceList();
    },
    confirm:       () => {
      addMessage("Отлично! Тогда давай выберем, что тебя интересует 💅");
      renderServiceList();
    }
  };

  const fn = handlers[intent];
  if (fn) {
    fn();
    return true;
  }
  return false;
}
