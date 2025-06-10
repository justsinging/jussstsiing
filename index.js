const productosData = [ /* tu array */ ];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Mostrar productos
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = '';
  productosData.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

// Agregar al carrito
function agregarAlCarrito(id) {
  if (carrito.find(p => p.id === id)) {
    mostrarNotificacion('Ya agregaste ese producto');
    return;
  }
  const producto = productosData.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
  mostrarNotificacion(`${producto.nombre} agregado`);
  guardarCarrito();
}

// Carrito UI
const listaCarrito = document.getElementById('lista-carrito');
const contador = document.getElementById('cart-count');
const total = document.getElementById('total');

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio}`;
    listaCarrito.appendChild(li);
  });
  contador.textContent = carrito.length;
  total.textContent = carrito.reduce((acc,p) => acc + p.precio, 0);
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarNotificacion(msg) {
  const n = document.getElementById('notificacion');
  n.textContent = msg;
  n.style.display = 'block';
  setTimeout(() => n.style.display = 'none', 2000);
}

function toggleCart() {
  document.getElementById('carrito').classList.toggle('abierto');
}

// Evento al cargar
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  actualizarCarrito();
});
