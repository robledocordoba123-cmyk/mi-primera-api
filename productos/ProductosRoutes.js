const express = require('express');
const router = express.Router();

const productos = [
    { id: 1, nombre: 'Pc', precio: 2000, descripcion: 'Computadora de escritorio', stock: 10 },
    { id: 2, nombre: 'Laptop', precio: 3000, descripcion: 'Computadora portatil', stock: 5 },
    { id: 3, nombre: 'Mouse', precio: 50, descripcion: 'Mouse inalambrico', stock: 20 },
];

router.get('/productos', (req, res) => {
    res.json({ success: true, data: productos });
});

router.get('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json({ success: true, data: producto });
});

module.exports = router;