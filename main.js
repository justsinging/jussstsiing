const mp = new MercadoPago('TU_CLAVE_PUBLICA', { locale: 'es-AR' });

document.addEventListener('DOMContentLoaded', () => {
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
});
