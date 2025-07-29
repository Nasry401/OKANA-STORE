document.addEventListener("DOMContentLoaded", () => {
  // Charger Navbar & Footer
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });

  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  // DOM Elements
  const resultat = document.getElementById("resultatProduits");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  // Fonction pour afficher les produits filtrés
  function renderProduits(liste) {
    resultat.innerHTML = "";
    if (liste.length === 0) {
      resultat.innerHTML = `<p>Aucun produit ne correspond à votre recherche.</p>`;
      return;
    }

    liste.forEach(p => {
      const card = document.createElement("div");
      card.className = "bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded shadow hover:shadow-md";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.nom}" class="w-full h-48 object-cover rounded mb-3">
        <h2 class="text-xl font-semibold">${p.nom}</h2>
        <p class="text-green-600 font-bold">${p.prix.toLocaleString()} Ar</p>
        <p class="text-sm mt-2 mb-4">${p.description}</p>
        <a href="fiche.html?id=${p.id}" class="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Voir détail</a>
      `;
      resultat.appendChild(card);
    });
  }

  // Fonction de filtrage
  function filtrer() {
    const motCle = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const min = parseInt(minPrice.value) || 0;
    const max = parseInt(maxPrice.value) || Infinity;

    const filtre = produits.filter(p => {
      const matchMot = p.nom.toLowerCase().includes(motCle) || p.description.toLowerCase().includes(motCle);
      const matchCat = cat === "" || p.tags.includes(cat);
      const matchPrix = p.prix >= min && p.prix <= max;
      return matchMot && matchCat && matchPrix;
    });

    renderProduits(filtre);
  }

  // Events
  searchInput.addEventListener("input", filtrer);
  categoryFilter.addEventListener("change", filtrer);
  minPrice.addEventListener("input", filtrer);
  maxPrice.addEventListener("input", filtrer);

  // Affichage initial
  renderProduits(produits);
});