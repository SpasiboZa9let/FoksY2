// js/foxy/handlers/discount.js
import { addMessage } from "../ui/dom.js";

// Генерация простого кода, например: FOX-A1B2
function genCode() {
  return "FOX-" + Math.random().toString(36).substr(2, 4).toUpperCase();
}

export function handleDiscount() {
  const existing = localStorage.getItem("promoCode");
  const expires = parseInt(localStorage.getItem("promoExpires") || "0", 10);

  if (existing && Date.now() < expires) {
    addMessage(
      `🎁 У тебя уже есть промокод: ${existing}\n(Действует до ${new Date(expires).toLocaleDateString()})`
    );
    return;
  }

  const code = genCode();
  localStorage.setItem("promoCode", code);
  localStorage.setItem("promoExpires", Date.now() + 7 * 24 * 60 * 60 * 1000);

  addMessage(
    `🎉 Твой персональный промокод: ${code}\n(Действует 7 дней)`,
    false
  );
}

