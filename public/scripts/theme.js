document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll("#theme-button");

  const savedTheme = localStorage.getItem("theme");

  const initialTheme = savedTheme;
  applyTheme(initialTheme);

  if (savedTheme) {
    document
      .querySelector(`[data-theme="${savedTheme}"]`)
      .classList.add("selected");
  } else {
    document
      .querySelector(`[data-theme="${initialTheme}"]`)
      .classList.add("selected");
  }

  themeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedTheme = this.getAttribute("data-theme");
      applyTheme(selectedTheme);
      localStorage.setItem("theme", selectedTheme);

      document
        .querySelector("#theme-button.selected")
        ?.classList.remove("selected");

      this.classList.add("selected");
    });
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
});
