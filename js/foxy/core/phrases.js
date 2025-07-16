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
  "Хмм… Давай попробуем иначе? 🙈",
  "Хмм… Не уверена. Но можешь спросить что-нибудь — я люблю поболтать! 💖",
  "Не совсем поняла… Напиши, например: «шутка», «как дела» или «ты супер» 🦊",
  "Если хочешь, просто напиши что-то вроде «что нового» — я поддержу!"
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

eexport const helpIntroVariants = [
  "🦊 Я помогу с выбором! Вот что могу предложить:",
  "💅 Я подскажу, что у меня есть — выбери вариант:",
  "✨ Вот мои суперспособности — нажимай!",
  "🧡 Вот что я могу — выбирай, что интересно:"
];

export const helpIntro = () => randomFrom(helpIntroVariants);


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

// ... randomGreeting

export const suggestionsHTML = `
  <div class="foxy-suggestions">
    <div class="buttons-wrapper">
      <button class='ai-btn' data-action="записаться">📅 Записаться</button>
      <button class='ai-btn' data-action="альбом">📸 Альбом</button>
      <button class='ai-btn' data-action="баллы">⭐ Бонусы</button>
      <button class='ai-btn' data-action="дизайн">🎨 Идеи дизайна</button>
      <button class='ai-btn' data-action="калькулятор">🧮 Калькулятор</button>
      <button class='ai-btn' data-action="что ты умеешь">❓ Возможности</button>
    </div>
    <div class="footer">Выбери что-то, и я покажу 💖</div>
  </div>
`;
export const talkSuggestions = [
  "💬 Хочешь просто поболтать? Напиши мне: «как дела», «шутка» или «ты милая» 😊",
  "🦊 Я не только записываю — я ещё и люблю шутки, болтушки и комплименты 💅 Попробуй что-то вроде: «расскажи анекдот», «красивая», «погода»",
  "✨ Кстати, я обожаю, когда со мной говорят просто так! Напиши: «что нового», «ты супер», «шутка»"
];


export const smalltalkReplies = {
  greeting: [
    "Привет-привет! 🦊",
    "Салют, красотка! 💅",
    "Хэй, рада тебя видеть! ✨",
    "Ой, как приятно тебя видеть снова! 🧡",
    "Ты сегодня просто сияешь! 💖"
  ],
  smalltalkLite: [
    "Расскажи, как проходит день? 🌞",
    "Я тут, если захочешь что-то посмотреть 💖",
    "Можно просто поболтать 💅",
    "Обожаю такие моменты — когда просто говорим ✨",
    "Ой, ты так неожиданно, но приятно 🦊"
  ],
  thanks: [
    "Пожалуйста! 🦊 Всегда рада помочь!",
    "Обращайся в любое время 💖",
    "😘",
    "Всегда к твоим услугам 💅"
  ],
  bye: [
    "До встречи, красотка! 💅",
    "Пока-пока! Буду ждать 💖",
    "Заглядывай ещё ✨",
    "Уже скучаю 😘"
  ],
  mood: [
    "Я в прекрасном настроении! А ты? 🌈",
    "Настроение — рисовать ногти и делать красиво 💅",
    "Как твой настрой сегодня? 😊",
    "Думаю о блёстках и втирке 💖"
  ]
};

smalltalkReplies.compliment = [
  "Ой, спасибо! Ты тоже просто сияешь сегодня ✨",
  "Ты умеешь делать мне день! 💖",
  "Ты такая милая! 🦊 Спасибо!"
];

smalltalkReplies.joke = [
  "Почему маникюр — как медитация? Потому что все молчат и красиво становится 😄",
  "Знаешь, почему ногти не спорят? Потому что всё решает дизайн! 💅",
  "Я бы пошутила… но боюсь, ты смахнёшь меня свайпом 🙈"
];

smalltalkReplies.weather = [
  "Погода за окном не важна — у нас всегда тепло и блёстки ✨",
  "Если за окном пасмурно, добавим цвета в дизайн! 💅",
  "Главное — не погода, а настроение 🌈"
];

smalltalkReplies.question = [
  "Спроси, что угодно! Я постараюсь ответить 💖",
  "Я здесь, чтобы помогать! 🦊",
  "С удовольствием расскажу всё, что знаю 💅"
];



export function randomSmalltalk(key) {
  return randomFrom(smalltalkReplies[key] || []);
}



