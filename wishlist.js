document.addEventListener("DOMContentLoaded", () => {
  const wishlistBtn = document.getElementById("wishlistBtn");
  if (!wishlistBtn) return;

  // Récupérer ID produit depuis URL (ex: fiche.html?id=123)
  const params = new URLSearchParams(window.location.search);
  const produitId = parseInt(params.get("id"));

  if (!produitId) return;

  // Chargement wishlist
  const wishlist = JSON.parse(localStorage.getItem("okana_wishlist") || "[]");

  // Update bouton selon présence
  if (wishlist.includes(produitId)) {
    wishlistBtn.textContent = "❌ Retirer de la Wishlist";
  }

  wishlistBtn.addEventListener("click", () => {
    let wishlist = JSON.parse(localStorage.getItem("okana_wishlist") || "[]");
    if (wishlist.includes(produitId)) {
      wishlist = wishlist.filter(id => id !== produitId);
      wishlistBtn.textContent = "❤️ Ajouter à la Wishlist";
    } else {
      wishlist.push(produitId);
      wishlistBtn.textContent = "❌ Retirer de la Wishlist";
    }
    localStorage.setItem("okana_wishlist", JSON.stringify(wishlist));
  });
});