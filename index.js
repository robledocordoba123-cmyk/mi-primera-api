const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const usuarios = [
  { id: 1, nombre: 'Teo', rol: 'Cloud Engineer' },
  { id: 2, nombre: 'Ana', rol: 'Developer' },
];

// GET - Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json({ success: true, data: usuarios });
});

// GET - Obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  res.json({ success: true, data: usuario });
});

// POST - Crear un usuario
app.post('/usuarios', (req, res) => {
  const { nombre, rol } = req.body;
  const nuevo = { id: usuarios.length + 1, nombre, rol };
  usuarios.push(nuevo);
  res.status(201).json({ success: true, data: nuevo });
});

// PUT - Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  const { nombre, rol } = req.body;
  if (nombre) usuario.nombre = nombre;
  if (rol) usuario.rol = rol;
  res.json({ success: true, data: usuario });
});

// DELETE - Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
  const eliminado = usuarios.splice(index, 1);
  res.json({ success: true, data: eliminado });
});

app.listen(PORT, () => console.log('API arriba!'));