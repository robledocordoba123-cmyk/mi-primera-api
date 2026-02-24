const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const UsuariosRoutes = require('./usuarios/UsuariosRoutes');
const ProductosRoutes = require('./productos/ProductosRoutes');

app.use(UsuariosRoutes);
app.use(ProductosRoutes);

app.listen(PORT, () => console.log('API arriba!'));