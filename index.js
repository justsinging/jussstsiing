// index.js

const productos = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    detalles: "Hecha a mano con algodón ecológico."
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    detalles: "Tusor Gris con cinta de algodón natural."
  },
  {
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg",
    detalles: "Tusor Gris claro y Gris oscuro con cinta de algodón natural."
  },
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/B6E9D7j.jpeg",
    detalles: "Tusor Gris con cinta de algodón natural."
  }
   {
    id: 4,
    nombre: "Bolsa Florero",
    precio: 20000,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg",
    detalles: "Tusor Mostaza con cinta de algodón natural."
  }
 {
    id: 4,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg",
    detalles: "Tusor Verde con cinta de algodón natural."
  }
 {
    id: 4,
    nombre: "Bolsa Frutis",
    precio: 18000,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg",
    detalles: "Tusor Mostaza con cinta de algodón natural."
  }
];

// Guardar los productos en localStorage
localStorage.setItem('productos', JSON.stringify(productos));

// Mostrar productos en la página
function renderizarProductos() {
  const contenedor = document.getElementById("productos");

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <a href="producto.html?id=${producto.id}">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button class="btn">Ver más</button>
      </a>
    `;

    contenedor.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", renderizarProductos);
