// index.js

const productos = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg "
  },
  {
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg"
  },
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/B6E9D7j.jpeg"
  }
  {
    id: 5,
    nombre: "Bolsa Florero",
    precio: 20000,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg"
  }
 {
    id: 6,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg"
  }
 {
    id: 7,
    nombre: "Bolsa Frutis",
    precio: 18000,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg"
  }
];

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
