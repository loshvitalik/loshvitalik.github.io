document.getElementById("submitButton").addEventListener("click", checkVerificationCode);

function checkVerificationCode() {
  let resultMessage = document.getElementById("resultMessage");
  resultMessage.innerText = "";
  setTimeout(100, () => {
    if (document.getElementById("verificationCode").value === "255")
      resultMessage.innerText = "Код правильный!";
    else
      resultMessage.innerText = "Не-а, не угадал";
  });

}