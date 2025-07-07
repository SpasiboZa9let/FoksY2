
// js/foxy/state.js

// фильтр повторов
export let lastInput = "";
export function setLastInput(val) {
  lastInput = val;
}

// сейчас статично, но можно менять
export let foxyMood = "neutral";
export function setFoxyMood(mood) {
  foxyMood = mood;
}
export let lastIntent = null;
export function setLastIntent(val) {
  lastIntent = val;
}

export let lastService = null;
export function setLastService(val) {
  lastService = val;
}
