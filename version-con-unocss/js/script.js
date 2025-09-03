document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const modal = document.getElementById("cart-modal");
  const modalContent = document.getElementById("cart-items");
  const closeModal = document.getElementById("close-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 👇 La función va acá adentro
  function showToast(message, price) {
    const container = document.getElementById("toast-container");
    if (!container) return; // seguridad

    const toast = document.createElement("div");
    toast.className =
      "bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm animate-fade-in-up flex items-center gap-3";

    toast.innerHTML = `
      <span class="text-green-400 text-lg">✅</span>
      <div>
        <p class="font-semibold">${message}</p>
        <p class="text-cyan-400 text-xs">$${price}</p>
      </div>
    `;

    container.appendChild(toast);

    // Desaparece a los 3s
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-500");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Evento añadir producto
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      const productName = button.getAttribute("data-product-name");
      const price = parseFloat(button.getAttribute("data-price"));

      const existingProduct = cart.find(p => p.id === productId);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ id: productId, name: productName, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();

      // 👇 acá mostramos el toast
      showToast(`${productName} agregado al carrito 🛒`, price);
    });
  });

  // ... resto del código ...
});
