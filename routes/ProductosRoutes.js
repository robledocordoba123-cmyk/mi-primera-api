const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM productos', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, mensaje: err.message });
    res.json({ success: true, datos: rows });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Producto no encontrado' });
    res.json({ success: true, datos: row });
  });
});

router.post('/', (req, res) => {
  const { nombre, precio, stock, categoriaId } = req.body;

  if (!nombre || !precio || !categoriaId) {
    return res.status(400).json({ success: false, mensaje: 'nombre, precio y categoriaId son obligatorios' });
  }

  if (isNaN(precio) || precio <= 0) {
    return res.status(400).json({ success: false, mensaje: 'precio debe ser un número mayor a 0' });
  }

  if (stock !== undefined && (!Number.isInteger(Number(stock)) || stock < 0)) {
    return res.status(400).json({ success: false, mensaje: 'stock debe ser un entero mayor o igual a 0' });
  }

  db.get('SELECT id FROM categorias WHERE id = ?', [categoriaId], (err, row) => {
    if (!row) return res.status(400).json({ success: false, mensaje: 'Esa categoría no existe' });

    db.run(
      'INSERT INTO productos (nombre, precio, stock, categoriaId) VALUES (?, ?, ?, ?)',
      [nombre, precio, stock || 0, categoriaId],
      function(err) {
        if (err) return res.status(500).json({ success: false, mensaje: err.message });
        res.status(201).json({ success: true, mensaje: 'Producto creado', id: this.lastID });
      }
    );
  });
});

router.put('/:id', (req, res) => {
  const { nombre, precio, stock } = req.body;

  if (!nombre && !precio && stock === undefined) {
    return res.status(400).json({ success: false, mensaje: 'Envía al menos un campo para actualizar' });
  }

  if (precio !== undefined && (isNaN(precio) || precio <= 0)) {
    return res.status(400).json({ success: false, mensaje: 'precio debe ser mayor a 0' });
  }

  db.get('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Producto no encontrado' });

    const nuevoNombre = nombre !== undefined ? nombre : row.nombre;
    const nuevoPrecio = precio !== undefined ? precio : row.precio;
    const nuevoStock  = stock  !== undefined ? stock  : row.stock;

    db.run(
      'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
      [nuevoNombre, nuevoPrecio, nuevoStock, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ success: false, mensaje: err.message });
        res.json({ success: true, mensaje: 'Producto actualizado' });
      }
    );
  });
});

router.delete('/:id', (req, res) => {
  db.get('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Producto no encontrado' });

    db.run('DELETE FROM productos WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ success: false, mensaje: err.message });
      res.json({ success: true, mensaje: 'Producto eliminado' });
    });
  });
});

module.exports = router;