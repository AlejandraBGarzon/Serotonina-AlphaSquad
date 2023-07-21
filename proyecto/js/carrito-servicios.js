/* ---------------------------------------------------------------------------------------------- */
/*                       API FETCH PARA FUNCIONALIDAD DE CARRITO DE COMPRAS                       */
/* ---------------------------------------------------------------------------------------------- */

// Variables globales para almacenar los productos y el carrito
let products = [];
let cartItems = [];
const carritoId = 1; // Asignar aquí el ID del carrito del usuario

// Función para obtener los productos desde la API
async function getProductsFromAPI() {
    try {
        const response = await fetch('http://localhost:8080/servicios');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

// Función para agregar un producto al carrito
async function addToCart(event) {
    const productId = event.target.dataset.id;
    const product = products.find((p) => p.id === productId);

    if (product) {
        try {
            const response = await fetch(`http://localhost:8080/carrito/${carritoId}/agregar-servicio/${productId}`, {
                method: 'POST',
            });

            if (response.ok) {
                // El producto se agregó correctamente al carrito en el backend
                // Actualizar el carrito en el DOM llamando a una función para mostrar los productos en el carrito:
                updateCartDOM();
            } else {
                console.error('Error al agregar el producto al carrito:', response.status);
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
        }
    }
}

// Función para crear los elementos del producto en el carrito
function createCartItemElement(item) {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');

    const itemTitle = document.createElement('span');
    itemTitle.innerText = item.title;
    cartItemElement.appendChild(itemTitle);

    const itemPrice = document.createElement('span');
    itemPrice.innerText = `$${item.price.toFixed(2)}`;
    cartItemElement.appendChild(itemPrice);

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Eliminar';
    removeButton.classList.add('remove-item');
    removeButton.dataset.id = item.id;
    removeButton.addEventListener('click', removeFromCart);
    cartItemElement.appendChild(removeButton);

    return cartItemElement;
}

// Función para eliminar un producto del carrito
async function removeFromCart(event) {
    const productId = event.target.dataset.id;

    try {
        const response = await fetch(`http://localhost:8080/carrito/${carritoId}/eliminar-servicio/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // El producto se eliminó correctamente del carrito en el backend
            // Actualizar el carrito en el DOM llamando a una función para mostrar los productos en el carrito:
            updateCartDOM();
        } else {
            console.error('Error al eliminar el producto del carrito:', response.status);
        }
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
    }
}

// Función para renderizar cada producto en el DOM
function renderProduct(product) {
    const item = document.createElement('div');
    item.classList.add('item');

    const itemTitle = document.createElement('span');
    itemTitle.innerText = product.title;
    item.appendChild(itemTitle);

    const itemImage = document.createElement('img');
    itemImage.src = product.image;
    itemImage.alt = product.title;
    itemImage.classList.add('img-item');
    item.appendChild(itemImage);

    const itemDescription = document.createElement('p');
    itemDescription.innerText = product.description;
    item.appendChild(itemDescription);

    const itemPrice = document.createElement('span');
    itemPrice.innerText = `$${product.price.toFixed(2)}`;
    item.appendChild(itemPrice);

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = 'Agregar al Carrito';
    addToCartButton.classList.add('boton-item');
    addToCartButton.dataset.id = product.id;
    addToCartButton.addEventListener('click', addToCart);
    item.appendChild(addToCartButton);

    return item;
}

// Función para actualizar el carrito en el DOM
function updateCartDOM() {
    // Obtener el contenedor de los elementos del carrito
    const carritoItems = document.querySelector('.carrito-items');

    // Limpiar el carrito
    carritoItems.innerHTML = '';

    // Renderizar los productos en el carrito
    cartItems.forEach((item) => {
        const itemElement = createCartItemElement(item);
        carritoItems.appendChild(itemElement);
    });

    // Actualizar el total del carrito
    updateCartTotal();
}

// Función para obtener el carrito del usuario
async function getCart() {
    try {
        const response = await fetch(`http://localhost:8080/carrito/${carritoId}`);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        return [];
    }
}

// Función para inicializar la página
async function init() {
    // Llamada a la función para obtener los productos desde la API
    try {
        products = await getProductsFromAPI();

        // Obtener el contenedor de los elementos del carrito
        const contenedorItems = document.querySelector('.contenedor-items');

        // Renderizar cada producto en el DOM
        products.forEach((product) => {
            const item = renderProduct(product);
            contenedorItems.appendChild(item);
        });

        // Obtener el carrito del usuario
        cartItems = await getCart();

        // Actualizar el carrito en el DOM
        updateCartDOM();
    } catch (error) {
        console.error('Error al inicializar la página:', error);
    }
}

// Llamada a la función para inicializar la página
init();
