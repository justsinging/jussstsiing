// main.js
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let productos = [];

fetch('productos.json')
  .then(res => res.json())
  .then(data => {
    productos = data;
    mostrarProductos();
    actualizarCarrito();
  });

function mostrarProductos() {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({...producto, cantidad: 1});
  }
  guardarYActualizar();
  mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarYActualizar();
}

function vaciarCarrito() {
  carrito = [];
  guardarYActualizar();
}

function guardarYActualizar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const resumen = document.getElementById('resumen-carrito');
  const total = document.getElementById('total');
  const totalResumen = document.getElementById('resumen-total');
  const contador = document.getElementById('cart-count');

  lista.innerHTML = '';
  resumen.innerHTML = '';
  let totalPrecio = 0;
  carrito.forEach(p => {
    totalPrecio += p.precio * p.cantidad;
    const item = document.createElement('li');
    item.innerHTML = `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad} <button onclick="eliminarDelCarrito(${p.id})">🗑️</button>`;
    const itemResumen = item.cloneNode(true);
    lista.appendChild(item);
    resumen.appendChild(itemResumen);
  });
  total.textContent = totalPrecio;
  totalResumen.textContent = totalPrecio;
  contador.textContent = carrito.length;
}

function toggleCart() {
  document.getElementById('carrito').classList.toggle('open');
}

function mostrarNotificacion(mensaje) {
  const noti = document.getElementById('notificacion');
  noti.textContent = mensaje;
  noti.classList.add('visible');
  setTimeout(() => noti.classList.remove('visible'), 3000);
}

function mostrarEnvio() {
  if (carrito.length === 0) return alert('El carrito está vacío');
  document.getElementById('form-envio-section').style.display = 'block';
  document.getElementById('carrito').classList.remove('open');
}

function volverAEnvio() {
  document.getElementById('seccion-resumen').style.display = 'none';
  document.getElementById('form-envio-section').style.display = 'block';
}

function mostrarPago() {
  document.getElementById('seccion-resumen').style.display = 'none';
  document.getElementById('seccion-pago').style.display = 'block';
}

function irAlInicio() {
  document.getElementById('seccion-confirmacion').style.display = 'none';
  document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}
