// foxy/core/utils.js

// 🔤 Приводит текст к нижнему регистру, убирает лишнее
export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\sа-яё]/gi, "")
    .trim();
}

// 🔠 Делает первую букву заглавной
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
