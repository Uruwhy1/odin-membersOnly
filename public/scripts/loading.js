const loadingElement = document.querySelector("#loading");

export function showLoadingBar() {
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
