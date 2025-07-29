document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("compareCheckbox");
  if (!checkbox) return;

  const params = new URLSearchParams(window.location.search);
  const produitId = parseInt(params.get("id"));
  if (!produitId) return;

  // Charger comparaison
  let comparaison = JSON.parse(localStorage.getItem("okana_compare") || "[]");

  // Initialiser checkbox selon présence
  checkbox.checked = comparaison.includes(produitId);

  // Événement toggle
  checkbox.addEventListener("change", () => {
    comparaison = JSON.parse(localStorage.getItem("okana_compare") || "[]");
    if (checkbox.checked) {
      if (!comparaison.includes(produitId)) {
        if (comparaison.length >= 3) {
          alert("Vous ne pouvez comparer que 3 produits maximum.");
          checkbox.checked = false;
          return;
        }
        comparaison.push(produitId);
      }
    } else {
      comparaison = comparaison.filter(id => id !== produitId);
    }
    localStorage.setItem("okana_compare", JSON.stringify(comparaison));
  });
});