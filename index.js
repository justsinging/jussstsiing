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
