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
