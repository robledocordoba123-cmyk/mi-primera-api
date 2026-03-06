const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM pedidos', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, mensaje: err.message });
    res.json({ success: true, datos: rows });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM pedidos WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Pedido no encontrado' });
    res.json({ success: true, datos: row });
  });
});

router.post('/', (req, res) => {
  const { usuarioId, total } = req.body;

  if (!usuarioId || !total) {
    return res.status(400).json({ success: false, mensaje: 'usuarioId y total son obligatorios' });
  }

  if (isNaN(total) || total <= 0) {
    return res.status(400).json({ success: false, mensaje: 'total debe ser un número mayor a 0' });
  }

  db.get('SELECT id FROM usuarios WHERE id = ?', [usuarioId], (err, row) => {
    if (!row) return res.status(400).json({ success: false, mensaje: 'Ese usuario no existe' });

    db.run(
      'INSERT INTO pedidos (usuarioId, total) VALUES (?, ?)',
      [usuarioId, total],
      function(err) {
        if (err) return res.status(500).json({ success: false, mensaje: err.message });
        res.status(201).json({ success: true, mensaje: 'Pedido creado', id: this.lastID });
      }
    );
  });
});

router.put('/:id', (req, res) => {
  const { estado, total } = req.body;

  if (!estado && !total) {
    return res.status(400).json({ success: false, mensaje: 'Envía estado o total para actualizar' });
  }

  db.get('SELECT * FROM pedidos WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Pedido no encontrado' });

    const nuevoEstado = estado !== undefined ? estado : row.estado;
    const nuevoTotal  = total  !== undefined ? total  : row.total;

    db.run(
      'UPDATE pedidos SET estado = ?, total = ? WHERE id = ?',
      [nuevoEstado, nuevoTotal, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ success: false, mensaje: err.message });
        res.json({ success: true, mensaje: 'Pedido actualizado' });
      }
    );
  });
});

router.delete('/:id', (req, res) => {
  db.get('SELECT * FROM pedidos WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Pedido no encontrado' });

    db.run('DELETE FROM pedidos WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ success: false, mensaje: err.message });
      res.json({ success: true, mensaje: 'Pedido eliminado' });
    });
  });
});

module.exports = router;