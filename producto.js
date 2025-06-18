// producto.js

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const productos = JSON.parse(localStorage.getItem('productos')) || [];
const producto = productos.find(p => p.id == id);

if (!producto) {
  document.body.innerHTML = '<p style="text-align:center">Producto no encontrado.</p>';
  throw new Error("Producto no encontrado");
}

// Imagen principal y miniaturas
const imagenPrincipal = document.getElementById("imagen-principal");
const galeriaMiniaturas = document.getElementById("galeria-miniaturas");

imagenPrincipal.src = producto.imagenes[0];
producto.imagenes.forEach(img => {
  const mini = document.createElement("img");
  mini.src = img;
  mini.classList.add("miniatura");
  mini.addEventListener("click", () => {
    imagenPrincipal.src = img;
  });
  galeriaMiniaturas.appendChild(mini);
});

// Información
const nombreProducto = document.getElementById("nombre-producto");
const precioProducto = document.getElementById("precio-producto");
const descripcionProducto = document.getElementById("descripcion-producto");
document.getElementById("breadcrumb-nombre").textContent = producto.nombre;

nombreProducto.textContent = producto.nombre;
precioProducto.textContent = `$${producto.precio.toLocaleString("es-AR")}`;
descripcionProducto.innerHTML = `
  <h4>Medidas:</h4> <p>${producto.descripcion.match(/Medidas:.*/i)?.[0]?.replace("Medidas:", "") || "-"}</p>
  <h4>Telas:</h4> <p>${producto.descripcion.match(/Telas:.*/i)?.[0]?.replace("Telas:", "") || "-"}</p>
  <h4>${producto.descripcion.includes("Cinta") ? "Cinta:" : ""}</h4> <p>${producto.descripcion.match(/Cinta:.*/i)?.[0]?.replace("Cinta:", "") || "-"}</p>
`;

// Envío
const formEnvio = document.getElementById("form-envio-producto");
formEnvio.addEventListener("submit", e => {
  e.preventDefault();
  const cp = document.getElementById("cp-envio").value.trim();
  const resultado = document.getElementById("resultado-envio");

  if (/^\d{4,5}$/.test(cp)) {
    resultado.textContent = `El costo de envío a ${cp} es de $1500.`;
  } else {
    resultado.textContent = "Por favor ingresá un código postal válido.";
  }
});

// Agregar al carrito
const botonCarrito = document.getElementById("agregar-carrito");
botonCarrito.addEventListener("click", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const yaExiste = carrito.find(p => p.id == producto.id);
  if (yaExiste) {
    alert("Ya agregaste este producto al carrito. Solo hay una unidad disponible.");
    return;
  }
  carrito.push({...producto, cantidad: 1});
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
});
