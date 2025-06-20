// Variables para el producto
let cantidad = 1;
let productoActual = null;

document.addEventListener('DOMContentLoaded', () => {
  // Obtener ID del producto de la URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  
  // Obtener productos del localStorage
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  productoActual = productos.find(p => p.id === id);

  if (productoActual) {
    cargarDatosProducto();
    actualizarCarritoUI();
  } else {
    mostrarError();
  }
});

function cargarDatosProducto() {
  // Actualizar breadcrumb
  document.getElementById('nombre-breadcrumb').textContent = productoActual.nombre;
  
  // Actualizar imagen
  document.getElementById('imagen-principal').src = productoActual.imagen;
  document.getElementById('imagen-principal').alt = productoActual.nombre;
  
  // Actualizar información básica
  document.getElementById('nombre-producto').textContent = productoActual.nombre;
  document.getElementById('precio-producto').textContent = `$${productoActual.precio.toLocaleString('es-AR')}`;
  
  // Actualizar especificaciones
  const descParts = productoActual.descripcion.split('\n');
  if (descParts.length >= 3) {
    document.getElementById('medidas').textContent = descParts[0].replace('Medidas: ', '');
    document.getElementById('telas').textContent = descParts[1].replace('Telas: ', '');
    document.getElementById('cinta').textContent = descParts[2].replace('Cinta: ', '');
  }
}

function modificarCantidad(cambio) {
  cantidad += cambio;
  if (cantidad < 1) cantidad = 1;
  document.getElementById('cantidad').textContent = cantidad;
}

function agregarAlCarrito() {
  const existe = carrito.find(item => item.id === productoActual.id);
  
  if (existe) {
    existe.cantidad += cantidad;
  } else {
    carrito.push({
      ...productoActual,
      cantidad: cantidad
    });
  }
  
  actualizarCarrito();
  mostrarNotificacion(`${productoActual.nombre} agregado al carrito`);
  cantidad = 1;
  document.getElementById('cantidad').textContent = cantidad;
}

function mostrarError() {
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Producto no encontrado</h2>
      <button onclick="window.location.href='index.html'" style="padding: 10px 20px;">
        Volver a la tienda
      </button>
    </div>
  `;
}

// Funciones compartidas con main.js
function actualizarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarritoUI();
}

function actualizarCarritoUI() {
  if (window.actualizarCarritoGlobal) {
    window.actualizarCarritoGlobal();
  }
}

function mostrarNotificacion(mensaje) {
  if (window.mostrarNotificacionGlobal) {
    window.mostrarNotificacionGlobal(mensaje);
  } else {
    const noti = document.createElement('div');
    noti.textContent = mensaje;
    noti.style.position = 'fixed';
    noti.style.bottom = '20px';
    noti.style.right = '20px';
    noti.style.backgroundColor = '#4CAF50';
    noti.style.color = 'white';
    noti.style.padding = '12px 20px';
    noti.style.borderRadius = '8px';
    document.body.appendChild(noti);
    
    setTimeout(() => {
      noti.remove();
    }, 2000);
  }
}

function toggleCart() {
  if (window.toggleCartGlobal) {
    window.toggleCartGlobal();
  }
}
