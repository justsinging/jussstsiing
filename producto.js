// producto.jsdocument.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const producto = productos.find(p => p.id == id);

  if (!producto) {
    document.body.innerHTML = '<p style="text-align:center">Producto no encontrado.</p>';
    return;
  }

  // Configurar elementos del DOM
  const imagenPrincipal = document.getElementById("imagen-principal");
  const galeriaMiniaturas = document.getElementById("galeria-miniaturas");
  const nombreProducto = document.getElementById("nombre-producto");
  const precioProducto = document.getElementById("precio-producto");
  const descripcionProducto = document.getElementById("descripcion-producto");

  // Mostrar imágenes
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

  // Mostrar información
  nombreProducto.textContent = producto.nombre;
  precioProducto.textContent = `$${producto.precio.toLocaleString("es-AR")}`;
  
  if (producto.descripcion) {
    descripcionProducto.innerHTML = producto.descripcion
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');
  }

  // Configurar envío
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

  // Configurar botón de carrito
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
});
