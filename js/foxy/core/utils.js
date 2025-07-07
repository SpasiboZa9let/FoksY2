// foxy/core/utils.js

// 🔤 Приводит текст к нижнему регистру, убирает лишнее
export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\sа-яё]/gi, "")
    .trim();
}
