document.getElementById("submitButton").addEventListener("click", checkVerificationCode);

function checkVerificationCode() {
  if (document.getElementById("verificationCode").value === "255")
    document.getElementById("resultMessage").innerText = "Код правильный!";
}