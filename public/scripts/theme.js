document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll("#theme-button");

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
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

    const logo = document.querySelector(".logo img");
    if (theme === "light") {
      logo.src = "/images/logo-light.png";
    } else {
      logo.src = "/images/logo-dark.png";
    }
  }
});
