// js/foxy/handlers.js

import { matchIntent } from "./intents.js";
import { services, randomReply, matchService, emoji } from "./responses.js";
import {
  lastInput, setLastInput, foxyMood,
  setLastIntent, setLastService, lastIntent, lastService,
  lastReplyType, setLastReplyType
} from "./state.js";
import { addMessage, clearButtons, getReactions } from "./dom.js";
import { renderServiceList, renderReactions, renderBookingOptions } from "./ui.js";

export function handleUserInput(message) {
  clearButtons();

  const input = message.trim();
  if (!input || input.toLowerCase() === lastInput) return;
  setLastInput(input.toLowerCase());

  addMessage(`Вы: ${message}`);

  // 🧠 0) Попытка отреагировать на уточнение
  if (/(сколько.*стоит|это с|а где|а когда|можно|под[оо]йд[её]т)/i.test(input)) {
    if (lastService) {
      const text = services[lastService];

      if (lastReplyType === "fullService") {
        addMessage(`${emoji(foxyMood)} Ага, уточняешь! Это всё про «${lastService}» 💅\n${text}`);
        // не повторяем booking, просто даём фоллоу-ап
      } else {
        addMessage(`${emoji(foxyMood)} Это про «${lastService}»? Вот что входит:\n${text}`);
        renderBookingOptions();
        setLastReplyType("fullService");
      }
      return;
    } else if (lastIntent === "design") {
      addMessage(`${emoji()} Если про дизайн — могу показать примеры или тренды! 🎨`);
      renderReactions([
        { text: "📌 Примеры", callback: () => addMessage(randomReply("design"), true) },
        { text: "🔥 Что модно", callback: () => showTrendyOptions() }
      ]);
      return;
    }
  }

  // 1) Услуга?
  const svc = matchService(input);
  if (svc) {
    setLastService(svc.name);
    setLastIntent("service");

    const text = services[svc.name];
    if (text) {
      addMessage(`${emoji(foxyMood)} ${text}`);
      renderBookingOptions();
      setLastReplyType("fullService");
    } else {
      addMessage(`${emoji(foxyMood)} Упс… информации по услуге нет 😥`);
    }
    return;
  }

  // 2) Интент
  const intent = matchIntent(input.toLowerCase());
  setLastIntent(intent);

  switch (intent) {
    case "design":
      addMessage(randomReply("design"), true);
      return;
      case "confirm":
  if (lastIntent === "service" && lastService) {
    addMessage(`${emoji()} Отлично! Хочешь, запишу тебя на «${lastService}»?`);
    renderBookingOptions();
  } else if (lastIntent === "design") {
    addMessage(`${emoji()} Покажу тогда ещё примеры? 😉`);
    renderReactions([
      { text: "📌 Давай", callback: () => addMessage(randomReply("design"), true) },
      { text: "🔥 Что модно", callback: () => showTrendyOptions() }
    ]);
  } else {
    addMessage(`${emoji()} Класс! Чем могу помочь ещё?`);
  }
  return;

    case "abilities":
      addMessage(`${emoji()} Я умею подбирать дизайн, рассказывать про услуги и помогать с записью на маникюр.`);

      clearButtons();
      const reactions = getReactions();
      if (!reactions) return;

      const options = [
        { text: "💅 Прайс", handler: () => renderServiceList(handleUserInput) },
        { text: "🎨 Дизайн", handler: () => addMessage(randomReply("design"), true) },
        { text: "🔥 Что модно", handler: () => showTrendyOptions() }
      ];

      const wrap = document.createElement("div");
      wrap.className = "flex gap-2 flex-wrap";

      options.forEach(({ text, handler }) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.className = "bg-pink-100 text-pink-700 px-3 py-1 rounded-xl text-sm";
        btn.onclick = handler;
        wrap.appendChild(btn);
      });

      reactions.appendChild(wrap);
      return;

    case "booking":
      renderBookingOptions();
      return;

    case "greeting":
    case "mood":
    case "smalltalkLite":
    case "thanks":
    case "bye":
    case "softWarning":
    case "styleTalk":
    case "about":
      addMessage(randomReply(intent));
      return;

    case "showServices":
    case "help":
      renderServiceList(handleUserInput);
      return;

    default:
      addMessage(randomReply("fallback"));
      renderServiceList(handleUserInput);
  }
}

function showTrendyOptions() {
  addMessage(`${emoji()} Сейчас в моде:`);

  const examples = [
    "🌸 Нюд с минималистичным дизайном",
    "💎 Стразы на одном ногте",
    "🖤 Чёрный глянец + матовый топ",
    "✨ «Кошачий глаз» с градиентом",
    "🎨 Градиентный френч",
    "🧊 Лёд-эффект и текстуры"
  ];

  examples.forEach(style => {
    addMessage(`• ${style}`);
  });

  addMessage("Хочешь, подскажу, что подойдёт под твоё настроение? 😉");

  addMessage(
    `<a href="https://www.pinterest.com/search/pins/?q=маникюр%20дизайн"
        target="_blank" rel="noopener noreferrer"
        class="text-pink-500 underline">
      📌 Загляни в мой альбом вдохновения на Pinterest 💖
    </a>`,
    true
  );
}
