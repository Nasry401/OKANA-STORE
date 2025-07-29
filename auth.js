document.addEventListener("DOMContentLoaded", () => {
  // Charger composants
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    const nav = document.getElementById("navbar");
    if (nav) nav.innerHTML = html;
  });
  fetch("components/footer.html").then(res => res.text()).then(html => {
    const footer = document.getElementById("footer");
    if (footer) footer.innerHTML = html;
  });

  // Register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(registerForm).entries());
      const users = JSON.parse(localStorage.getItem("okana_users") || "[]");

      if (users.find(u => u.email === data.email)) {
        alert("🚫 Email déjà utilisé !");
        return;
      }

      users.push(data);
      localStorage.setItem("okana_users", JSON.stringify(users));
      alert("✅ Compte créé avec succès !");
      window.location.href = "login.html";
    });
  }

  // Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(loginForm).entries());
      const users = JSON.parse(localStorage.getItem("okana_users") || "[]");
      const user = users.find(u => u.email === data.email && u.password === data.password);

      if (!user) {
        alert("❌ Identifiants incorrects !");
        return;
      }

      localStorage.setItem("okana_logged_user", JSON.stringify(user));
      alert("🔓 Connecté !");
      window.location.href = "profil.html";
    });
  }
});
// Vérifie si email ou téléphone est déjà utilisé
if (users.find(u => u.email === data.email || u.tel === data.tel)) {
  alert("🚫 Email ou numéro déjà utilisé !");
  return;
}