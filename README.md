# 🛒 API Tienda Virtual

API REST desarrollada con Node.js, Express y SQLite3.  
Proyecto de la asignatura Análisis y Desarrollo de Software — SENA.

---

## 📦 Tecnologías usadas

- Node.js
- Express
- SQLite3

---

## 🗂️ Estructura del proyecto
```
NODEJS/
├── routes/
│   ├── UsuariosRoutes.js
│   ├── ProductosRoutes.js
│   ├── CategoriasRoutes.js
│   └── PedidosRoutes.js
├── db.js
├── index.js
└── package.json
```

---

## 🔗 Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/usuarios | Ver todos los usuarios |
| POST | /api/usuarios | Crear usuario |
| PUT | /api/usuarios/:id | Actualizar usuario |
| DELETE | /api/usuarios/:id | Eliminar usuario |
| GET | /api/categorias | Ver todas las categorías |
| POST | /api/categorias | Crear categoría |
| PUT | /api/categorias/:id | Actualizar categoría |
| DELETE | /api/categorias/:id | Eliminar categoría |
| GET | /api/productos | Ver todos los productos |
| POST | /api/productos | Crear producto |
| PUT | /api/productos/:id | Actualizar producto |
| DELETE | /api/productos/:id | Eliminar producto |
| GET | /api/pedidos | Ver todos los pedidos |
| POST | /api/pedidos | Crear pedido |
| PUT | /api/pedidos/:id | Actualizar pedido |
| DELETE | /api/pedidos/:id | Eliminar pedido |

---

## 🗃️ Diagrama ER

![Diagrama ER](diagrama-er.png)

---

## ▶️ Cómo ejecutar
```bash
npm install
node index.js
```

El servidor corre en: http://localhost:3000