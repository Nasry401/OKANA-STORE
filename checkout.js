document.addEventListener("DOMContentLoaded", () => {
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });

  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  // Affichage du récapitulatif de commande
  const apercu = document.getElementById("commandeApercu");
  const panier = JSON.parse(localStorage.getItem("okana_panier") || "[]");

  if (panier.length === 0) {
    apercu.innerHTML = "<p>Votre panier est vide. <a href='index.html' class='text-blue-500 underline'>Retour à la boutique</a></p>";
    return;
  }

  let total = 0;
  apercu.innerHTML = "<h2 class='text-lg font-bold mb-2'>🛒 Récapitulatif de la commande</h2>";
  panier.forEach(item => {
    const produit = produits.find(p => p.id === item.id);
    if (produit) {
      total += produit.prix * item.quantite;
      apercu.innerHTML += `
        <div class="flex justify-between mb-2">
          <span>${produit.nom} x ${item.quantite}</span>
          <span>${(produit.prix * item.quantite).toLocaleString()} Ar</span>
        </div>
      `;
    }
  });
  apercu.innerHTML += `
    <hr class="my-2" />
    <div class="flex justify-between font-bold">
      <span>Total à payer:</span>
      <span class="text-green-600">${total.toLocaleString()} Ar</span>
    </div>
  `;
});

// ✅ Traitement du formulaire
document.addEventListener("submit", e => {
  if (e.target.id === "checkoutForm") {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // 🎯 Validation simple
    if (!data.nom || !data.email || !data.tel || !data.adresse) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    // 🚚 Simulation commande
    alert("✅ Commande confirmée !\nMerci " + data.nom + " ! Nous allons vous contacter au " + data.tel);

// Teo amin'ny alert("✅ Commande confirmée...") dia ampiana izao:
const user = JSON.parse(localStorage.getItem("okana_logged_user")) || {};
const commandes = JSON.parse(localStorage.getItem("okana_commandes") || "[]");

commandes.push({
  email: user.email || data.email,
  nom: data.nom,
  date: new Date().toLocaleDateString(),
  produits: panier
});

localStorage.setItem("okana_commandes", JSON.stringify(commandes));
    // 🎉 Reset
    localStorage.removeItem("okana_panier");
    e.target.reset();
    window.location.href = "index.html";
  }
});