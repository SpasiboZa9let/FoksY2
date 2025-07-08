// js/foxy/handlers/discount.js
import { addTypingMessage } from "../ui/dom.js";

function genCode() {
  return "FOX-" + Math.random().toString(36).substr(2, 4).toUpperCase();
}

export function handleDiscount() {
  const now = Date.now();
  const savedCode = localStorage.getItem("promoCode");
  const expires = parseInt(localStorage.getItem("promoExpires"), 10);
  const used = localStorage.getItem("promoUsed") === "true";

  // Если активный и неиспользованный код уже есть
  if (savedCode && expires && now < expires && !used) {
    const deadline = new Date(expires).toLocaleDateString();
    addTypingMessage(
      `🎁 У тебя уже есть промокод: <strong>${savedCode}</strong><br><small>Действует до ${deadline}</small>`,
      300,
      true
    );
    return;
  }

  // Новый код
  const code = genCode();
  const duration = 7 * 24 * 60 * 60 * 1000;
  const expireTime = now + duration;
  const deadline = new Date(expireTime).toLocaleDateString();

  localStorage.setItem("promoCode", code);
  localStorage.setItem("promoExpires", expireTime.toString());
  localStorage.setItem("promoUsed", "false");

  addTypingMessage(
    `🎉 Твой новый промокод: <strong>${code}</strong><br><small>Действует до ${deadline}<br>📋 Покажи мастеру при записи — получишь подарок или скидку!</small>`,
    500,
    true
  );
}

export function remindPromoIfActive() {
  const code = localStorage.getItem("promoCode");
  const expires = parseInt(localStorage.getItem("promoExpires"), 10);
  const used = localStorage.getItem("promoUsed") === "true";
  const now = Date.now();

  if (code && expires && now < expires && !used) {
    const deadline = new Date(expires).toLocaleDateString();
    addTypingMessage(
      `💡 Не забудь — у тебя есть промокод: <strong>${code}</strong><br><small>Действует до ${deadline}</small>`,
      400,
      true
    );
  }
}

export function markPromoUsed() {
  localStorage.setItem("promoUsed", "true");
}
