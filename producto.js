document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  
  // Obtener productos del localStorage para mantener consistencia
  const productos = JSON.parse(localStorage.getItem('productos')) || [];
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    document.body.innerHTML = `
      <div class="error-container">
        <h2>Producto no encontrado</h2>
        <button onclick="window.location.href='index.html'" class="btn">
          Volver a la tienda
        </button>
      </div>
    `;
    return;
  }

  // Mostrar datos del producto
  document.getElementById('nombre-producto').textContent = producto.nombre;
  document.getElementById('precio-producto').textContent = `$${producto.precio.toLocaleString('es-AR')}`;
  
  // Convertir saltos de línea en <br> para la descripción
  const descripcionHTML = producto.descripcion.replace(/\n/g, '<br>');
  document.getElementById('descripcion-producto').innerHTML = descripcionHTML;

  // Configurar imágenes
  const imagenPrincipal = document.getElementById('imagen-principal');
  const galeriaMiniaturas = document.getElementById('galeria-miniaturas');

  // Cargar imagen principal
  imagenPrincipal.src = producto.imagen;
  imagenPrincipal.alt = producto.nombre;

  // Crear miniaturas (imagen principal + imágenes adicionales)
  const todasImagenes = [producto.imagen, ...(producto.imagenes || [])];
  
  galeriaMiniaturas.innerHTML = '';
  todasImagenes.forEach((img, index) => {
    // Saltar si la imagen es la misma que la principal
    if (index > 0 && img === producto.imagen) return;
    
    const miniatura = document.createElement('img');
    miniatura.src = img;
    miniatura.alt = `Vista ${index + 1} de ${producto.nombre}`;
    miniatura.onerror = () => {
      miniatura.style.display = 'none';
    };
    
    miniatura.addEventListener('click', () => {
      imagenPrincipal.src = img;
      // Marcar miniatura activa
      document.querySelectorAll('.miniaturas img').forEach(img => {
        img.style.borderColor = 'transparent';
      });
      miniatura.style.borderColor = '#6B0F1A';
    });
    
    galeriaMiniaturas.appendChild(miniatura);
    
    // Marcar la primera miniatura como activa
    if (index === 0) {
      miniatura.style.borderColor = '#6B0F1A';
    }
  });

  // Configurar botón de carrito
  document.getElementById('agregar-carrito').addEventListener('click', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      carrito.push({
        ...producto,
        cantidad: 1
      });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar notificación flotante
    const notificacion = document.createElement('div');
    notificacion.textContent = `✅ ${producto.nombre} agregado al carrito`;
    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.right = '20px';
    notificacion.style.backgroundColor = '#4CAF50';
    notificacion.style.color = 'white';
    notificacion.style.padding = '12px 20px';
    notificacion.style.borderRadius = '8px';
    notificacion.style.zIndex = '1000';
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.style.opacity = '0';
      setTimeout(() => notificacion.remove(), 300);
    }, 2000);
  });

  // Configurar cálculo de envío
  document.getElementById('form-envio-producto').addEventListener('submit', (e) => {
    e.preventDefault();
    const cp = document.getElementById('cp-envio').value.trim();
    const resultado = document.getElementById('resultado-envio');
    
    // Validación mejorada de código postal
    if (/^\d{4,5}$/.test(cp)) {
      // Simular cálculo de envío (en producción sería una llamada a API)
      const costoEnvio = 1500; // Este valor podría venir de una API
      resultado.textContent = `El costo de envío a ${cp} es de $${costoEnvio.toLocaleString('es-AR')}.`;
      resultado.style.color = '#6B0F1A';
    } else {
      resultado.textContent = "Por favor ingresá un código postal válido (4 o 5 dígitos).";
      resultado.style.color = '#d32f2f';
    }
  });
});
