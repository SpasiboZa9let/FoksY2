// foxy/handlers/design.js

import { addMessage } from "../ui/dom.js";
import { randomReply, emoji } from "../core/services.js";
import { showTrendyOptions } from "../ui/ui.js"; // можно перенести в отдельный ui/design.js при росте

export function handleDesign() {
  addMessage(`${emoji()} Вот вдохновляющие идеи для дизайна ноготков 💅`);
  addMessage(randomReply("design"), true);
  showTrendyOptions();
}

