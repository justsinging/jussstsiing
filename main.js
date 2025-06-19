// Datos de productos (versión corregida)
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

// Inicialización de variables
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaCarrito = document.getElementById('lista-carrito');
const totalSpan = document.getElementById('total');
const cartCount = document.getElementById('cart-count');

// Guardar productos en localStorage si no existen
if (!localStorage.getItem('productos')) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para renderizar productos (versión mejorada)
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

// Resto de las funciones (agregarAlCarrito, actualizarCarrito, etc.) permanecen igual...
// ... [Aquí iría el resto de tu código JavaScript existente] ...

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  actualizarCarrito();
  
  // Configuraciones adicionales...
});
