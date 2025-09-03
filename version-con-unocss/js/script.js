// cart.js
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const modal = document.getElementById("cart-modal");
  const modalContent = document.getElementById("cart-items");
  const closeModal = document.getElementById("close-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  updateCartCount();
  renderCart();

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

  // Evento: añadir producto
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

      showToast(`${productName} agregado al carrito 🛒`, price);

    });
  });

  // Abrir modal
document.getElementById("open-cart")?.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  modal.classList.add("flex"); // <- importante
});

// Cerrar modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex"); // <- importante
});



  // Renderizar carrito
  function renderCart() {
    modalContent.innerHTML = "";
    if (cart.length === 0) {
      modalContent.innerHTML = "<p class='text-gray-400'>El carrito está vacío.</p>";
      return;
    }

    cart.forEach((p, index) => {
      const item = document.createElement("div");
      item.className = "flex justify-between items-center border-b border-gray-700 py-2";
      item.innerHTML = `
        <div>
          <p class="font-semibold text-white">${p.name}</p>
          <p class="text-sm text-gray-400">$${p.price} x ${p.quantity} = $${p.price * p.quantity}</p>
        </div>
        <div class="flex gap-2">
          <button class="px-2 bg-cyan-600 rounded text-white" data-index="${index}" data-action="decrease">-</button>
          <button class="px-2 bg-cyan-600 rounded text-white" data-index="${index}" data-action="increase">+</button>
          <button class="px-2 bg-red-600 rounded text-white" data-index="${index}" data-action="remove">🗑</button>
        </div>
      `;
      modalContent.appendChild(item);
    });

    // Total
    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const totalDiv = document.createElement("div");
    totalDiv.className = "mt-4 font-bold text-cyan-400 text-right";
    totalDiv.textContent = `Total: $${total}`;
    modalContent.appendChild(totalDiv);

    // Botones de acciones
    modalContent.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const action = btn.getAttribute("data-action");

        if (action === "increase") cart[index].quantity++;
        if (action === "decrease") cart[index].quantity > 1 ? cart[index].quantity-- : cart.splice(index, 1);
        if (action === "remove") cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
      });
    });
  }

  function updateCartCount() {
    cartCount.textContent = cart.reduce((acc, p) => acc + p.quantity, 0);
  }

});
