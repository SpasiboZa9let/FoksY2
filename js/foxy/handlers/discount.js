// js/foxy/handlers/discount.js
import { addMessage } from "../ui/dom.js";

// Генерация простого кода, например: FOX-A1B2
function genCode() {
  return "FOX-" + Math.random().toString(36).substr(2, 4).toUpperCase();
}

export function handleDiscount() {
  const code = genCode();
  // Сохраним в localStorage на 7 дней
  localStorage.setItem("promoCode", code);
  localStorage.setItem("promoExpires", Date.now() + 7 * 24 * 60 * 60 * 1000);

  addMessage(
    `🎉 Ваш персональный промокод: ${code}\n(Действителен 7 дней)`,
    false
  );
}
