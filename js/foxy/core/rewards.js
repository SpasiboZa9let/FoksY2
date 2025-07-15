// core/rewards.js
import { addMessage } from "../ui/dom.js";

export function addLoyaltyPoints(count = 100) {
  const current = parseInt(localStorage.getItem("foxy_points") || "0");
  const updated = current + count;
  localStorage.setItem("foxy_points", updated.toString());

  addMessage(`⭐ Начислено ${count} баллов!\nТеперь у тебя ${updated} баллов.`);
}

export function showCurrentPoints() {
  const points = parseInt(localStorage.getItem("foxy_points") || "0");
  const percent = Math.min((points / 100) * 5, 20);
  addMessage(`⭐ У тебя ${points} баллов.\nЭто ${percent}% скидки на следующую услугу.`);
}
