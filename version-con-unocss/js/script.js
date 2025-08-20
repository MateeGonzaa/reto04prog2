const menuBtn = document.getElementById('menu-btn')
    const menu = document.getElementById('menu')
    const cartModal = document.getElementById('cartModal')
    const openCartBtn = document.getElementById('open-cart')

    // Toggle menú en mobile
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden')
    })

    // Abrir carrito
    openCartBtn.addEventListener('click', (e) => {
      e.preventDefault()
      cartModal.style.display = 'flex'
    })

    // Cerrar carrito
    function closeCart() {
      cartModal.style.display = 'none'
    }