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
  // ... (otros productos)
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
      <a href="detalle.html?id=${producto.id}" class="producto-link">
        <div class="producto-imagen-container">
          <img src="${producto.imagen}" class="producto-imagen base" alt="${producto.nombre}"
               onerror="this.onerror=null; this.src='https://via.placeholder.com/300?text=Imagen+no+disponible'">
          ${producto.imagenes && producto.imagenes[0] ? 
            `<img src="${producto.imagenes[0]}" class="producto-imagen hover" alt="${producto.nombre}"
                 onerror="this.onerror=null; this.style.display='none'">` : ''}
        </div>
      </a>
      <div class="producto-info">
        <a href="detalle.html?id=${producto.id}" class="producto-link">
          <h3 class="producto-nombre">${producto.nombre}</h3>
        </a>
        <p class="producto-precio">$${producto.precio.toLocaleString('es-AR')}</p>
        <button onclick="agregarAlCarrito(${producto.id})" class="btn">Agregar al carrito</button>
      </div>
    </div>
  `).join('');
}

// ... (resto de las funciones del carrito se mantienen igual)

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  try {
    renderizarProductos();
    actualizarCarrito();

    // Configurar formulario de envío
    const formEnvio = document.getElementById('form-envio');
    if (formEnvio) {
      formEnvio.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('form-envio-section').style.display = 'none';
        document.getElementById('seccion-resumen').style.display = 'block';
        
        const formData = new FormData(this);
        let envioHTML = '';
        for (let [key, value] of formData.entries()) {
          envioHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
        document.getElementById('detalle-envio').innerHTML = envioHTML;
        
        const resumenCarrito = document.getElementById('resumen-carrito');
        if (resumenCarrito) {
          resumenCarrito.innerHTML = '';
          carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-AR')}`;
            resumenCarrito.appendChild(li);
          });
        }
        
        document.getElementById('resumen-total').textContent = totalSpan.textContent;
      });
    }

    if (typeof MercadoPago !== 'undefined') {
      configurarMercadoPago();
    }
  } catch (error) {
    console.error('Error al inicializar:', error);
    const contenedor = document.getElementById('productos') || document.body;
    contenedor.innerHTML = '<p class="error">Error al cargar la página. Por favor recarga.</p>';
  }
});

// Funciones globales
window.agregarAlCarrito = agregarAlCarrito;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;
window.toggleCart = toggleCart;
window.mostrarEnvio = mostrarEnvio;
window.volverAEnvio = volverAEnvio;
window.mostrarPago = mostrarPago;
window.irAlInicio = irAlInicio;
