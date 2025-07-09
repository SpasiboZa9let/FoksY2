// js/foxy/ui/dom.js

/**
 * Возвращает контейнер для сообщений
 */
export function getChat() {
  return document.getElementById("pseudo-chat");
}

/**
 * Возвращает контейнер для кнопок-реакций
 */
export function getReactions() {
  return document.getElementById("pseudo-reactions");
}

/**
 * Добавляет в чат новое сообщение.
 * @param {string} text — текст сообщения (или HTML, если isHTML=true)
 * @param {boolean} [isHTML=false] — вставлять как HTML (true) или как textContent (false)
 */
export function addMessage(text, isHTML = false) {
  const chat = getChat();
  if (!chat) return;

  const bubble = document.createElement("div");
  // Определяем класс по отправителю
  const whoClass = isHTML ? "from-foxy" : "from-user";
  bubble.className = [
    whoClass,
    "p-2",
    "rounded-xl",
    "text-sm",
    "shadow",
    "whitespace-pre-line",
    "foxy-fade-in"
  ].join(" ");

  if (isHTML) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

/**
 * Очищает контейнер с кнопками (реакциями)
 */
export function clearButtons() {
  const reactions = getReactions();
  if (!reactions) return;
  reactions.innerHTML = "";
}

/**
 * Отрисовывает кнопки-реакции
 * @param {Array} options — список кнопок с текстом и callback
 */
export function renderReactions(options = []) {
  const reactions = getReactions();
  if (!reactions) return;
  reactions.innerHTML = "";
  for (const opt of options) {
    const btn = document.createElement("button");
    btn.className = "ai-btn";
    btn.textContent = opt.text;
    btn.addEventListener("click", opt.callback);
    reactions.appendChild(btn);
  }
}

/**
 * Полностью очищает чат
 */
export function clearChat() {
  const chat = getChat();
  if (!chat) return;
  chat.innerHTML = "";
}

/**
 * Добавляет сообщение с эффектом печати
 * @param {string} text — финальный текст
 * @param {number} delay — задержка в мс
 * @param {boolean} [isHTML=false] — использовать innerHTML вместо textContent
 */
export function addTypingMessage(text, delay = 500, isHTML = false) {
  const chat = getChat();
  if (!chat) return;

  const bubble = document.createElement("div");
  // Всегда от Фокси и полупрозрачное
  bubble.className = [
    "from-foxy",
    "p-2",
    "rounded-xl",
    "text-sm",
    "shadow",
    "whitespace-pre-line",
    "foxy-fade-in",
    "opacity-50"
  ].join(" ");
  bubble.textContent = "Фокси печатает...";

  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    if (isHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }
    bubble.classList.remove("opacity-50");
  }, delay);
}
