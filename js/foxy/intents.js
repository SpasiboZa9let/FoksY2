// js/foxy/intents.js

const patterns = {
  // 👋 Приветствие
  greeting: [/^привет/i, /^здрав/i],

  // 👋 Прощание
  bye: [/^пока/i, /^до свид/i],

  // 🙏 Благодарность
  thanks: [/спасиб/i, /благодар/i],

  // 💬 Настроение, smalltalk
  mood: [/как.*дела/i, /как ты/i],
  smalltalkLite: [/ок/i, /хорошо/i, /ладно/i, /ясно/i],

  // 🆘 Помощь
  help: [/помощ/i, /не знаю/i, /помоги/i],

  // 📋 Услуги и прайс
  showServices: [/услуг/i, /прайс/i, /цены/i],

  // 📅 Запись
  booking: [/запис/i, /свободн.*врем/i, /сдела[тью]/i],

  // 💅 Дизайн и выбор
  design: [/дизайн/i, /пример/i, /вдохнов/i],
  styleTalk: [/нюд/i, /бл[её]стк/i, /кошачий/i, /френч/i, /стразы/i],

  // 📌 Покажи что-то
  showSomething: [/покажи/i, /открой/i, /хочу увидеть/i, /хочу посмот/i],

  // ✅ Подтверждение
  confirm: [/^да$/i, /^ага$/i, /^точно$/i, /^именно$/i],
  confirmBooking: [/запиш/i, /оформ/i, /подтверди/i, /забронируй/i, /внеси/i],

  // ℹ️ О боте
  about: [/кто ты/i, /что ты такое/i, /ты бот/i],

  // 🧠 Навыки
  abilities: [/что ты умеешь/i, /чем.*можешь.*помочь/i, /зачем ты/i, /для чего ты/i],

  // 😬 Предупреждения
  softWarning: [/дура/i, /тупая/i, /хуй/i, /пошла/i]
};

export function matchIntent(input) {
  for (const [intent, regexes] of Object.entries(patterns)) {
    if (regexes.some(r => r.test(input))) return intent;
  }
  return null;
}
