document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
      sections.forEach(section => {
        section.classList.remove('active-section');
      });
      document.getElementById(sectionId).classList.add('active-section');
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.dataset.section;
        showSection(sectionId);
      });
    });

    function renderCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      const cartItemsDiv = document.getElementById('cartItems');
      cartItemsDiv.innerHTML = '';
      let total = 0;

      for (const productName in cart) {
        if (cart.hasOwnProperty(productName)) {
          const quantity = cart[productName];
          const price = getProductPrice(productName);
          if (price) {
            const itemTotal = price * quantity;
            total += itemTotal;
            const itemElement = document.createElement('div');
            itemElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-2', 'border-bottom', 'border-secondary');
            itemElement.innerHTML = `
              <div>
                <p class="mb-0 fw-bold">${productName}</p>
                <small>${quantity} x $${price.toLocaleString()}</small>
              </div>
              <span>$${itemTotal.toLocaleString()}</span>
            `;
            cartItemsDiv.appendChild(itemElement);
          }
        }
      }

      if (total > 0) {
        const totalElement = document.createElement('div');
        totalElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-3', 'mt-3', 'fw-bold', 'border-top', 'border-secondary');
        totalElement.innerHTML = `<span>Total:</span><span>$${total.toLocaleString()}</span>`;
        cartItemsDiv.appendChild(totalElement);
        document.getElementById('cartMessage').textContent = '';
      } else {
        document.getElementById('cartMessage').textContent = 'El carrito está vacío.';
      }
    }

    function getProductPrice(productName) {
      const products = {
        "Classic Dots": { price: 3990 },
        "Speed Dots": { price: 4990 },
        "Control Dots": { price: 4490 }
      };
      return products[productName] ? products[productName].price : 0;
    }

    const clearCartBtn = document.getElementById('clearCart');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCart();
        alert('Carrito vaciado.');
      });
    }

    const checkoutBtn = document.getElementById('checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        localStorage.removeItem('cart');
        renderCart();
      });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const loginMessage = document.getElementById('loginMessage');

        const adminUser = { email: 'admin@duoc.cl', password: 'admin', role: 'admin' };
        const sellerUser = { email: 'vendedor@duoc.cl', password: 'vendedor', role: 'seller' };

        let userRole = '';

        if (email === adminUser.email && password === adminUser.password) {
          userRole = 'admin';
        } else if (email === sellerUser.email && password === sellerUser.password) {
          userRole = 'seller';
        }

        if (userRole) {
          localStorage.setItem('userRole', userRole);
          alert('Inicio de sesión exitoso. Redirigiendo al panel de ' + userRole + '.');
          
          if (userRole === 'admin') {
            window.location.href = 'admin/dashboard.html';
          } else if (userRole === 'seller') {
            window.location.href = 'admin/seller-dashboard.html';
          }

        } else {
          loginMessage.textContent = 'Correo o contraseña incorrectos.';
          loginMessage.style.color = 'red';
        }
      });
    }

    showSection('productos');
    renderCart();
});