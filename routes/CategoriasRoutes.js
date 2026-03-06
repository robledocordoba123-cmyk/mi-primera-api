const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM categorias', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, mensaje: err.message });
    res.json({ success: true, datos: rows });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Categoría no encontrada' });
    res.json({ success: true, datos: row });
  });
});

router.post('/', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ success: false, mensaje: 'nombre es obligatorio' });
  }

  db.get('SELECT id FROM categorias WHERE nombre = ?', [nombre], (err, row) => {
    if (row) return res.status(400).json({ success: false, mensaje: 'Esa categoría ya existe' });

    db.run('INSERT INTO categorias (nombre) VALUES (?)', [nombre], function(err) {
      if (err) return res.status(500).json({ success: false, mensaje: err.message });
      res.status(201).json({ success: true, mensaje: 'Categoría creada', id: this.lastID });
    });
  });
});

router.put('/:id', (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ success: false, mensaje: 'nombre es obligatorio' });
  }

  db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Categoría no encontrada' });

    db.run('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, req.params.id], function(err) {
      if (err) return res.status(500).json({ success: false, mensaje: err.message });
      res.json({ success: true, mensaje: 'Categoría actualizada' });
    });
  });
});

router.delete('/:id', (req, res) => {
  db.get('SELECT * FROM categorias WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Categoría no encontrada' });

    db.run('DELETE FROM categorias WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ success: false, mensaje: err.message });
      res.json({ success: true, mensaje: 'Categoría eliminada' });
    });
  });
});

module.exports = router;