function onButtonClick(button) {
  switch (button) {
    case "Да":
      alert("Отлично, ждём!");
      window.open("https://t.me/loshvitalik");
      break;
    case "Нет":
      alert("Неправильный ответ");
      break;
    case "Я подумаю":
      alert("Ну подумай...");
      break;
    case "🐾":
      var pawprintsButton = document.querySelector("#invite-pawprints-button");
      pawprintsButton.innerHTML += pawprintsButton.innerHTML;
      break;
  }
}