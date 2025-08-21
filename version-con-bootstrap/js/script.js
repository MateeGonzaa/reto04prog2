// Seleccionamos elementos clave
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');

// Crear contenedor para notificaciones
const notificationContainer = document.createElement('div');
notificationContainer.style.position = 'fixed';
notificationContainer.style.top = '20px';
notificationContainer.style.right = '20px';
notificationContainer.style.zIndex = '9999';
notificationContainer.style.display = 'flex';
notificationContainer.style.flexDirection = 'column';
notificationContainer.style.gap = '10px';
document.body.appendChild(notificationContainer);

let cart = [];

// Cargar carrito desde localStorage al iniciar la página
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualizar el contador del carrito en el navbar
function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Actualizar el total del carrito
function updateCartTotal() {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalElement.textContent = `$${total.toLocaleString()}`;
}

// Renderizar los productos en el modal
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <tr>
                <td colspan="5" class="text-center" id="empty-cart-message">El carrito está vacío.</td>
            </tr>
        `;
        cartTotalElement.textContent = '$0';
        return;
    }

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toLocaleString()}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" class="form-control quantity-input" data-id="${item.id}">
            </td>
            <td>$${(item.price * item.quantity).toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    updateCartTotal();
}

// Función para mostrar notificación profesional
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 8px;"></i> ${message}
    `;
    notification.style.background = type === 'success' ? '#28a745' : '#dc3545';
    notification.style.color = '#fff';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '6px';
    notification.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    notification.style.transform = 'translateX(120%)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.5s ease';
    notificationContainer.appendChild(notification);

    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);

    // Desaparece después de 2.5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 500);
    }, 2500);
}

// Añadir producto al carrito
function addToCart(productId, productName, productPrice) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCartCount();
    renderCart();
    saveCart();
    showNotification(`${productName} agregado al carrito`, 'success');
}

// Eventos de los botones "Añadir al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.productId);
        const productName = button.dataset.productName;
        const productPrice = parseInt(button.closest('.d-flex').querySelector('.product-price').dataset.price);

        addToCart(productId, productName, productPrice);
    });
});

// Cambiar cantidad directamente en el modal
cartItemsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const id = parseInt(e.target.dataset.id);
        const newQuantity = parseInt(e.target.value);
        const product = cart.find(item => item.id === id);
        if (product && newQuantity > 0) {
            product.quantity = newQuantity;
            renderCart();
            updateCartCount();
            saveCart();
        }
    }
});

// Eliminar productos del carrito
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const button = e.target.closest('.remove-item');
        const id = parseInt(button.dataset.id);
        const removedItem = cart.find(item => item.id === id);
        cart = cart.filter(item => item.id !== id);
        renderCart();
        updateCartCount();
        saveCart();
        if (removedItem) showNotification(`${removedItem.name} eliminado del carrito`, 'error');
    }
});

// Inicializar carrito al cargar la página
loadCart();
updateCartCount();
renderCart();