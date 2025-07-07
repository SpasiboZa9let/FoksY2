// foxy/handlers/servicesHandler.js

import { addMessage, clearButtons } from "../ui/dom.js";
import { renderBookingOptions, renderReactions } from "../ui/ui.js";
import { services, matchService, emoji } from "../core/services.js";
import { setLastIntent, setLastService } from "../core/state.js";

export function handleServiceInput(input) {
  const svc = matchService(input);
  if (!svc) return false;

  setLastService(svc.name);
  setLastIntent("service");

  addMessage(`${emoji()} Отличный выбор — «${svc.name}» 💅`);
  addMessage(`Хочешь узнать подробнее или записаться? 😉`);

  renderReactions([
    { text: "📋 Подробнее", callback: () => showServiceDetails(svc.name) },
    { text: "📅 Записаться", callback: () => renderBookingOptions() }
  ]);

  return true;
}

export function showServiceDetails(name) {
  const text = services[name];
  if (text) {
    addMessage(`${emoji()} Ага, это «${name}» 💅\n${text}`);
    renderBookingOptions();
  } else {
    addMessage(`${emoji()} Упс, пока нет подробностей 😥`);
  }
}

