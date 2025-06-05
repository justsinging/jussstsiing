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

/* -------- EXPORTAR a window para HTML inline -------- */
window.toggleCart    = toggleCart;
window.vaciarCarrito = vaciarCarrito;
