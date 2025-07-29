document.addEventListener("DOMContentLoaded", () => {
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });
  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  afficherPanier();
});

function getPanier() {
  return JSON.parse(localStorage.getItem("okana_panier") || "[]");
}

function setPanier(panier) {
  localStorage.setItem("okana_panier", JSON.stringify(panier));
}

function supprimerProduit(id) {
  let panier = getPanier();
  panier = panier.filter(p => p.id !== id);
  setPanier(panier);
  afficherPanier();
}

function changerQuantite(id, nouvelleQuantite) {
  const panier = getPanier();
  const index = panier.findIndex(p => p.id === id);
  if (index !== -1) {
    panier[index].quantite = nouvelleQuantite;
  }
  setPanier(panier);
  afficherPanier();
}

function afficherPanier() {
  const div = document.getElementById("contenuPanier");
  const totalDiv = document.getElementById("panierTotal");
  const panier = getPanier();

  if (panier.length === 0) {
    div.innerHTML = "<p>Votre panier est vide.</p>";
    totalDiv.innerHTML = "";
    return;
  }

  let total = 0;
  div.innerHTML = "";
  panier.forEach(item => {
    const produit = produits.find(p => p.id === item.id);
    if (!produit) return;

    total += produit.prix * item.quantite;

    const produitDiv = document.createElement("div");
    produitDiv.className = "flex items-center gap-4 border p-4 rounded dark:border-gray-700";

    produitDiv.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" class="w-24 h-24 object-cover rounded" />
      <div class="flex-1">
        <h3 class="text-lg font-bold">${produit.nom}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">${produit.prix.toLocaleString()} Ar</p>
        <div class="mt-2 flex items-center gap-2">
          <label>Quantité:</label>
          <input type="number" value="${item.quantite}" min="1" class="w-20 p-1 border rounded dark:bg-gray-800" 
                 onchange="changerQuantite(${item.id}, this.valueAsNumber)" />
          <button onclick="supprimerProduit(${item.id})" class="text-red-600 hover:underline">Supprimer</button>
        </div>
      </div>
    `;
    div.appendChild(produitDiv);
  });

  totalDiv.innerHTML = `Total: <span class="text-green-500">${total.toLocaleString()} Ar</span>`;
}