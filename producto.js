// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Supongamos que los productos están guardados en localStorage
o const productos = JSON.parse(localStorage.getItem('productos')) || [];
const producto = productos.find(p => p.id == id);

const contenedor = document.getElementById('detalle-producto');

if (producto) {
  contenedor.innerHTML = `
    <div class="detalle">
      <div class="imagenes">
        ${producto.imagenes.map(img => `<img src="${img}" alt="${producto.nombre}">`).join('')}
      </div>
      <div class="info">
        <h2>${producto.nombre}</h2>
        <p class="precio">$${producto.precio}</p>
        <p>${producto.detalles || 'Sin descripción adicional.'}</p>
      </div>
    </div>
  `;
} else {
  contenedor.innerHTML = '<p>Producto no encontrado.</p>';
}

// Calcular envío (ficticio)
document.getElementById('form-envio-producto').addEventListener('submit', e => {
  e.preventDefault();
  const cp = document.getElementById('cp-envio').value;
  const resultado = document.getElementById('resultado-envio');

  if (cp.length === 4 || cp.length === 5) {
    resultado.textContent = 'El costo de envío a ' + cp + ' es de $3000.';
  } else {
    resultado.textContent = 'Por favor ingresá un código postal válido.';
  }
});
function calcularEnvioPorCP(cp) {
  if (/^1/.test(cp)) return 1500; // CP que empiezan con 1 → zona cercana
  if (/^2/.test(cp)) return 2500; // zona media
  if (/^3|4|5/.test(cp)) return 3500; // zona lejana
  return 5000; // resto del país
}
formEnvio.addEventListener("submit", (e) => {
  e.preventDefault();
  const cp = formEnvio.cp.value;
  const precioEnvio = calcularEnvioPorCP(cp);

  resultadoEnvio.innerHTML = `
    <p>Precio de envío a ${cp}: $${precioEnvio}</p>
    <p>Total con envío: $${producto.precio + precioEnvio}</p>
  `;
});
