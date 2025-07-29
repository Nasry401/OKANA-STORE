document.addEventListener("DOMContentLoaded", () => {
  // Charger composants
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });
  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  const fiche = document.getElementById("ficheProduit");
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const produit = produits.find(p => p.id === id);
  if (!produit) {
    fiche.innerHTML = `<p>Produit introuvable.</p>`;
    return;
  }

  fiche.innerHTML = `
    <img src="${produit.image}" alt="${produit.nom}" class="rounded shadow-md w-full h-auto max-h-[500px] object-cover" />
    <div>
      <h2 class="text-3xl font-bold mb-2">${produit.nom}</h2>
      <p class="text-green-600 text-xl font-semibold mb-4">${produit.prix.toLocaleString()} Ar</p>
      <p class="mb-4">${produit.description}</p>
      <div class="mb-4">
        ${produit.tags.map(tag => `<span class="inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2 text-sm">#${tag}</span>`).join("")}
      </div>
      <div class="flex gap-4">
        <button onclick="ajouterAuPanier(${produit.id})" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">🛒 Ajouter au panier</button>
        <button onclick="ajouterWishlist(${produit.id})" class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded">💖 Wishlist</button>
      </div>
    </div>
  `;
});

// Fonctions panier / wishlist (temporaire - localStorage)
function ajouterAuPanier(id) {
  let panier = JSON.parse(localStorage.getItem("okana_panier") || "[]");
  const index = panier.findIndex(p => p.id === id);

  if (index !== -1) {
    panier[index].quantite += 1;
  } else {
    panier.push({ id, quantite: 1 });
  }

  localStorage.setItem("okana_panier", JSON.stringify(panier));
  alert("Produit ajouté au panier !");
}