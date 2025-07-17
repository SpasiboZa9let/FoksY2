// dom.js — утилиты для работы с DOM (v2)
//
// Основные изменения:
// 1. addMessage / addTypingMessage принимают объект опций.
// 2. Поддержка авто‑удаления через dismissAfter.
// 3. Функции возвращают созданный bubble для дальнейшего управления.
// 4. scrollToBottom использует requestAnimationFrame.
// 5. Прочие оптимизации.

const CHAT_ID = 'pseudo-chat';
const REACTIONS_ID = 'pseudo-reactions';
const $ = (id) => document.getElementById(id);

/* Контейнеры */
export const getChat = () => $(CHAT_ID);
export const getReactions = () => $(REACTIONS_ID);

/* Скролл к последнему сообщению */
export const scrollToBottom = () => {
  const chat = getChat();
  if (chat) requestAnimationFrame(() => (chat.scrollTop = chat.scrollHeight));
};

/* Вставляет bubble в чат */
function appendBubble(text, { html, fromUser }) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble foxy-fade-in ${fromUser ? 'from-user' : 'from-foxy'}`;
  if (!fromUser && /Фокси:/.test(text)) bubble.classList.add('welcome-message');
  html ? (bubble.innerHTML = text) : (bubble.textContent = text);
  getChat()?.appendChild(bubble);
  scrollToBottom();
  return bubble;
}

/**
 * Добавляет сообщение
 * @param {string} text
 * @param {Object} [opts]
 * @param {boolean} [opts.html=false]            — интерпретировать как HTML
 * @param {boolean} [opts.fromUser=false]        — сообщение от пользователя
 * @param {number|null} [opts.dismissAfter=null] — авто‑удаление, мс
 * @returns {HTMLDivElement|null}
 */
export function addMessage(text, opts = {}) {
  const { html = false, fromUser = false, dismissAfter = null } = opts;
  const bubble = appendBubble(text, { html, fromUser });
  if (bubble && dismissAfter) setTimeout(() => bubble.remove(), dismissAfter);
  return bubble;
}

/* Очистка реакций */
export const clearButtons = () => {
  const box = getReactions();
  if (box) box.textContent = '';
};

/**
 * Отрисовывает кнопки‑реакции
 * @param {{text:string, callback:Function}[]} list
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

/* Полная очистка чата */
export const clearChat = () => {
  const chat = getChat();
  if (chat) chat.textContent = '';
};

/**
 * Добавляет сообщение с эффектом «печатает…»
 * @param {string} finalText
 * @param {number} [delay=500]                   — задержка перед появлением полного текста
 * @param {Object} [opts]
 * @param {boolean} [opts.html=false]
 * @param {boolean} [opts.fromUser=false]
 * @param {number|null} [opts.dismissAfter=null]
 * @returns {HTMLDivElement|null}
 */
export function addTypingMessage(finalText, delay = 500, opts = {}) {
  const { html = false, fromUser = false, dismissAfter = null } = opts;
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
    if (!fromUser && /Фокси:/.test(finalText)) bubble.classList.add('welcome-message');
    scrollToBottom();
    if (dismissAfter) setTimeout(() => bubble.remove(), dismissAfter);
  }, delay);

  return bubble;
}
