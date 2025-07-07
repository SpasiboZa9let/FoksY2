// foxy/ui/ui.js

import { services, emoji } from "../core/services.js";
import { addMessage, clearButtons, getReactions } from "./dom.js";

/**
 * Рендер списка услуг кнопками
 * @param {Function} onClick — callback при выборе услуги
 */
export function renderServiceList(onClick) {
  clearButtons();
  addMessage(`${emoji()} Выберите услугу:`);

  const reactions = getReactions();
  if (!reactions) return;
  const wr = document.createElement("div");
  wr.className = "flex gap-2 flex-wrap";

  Object.keys(services).forEach(name => {
    const display = capitalize(name);
    const key = name.toLowerCase();
    const btn = document.createElement("button");
    btn.textContent = display;
    btn.className = "bg-gray-200 text-black px-3 py-1 rounded-xl text-sm";
    btn.onclick = () => onClick(key);
    wr.appendChild(btn);
  });

  reactions.appendChild(wr);
}

/**
 * Кнопки записи — открыть DIKIDI или Telegram
 */
export function renderBookingOptions() {
  clearButtons();
  addMessage(`${emoji()} Можно записаться двумя способами:`);

  const reactions = getReactions();
  if (!reactions) return;

  addMessage("📅 Через DIKIDI — сам выбираешь время:");
  const dikidiBtn = document.createElement("button");
  dikidiBtn.textContent = "Открыть DIKIDI";
  dikidiBtn.className = "bg-pink-600 text-white px-3 py-1 rounded-xl text-sm";
  dikidiBtn.onclick = () => window.open("https://dikidi.net/1456370?p=2.pi-po-ssm&o=7", "_blank");
  reactions.appendChild(dikidiBtn);

  addMessage("💬 Или через Telegram:");
  const tgBtn = document.createElement("button");
  tgBtn.textContent = "Связаться в Telegram";
  tgBtn.className = "bg-blue-600 text-white px-3 py-1 rounded-xl text-sm";
  tgBtn.onclick = () => window.open("https://t.me/foxold_a", "_blank");
  reactions.appendChild(tgBtn);
}

/**
 * Рендер универсальных кнопок-реакций
 * @param {Array<{text: string, callback: Function}>} options
 */
export function renderReactions(options = []) {
  clearButtons();
  const reactions = getReactions();
  if (!reactions) return;

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.className = "ai-btn";
    btn.addEventListener("click", opt.callback);
    reactions.appendChild(btn);
  });
}
