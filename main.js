// VARIABLES GLOBALES
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenido');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

// FUNCIONES PRINCIPALES
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = '';
    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <button class="boton-agregar" onclick="agregarProducto(${producto.id})">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

function agregarProducto(id) {
    const producto = productos.find((prod) => prod.id === id);
    const productoEnCarrito = carrito.find((prod) => prod.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter((producto) => producto.id !== id);
    actualizarCarrito();
    guardarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    contenedorCarrito.innerHTML = '';

    carrito.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Precio: $${producto.precio * producto.cantidad}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
    });

    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// EJECUCIÓN INICIAL
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos(productos); // Asegurate de tener definida la variable "productos"
    actualizarCarrito();
});
