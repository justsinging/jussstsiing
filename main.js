<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Mi Tienda</title>
  <script src="https://sdk.mercadopago.com/js/v2"></script>
</head>
<body>
  <button id="btn-pagar">Pagar</button>

  <script>
    const mp = new MercadoPago('TU_CLAVE_PUBLICA', { locale: 'es-AR' });

    document.getElementById('btn-pagar').addEventListener('click', () => {
      fetch('https://tu-backend.com/crear-preferencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              title: 'Tote bag diseño 1',
              quantity: 1,
              unit_price: 5000
            }
          ]
        })
      })
      .then(res => res.json())
      .then(data => {
        mp.checkout({
          preference: {
            id: data.id
          },
          autoOpen: true
        });
      })
      .catch(error => {
        console.error('Error al crear preferencia:', error);
      });
    });
  </script>
</body>
</html>
