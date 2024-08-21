document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.querySelector("#loading");

  function showLoadingBar() {
    loadingElement.classList.add("active");
  }

  // Delay so animation always has time to complete
  document.addEventListener("click", function (event) {
    const target = event.target.closest("a");

    if (target && target.href) {
      event.preventDefault();
      showLoadingBar();
      setTimeout(() => {
        location.href = target.href;
      }, 500);
    }
  });

  document.addEventListener("submit", function (event) {
    const form = event.target.closest("form");
    event.preventDefault();
    showLoadingBar();

    setTimeout(() => {
      form.submit();
    }, 500); // delay so loading bar fills up
  });
});
