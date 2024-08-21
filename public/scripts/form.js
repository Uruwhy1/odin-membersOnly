import { showLoadingBar } from "./loading.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");

  if (status === "error") {
    displayMessage(formatMessage());
  }

  function formatMessage() {
    const message = urlParams.get("message");
    if (message.includes("match")) {
      return "Passwords do not match.";
    }
    return "Unexpected error ocurred.";
  }

  function displayMessage(message) {
    const messageElement = document.getElementById("error-message");
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.style.color = "red";
      messageElement.style.display = "block";
      messageElement.style.fontWeight = "500";
    }
  }

  /* check that passwords are the same */
  const form = document.querySelector("form");
  const submitButton = document.getElementById("submit-button");

  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("confirmPassword");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (passwordInput.value.length < 3) {
      displayMessage("Password is less than three characters long.");
      return;
    }

    if (passwordInput.value == passwordConfirmInput.value) {
      showLoadingBar();
      setTimeout(() => {
        form.submit();
      }, 500); // delay so loading bar fills up
    } else {
      displayMessage("Passwords do not match.");
    }
  });

  passwordConfirmInput.addEventListener("input", checkPasswords);
  passwordInput.addEventListener("input", checkPasswords);

  function checkPasswords() {
    if (passwordInput.value.length > 0) {
      passwordConfirmInput.style.backgroundColor = "#fff";
      passwordConfirmInput.disabled = false;
    } else {
      passwordConfirmInput.style.backgroundColor = "#ccc";
      passwordConfirmInput.disabled = true;
      return;
    }
    if (passwordConfirmInput.value !== passwordInput.value) {
      passwordConfirmInput.style.outline = "2px solid lightcoral";
    } else {
      passwordConfirmInput.style.outline = "2px solid green";
    }
  }
  checkPasswords();
});
