// js/foxy/handlers/discount.js
import { addMessage } from "../ui/dom.js";

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
    addMessage(`🎁 У тебя уже есть промокод: ${savedCode}\n(Действует до ${new Date(expires).toLocaleDateString()})`, false);
    return;
  }

  // Новый код
  const code = genCode();
  const duration = 7 * 24 * 60 * 60 * 1000;
  const expireTime = now + duration;

  localStorage.setItem("promoCode", code);
  localStorage.setItem("promoExpires", expireTime.toString());
  localStorage.setItem("promoUsed", "false");

  addMessage(
    `🎉 Твой новый промокод: <strong>${code}</strong>\n` +
    `Действует до ${new Date(expireTime).toLocaleDateString()}\n` +
    `📋 Покажи мастеру при записи — получишь подарок или скидку!`,
    false
  );
}

export function remindPromoIfActive() {
  const code = localStorage.getItem("promoCode");
  const expires = parseInt(localStorage.getItem("promoExpires"), 10);
  const used = localStorage.getItem("promoUsed") === "true";
  const now = Date.now();

  if (code && expires && now < expires && !used) {
    addMessage(`💡 Не забудь — у тебя есть промокод <strong>${code}</strong>!`, false);
  }
}

export function markPromoUsed() {
  localStorage.setItem("promoUsed", "true");
}
