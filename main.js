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
    ],
    descripcion: "Medidas: 25x29cm\nTelas: Tusor Mostaza\nCinta: Algodón natural"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: [
    ],
    descripcion: "Medidas: 46x33 cm\nTelas: Tusor Gris Oscuro\nCinta: Algodón Natural"
  },
{
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg",
    imagenes: [
      "https://i.imgur.com/5qZhCNO.jpeg",
    ],
    descripcion: "Medidas: 33x34 cm\nTelas: Tusor Gris claro y oscuro\nCinta: Algodón Natural"
  },
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/B6E9D7j.jpeg",
    imagenes: [
      "https://i.imgur.com/XdEL6D9.jpeg",
    ],
    descripcion: "Medidas: 28x33 cm\nTelas: Tusor Gris oscuro\nCinta: Algodón Natural"
  },
  {
    id: 5,
    nombre: "Bolsa Florero",
    precio: 20500,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg",
    imagenes: [
      "https://i.imgur.com/l2vmhs6.jpeg",
    ],
    descripcion: "Medidas: 50x46 cm\nTelas: Tusor Mostaza\nCinta: Algodón Natural"
  },
  {
    id: 6,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg",
    imagenes: [
      "https://i.imgur.com/xazPdir.jpeg",
      "https://i.imgur.com/iDa2OQ4.jpeg"
    ],
    descripcion: "Medidas: 34x28 cm\nTelas: Tusor Verde\nCinta: Algodón Natural"
  },
  {
    id: 7,
    nombre: "Bolsa Frutis",
    precio: 18000,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg",
    imagenes: [
      "https://i.imgur.com/DzJc6iO.jpeg",
    ],
    descripcion: "Medidas: 31x29 cm\nTelas: Tusor Mostaza\nCinta: Algodón Natural"
  },
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
        <img src="${producto.imagen}" class="producto-imagen base" />
        <img src="${producto.imagenes[0]}" class="producto-imagen hover" />
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
