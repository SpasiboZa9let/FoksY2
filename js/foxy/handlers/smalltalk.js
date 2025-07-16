import { emoji } from "../core/services.js";
import { addMessage, renderReactions } from "../ui/dom.js";
import { renderServiceList, renderBookingOptions } from "../ui/ui.js";
import { handleDesign } from "./design.js";
import { handleUserInput } from "./mainHandler.js";
import { randomSmalltalk } from "../core/phrases.js";

export function handleSmalltalk(intent) {
  if (!intent) return false;

  const handlers = {
    greeting:      () => addMessage(randomSmalltalk("greeting")),
    smalltalkLite: () => addMessage(randomSmalltalk("smalltalkLite")),
    thanks:        () => addMessage(randomSmalltalk("thanks")),
    bye:           () => addMessage(randomSmalltalk("bye")),
    mood:          () => addMessage(randomSmalltalk("mood")),
    softWarning:   () => addMessage("🧸 Хочу оставаться вежливой. Давай говорить по-доброму?"),
    compliment: () => addMessage(randomSmalltalk("compliment")),
    joke: () => addMessage(randomSmalltalk("joke")),
    weather: () => addMessage(randomSmalltalk("weather")),
    question: () => addMessage(randomSmalltalk("question")),
  
    abilities: () => {
  addMessage(`
🦊 Я умею:
— ловить твои комплименты и отвечать с теплом 💖
— рассказывать шутки и поднимать настроение 😄
— говорить о погоде и делиться вдохновением ☀️❄️
— помогать записаться на услуги 💅
— показывать идеи дизайна 🎨
— считать скидки и бонусы ⭐
— просто болтать, когда хочется 😊

Выбирай, что хочешь, и жми кнопки ниже 👇
  `, false, false, "foxy-abilities"); // ← здесь добавлен класс

  renderReactions([
    { text: "💅 Прайс",        callback: () => renderServiceList() },
    { text: "🎨 Дизайн",       callback: () => handleDesign() },
    { text: "📅 Запись",       callback: () => renderBookingOptions() },
    { text: "⭐ Мои баллы",    callback: () => handleUserInput("баллы") },
    { text: "🧮 Калькулятор",  callback: () => handleUserInput("калькулятор") },
    { text: "🎉 Я уже записана", callback: () => handleUserInput("уже записана") },
    { text: "❓ Помощь",       callback: () => handleUserInput("помощь") }
  ]);
},

    about: () => {
      addMessage("🦊 Я Фокси — виртуальная подружка и мастер маникюра 💅");
      renderReactions([
        { text: "❓ Что я умею?", callback: () => handlers.abilities() }
      ]);
    },

    confirmation: () => {
      addMessage("Супер! Тогда выбери, с чего начнём 💅");
      renderServiceList();
    },

    confirm: () => {
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
