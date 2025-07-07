// foxy/handlers/mood.js

import { addMessage, renderReactions } from "../ui/dom.js";
import { emoji } from "../core/services.js";
import { handleDesign } from "./design.js";

export function handleMood() {
  addMessage(`${emoji()} Что тебе ближе по настроению? 😉`);

  renderReactions([
    {
      text: "🌸 Нюд",
      callback: () => addMessage("Нюд — всегда в моде! 💅")
    },
    {
      text: "💎 Блёстки",
      callback: () => addMessage("Блестим! 💖 Будет шикарно!")
    },
    {
      text: "🌈 Что-то вау",
      callback: () => handleDesign()
    }
  ]);
}

