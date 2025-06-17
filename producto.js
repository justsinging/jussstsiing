// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Obtener los productos desde localStorage o desde una fuente externa si se desea
const productos = JSON.parse(localStorage.getItem("productos")) || [];
const producto = productos.find((p) => p.id == id);

const contenedor = document.getElementById("detalle-producto");

if (producto) {
  contenedor.innerHTML = `
    <div class="detalle">
      <div class="imagenes">
        ${producto.imagenes
          .map((img) => `<img src="${img}" alt="${producto.nombre}">`)
          .join("")}
      </div>
      <div class="info">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        <p>${producto.descripcion || "Sin descripción adicional."}</p>
        <form id="form-envio-producto">
          <label for="cp-envio">Código postal:</label>
          <input type="text" id="cp-envio" name="cp" required>
          <button type="submit">Calcular envío</button>
        </form>
        <div id="resultado-envio"></div>
      </div>
    </div>
  `;
} else {
  contenedor.innerHTML = "<p>Producto no encontrado.</p>";
}

// Rango de códigos postales y precios (editables)
const rangosEnvio = [
  { desde: 1000, hasta: 1499, precio: 1500 },
  { desde: 1500, hasta: 1999, precio: 2500 },
  { desde: 2000, hasta: 2999, precio: 3500 },
  { desde: 3000, hasta: 9999, precio: 5000 },
];

function calcularCostoEnvio(cp) {
  const cpNum = parseInt(cp);
  for (let rango of rangosEnvio) {
    if (cpNum >= rango.desde && cpNum <= rango.hasta) {
      return rango.precio;
    }
  }
  return null; // No válido
}

// Escuchar el formulario de envío
const formEnvio = document.getElementById("form-envio-producto");
const resultadoEnvio = document.getElementById("resultado-envio");

formEnvio.addEventListener("submit", (e) => {
  e.preventDefault();
  const cp = document.getElementById("cp-envio").value;
  const precioEnvio = calcularCostoEnvio(cp);

  if (precioEnvio !== null) {
    resultadoEnvio.innerHTML = `
      <p>Precio de envío a ${cp}: $${precioEnvio}</p>
      <p>Total con envío: $${producto.precio + precioEnvio}</p>
    `;
  } else {
    resultadoEnvio.innerHTML = "<p>Por favor ingresá un código postal válido.</p>";
  }
});
