import express from 'express';
import cors from 'cors';
import mercadopago from 'mercadopago';

const app = express();
app.use(cors());
app.use(express.json());

// Tu clave secreta de Mercado Pago
mercadopago.configure({
  access_token: 'TEST-...tu access token...',
});

// Ruta que crea la preferencia de pago
app.post('/crear-preferencia', async (req, res) => {
  try {
    const preference = {
      items: req.body.items, // productos enviados desde el frontend
      back_urls: {
        success: 'https://tu-sitio.com/success',
        failure: 'https://tu-sitio.com/failure',
        pending: 'https://tu-sitio.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
/* package.json debe tener:  { "type":"module" }  para poder usar import */
import express      from 'express';
import cors         from 'cors';
import mercadopago  from 'mercadopago';

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = 'TEST-REEMPLAZA_POR_TU_ACCESS_TOKEN';  // ⚠️ clave secreta

/* ---------- CONFIG ---------- */
mercadopago.configure({ access_token: ACCESS_TOKEN });

/* ---------- ENDPOINT ---------- */
app.post('/crear-preferencia', async (req,res)=>{
  try{
    const preference = {
      items: req.body.items,
      back_urls: {
        success: 'https://tusitio.com/success',
        failure: 'https://tusitio.com/failure',
        pending: 'https://tusitio.com/pending'
      },
      auto_return: 'approved',
    };
    const mpRes = await mercadopago.preferences.create(preference);
    res.json({ id: mpRes.body.id });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ---------- RUN ---------- */
app.listen(PORT, ()=> console.log(`Servidor MP 🟢  http://localhost:${PORT}`));
function agregarAlCarrito(prod){
  const existe = carrito.find(p=>p.id===prod.id);
  if(existe){
    mostrarNotificacion('No se pueden agregar más: cada producción es única.');
    return;
  }
  carrito.push(prod);
  actualizarContador();
  renderizarCarrito();
  mostrarNotificacion(`${prod.nombre} agregado al carrito`);
}
const productosData = [
  {
    id: 1,
    nombre: "Bolsa Florero",
    precio: 22000,
    imagen: "https://i.postimg.cc/66cjFV71/IMG-9268.jpg"
  },
  {
    id: 2,
    nombre: "Bolsa Mida",
    precio: 18000,
    imagen: "https://i.imgur.com/SQjkk2Y.jpeg"
  },
  {
    id: 3,
    nombre: "Bolsa Lavanda",
    precio: 16500,
    imagen: "https://i.imgur.com/XVIESt1.jpeg"
  },
    {
    id: 4,
    nombre: "Bolsa Mujer",
    precio: 16500,
    imagen: "https://i.imgur.com/cU50TcN.jpeg"
  },
    {
    id: 5,
    nombre: "Bolsa 13",
    precio: 13000,
    imagen: "https://i.imgur.com/bqt47CU.jpeg"
  },
    {
    id: 6,
    nombre: "Bolsa Lluvia",
    precio: 14500,
    imagen: "TU-IMAGEN-JPG"
  },
    {
    id: 7,
    nombre: "Bolsa Frutis",
    precio: 15000,
    imagen: "TU-IMAGEN-JPG"
  },
     {
    id: 8,
    nombre: "Bolsa Patö",
    precio: 13000,
    imagen: "TU-IMAGEN-JPG"
  },
      {
    id: 9,
    nombre: "Bolsa Olivo",
    precio: 13000,
    imagen: "TU-IMAGEN-JPG"
  },
];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  productosData.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);

// VARIABLES GLOBALES
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenido');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
}

function agregarProducto(id) {
    const producto = productos.find((prod) => prod.id === id);
    const productoEnCarrito = carrito.find((prod) => prod.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
    guardarCarrito();
}

function eliminarProducto(id) {
    carrito = carrito.filter((producto) => producto.id !== id);
    actualizarCarrito();
    guardarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    contenedorCarrito.innerHTML = '';

    carrito.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Precio: $${producto.precio * producto.cantidad}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
    });

    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();  // sin argumentos
  actualizarCarrito();
});

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = ''; // limpiar antes de renderizar
  productosData.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}
