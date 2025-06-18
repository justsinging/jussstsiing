
// Función para renderizar los productos en la página
function renderizarProductos() {
  const contenedor = document.getElementById("productos");
  productos.forEach((producto) => {
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

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", renderizarProductos);
