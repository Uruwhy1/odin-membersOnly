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
});
