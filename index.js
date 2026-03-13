require('dotenv').config(); // ← NUEVO: activa el archivo .env

const express = require('express');
const app     = express();

app.use(express.json());

// Middleware de autenticación ← NUEVO: protege todos los endpoints
app.use((req, res, next) => {
  const password = req.headers['password'];
  if (!password) {
    return res.status(401).json({ success: false, message: 'Password requerida' });
  }
  if (password !== process.env.API_PASSWORD) {
    return res.status(403).json({ success: false, message: 'Password incorrecta' });
  }
  next();
});

const usuariosRoutes   = require('./routes/UsuariosRoutes');
const productosRoutes  = require('./routes/ProductosRoutes');
const categoriasRoutes = require('./routes/CategoriasRoutes');
const pedidosRoutes    = require('./routes/PedidosRoutes');

app.use('/api/usuarios',   usuariosRoutes);
app.use('/api/productos',  productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/pedidos',    pedidosRoutes);

app.get('/', (req, res) => {
  res.json({
    mensaje: '🛒 API Tienda Virtual funcionando',
    rutas: [
      'GET  /api/usuarios',
      'POST /api/usuarios',
      'GET  /api/productos',
      'POST /api/productos',
      'GET  /api/categorias',
      'POST /api/categorias',
      'GET  /api/pedidos',
      'POST /api/pedidos'
    ]
  });
});

// ← CAMBIO: el puerto ahora lo lee del .env, si no existe usa 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});