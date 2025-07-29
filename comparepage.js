document.addEventListener("DOMContentLoaded", () => {
  fetch("components/navbar.html").then(r => r.text()).then(html => {
    document.getElementById("navbar").innerHTML = html;
  });
  fetch("components/footer.html").then(r => r.text()).then(html => {
    document.getElementById("footer").innerHTML = html;
  });

  const compareTable = document.getElementById("compareTable");
  const clearBtn = document.getElementById("clearCompare");

  let comparaison = JSON.parse(localStorage.getItem("okana_compare") || "[]");
  if (comparaison.length === 0) {
    compareTable.innerHTML = "<p>Aucun produit sélectionné pour la comparaison.</p>";
    clearBtn.style.display = "none";
    return;
  }
  clearBtn.style.display = "inline-block";

  // Préparer données produits sélectionnés
  const produitsCompare = comparaison.map(id => produits.find(p => p.id === id)).filter(Boolean);

  // Construire tableau comparaison HTML
  let tableHTML = `<table class="table-auto border-collapse border border-gray-300 w-full text-left">`;

  // Ligne Images
  tableHTML += `<tr><th class="border p-2">Image</th>`;
  produitsCompare.forEach(p => {
    tableHTML += `<td class="border p-2"><img src="${p.image}" alt="${p.nom}" class="w-32 h-32 object-cover rounded"></td>`;
  });
  tableHTML += `</tr>`;

  // Ligne Nom
  tableHTML += `<tr><th class="border p-2">Nom</th>`;
  produitsCompare.forEach(p => {
    tableHTML += `<td class="border p-2 font-bold">${p.nom}</td>`;
  });
  tableHTML += `</tr>`;

  // Ligne Prix
  tableHTML += `<tr><th class="border p-2">Prix</th>`;
  produitsCompare.forEach(p => {
    tableHTML += `<td class="border p-2 text-green-600 font-semibold">${p.prix.toLocaleString()} Ar</td>`;
  });
  tableHTML += `</tr>`;

  // Ligne Description
  tableHTML += `<tr><th class="border p-2">Description</th>`;
  produitsCompare.forEach(p => {
    tableHTML += `<td class="border p-2">${p.description}</td>`;
  });
  tableHTML += `</tr>`;

  // Ligne Tags
  tableHTML += `<tr><th class="border p-2">Tags</th>`;
  produitsCompare.forEach(p => {
    tableHTML += `<td class="border p-2">${p.tags.join(", ")}</td>`;
  });
  tableHTML += `</tr>`;

  tableHTML += `</table>`;

  compareTable.innerHTML = tableHTML;

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("okana_compare");
    window.location.reload();
  });
});