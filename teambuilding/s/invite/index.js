function onButtonClick(button) {
  switch (button) {
    case "Да":
      alert("Отлично, ждём!");
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