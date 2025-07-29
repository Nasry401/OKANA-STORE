document.addEventListener("DOMContentLoaded", () => {
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });
  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  const otpRequestForm = document.getElementById("otpRequestForm");
  const otpVerifyForm = document.getElementById("otpVerifyForm");

  let otpCode = "";
  let currentUser = null;

  otpRequestForm.addEventListener("submit", e => {
    e.preventDefault();
    const identifiant = e.target.identifiant.value.trim().toLowerCase();

    const users = JSON.parse(localStorage.getItem("okana_users") || "[]");
    const user = users.find(u => u.email === identifiant || u.tel === identifiant);

    if (!user) {
      alert("❌ Utilisateur introuvable !");
      return;
    }

    // 🔐 Génération OTP mock
    otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    currentUser = user;

    // ⏳ Simulation envoi OTP (email/SMS)
    alert(`📨 OTP envoyé à ${identifiant} (mock): ${otpCode}`);

    otpRequestForm.classList.add("hidden");
    otpVerifyForm.classList.remove("hidden");
  });

  otpVerifyForm.addEventListener("submit", e => {
    e.preventDefault();
    const inputOtp = e.target.otp.value.trim();

    if (inputOtp === otpCode) {
      localStorage.setItem("okana_logged_user", JSON.stringify(currentUser));
      alert("✅ Connexion réussie !");
      window.location.href = "profil.html";
    } else {
      alert("❌ Code OTP incorrect !");
    }
  });
});