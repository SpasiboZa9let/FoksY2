// foxy/core/utils.js

/**
 * Приводит строку к нижнему регистру, убирает все не-буквенно-цифровые символы и лишние пробелы
 */
export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\sа-яё]/gi, "")
    .trim();
}
