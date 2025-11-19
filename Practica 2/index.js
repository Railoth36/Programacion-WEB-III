// ============================================
// * PRÁCTICA 2 - INF-133 PROGRAMACIÓN WEB 3  *
// * Node.js + Express + MySQL                *
// ============================================

const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'practica2_db'
};

let pool;

async function initDatabase() {
  pool = mysql.createPool(dbConfig);
  console.log('Conexión a la base de datos establecida');
}

// ============================================
// * EJERCICIO 1: POST /categorias            *
// * Registrar una nueva categoría            *
// ============================================
app.post('/categorias', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const [result] = await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      id: result.insertId,
      nombre,
      descripcion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// * EJERCICIO 2: GET /categorias             *
// * Obtener todas las categorías             *
// ============================================
app.get('/categorias', async (req, res) => {
  try {
    const [categorias] = await pool.query('SELECT * FROM categorias');
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// * EJERCICIO 3: GET /categorias/:id         *
// * Obtener una categoría con sus productos  *
// ============================================
app.get('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [categorias] = await pool.query(
      'SELECT * FROM categorias WHERE id = ?',
      [id]
    );

    if (categorias.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    const [productos] = await pool.query(
      'SELECT * FROM productos WHERE categoria_id = ?',
      [id]
    );

    res.json({
      ...categorias[0],
      productos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// * EJERCICIO 4: PUT /categorias/:id         *
// * Actualizar una categoría completa        *
// ============================================
app.put('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const [result] = await pool.query(
      'UPDATE categorias SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
      [nombre, descripcion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({
      message: 'Categoría actualizada exitosamente',
      id,
      nombre,
      descripcion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================================================
// * EJERCICIO 5: DELETE /categorias/:id          *
// * Eliminar categoría y sus productos (CASCADE) *
// ================================================
app.delete('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM categorias WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({
      message: 'Categoría y productos asociados eliminados exitosamente',
      id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// * EJERCICIO 6: POST /productos             *
// * Registrar un nuevo producto              *
// ============================================
app.post('/productos', async (req, res) => {
  try {
    const { nombre, precio, stock, categoria_id } = req.body;

    if (!nombre || !precio || stock === undefined || !categoria_id) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: nombre, precio, stock, categoria_id' 
      });
    }

    const [categorias] = await pool.query(
      'SELECT id FROM categorias WHERE id = ?',
      [categoria_id]
    );

    if (categorias.length === 0) {
      return res.status(404).json({ error: 'La categoría especificada no existe' });
    }

    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
      [nombre, precio, stock, categoria_id]
    );

    res.status(201).json({
      message: 'Producto creado exitosamente',
      id: result.insertId,
      nombre,
      precio,
      stock,
      categoria_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================================
// * EJERCICIO 7: GET /productos                          *
// * Obtener todos los productos con nombre de categoría  *
// ========================================================
app.get('/productos', async (req, res) => {
  try {
    const [productos] = await pool.query(`
      SELECT 
        p.id,
        p.nombre,
        p.precio,
        p.stock,
        p.categoria_id,
        c.nombre as categoria_nombre,
        p.fecha_alta,
        p.fecha_act
      FROM productos p
      INNER JOIN categorias c ON p.categoria_id = c.id
    `);

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================================================
// * EJERCICIO 8: GET /productos/:id                    *
// * Obtener un producto por ID con nombre de categoría *
// ======================================================
app.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [productos] = await pool.query(`
      SELECT 
        p.id,
        p.nombre,
        p.precio,
        p.stock,
        p.categoria_id,
        c.nombre as categoria_nombre,
        p.fecha_alta,
        p.fecha_act
      FROM productos p
      INNER JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = ?
    `, [id]);

    if (productos.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productos[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// * EJERCICIO 9: PUT /productos/:id          *
// * Actualizar un producto completo          *
// ============================================
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, categoria_id } = req.body;

    if (!nombre || !precio || stock === undefined || !categoria_id) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos: nombre, precio, stock, categoria_id' 
      });
    }

    const [categorias] = await pool.query(
      'SELECT id FROM categorias WHERE id = ?',
      [categoria_id]
    );

    if (categorias.length === 0) {
      return res.status(404).json({ error: 'La categoría especificada no existe' });
    }

    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
      [nombre, precio, stock, categoria_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      message: 'Producto actualizado exitosamente',
      id,
      nombre,
      precio,
      stock,
      categoria_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ======================================================
// * EJERCICIO 10: PATCH /productos/:id/stock           *
// * Incrementar o decrementar el stock de un producto  *
// ======================================================
app.patch('/productos/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    if (cantidad === undefined) {
      return res.status(400).json({ 
        error: 'El campo cantidad es requerido (puede ser positivo o negativo)' 
      });
    }

    const [productos] = await pool.query(
      'SELECT stock FROM productos WHERE id = ?',
      [id]
    );

    if (productos.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const nuevoStock = productos[0].stock + cantidad;

    if (nuevoStock < 0) {
      return res.status(400).json({ 
        error: 'El stock no puede ser negativo',
        stock_actual: productos[0].stock,
        cantidad_solicitada: cantidad
      });
    }

    await pool.query(
      'UPDATE productos SET stock = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
      [nuevoStock, id]
    );

    res.json({
      message: 'Stock actualizado exitosamente',
      id,
      stock_anterior: productos[0].stock,
      cantidad_modificada: cantidad,
      stock_actual: nuevoStock
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error al inicializar la base de datos:', error);
});