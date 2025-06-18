// main.js
 const productos = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    imagenes: ["https://i.imgur.com/QjtmBJJ.jpeg"],
    descripcion: "Medidas: 25x29 - Telas: Tusor Mostaza - Cinta de algodón natural"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: ["img/tote2.jpg", "img/tote2b.jpg"],
    descripcion: "Medidas: 46x33 - Telas: Tusor Gris - Cinta de algodón natural"
  },
  {
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg",
    imagenes: ["https://i.imgur.com/5qZhCNO.jpeg"],
    descripcion: "Medidas: 28x33 - Telas: Tusor Gris - Gris oscuro - Cinta de algodón natural"
  },
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/B6E9D7j.jpeg",
    imagenes: ["https://i.imgur.com/XdEL6D9.jpeg"],
    descripcion: "Medidas: 33x34 - Telas: Tusor Gris - Cinta de algodón natural"
  },
  {
    id: 5,
    nombre: "Bolsa Florero",
    precio: 20000,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg",
    imagenes: ["https://i.imgur.com/l2vmhs6.jpeg"],
    descripcion: "Medidas: 50x46 - Telas: Tusor Mostaza - Cinta de algodón natural"
  },
  {
    id: 6,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg",
    imagenes: ["https://i.imgur.com/xazPdir.jpeg"],
    descripcion: "Medidas: 34x28 - Telas: Tusor Verde - Cinta de algodón natural"
  },
  {
    id: 7,
    nombre: "Bolsa Frutis",
    precio: 16500,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg",
    imagenes: ["https://i.imgur.com/DzJc6iO.jpeg"],
    descripcion: "Medidas: 28x33 - Telas: Tusor Mostaza - Cinta de algodón natural"
  }
];
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
