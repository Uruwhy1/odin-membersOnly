document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");

  if (error) {
    console.log("Xdd");
    displayMessage(formatMessage());
  }

  function formatMessage() {
    const message = urlParams.get("error").toLowerCase();

    switch (message) {
      case "email-existing":
        document.getElementById("email").focus();
        return "There already is an user with that email.";
      case "incorrect email.":
        document.getElementById("email").focus();
        return "No user with that email found.";
      case "incorrect password.":
        document.getElementById("password").focus();
        return "Incorrect password.";
      case "invalid passcode":
        document.getElementById('passKey').focus();
        return "That is not a valid code."
      default:
        return "Unexpected error ocurred.";
    }
  }

  function displayMessage(message) {
    const messageElement = document.getElementById("error-message");
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.color = "red";
      messageElement.style.display = "block";
      messageElement.style.fontWeight = "500";
      messageElement.style.fontSize = "0.9rem";
    }
  }
});
