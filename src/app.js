const express = require('express');
const routes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>LOGISTPULSE</title></head>
      <body style="font-family: sans-serif; padding: 2rem;">
        <h1>LOGISTPULSE - Gestión Logística</h1>
        <p>Estado del servicio: <strong>Activo</strong></p>
        <p>Probar endpoint de salud: <a href="/health">/health</a></p>
      </body>
    </html>
  `);
});

app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`LOGISTPULSE corriendo en puerto ${PORT}`);
});
