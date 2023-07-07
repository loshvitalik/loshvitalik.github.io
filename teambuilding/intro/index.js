import {formatDateDayMonth, formatDateTime, fadeIn, TOTAL_FADE_IN_TIME, PAW_PRINTS} from '../teambuilding-utils.js';

const NEXT_MESSAGE_DELAY = TOTAL_FADE_IN_TIME + 1000;
const YES = "да";
const NO = "нет";
const NO_ANSWER = "я подумаю";
const DEFAULT_BUTTONS = [YES, NO, NO_ANSWER, PAW_PRINTS];

document.title = formatDateDayMonth(new Date());
addChatMessage("Доброе утро!");
setTimeout(() => addChatMessage("А мы тут это... Тимбилдинги планируем"), NEXT_MESSAGE_DELAY);
setTimeout(() => addChatMessage("Ты же Валерия, да?", "V", DEFAULT_BUTTONS), NEXT_MESSAGE_DELAY * 2);

function addChatMessage(text, buttonsTag, buttons) {
  var chat = document.querySelector("#discussion");
  var message = document.createElement("li");
  message.classList.add("message");
  var headerParagraph = document.createElement("p");
  headerParagraph.classList.add("message-header");
  headerParagraph.innerHTML = "Виталя";
  var textParagraph = document.createElement("p");
  textParagraph.classList.add("message-text");
  textParagraph.innerHTML = text;
  var dateParagraph = document.createElement("p");
  dateParagraph.classList.add("message-date");
  dateParagraph.innerHTML = formatDateTime(new Date());

  message.appendChild(headerParagraph);
  message.appendChild(textParagraph);
  message.appendChild(dateParagraph);

  if (buttonsTag) {
    var buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    for (let i = 0; i < buttons.length; i++) {
      var button = document.createElement("button");
      button.innerHTML = buttons[i];
      button.onclick = () => onButtonClick(buttonsTag, buttons[i]);
      buttonsContainer.appendChild(button);
    }
    message.appendChild(buttonsContainer);
  }

  chat.appendChild(message);
  fadeIn(message);
  window.scrollTo(0, document.body.scrollHeight);
}

function onButtonClick(tag, button) {
  if (button === PAW_PRINTS) {
    addChatMessage(PAW_PRINTS);
    return;
  }
  var prevButtons = document.querySelectorAll("button");
  for (let i = 0; i < prevButtons.length; i++) {
    prevButtons[i].onclick = null;
    prevButtons[i].classList.add("button-disabled");
  }
  if (tag === "V") {
    switch (button) {
      case YES:
        navigateToInvite(tag);
        break;
      case NO:
        addChatMessage("Значит, ты &ndash; Кристина?", "K", DEFAULT_BUTTONS);
        break;
      case NO_ANSWER:
        addChatMessage("Ты же Валерия, да?", "V", DEFAULT_BUTTONS);
        break;
    }
  } else if (tag === "K") {
    switch (button) {
      case YES:
        navigateToInvite(tag);
        break;
      case NO:
        addChatMessage("Мы тебя пока не знаем, но ты можешь зарегистрироваться и получить приглашение на почту! (нет)");
        setTimeout(() => location.reload(), NEXT_MESSAGE_DELAY + 3000);
        break;
      case NO_ANSWER:
        addChatMessage("Значит, ты &ndash; Кристина?", "K", DEFAULT_BUTTONS);
        break;
    }
  }
}

function navigateToInvite(tag) {
  addChatMessage("Уточняю информацию...");
  var location = tag === "V" ? "../invite" : "../s/invite";
  setTimeout(() => window.location.href = location, NEXT_MESSAGE_DELAY + 2000);
}