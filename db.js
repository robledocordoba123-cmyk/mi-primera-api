const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
  } else {
    console.log('✅ Base de datos conectada');
  }
});

db.run('PRAGMA foreign_keys = ON');

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre    TEXT    NOT NULL,
      email     TEXT    NOT NULL UNIQUE,
      rol       TEXT    NOT NULL DEFAULT 'cliente'
    )
  `, (err) => {
    if (err) console.error('Error tabla usuarios:', err.message);
    else console.log('✅ Tabla usuarios lista');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS categorias (
      id     INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT    NOT NULL UNIQUE
    )
  `, (err) => {
    if (err) console.error('Error tabla categorias:', err.message);
    else console.log('✅ Tabla categorias lista');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre      TEXT    NOT NULL,
      precio      REAL    NOT NULL CHECK(precio > 0),
      stock       INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
      categoriaId INTEGER NOT NULL,
      activo      INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (categoriaId) REFERENCES categorias(id)
    )
  `, (err) => {
    if (err) console.error('Error tabla productos:', err.message);
    else console.log('✅ Tabla productos lista');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      usuarioId INTEGER NOT NULL,
      total     REAL    NOT NULL DEFAULT 0,
      estado    TEXT    NOT NULL DEFAULT 'pendiente',
      fecha     DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuarioId) REFERENCES usuarios(id)
    )
  `, (err) => {
    if (err) console.error('Error tabla pedidos:', err.message);
    else console.log('✅ Tabla pedidos lista');
  });

});

module.exports = db;