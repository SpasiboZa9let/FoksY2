// core/phrases.js

export const greetings = [
  `Привет, %NAME%! 💖 Чем сегодня порадовать твои ноготки?`,
  `Салют, %NAME%! 🌟 Готова создавать красоту вместе?`,
  `Здравствуй, %NAME%! ✨ Что выберем для твоего идеального маникюра?`,
  `Хэй, %NAME%! 💅 Готова к стильному преображению?`,
  `Добро пожаловать, %NAME%! 😊 Давай сделаем ноготки особенными!`
];

export const fallbackReplies = [
  "Попробуй сказать по-другому, я помогу! 💖",
  "Не уверена, что поняла… Может, выберем из списка?",
  "Хмм… Давай попробуем иначе? 🙈"
];

export const promoReplies = {
  alreadyUsed: "⚠️ Этот код уже использовался.",
  success: "💫 Код принят! +100 баллов на счёт!",
  invalid: "🙅‍♀️ Не подходит! Попробуй другой код.",
  hint: "🦊 Сейчас баллы начисляются только по промокодам 🎁\nВведи его, если есть!"
};

export const pointsReplies = {
  noPoints: [
    "⭐ У тебя пока нет баллов… Но всё впереди!",
    "🙈 Баллы не найдены. Надо бы их заработать!",
    "🔎 Ноль баллов. Пора это исправить 💅"
  ],
  hasPoints: (pts, percent) =>
    `⭐ У тебя ${pts} балл(ов).\n${percent > 0 ? `${percent.toFixed(1)}% скидки на следующую услугу.` : "Недостаточно баллов для скидки."}`
};

export const calcInstructions =
  "Введи цену услуги и количество баллов через пробел, например:\n1500 300";

export const calcFormatError =
  "Формат не понятен. Напиши, например:\n1200 300";

export const helpIntro =
  "🦊 Я помогу с выбором! Вот что могу предложить:";

export const askForName =
  "Как тебя зовут? 😊 Напиши своё имя.";

export const askForService =
  "На какую услугу тебя записать? 💅";

export const bookingFollowup =
  "Хочешь ещё что-то посмотреть? 🌟";

export const userSaid = (text) =>
  `Вы: ${text}`;

export const serviceConfirmTemplate = (svcName) =>
  `Записать тебя на ${svcName}? 💖`;

export const bookingConfirmed = (svcName, userName) =>
  `📌 Записала тебя на «${svcName}», ${userName}! 💅`;

export const priceInquiryTemplate = (svcName, description) =>
  `«${svcName}» 💅\n${description}`;

export const priceInquiryFollowup = (svcName) =>
  `Хочешь записаться на ${svcName}? 😊`;

// Вспомогательные
export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomGreeting(name) {
  return randomFrom(greetings).replace("%NAME%", name);
}
