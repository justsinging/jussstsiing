// Obtener ID del producto de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Datos de productos (deberían coincidir con los de main.js)
const productos = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    imagenes: ["https://i.imgur.com/QjtmBJJ.jpeg", "https://i.imgur.com/QjtmBJJ.jpeg"],
    descripcion: "Bolsa de mujer elegante"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: ["https://i.imgur.com/RTeouUR.jpeg", "https://i.imgur.com/RTeouUR.jpeg"],
    descripcion: "Bolsa mediana versátil"
  },
  // Agrega más productos según necesites
];

document.addEventListener('DOMContentLoaded', () => {
  // Buscar producto por ID
  const producto = productos.find(p => p.id == id);

  if (!producto) {
    document.body.innerHTML = '<h2>Producto no encontrado</h2>';
    return;
  }

  // Mostrar datos del producto
  document.getElementById('nombre-producto').textContent = producto.nombre;
  document.getElementById('precio-producto').textContent = `$${producto.precio}`;
  document.getElementById('descripcion-producto').textContent = producto.descripcion;

  // Configurar imágenes
  const imagenPrincipal = document.getElementById('imagen-principal');
  const galeriaMiniaturas = document.getElementById('galeria-miniaturas');

  imagenPrincipal.src = producto.imagen;
  producto.imagenes.forEach((img, index) => {
    const miniatura = document.createElement('img');
    miniatura.src = img;
    miniatura.alt = `Vista ${index + 1} de ${producto.nombre}`;
    miniatura.addEventListener('click', () => {
      imagenPrincipal.src = img;
    });
    galeriaMiniaturas.appendChild(miniatura);
  });

  // Configurar botón de carrito
  document.getElementById('agregar-carrito').addEventListener('click', () => {
    // Obtener carrito actual o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.id == producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      carrito.push({...producto, cantidad: 1});
    }
    
    // Actualizar localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar notificación y redirigir
    alert(`${producto.nombre} agregado al carrito`);
    window.location.href = 'index.html';
  });

  // Configurar cálculo de envío
  document.getElementById('form-envio-producto').addEventListener('submit', (e) => {
    e.preventDefault();
    const cp = document.getElementById('cp-envio').value.trim();
    const resultado = document.getElementById('resultado-envio');
    
    if (/^\d{4,5}$/.test(cp)) {
      resultado.textContent = `El costo de envío a ${cp} es de $1500.`;
    } else {
      resultado.textContent = "Por favor ingresá un código postal válido.";
    }
  });
});
