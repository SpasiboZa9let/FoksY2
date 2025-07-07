import { randomReply, emoji } from "../core/services.js";
import { addMessage } from "../ui/dom.js";
import { renderServiceList } from "../ui/ui.js";

// foxy/handlers/smalltalk.js

export function handleSmalltalk(intent) {
  if (!intent) return false;

  const handlers = {
    greeting:      () => addMessage(randomReply("greeting")),
    smalltalkLite: () => addMessage(randomReply("smalltalkLite")),  // <-- теперь обрабатываем
    thanks:        () => addMessage(randomReply("thanks")),
    bye:           () => addMessage(randomReply("bye")),
    mood:          () => addMessage(randomReply("mood")),
    softWarning:   () => addMessage("🧸 Хочу оставаться вежливой. Давай говорить по-доброму?"),
    abilities:     () => {
      addMessage(`${emoji()} Вот чем могу быть полезна прямо сейчас:`);
      renderServiceList();
    },
    help:          () => {
      addMessage(`${emoji()} Я помогу с выбором! Вот что у меня есть:`);
      renderServiceList();
    },
    about:         () => {
      addMessage("🦊 Я Фокси — виртуальная подружка и мастер маникюра 💅");
      renderServiceList();
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

