window.addEventListener("DOMContentLoaded", () => {
  // Charger composants
  fetch("components/navbar.html").then(res => res.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });

  fetch("components/footer.html").then(res => res.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  // Injecter catalogue
  const catalogue = document.getElementById("catalogue");
  if (catalogue && produits.length > 0) {
    produits.forEach(p => {
      const card = document.createElement("div");
      card.className = "bg-white dark:bg-gray-800 border dark:border-gray-700 p-4 rounded shadow hover:shadow-md transition";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.nom}" class="w-full h-48 object-cover rounded mb-3">
        <h2 class="text-xl font-semibold">${p.nom}</h2>
        <p class="text-green-600 font-bold">${p.prix.toLocaleString()} Ar</p>
        <p class="text-sm mt-2 mb-4">${p.description}</p>
        <a href="fiche.html?id=${p.id}" class="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Voir détail</a>
      `;
      catalogue.appendChild(card);
    });
  }
});