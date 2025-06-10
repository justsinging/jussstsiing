document.getElementById('form-envio').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se recargue la página
  const datos = Object.fromEntries(new FormData(this));
  mostrarResumen(datos); // Llama a una función que muestra la sección de resumen
});
function mostrarResumen(datos) {
  document.getElementById('form-envio-section').style.display = 'none';
  document.getElementById('seccion-resumen').style.display = 'block';
  const detalle = `
    <p><strong>Nombre:</strong> ${datos.nombre}</p>
    <p><strong>Dirección:</strong> ${datos.direccion}</p>
    <p><strong>Ciudad:</strong> ${datos.ciudad}</p>
    <p><strong>CP:</strong> ${datos.cp}</p>
  `;
  document.getElementById('detalle-envio').innerHTML = detalle;
  const resumenLista = document.getElementById('resumen-carrito');
  resumenLista.innerHTML = '';
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio}`;
    resumenLista.appendChild(li);
  });
  document.getElementById('resumen-total').textContent = carrito.reduce((acc, p) => acc + p.precio, 0);
}
