.img-hover-container {
  position: relative;
  display: block;
  overflow: hidden;
}

.img-hover-container .producto-imagen {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: opacity 0.4s ease;
}

.img-hover-container .producto-imagen.hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.img-hover-container:hover .producto-imagen.hover {
  opacity: 1;
}

.img-hover-container:hover .producto-imagen.base {
  opacity: 0;
}
// main.js

const productosDePrueba = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    imagenes: [
      "https://i.imgur.com/QjtmBJJ.jpeg",
      "https://i.imgur.com/QjtmBJJ.jpeg"
    ]
  },
  {
   
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: ["img/tote2.jpg",
               "img/tote2.jpg"
               ]
  },
  {
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg",
    imagenes: [
      "https://i.imgur.com/5qZhCNO.jpeg",
      "https://i.imgur.com/5qZhCNO.jpeg"
    ]
  },
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/B6E9D7j.jpeg",
    imagenes: [
      "https://i.imgur.com/XdEL6D9.jpeg",
      "https://i.imgur.com/XdEL6D9.jpeg"
    ]
  },
  {
    id: 5,
    nombre: "Bolsa Florero",
    precio: 20000,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg",
    imagenes: [
      "https://i.imgur.com/l2vmhs6.jpeg",
      "https://i.imgur.com/l2vmhs6.jpeg"
    ]
  },
  {
    id: 6,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg",
    imagenes: [
      "https://i.imgur.com/xazPdir.jpeg",
      "https://i.imgur.com/xazPdir.jpeg",
      "https://i.imgur.com/iDa2OQ4.jpeg"
    ]
  },
  {
    id: 7,
    nombre: "Bolsa Frutis",
    precio: 16500,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg",
    imagenes: [
      "https://i.imgur.com/DzJc6iO.jpeg",
      "https://i.imgur.com/DzJc6iO.jpeg"
      ]
  }
];
if (!localStorage.getItem("productos")) {
  localStorage.setItem("productos", JSON.stringify(productosDePrueba));
}

const productos = JSON.parse(localStorage.getItem("productos")) || [];

function renderizarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = ""; // limpiar antes de renderizar

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

renderizarProductos();

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
function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  noti.textContent = mensaje;
  noti.style.display = "block";

  // Oculta la notificación luego de 2 segundos
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
renderizarProductos();
actualizarCarrito();
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
