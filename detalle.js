// Variables para el control de imágenes
let imagenesProducto = [];
let imagenActual = 0;

document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos del producto
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const producto = productos.find(p => p.id === id);

  if (producto) {
    // Actualizar header
    document.querySelector('.breadcrumb span').textContent = producto.nombre;
    
    // Configurar imágenes
    imagenesProducto = [producto.imagen, ...(producto.imagenes || [])];
    actualizarImagen();
    
    // Configurar miniaturas
    const galeria = document.getElementById('galeria-miniaturas');
    galeria.innerHTML = '';
    
    imagenesProducto.forEach((img, index) => {
      const miniatura = document.createElement('img');
      miniatura.src = img;
      miniatura.alt = `Miniatura ${index + 1}`;
      miniatura.className = 'miniatura';
      miniatura.addEventListener('click', () => {
        imagenActual = index;
        actualizarImagen();
      });
      galeria.appendChild(miniatura);
    });
    
    // Resto de tu código para cargar datos del producto...
  }
});

// Función para cambiar de imagen
function cambiarImagen(direccion) {
  imagenActual += direccion;
  
  // Circular entre imágenes
  if (imagenActual < 0) imagenActual = imagenesProducto.length - 1;
  if (imagenActual >= imagenesProducto.length) imagenActual = 0;
  
  actualizarImagen();
}

function actualizarImagen() {
  const imagenPrincipal = document.getElementById('imagen-principal');
  imagenPrincipal.src = imagenesProducto[imagenActual];
  
  // Actualizar miniatura activa
  document.querySelectorAll('.miniatura').forEach((miniatura, index) => {
    if (index === imagenActual) {
      miniatura.classList.add('activa');
    } else {
      miniatura.classList.remove('activa');
    }
  });
}

// Función para el carrito (compartida con main.js)
function toggleCart() {
  document.getElementById('carrito').classList.toggle('open');
}
