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
    addMessage(`🎉 Ура! Ты была у меня 5 раз — получаешь <strong>подарок</strong> при следующем визите 💝<br>Просто скажи мастеру: <em>“Я с Фокси”</em>`);
  } else {
    addMessage(`⭐ Сегодня ты получаешь балл!<br>Прогресс: <strong>${points} из 5</strong> до подарка.`);
  }
}

export function showCurrentPoints() {
  const points = parseInt(localStorage.getItem("foxy_points") || "0");
  addMessage(`⭐ У тебя <strong>${points} из 5</strong> баллов.<br>Когда будет 5 — я подарю тебе бонус 🎁`);
}
