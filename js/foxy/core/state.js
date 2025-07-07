// foxy/core/state.js

let lastInput = "";
let lastIntent = null;
let lastService = null;
let lastReplyType = null;

let foxyMood = "default"; // можно использовать: "default", "sparkle", "calm", "playful" и т.п.

export function setLastInput(input) {
  lastInput = input;
}
export function setLastIntent(intent) {
  lastIntent = intent;
}
export function setLastService(service) {
  lastService = service;
}
export function setLastReplyType(type) {
  lastReplyType = type;
}
export function setFoxyMood(mood) {
  foxyMood = mood;
}

export { lastInput, lastIntent, lastService, lastReplyType, foxyMood };
