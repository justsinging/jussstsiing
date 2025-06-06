// ========== CARRITO ==========
let carrito = [];

// Función para actualizar el contador de ítems en el carrito
function actualizarContador() {
  document.getElementById("cart-count").textContent = carrito.length;
}

// Función para renderizar los productos del carrito
function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((item, i) => {
    total += item.precio;
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${item.precio} <button onclick="eliminarItem(${i})">x</button>`;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total;
  document.getElementById("resumen-total").textContent = total;
}

// Agregar producto
document.querySelectorAll(".btn-agregar").forEach(boton => {
  boton.addEventListener("click", () => {
    const id = boton.getAttribute("data-id");
    const nombre = boton.getAttribute("data-nombre");
    const precio = parseInt(boton.getAttribute("data-precio"));

    carrito.push({ id, nombre, precio });
    mostrarNotificacion(`${nombre} agregado al carrito`);
    actualizarContador();
    renderizarCarrito();
  });
});

// Eliminar ítem del carrito
function eliminarItem(index) {
  carrito.splice(index, 1);
  actualizarContador();
  renderizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  actualizarContador();
  renderizarCarrito();
}

// Mostrar/ocultar carrito lateral
function toggleCart() {
  document.getElementById("carrito").classList.toggle("open");
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  noti.textContent = mensaje;
  noti.style.display = "block";
  noti.style.animation = "fadeIn 0.5s";
  setTimeout(() => {
    noti.style.display = "none";
  }, 2500);
}

// ========== FLUJO DE COMPRA ==========

// Ir a la sección de envío
function mostrarEnvio() {
  document.querySelector("main").scrollIntoView({ behavior: "smooth" });
  document.getElementById("seccion-envio").style.display = "block";
  document.getElementById("carrito").classList.remove("open");
}

// Volver al envío desde resumen
function volverAEnvio() {
  document.getElementById("seccion-resumen").style.display = "none";
  document.getElementById("seccion-envio").style.display = "block";
}

// Mostrar resumen después de completar el formulario de envío
document.getElementById("form-envio").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const nombre = data.get("nombre");
  const direccion = data.get("direccion");
  const ciudad = data.get("ciudad");
  const cp = data.get("cp");

  document.getElementById("detalle-envio").innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Dirección:</strong> ${direccion}, ${ciudad} (${cp})</p>
  `;

  // Mostrar resumen del carrito
  const resumenLista = document.getElementById("resumen-carrito");
  resumenLista.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    resumenLista.appendChild(li);
  });

  document.getElementById("seccion-envio").style.display = "none";
  document.getElementById("seccion-resumen").style.display = "block";
});

// Mostrar pago
function mostrarPago() {
  document.getElementById("seccion-resumen").style.display = "none";
  document.getElementById("seccion-pago").style.display = "block";
}

// Confirmar compra (simulado, sin integración)
document.getElementById("btn-pagar").addEventListener("click", () => {
  document.getElementById("seccion-pago").style.display = "none";
  document.getElementById("seccion-confirmacion").style.display = "block";
  vaciarCarrito();
});

// Volver al inicio
function irAlInicio() {
  document.getElementById("seccion-confirmacion").style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

