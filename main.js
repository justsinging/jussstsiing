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
  
  // Verificar si el contenedor existe
  if (!contenedor) {
    console.error('No se encontró el elemento con ID "productos"');
    return;
  }

  // Obtener productos de localStorage
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  
  // Verificar si hay productos
  if (productosGuardados.length === 0) {
    contenedor.innerHTML = '<p class="no-products">No hay productos disponibles</p>';
    return;
  }

  // Generar HTML para los productos
  contenedor.innerHTML = productosGuardados.map(producto => `
    <div class="producto">
      <div class="producto-content">
        <a href="detalle.html?id=${producto.id}" class="producto-imagen-container">
          <img src="${producto.imagen}" class="producto-imagen base" alt="${producto.nombre}" 
               onerror="this.onerror=null; this.src='https://via.placeholder.com/300?text=Imagen+no+disponible'">
          ${producto.imagenes && producto.imagenes[0] ? 
            `<img src="${producto.imagenes[0]}" class="producto-imagen hover" alt="${producto.nombre} - Vista detalle"
                 onerror="this.onerror=null; this.style.display='none'">` : ''}
        </a>
        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button onclick="agregarAlCarrito(${producto.id})" class="btn">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Funciones del carrito
function agregarAlCarrito(id) {
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  const producto = productosGuardados.find(p => p.id === id);
  
  if (!producto) {
    mostrarNotificacion('Producto no encontrado');
    return;
  }

  const existe = carrito.find(item => item.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({...producto, cantidad: 1});
  }

  actualizarCarrito();
  mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button onclick="eliminarDelCarrito(${item.id})">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total;
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
  noti.textContent = mensaje;
  noti.style.display = 'block';
  setTimeout(() => noti.style.display = 'none', 2000);
}

function toggleCart() {
  document.getElementById('carrito').classList.toggle('open');
}

function mostrarEnvio() {
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
  window.location.href = 'index.html';
}

// Configurar Mercado Pago
function configurarMercadoPago() {
  const mp = new MercadoPago('TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', {
    locale: 'es-AR'
  });

  document.getElementById('btn-pagar').addEventListener('click', function() {
    const preference = {
      items: carrito.map(item => ({
        title: item.nombre,
        unit_price: item.precio,
        quantity: item.cantidad
      }))
    };

    // En producción, aquí deberías hacer una llamada a tu backend
    mp.checkout({
      preference: preference,
      autoOpen: true
    });
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  actualizarCarrito();

  // Configurar formulario de envío
  document.getElementById('form-envio').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('form-envio-section').style.display = 'none';
    document.getElementById('seccion-resumen').style.display = 'block';
    
    // Mostrar datos de envío en el resumen
    const formData = new FormData(this);
    let envioHTML = '';
    for (let [key, value] of formData.entries()) {
      envioHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    }
    document.getElementById('detalle-envio').innerHTML = envioHTML;
    
    // Mostrar resumen del carrito
    const resumenCarrito = document.getElementById('resumen-carrito');
    resumenCarrito.innerHTML = '';
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
      resumenCarrito.appendChild(li);
    });
    
    document.getElementById('resumen-total').textContent = totalSpan.textContent;
  });

  // Configurar Mercado Pago si está disponible
  if (typeof MercadoPago !== 'undefined') {
    configurarMercadoPago();
  }
});

// Hacer funciones disponibles globalmente
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;
window.toggleCart = toggleCart;
window.mostrarEnvio = mostrarEnvio;
window.volverAEnvio = volverAEnvio;
window.mostrarPago = mostrarPago;
window.irAlInicio = irAlInicio;
