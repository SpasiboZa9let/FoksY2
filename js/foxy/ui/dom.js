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
 * @param {boolean} [isHTML=false] — вставлять как HTML
 * @param {boolean} [fromUser=false] — сообщение от пользователя
 */
export function addMessage(text, isHTML = false, fromUser = false) {
  const chat = getChat();
  if (!chat) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble foxy-fade-in ${fromUser ? 'from-user' : 'from-foxy'}`;

  // 💎 Все сообщения, содержащие "Фокси:", считаем приветственными
  if (!fromUser && text.includes('Фокси:')) {
    bubble.classList.add("welcome-message");
  }

  if (isHTML) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  console.log("class:", bubble.className);

  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

/**
 * Очищает контейнер с кнопками
 */
export function clearButtons() {
  const reactions = getReactions();
  if (!reactions) return;
  reactions.innerHTML = "";
}

/**
 * Отрисовывает кнопки-реакции
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
 * @param {boolean} [isHTML=false]
 * @param {boolean} [fromUser=false]
 */
export function addTypingMessage(text, delay = 500, isHTML = false, fromUser = false) {
  const chat = getChat();
  if (!chat) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble foxy-fade-in opacity-50 ${fromUser ? 'from-user' : 'from-foxy'}`;
  bubble.textContent = "Фокси печатает...";

  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    // 1. Вставляем содержимое
    if (isHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }

    bubble.classList.remove("opacity-50");

    // 2. Любое сообщение с "Фокси:" делаем приветственным
    if (!fromUser && text.includes('Фокси:')) {
      bubble.classList.add("welcome-message");
      console.log("🎯 welcome (typing):", bubble.className);
    }
  }, delay);
}
