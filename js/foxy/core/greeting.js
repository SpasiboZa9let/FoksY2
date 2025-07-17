import { addTypingMessage } from '../ui/dom.js';
import { emoji } from './services.js';
import { randomGreeting, helpIntro, suggestionsHTML } from './phrases.js';

export function greetAskName() {
  addTypingMessage('🦊 Привет! Как тебя зовут?', 500);
}

export function greetByName(name) {
  const html = `<strong>${emoji()} Фокси:</strong> ${randomGreeting(name)}`;
  addTypingMessage(html, 500, true);
  fadeOutAfterDelay('.chat-bubble.welcome-message', 5500);
}

export function greetHelpIntro(delay = 0) {
  setTimeout(() => {
    const intro = `<strong>${emoji()} Фокси:</strong> ${helpIntro()}`;
    addTypingMessage(intro, 300, true);
    addTypingMessage(suggestionsHTML, 600, true);
    fadeOutAfterDelay('.foxy-suggestions'.concat(':not(.persistent)'), 8000, true);
  }, delay);
}

function fadeOutAfterDelay(selector, delay, bubbleLevel = false) {
  setTimeout(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    const target = bubbleLevel ? el.closest('.chat-bubble') : el;
    if (!target) return;
    target.style.transition = 'opacity 0.5s ease';
    target.style.opacity = '0';
    setTimeout(() => target.remove(), 500);
  }, delay);
}
