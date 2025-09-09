document.addEventListener('DOMContentLoaded', () => {
    const products = {
        "Classic Dots": {
            price: 3990,
            description: "Deslizadores tradicionales para movimientos suaves y controlados. Perfectos para todo tipo de mouse.",
            image: "../images/Mockup-1.png"
        },
        "Speed Dots": {
            price: 4990,
            description: "Deslizadores ultra rápidos para movimientos ágiles y precisos. Ideales para juegos competitivos.",
            image: "../images/Mockup-1.png"
        },
        "Control Dots": {
            price: 4490,
            description: "Deslizadores de fricción media para máximo control en cada movimiento. Especial para shooters tácticos.",
            image: "../images/Mockup-1.png"
        }
    };

    // Obtener el nombre del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');

    if (productName && products[productName]) {
        const product = products[productName];
        document.getElementById('productName').textContent = productName;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `$${product.price.toLocaleString()}`;
        document.getElementById('productImage').src = product.image;

        // Lógica para los botones de cantidad
        const quantityInput = document.getElementById('quantity');
        const decreaseBtn = document.getElementById('decreaseBtn');
        const increaseBtn = document.getElementById('increaseBtn');

        decreaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value, 10);
            quantityInput.value = currentValue + 1;
        });

        // Lógica para el botón "Agregar al carrito"
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || {};
            const quantity = parseInt(quantityInput.value, 10);
            
            if (quantity > 0) {
              cart[productName] = (cart[productName] || 0) + quantity;
              localStorage.setItem('cart', JSON.stringify(cart));
              alert(`${quantity} unidades de ${productName} han sido agregadas al carrito.`);
            } else {
              alert("Por favor, ingresa una cantidad válida.");
            }
        });
    } else {
        document.querySelector('.container').innerHTML = '<h1 class="text-center">Producto no encontrado.</h1><a href="../index.html" class="btn btn-custom d-block mx-auto mt-4" style="max-width:200px;">Volver a productos</a>';
    }
});