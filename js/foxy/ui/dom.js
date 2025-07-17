// dom.js — утилиты для работы с DOM (v2‑fix)
//
// * Поддержка старого вызова addMessage(text, true)
// * Авто‑удаление welcome‑сообщения по умолчанию (3 с)
// ---------------------------------------------------

const CHAT_ID = 'pseudo-chat';
const REACTIONS_ID = 'pseudo-reactions';
const $ = (id) => document.getElementById(id);

/** Контейнеры */
export const getChat = () => $(CHAT_ID);
export const getReactions = () => $(REACTIONS_ID);

/** Скролл к низу */
export const scrollToBottom = () => {
  const chat = getChat();
  if (chat) requestAnimationFrame(() => (chat.scrollTop = chat.scrollHeight));
};

/**
 * Добавляет сообщение
 * @param {string} text
 * @param {Object|boolean} [opts] — либо объект опций, либо legacy‑флаг «html=true»
 * @param {boolean} [opts.html=false]
 * @param {boolean} [opts.fromUser=false]
 * @param {number|null} [opts.dismissAfter=null] — авто‑удалить (мс)
 * @returns {HTMLDivElement|null}
 */
export function addMessage(text, opts = {}) {
  // ↓ обратная совместимость с вызовами addMessage(text, true)
  if (typeof opts === 'boolean') opts = { html: opts };

  let { html = false, fromUser = false, dismissAfter = null } = opts;
  const chat = getChat();
  if (!chat) return null;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble foxy-fade-in ${fromUser ? 'from-user' : 'from-foxy'}`;

  // маркер «welcome» + автозакрытие через 3 с, если не задано иначе
  if (!fromUser && /Фокси:/.test(text)) {
    bubble.classList.add('welcome-message');
    if (dismissAfter === null) dismissAfter = 3000;
  }

  html ? (bubble.innerHTML = text) : (bubble.textContent = text);
  chat.appendChild(bubble);
  scrollToBottom();

  if (dismissAfter) setTimeout(() => bubble.remove(), dismissAfter);
  return bubble;
}

/** Очистка реакций */
export const clearButtons = () => {
  const box = getReactions();
  if (box) box.textContent = '';
};

/**
 * Рендер кнопок‑реакций
 * @param {{text:string,callback:Function}[]} list
 */
export function renderReactions(list = []) {
  const box = getReactions();
  if (!box) return;
  clearButtons();
  list.forEach(({ text, callback }) => {
    const btn = document.createElement('button');
    btn.className = 'ai-btn';
    btn.textContent = text;
    btn.addEventListener('click', callback);
    box.appendChild(btn);
  });
}

/** Полная очистка чата */
export const clearChat = () => {
  const chat = getChat();
  if (chat) chat.textContent = '';
};

/**
 * Сообщение с эффектом печати
 * @param {string} finalText
 * @param {number} [delay=500]
 * @param {Object|boolean} [opts] — либо объект, либо legacy‑html=true
 * @param {boolean} [opts.html=false]
 * @param {boolean} [opts.fromUser=false]
 * @param {number|null} [opts.dismissAfter=null]
 * @returns {HTMLDivElement|null}
 */
export function addTypingMessage(finalText, delay = 500, opts = {}) {
  if (typeof opts === 'boolean') opts = { html: opts };
  let { html = false, fromUser = false, dismissAfter = null } = opts;

  const chat = getChat();
  if (!chat) return null;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble foxy-fade-in opacity-50 ${fromUser ? 'from-user' : 'from-foxy'}`;
  bubble.textContent = 'Фокси печатает...';

  chat.appendChild(bubble);
  scrollToBottom();

  setTimeout(() => {
    html ? (bubble.innerHTML = finalText) : (bubble.textContent = finalText);
    bubble.classList.remove('opacity-50');

    if (!fromUser && /Фокси:/.test(finalText)) {
      bubble.classList.add('welcome-message');
      if (dismissAfter === null) dismissAfter = 3000;
    }

    scrollToBottom();
    if (dismissAfter) setTimeout(() => bubble.remove(), dismissAfter);
  }, delay);

  return bubble;
}
