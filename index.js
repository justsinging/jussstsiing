const productos = [
  {
    id: 1,
    nombre: "Bolsa Mujer",
    precio: 18000,
    imagen: "https://i.imgur.com/bMZdpKo.jpeg",
    imagenes: ["https://i.imgur.com/QjtmBJJ.jpeg"],
    detalles: "Medidas: 25x29 - Telas: Tusor Mostaza - Cinta de algodón natural"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 19000,
    imagen: "https://i.imgur.com/RTeouUR.jpeg",
    imagenes: ["img/tote2.jpg", "img/tote2b.jpg"],
    detalles: "Medidas: 46x33 - Telas: Tusor Gris - Cinta de algodón natural"
  },
  {
    id: 3,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/BTUjfH7.jpeg",
    imagenes: ["https://i.imgur.com/5qZhCNO.jpeg"],
    detalles: "Medidas: 28x33 - Telas: Tusor Gris - Gris oscuro - Cinta de algodón natural"
  }
];

// Guardar productos en localStorage
localStorage.setItem("productos", JSON.stringify(productos));

// Renderizar productos
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");
  productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <a href="producto.html?id=${p.id}">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
      </a>
      <p>$${p.precio}</p>
      <button class="btn" onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
});
