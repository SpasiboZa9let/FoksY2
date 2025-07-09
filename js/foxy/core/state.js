// foxy/core/state.js

// Локальные переменные для остальных состояний
let lastInput = "";
let lastService = null;
let lastReplyType = null;
let foxyMood = "default";

// Переменная для имени пользователя
let userName = "";

// Работа с lastIntent через localStorage
export function getLastIntent() {
  return localStorage.getItem('foxy_lastIntent') || "";
}

export function setLastIntent(intent) {
  localStorage.setItem('foxy_lastIntent', intent);
}

// Сеттеры/геттеры для других состояний, если нужно
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

// Работа с именем пользователя
export function setUserName(name) {
  userName = name;
}
export function getUserName() {
  return userName;
}
