// foxy/core/state.js

let lastInput = "";
let lastService = null;
let lastReplyType = null;
let foxyMood = "default";
let userName = "";

// localStorage: интент
export function getLastIntent() {
  return localStorage.getItem('foxy_lastIntent') || "";
}
export function setLastIntent(intent) {
  localStorage.setItem('foxy_lastIntent', intent);
}

// Состояния
export function setLastInput(input) {
  lastInput = input;
}
export function getLastInput() {
  return lastInput;
}

export function setLastService(service) {
  lastService = service;
}
export function getLastService() {
  return lastService;
}

export function setLastReplyType(type) {
  lastReplyType = type;
}
export function getLastReplyType() {
  return lastReplyType;
}

export function setFoxyMood(mood) {
  foxyMood = mood;
}
export function getFoxyMood() {
  return foxyMood;
}

// Имя пользователя
export function setUserName(name) {
  userName = name;
}
export function getUserName() {
  return userName;
}

// 🔁 Сброс
export function resetState() {
  lastInput = "";
  lastService = null;
  lastReplyType = null;
  foxyMood = "default";
  userName = "";
  localStorage.removeItem('foxy_lastIntent');
}
