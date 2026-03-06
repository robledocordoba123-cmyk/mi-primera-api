const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, mensaje: err.message });
    res.json({ success: true, datos: rows });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, row) => {
    if (err)  return res.status(500).json({ success: false, mensaje: err.message });
    if (!row) return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });
    res.json({ success: true, datos: row });
  });
});

router.post('/', (req, res) => {
  const { nombre, email, rol } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ success: false, mensaje: 'nombre y email son obligatorios' });
  }

  db.get('SELECT id FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (row) return res.status(400).json({ success: false, mensaje: 'Ese email ya está registrado' });

    db.run(
      'INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)',
      [nombre, email, rol || 'cliente'],
      function(err) {
        if (err) return res.status(500).json({ success: false, mensaje: err.message });
        res.status(201).json({ success: true, mensaje: 'Usuario creado', id: this.lastID });
      }
    );
  });
});

router.put('/:id', (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre && !email) {
    return res.status(400).json({ success: false, mensaje: 'Envía nombre o email para actualizar' });
  }

  db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });

    const nuevoNombre = nombre || row.nombre;
    const nuevoEmail  = email  || row.email;

    db.run(
      'UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?',
      [nuevoNombre, nuevoEmail, req.params.id],
      function(err) {
        if (err) return res.status(500).json({ success: false, mensaje: err.message });
        res.json({ success: true, mensaje: 'Usuario actualizado' });
      }
    );
  });
});

router.delete('/:id', (req, res) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ success: false, mensaje: 'Usuario no encontrado' });

    db.run('DELETE FROM usuarios WHERE id = ?', [req.params.id], function(err) {
      if (err) return res.status(500).json({ success: false, mensaje: err.message });
      res.json({ success: true, mensaje: 'Usuario eliminado' });
    });
  });
});

module.exports = router;