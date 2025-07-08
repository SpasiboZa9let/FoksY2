// foxy/core/state.js

let lastInput = "";
let lastIntent = null;
let lastService = null;
let lastReplyType = null;
let foxyMood = "default";

// Новая переменная для имени пользователя
let userName = "";

export function setLastInput(input) { lastInput = input; }
export function setLastIntent(intent) { lastIntent = intent; }
export function setLastService(service) { lastService = service; }
export function setLastReplyType(type) { lastReplyType = type; }
export function setFoxyMood(mood) { foxyMood = mood; }

// Новый экшен
export function setUserName(name) { userName = name; }

export { lastInput, lastIntent, lastService, lastReplyType, foxyMood, userName };
