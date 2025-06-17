// main.js

const productos = [
  {
    id: 1,
    nombre: "Tote Bag Estrella",
    precio: 5500,
    imagen: "img/tote1.jpg",
    imagenes: ["img/tote1.jpg", "img/tote1b.jpg"],
    descripcion: "Tote bag 100% algodón con diseño de estrella. Medidas 35x40cm."
  },
  {
    id: 2,
    nombre: "Tote Bag Luna",
    precio: 5700,
    imagen: "img/tote2.jpg",
    imagenes: ["img/tote2.jpg", "img/tote2b.jpg"],
    descripcion: "Bolso ecológico con estampado lunar. Muy resistente."
  }
  // Agregá más productos con las mismas claves si querés
];

const contenedor = document.getElementById("productos");
const listaCarrito = document.getElementById("lista-carrito");
const cartCount = document.getElementById("cart-count");
const totalSpan = document.getElementById("total");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderizarProductos() {
  contenedor.innerHTML = "";
  productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <a href="producto.html?id=${p.id}" target="_blank">
        <img src="${p.imagen}" alt="${p.nombre}" class="producto-imagen" />
        <h3 class="producto-nombre">${p.nombre}</h3>
      </a>
      <p class="producto-precio">$${p.precio}</p>
      <button class="btn" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const enCarrito = carrito.find(p => p.id === id);
  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
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

renderizarProductos();
actualizarCarrito();
