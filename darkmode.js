document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");

  // Fonction activer/désactiver dark mode
  function setDarkMode(enabled) {
    if (enabled) {
      document.documentElement.classList.add("dark");
      toggleBtn.textContent = "☀️ Mode clair";
      localStorage.setItem("okana_dark_mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      toggleBtn.textContent = "🌙 Mode sombre";
      localStorage.setItem("okana_dark_mode", "false");
    }
  }

  // Charger la préférence
  const darkModePref = localStorage.getItem("okana_dark_mode");
  if (darkModePref === "true") {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }

  // Événement toggle
  toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(!isDark);
  });
});