document.addEventListener("DOMContentLoaded", () => {
  // Récupération ID produit
  const params = new URLSearchParams(window.location.search);
  const produitId = parseInt(params.get("id"));
  if (!produitId) return;

  const avisForm = document.getElementById("avisForm");
  const noteSelect = document.getElementById("note");
  const commentaireInput = document.getElementById("commentaire");
  const listeAvisDiv = document.getElementById("listeAvis");
  const noteMoyenneDiv = document.getElementById("noteMoyenne");

  // Charger avis depuis localStorage
  const allAvis = JSON.parse(localStorage.getItem("okana_avis") || "{}");
  const avisProduit = allAvis[produitId] || [];

  // Affichage note moyenne
  function afficherNoteMoyenne() {
    if (avisProduit.length === 0) {
      noteMoyenneDiv.textContent = "Aucune note pour le moment.";
      return;
    }
    const total = avisProduit.reduce((sum, a) => sum + a.note, 0);
    const moyenne = (total / avisProduit.length).toFixed(1);
    noteMoyenneDiv.textContent = `Note moyenne : ${moyenne} / 5 (${avisProduit.length} avis)`;
  }

  // Afficher liste avis
  function afficherAvis() {
    listeAvisDiv.innerHTML = "";
    if (avisProduit.length === 0) {
      listeAvisDiv.innerHTML = "<p>Aucun avis pour ce produit.</p>";
      return;
    }
    avisProduit.forEach(a => {
      const avisEl = document.createElement("div");
      avisEl.className = "border-b border-gray-300 dark:border-gray-700 pb-2";

      avisEl.innerHTML = `
        <div class="flex items-center mb-1">
          <div class="text-yellow-400">${"★".repeat(a.note)}${"☆".repeat(5 - a.note)}</div>
        </div>
        <p>${a.commentaire}</p>
      `;

      listeAvisDiv.appendChild(avisEl);
    });
  }

  afficherNoteMoyenne();
  afficherAvis();

  // Envoi avis
  avisForm.addEventListener("submit", e => {
    e.preventDefault();
    const note = parseInt(noteSelect.value);
    const commentaire = commentaireInput.value.trim();
    if (!note || commentaire === "") {
      alert("Merci de remplir tous les champs.");
      return;
    }

    const newAvis = { note, commentaire };

    if (!allAvis[produitId]) allAvis[produitId] = [];
    allAvis[produitId].push(newAvis);

    localStorage.setItem("okana_avis", JSON.stringify(allAvis));

    noteSelect.value = "";
    commentaireInput.value = "";

    alert("Merci pour votre avis !");

    afficherNoteMoyenne();
    afficherAvis();
  });
});