// core/rewards.js
import { addMessage } from "../ui/dom.js";

export function addLoyaltyPoints(count = 100) {
  const today = new Date().toISOString().slice(0, 10);
  const lastBonus = localStorage.getItem("foxy_bonusDate");

  if (lastBonus === today) {
    addMessage("🦊 Я уже начисляла баллы сегодня 😊");
    return false;
  }

  const current = parseInt(localStorage.getItem("foxy_points") || "0");
  const updated = current + count;

  localStorage.setItem("foxy_points", updated.toString());
  localStorage.setItem("foxy_bonusDate", today);

  addMessage(`⭐ Начислено ${count} баллов!\nТеперь у тебя ${updated} баллов.`);
  return true;
}



export function showCurrentPoints() {
  const points = parseInt(localStorage.getItem("foxy_points") || "0");
  const percent = Math.min((points / 100) * 5, 20).toFixed(1);
  const discount = percent >= 5 ? `${percent}% скидки` : "недостаточно баллов для скидки";

  const word = getPlural(points, ["балл", "балла", "баллов"]);

  addMessage(`⭐ У тебя ${points} ${word}.\n${discount} на следующую услугу.`);
}

function getPlural(n, forms) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
