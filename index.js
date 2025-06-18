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
  {
    id: 4,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/XdEL6D9.jpeg",
    imagenes: ["https://i.imgur.com/5qZhCNO.jpeg"],
    detalles: "Medidas: 33x34 - Telas: Tusor Gris - Cinta de algodón natural"
  }
{
    id: 5,
    nombre: "Bolsa Florero",
    precio: 20000,
    imagen: "https://i.imgur.com/MTxPBeC.jpeg",
    imagenes: ["https://i.imgur.com/l2vmhs6.jpeg"],
    detalles: "Medidas: 50x46 - Telas: Tusor Mostaza - Cinta de algodón natural"
  }
{
    id: 6,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "https://i.imgur.com/z1EjOsG.jpeg",
    imagenes: ["https://i.imgur.com/xazPdir.jpeg"],
    detalles: "Medidas: 34x28 - Telas: Tusor Verde - Cinta de algodón natural"
  }
{
    id: 7,
    nombre: "Bolsa Olivo",
    precio: 18000,
    imagen: "https://i.imgur.com/YXYUHHr.jpeg",
    imagenes: ["https://i.imgur.com/DzJc6iO.jpeg"],
    detalles: "Medidas: 28x33 - Telas: Tusor Mostaza - Cinta de algodón natural"
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
