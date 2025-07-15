// core/rewards.js
import { addMessage } from "../ui/dom.js";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function checkVisitPoints() {
  const today = getToday();
  const last = localStorage.getItem("foxy_pointsLast") || "";
  let points = parseInt(localStorage.getItem("foxy_points") || "0");

  if (last === today) return;

  points += 1;
  localStorage.setItem("foxy_points", points.toString());
  localStorage.setItem("foxy_pointsLast", today);

  if (points >= 5) {
    localStorage.setItem("foxy_points", "0");
    addMessage(`🎉 Ура! Ты была у меня 5 раз — получаешь подарок при следующем визите 💝\nПросто скажи мастеру: “Я с Фокси”`);
  } else {
    addMessage(`⭐ Сегодня ты получаешь балл!\nПрогресс: ${points} из 5 до подарка.`);
  }
}

export function showCurrentPoints() {
  const points = parseInt(localStorage.getItem("foxy_points") || "0");
  addMessage(`⭐ У тебя ${points} из 5 баллов.\nКогда будет 5 — я подарю тебе бонус 🎁`);
}
