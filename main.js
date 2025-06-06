/* -------- CONFIG -------- */
const PUBLIC_KEY = 'APP_USR-0aa95e81-e09e-42d7-95ea-540547141761';              // ⚠️ reemplaza
const BACKEND_URL = 'http://localhost:3000';        // o tu dominio online

/* -------- VARIABLES GLOBALES -------- */
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let mpInstance;   // Se inicializa cuando esté cargada la SDK

/* -------- HELPERS -------- */
const $ = s => document.querySelector(s);
const guardarCarrito   = () => localStorage.setItem('carrito', JSON.stringify(carrito));
const notificar = txt => {
  const n = $('#notificacion');
  n.textContent = txt;
  n.style.display = 'block';
  setTimeout(() => n.style.display = 'none', 3000);
};

/* -------- UI CARRITO -------- */
function toggleCart(){ $('#carrito').classList.toggle('open'); }
function actualizarContador(){
  $('#cart-count').textContent = carrito.reduce((acc,p)=>acc+p.cantidad,0);
}
function actualizarCarrito(){
  const ul = $('#lista-carrito'); ul.innerHTML='';
  let total = 0;
  carrito.forEach(p=>{
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - $${p.precio.toLocaleString('es-AR')} x ${p.cantidad}`;
    const b = document.createElement('button');
    b.textContent='❌';
    b.onclick=()=> eliminarDelCarrito(p.id);
    li.appendChild(b); ul.appendChild(li);
    total += p.precio * p.cantidad;
  });
  $('#total').textContent = total.toLocaleString('es-AR');
  actualizarContador();
}
function agregarAlCarrito(prod){
  const f = carrito.find(p=>p.id===prod.id);
  f ? f.cantidad++ : carrito.push(prod);
  guardarCarrito(); actualizarCarrito();
  notificar(`${prod.nombre} agregado al carrito`);
}
function eliminarDelCarrito(id){
  carrito = carrito.filter(p=>p.id!==id);
  guardarCarrito(); actualizarCarrito();
  notificar('Producto eliminado del carrito');
}
function vaciarCarrito(){
  carrito=[]; guardarCarrito(); actualizarCarrito();
  notificar('Carrito vaciado');
}

/* -------- LISTENERS -------- */
document.addEventListener('DOMContentLoaded',()=>{
  /* botones agregar */
  document.addEventListener('click',e=>{
    if(e.target.classList.contains('btn-agregar')){
      const b=e.target;
      agregarAlCarrito({
        id:        parseInt(b.dataset.id),
        nombre:    b.dataset.nombre,
        precio:    parseFloat(b.dataset.precio),
        cantidad:  1
      });
    }
  });

  /* botón carrito */
  $('.cart-button').addEventListener('click',toggleCart);

  /* botón pagar */
  $('#btn-pagar').addEventListener('click',pagarConMercadoPago);

  /* instanciar MP cuando la SDK esté lista */
  if(window.MercadoPago){
    mpInstance = new MercadoPago(PUBLIC_KEY,{locale:'es-AR'});
  }else{
    console.error('SDK de Mercado Pago no cargó');
  }

  actualizarCarrito();
});

/* -------- PAGO -------- */
async function pagarConMercadoPago(){
  if(!mpInstance){ return alert('SDK de Mercado Pago no disponible'); }

  // Armamos los items a partir del carrito
  const items = carrito.map(p=>({
    title:  p.nombre,
    quantity: p.cantidad,
    unit_price: p.precio
  }));

  try{
    const res = await fetch(`${BACKEND_URL}/crear-preferencia`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ items })
    });
    const data = await res.json();
    if(!data.id) throw new Error('Respuesta sin id');
    mpInstance.checkout({
      preference:{ id:data.id },
      autoOpen:true,
    });
  }catch(err){
    console.error(err);
    alert('Error al iniciar el pago. Intenta de nuevo.');
  }
}
<section id="seccion-envio" style="display:none;padding:20px;max-width:600px;margin:0 auto;">
  <h2>Datos de Envío</h2>
  <form id="form-envio">
    <label>Nombre completo:<br><input type="text" name="nombre" required></label><br><br>
    <label>Dirección:<br><input type="text" name="direccion" required></label><br><br>
    <label>Ciudad:<br><input type="text" name="ciudad" required></label><br><br>
    <label>Código postal:<br><input type="text" name="cp" required></label><br><br>
    <button class="btn" type="submit">Continuar al pago</button>
  </form>
</section>
let datosEnvio = {};

function mostrarEnvio() {
  $('#carrito').classList.remove('open');
  $('#seccion-envio').style.display = 'block';
  window.scrollTo({ top: $('#seccion-envio').offsetTop - 20, behavior: 'smooth' });
}

document.getElementById('form-envio').addEventListener('submit', function(e){
  e.preventDefault();
  const fd = new FormData(this);
  datosEnvio = Object.fromEntries(fd.entries());

  // Mostrar datos en resumen
  $('#detalle-envio').innerHTML = `
    <p><strong>Nombre:</strong> ${datosEnvio.nombre}</p>
    <p><strong>Dirección:</strong> ${datosEnvio.direccion}, ${datosEnvio.ciudad} (${datosEnvio.cp})</p>
  `;

  // Mostrar productos
  const ul = $('#resumen-carrito');
  ul.innerHTML = '';
  let total = 0;
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} x${p.cantidad} - $${(p.precio * p.cantidad).toLocaleString('es-AR')}`;
    ul.appendChild(li);
    total += p.precio * p.cantidad;
  });
  $('#resumen-total').textContent = total.toLocaleString('es-AR');

  // Mostrar sección resumen
  $('#seccion-envio').style.display = 'none';
  $('#seccion-resumen').style.display = 'block';
  window.scrollTo({ top: $('#seccion-resumen').offsetTop - 20, behavior: 'smooth' });
});

function volverAEnvio() {
  $('#seccion-resumen').style.display = 'none';
  $('#seccion-envio').style.display = 'block';
}

function mostrarPago() {
  $('#seccion-resumen').style.display = 'none';
  $('#seccion-pago').style.display = 'block';
  window.scrollTo({ top: $('#seccion-pago').offsetTop - 20, behavior: 'smooth' });
}

function mostrarConfirmacion() {
  $('#seccion-pago').style.display = 'none';
  $('#seccion-confirmacion').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function irAlInicio() {
  $('#seccion-confirmacion').style.display = 'none';
  vaciarCarrito();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('form-envio').addEventListener('submit', function(e){
  e.preventDefault();
  // Aquí podrías validar datos o guardarlos
  document.getElementById('seccion-envio').style.display = 'none';
  document.getElementById('seccion-pago').style.display = 'block';
  window.scrollTo({ top: document.getElementById('seccion-pago').offsetTop - 20, behavior: 'smooth' });
});

/* -------- EXPORTAR a window para HTML inline -------- */
window.toggleCart    = toggleCart;
window.vaciarCarrito = vaciarCarrito;
