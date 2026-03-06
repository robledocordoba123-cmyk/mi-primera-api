const express = require('express');
const app     = express();
const PORT    = 3000;

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});