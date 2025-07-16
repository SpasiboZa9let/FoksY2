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
 * Прокручивает чат вниз
 */
export function scrollToBottom() {
  const chat = getChat();
  if (chat) chat.scrollTop = chat.scrollHeight;
}

/**
 * Добавляет в чат новое сообщение.
 * @param {string} text — текст сообщения (или HTML, если isHTML=true)
 * @param {boolean} [isHTML=false] — вставлять как HTML
 * @param {boolean} [fromUser=false] — сообщение от пользователя
 * @param {string} [extraClass=""] — доп. CSS класс
 */
export function addTypingMessage(text, delay = 500, isHTML = false, fromUser = false, extraClass = "") {
  const chat = getChat();
  if (!chat) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble foxy-fade-in opacity-50 ${fromUser ? 'from-user' : 'from-foxy'} ${extraClass}`;
  bubble.textContent = "Фокси печатает...";

  chat.appendChild(bubble);
  scrollToBottom();

  setTimeout(() => {
    if (isHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }

    bubble.classList.remove("opacity-50");

    // 🔧 Перемещение в нужное место
    if (extraClass === "welcome-message") {
      chat.insertBefore(bubble, chat.firstChild);
    } else if (extraClass === "welcome-secondary") {
      const welcome = chat.querySelector(".welcome-message");
      if (welcome && welcome.nextSibling) {
        chat.insertBefore(bubble, welcome.nextSibling);
      } else if (welcome) {
        chat.appendChild(bubble);
      } else {
        chat.insertBefore(bubble, chat.firstChild);
      }
    }

    scrollToBottom();
  }, delay);
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
