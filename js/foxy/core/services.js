import { normalize } from "../core/utils.js";

// 💅 Услуги и описание
export const services = {
  "комби маникюр":       "Снятие + комби-маникюр — 1000₽.",
  "маникюр с покрытием": "Снятие + комби + укрепление + дизайн — от 1700₽.",
  "коррекция длины":     "Коррекция длины и формы — от 2100₽.",
  "наращивание ногтей":  "Наращивание + оформление — 3000₽.",
  "снятие покрытия":     "Снятие без дальнейшего покрытия — 500₽."
};

// 🔁 Синонимы и альтернативные фразы
const aliases = {
  "комби": "комби маникюр",
  "маникюр": "комби маникюр",
  "укрепление": "маникюр с покрытием",
  "покрытие": "маникюр с покрытием",
  "длина": "коррекция длины",
  "длину": "коррекция длины",
  "коррекция": "коррекция длины",
  "нарастить": "наращивание ногтей",
  "наращивание": "наращивание ногтей",
  "снятие": "снятие покрытия",
  "снять": "снятие покрытия"
};

// 🛑 Мягкий список блокируемых фраз
const stopWords = [
  "как дела", "что ты", "кто ты", "дизайн",
  "услуги", "помоги", "помощь", "не знаю", "расскажи"
];

/**
 * Поиск услуги по тексту — ловим упоминания внутри фразы
 */
export function matchService(text) {
  const input = normalize(text);

  // 1) Игнорируем стоп-слова полностью
  if (stopWords.some(w => input === normalize(w))) {
    console.log("🛑 стоп-слово в matchService:", input);
    return null;
  }

  // 2) Сначала пробуем найти по алиасам (синонимам)
  for (const [alias, serviceName] of Object.entries(aliases)) {
    const normAlias = normalize(alias);
    if (input.includes(normAlias)) {
      return { name: serviceName, exact: false };
    }
  }

  // 3) Затем — по основным названиям услуг
  for (const serviceName of Object.keys(services)) {
    const normKey = normalize(serviceName);
    if (input.includes(normKey)) {
      return { name: serviceName, exact: true };
    }
  }

  return null;
}

// 💬 Ответы по категориям
export const replies = {
  greeting: [
    "Приветик! Что интересует сегодня — нюд, блёстки или кошачий глаз? 😘",
    "Салют! Давай выберем что-то стильное вместе 🌈"
  ],
  smalltalkLite: [
    "У меня всё отлично! Спасибо, что спросите 😊",
    "Все супер! А как ваши ноготки сегодня? 💅"
  ],
  mood: [
    "Спасибо, что спросили! У меня всё отлично 💅",
    "Настроение — как свежий маникюр ✨"
  ],
  thanks: [
    "Пожалуйста 😊",
    "Обращайся в любое время 🌸"
  ],
  bye: [
    "До встречи! Не забывай баловать себя ✨",
    "Пока-пока! Буду ждать 💖"
  ],
  design: [
    "Для вдохновения дизайном ногтей загляни сюда: <a href=\"https://pin.it/2FsXp2Lb5\" class=\"text-pink-500 underline\">Pinterest</a>"
  ],
  fallback: [
    "Не совсем поняла… Попробуй переформулировать 🙈"
  ]
};

/**
 * Возвращает случайный ответ для данного интента
 */
export function randomReply(type) {
  const arr = replies[type] || replies.fallback;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Эмодзи Фокси (можно менять по настроению)
 */
export function emoji(mood = "neutral") {
  return "🦊";
}
