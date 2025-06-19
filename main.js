// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// Datos de productos
const productosDePrueba = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    imagenes: [
      "https://i.imgur.com/QjtmBJJ.jpeg",
      "https://i.imgur.com/QjtmBJJ.jpeg"
    ],
    descripcion: "Medidas: 30x40 cm\nTelas: Algodón orgánico\nCinta: Ajustable"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: [
      "https://i.imgur.com/RTeouUR.jpeg",
      "https://i.imgur.com/RTeouUR.jpeg"
    ],
    descripcion: "Medidas: 35x45 cm\nTelas: Lino reciclado\nCinta: Ajustable"
  },
  // ... (agregar descripción a todos los productos)
];

// Inicialización
if (!localStorage.getItem("productos")) {
  localStorage.setItem("productos", JSON.stringify(productosDePrueba));
}

const productos = JSON.parse(localStorage.getItem("productos")) || [];

// Renderizar productos
function renderizarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <a href="detalle.html?id=${producto.id}" class="img-hover-container">
        <img src="${producto.imagenes[0]}" class="producto-imagen base" />
        <img src="${producto.imagenes[1]}" class="producto-imagen hover" />
      </a>
      <h3 class="producto-nombre">${producto.nombre}</h3>
      <p class="producto-precio">$${producto.precio}</p>
      <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;

    contenedor.appendChild(div);
  });
}

// Funciones del carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const enCarrito = carrito.find(p => p.id === id);
  
  if (enCarrito) {
    mostrarNotificacion("Ya agregaste este producto al carrito");
    return;
  }

  carrito.push({ ...producto, cantidad: 1 });
  actualizarCarrito();
  mostrarNotificacion("Producto agregado al carrito");
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}
      <button onclick="eliminarDelCarrito(${p.id})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += p.precio * p.cantidad;
  });
  cartCount.textContent = carrito.reduce((acc, el) => acc + el.cantidad, 0);
  totalSpan.textContent = total;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// UI Functions
function toggleCart() {
  document.getElementById("carrito").classList.toggle("open");
}

function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  noti.textContent = mensaje;
  noti.style.display = "block";
  setTimeout(() => {
    noti.style.display = "none";
  }, 2000);
}

function mostrarEnvio() {
  document.getElementById("form-envio-section").style.display = "block";
  document.getElementById("carrito").classList.remove("open");
  window.scrollTo({ top: document.getElementById("form-envio-section").offsetTop, behavior: 'smooth' });
}

function volverAEnvio() {
  document.getElementById("seccion-resumen").style.display = "none";
  document.getElementById("form-envio-section").style.display = "block";
}

function mostrarPago() {
  document.getElementById("seccion-resumen").style.display = "none";
  document.getElementById("seccion-pago").style.display = "block";
}

function irAlInicio() {
  location.reload();
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos();
  actualizarCarrito();
});
