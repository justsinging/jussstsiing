// Datos de productos
const productos = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    imagenes: ["https://i.imgur.com/QjtmBJJ.jpeg"],
    descripcion: "Medidas: 25x29cm\nTelas: Tusor Mostaza\nCinta: Algodón natural"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: ["https://i.imgur.com/RTeouUR.jpeg"],
    descripcion: "Medidas: 46x33 cm\nTelas: Tusor Gris Oscuro\nCinta: Algodón Natural"
  },
  {
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg",
    imagenes: ["https://i.imgur.com/5qZhCNO.jpeg"],
    descripcion: "Medidas: 33x34 cm\nTelas: Tusor Gris claro y oscuro\nCinta: Algodón Natural"
  },
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/B6E9D7j.jpeg",
    imagenes: ["https://i.imgur.com/XdEL6D9.jpeg"],
    descripcion: "Medidas: 28x33 cm\nTelas: Tusor Gris oscuro\nCinta: Algodón Natural"
  },
  {
    id: 5,
    nombre: "Bolsa Florero",
    precio: 20500,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg",
    imagenes: ["https://i.imgur.com/l2vmhs6.jpeg"],
    descripcion: "Medidas: 50x46 cm\nTelas: Tusor Mostaza\nCinta: Algodón Natural"
  },
  {
    id: 6,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg",
    imagenes: ["https://i.imgur.com/xazPdir.jpeg"],
    descripcion: "Medidas: 34x28 cm\nTelas: Tusor Verde\nCinta: Algodón Natural"
  },
  {
    id: 7,
    nombre: "Bolsa Frutis",
    precio: 18000,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg",
    imagenes: ["https://i.imgur.com/DzJc6iO.jpeg"],
    descripcion: "Medidas: 31x29 cm\nTelas: Tusor Mostaza\nCinta: Algodón Natural"
  }
];

// Variables globales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const cartCount = document.getElementById('cart-count');

// Guardar productos en localStorage si no existen
if (!localStorage.getItem('productos')) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para renderizar productos
function renderizarProductos() {
  const contenedor = document.getElementById('productos');
  if (!contenedor) return;

  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  
  if (productosGuardados.length === 0) {
    contenedor.innerHTML = '<p class="no-products">No hay productos disponibles</p>';
    return;
  }

  contenedor.innerHTML = productosGuardados.map(producto => `
    <div class="producto">
      <div class="producto-imagen-container">
        <img src="${producto.imagen}" class="producto-imagen base" alt="${producto.nombre}"
             onerror="this.onerror=null; this.src='https://via.placeholder.com/300?text=Imagen+no+disponible'">
        ${producto.imagenes && producto.imagenes[0] ? 
          `<img src="${producto.imagenes[0]}" class="producto-imagen hover" alt="${producto.nombre}"
               onerror="this.onerror=null; this.style.display='none'">` : ''}
      </div>
      <div class="producto-info">
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <p class="producto-precio">$${producto.precio.toLocaleString('es-AR')}</p>
        <button onclick="agregarAlCarrito(${producto.id})" class="btn">Agregar al carrito</button>
      </div>
    </div>
  `).join('');
}

function agregarAlCarrito(id) {
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  const producto = productosGuardados.find(p => p.id === id);
  
  if (!producto) {
    mostrarNotificacion('Producto no encontrado');
    return;
  }

  // Verificar si el producto ya está en el carrito
  const existe = carrito.find(item => item.id === id);

  if (existe) {
    // Mostrar notificación especial para productos de una sola unidad
    mostrarNotificacionEspecial('Este producto tiene una sola unidad');
    return; // Salir de la función sin agregar otra unidad
  }

  // Si no existe, agregarlo al carrito con cantidad 1
  carrito.push({...producto, cantidad: 1});
  actualizarCarrito();
  mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Nueva función para notificación especial
function mostrarNotificacionEspecial(mensaje) {
  const noti = document.getElementById('notificacion');
  if (!noti) return;
  function mostrarNotificacionEspecial(mensaje) {
  const noti = document.getElementById('notificacion');
  if (!noti) return;
  
  noti.textContent = mensaje;
  noti.classList.add('especial'); // Agregar clase especial
  noti.style.display = 'block';
  
  setTimeout(() => {
    noti.style.display = 'none';
    noti.classList.remove('especial'); // Remover clase especial
  }, 2000);
}
  noti.textContent = mensaje;
  noti.style.backgroundColor = '#ff9800'; // Color naranja para diferenciar
  noti.style.display = 'block';
  
  setTimeout(() => {
    noti.style.display = 'none';
    noti.style.backgroundColor = 'var(--primario)'; // Volver al color original
  }, 2000);
}
function actualizarCarrito() {
  if (!listaCarrito || !totalSpan || !cartCount) return;

  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-AR')}
      <button onclick="eliminarDelCarrito(${item.id})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total.toLocaleString('es-AR');
  cartCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// Funciones de UI
function mostrarNotificacion(mensaje) {
  const noti = document.getElementById('notificacion');
  if (!noti) return;
  
  noti.textContent = mensaje;
  noti.style.display = 'block';
  setTimeout(() => noti.style.display = 'none', 2000);
}

function toggleCart() {
  const carritoElement = document.getElementById('carrito');
  if (carritoElement) carritoElement.classList.toggle('open');
}

function mostrarEnvio() {
  // Aquí iría la lógica para mostrar el formulario de envío
  alert('Funcionalidad de envío se implementará aquí');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  try {
    renderizarProductos();
    actualizarCarrito();
  } catch (error) {
    console.error('Error al inicializar:', error);
    const contenedor = document.getElementById('productos') || document.body;
    contenedor.innerHTML = '<p class="error">Error al cargar la página. Por favor recarga.</p>';
  }
});

// Hacer funciones disponibles globalmente
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;
window.toggleCart = toggleCart;
window.mostrarEnvio = mostrarEnvio;

// Agrega esta función para manejar el pago
function iniciarPago() {
  // Verificar si hay productos en el carrito
  if (carrito.length === 0) {
    mostrarNotificacion('Agrega productos al carrito primero');
    return;
  }

  // Configuración de Mercado Pago (reemplaza con tu public key)
  const mp = new MercadoPago('TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', {
    locale: 'es-AR'
  });

  // Crear preferencia de pago
  const preference = {
    items: carrito.map(item => ({
      title: item.nombre,
      unit_price: item.precio,
      quantity: item.cantidad,
    })),
    back_urls: {
      success: window.location.href,
      failure: window.location.href,
      pending: window.location.href
    },
    auto_return: "approved",
  };

  mp.checkout({
    preference: preference,
    autoOpen: true, // Abre directamente el checkout
  });
}

// Modifica el botón "Continuar compra" en tu HTML para que llame a esta función:
// <button class="btn-cart" onclick="iniciarPago()">Continuar compra</button>
// Agrega estas funciones para manejar el modal
function mostrarModalPago() {
  document.getElementById('modal-pago').style.display = 'block';
}

function cerrarModalPago() {
  document.getElementById('modal-pago').style.display = 'none';
}

// Event listeners (debes agregar esto al final de tu main.js)
document.addEventListener('DOMContentLoaded', () => {
  // ... tu código existente ...
  
  // Manejo del modal
  document.querySelector('.cerrar-modal').addEventListener('click', cerrarModalPago);
  document.querySelector('.btn-confirmar').addEventListener('click', () => {
    mostrarNotificacion('Compra confirmada. Te contactaremos para coordinar el pago');
    cerrarModalPago();
    vaciarCarrito();
  });
  
  // Cerrar modal haciendo click fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('modal-pago')) {
      cerrarModalPago();
    }
  });
});

// Modifica tu función iniciarPago para alternativas:
function iniciarPago() {
  const metodo = confirm('¿Deseas pagar con Mercado Pago?\n(Cancelar para ver otras opciones)');
  
  if (metodo) {
    // Código de Mercado Pago que mostré antes
  } else {
    mostrarModalPago();
  }
}
