require('dotenv').config();
const express = require('express');
const app = express();
const port = 3300;
const cors = require('cors');

// Configuración de CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim()).concat([
  'http://localhost:4300',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:3300'
]);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

// Manejar preflight requests
app.options('*', cors());
app.use(express.json()); // Parsear JSON en el body

const recordRouter = require('./src/routes/recordsRoutes');
const formularioPedidoRouter = require('./src/routes/formularioPedidoRoutes');
const listaPedidosRouter = require('./src/routes/listaPedidosRoutes');

// Rutas
app.use('/api', recordRouter);
app.use('/api', formularioPedidoRouter);
app.use('/api', listaPedidosRouter);

// Ruta de prueba
app.get('/test', function(req, res) {
  res.send('El back esta desplegado');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});