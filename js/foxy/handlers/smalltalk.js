import { addMessage } from "../ui/dom.js";
import { randomReply, emoji } from "../core/services.js";

const knownIntents = [
  "greeting",
  "thanks",
  "bye",
  "softWarning",
  "smalltalkLite",
  "about",
  "styleTalk",
  "abilities",
  "help"
];

/**
 * Обработка «болтовни»
 * @param {string|null} intent
 * @returns {boolean} — был ли обработан интент
 */
export function handleSmalltalk(intent) {
  if (!intent || !knownIntents.includes(intent)) return false;

  const reply = randomReply(intent);
  addMessage(`${emoji()} ${reply}`);
  return true;
}
