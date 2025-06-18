const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const productos = JSON.parse(localStorage.getItem('productos')) || [];
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

document.getElementById('form-envio-producto').addEventListener('submit', e => {
  e.preventDefault();
  const cp = document.getElementById('cp-envio').value;
  const resultado = document.getElementById('resultado-envio');

  if (cp.length === 4 || cp.length === 5) {
    resultado.textContent = `El costo de envío a ${cp} es de $1500.`;
  } else {
    resultado.textContent = 'Por favor ingresá un código postal válido.';
  }
});
