document.addEventListener("DOMContentLoaded", () => {
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });
  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();

    // Validation simple email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageDiv.textContent = "❌ Adresse email invalide.";
      messageDiv.className = "text-red-600 mt-2";
      return;
    }

    // Charger liste newsletter depuis localStorage
    const newsletter = JSON.parse(localStorage.getItem("okana_newsletter") || "[]");

    if (newsletter.includes(email)) {
      messageDiv.textContent = "⚠️ Vous êtes déjà inscrit.";
      messageDiv.className = "text-yellow-600 mt-2";
      return;
    }

    // Ajouter et sauvegarder
    newsletter.push(email);
    localStorage.setItem("okana_newsletter", JSON.stringify(newsletter));

    messageDiv.textContent = "✅ Inscription réussie, merci !";
    messageDiv.className = "text-green-600 mt-2";
    form.reset();
  });
});