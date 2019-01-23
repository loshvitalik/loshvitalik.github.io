document.getElementById("submitButton").addEventListener("click", checkVerificationCode);

function checkVerificationCode() {
  let resultMessage = document.getElementById("resultMessage");
  resultMessage.innerText = "Проверка...";
  let inputText = document.getElementById("verificationCode").value.toLowerCase();
  setTimeout(() => {
    if (inputText.indexOf("ртф") > -1 && inputText.indexOf("чемпион") > -1)
    resultMessage.innerHTML = "Уровень \"Сессия закрыта\". &nbsp; Объекты 8.1 и 8.2.";
    else
      resultMessage.innerText = "Этот код не подходит";
  }, 1000);

}