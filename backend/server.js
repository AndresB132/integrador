const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuración de PostgreSQL
const pool = new Pool({
  user: 'postgres', // Reemplaza con tu usuario de PostgreSQL
  host: 'localhost',
  database: 'proyecto', // Reemplaza con tu BD
  password: 'Jkanime123', // Reemplaza con tu contraseña
  port: 5432,
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// 📌 Rutas para Usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err.message);
    res.status(500).json({ error: 'Error al obtener usuarios', details: err.message });
  }
});

app.post('/api/usuarios/agregar', async (req, res) => {
  const { nombre, email, telefono, rol } = req.body;
  if (!nombre || !email || !telefono || !rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO Usuarios (nombre, email, telefono, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, telefono, rol]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al agregar usuario:', err.message);
    res.status(500).json({ error: 'Error al agregar usuario', details: err.message });
  }
});

// 📌 Rutas para Ubicaciones
app.get('/api/ubicaciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Ubicaciones');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener ubicaciones:', err.message);
    res.status(500).json({ error: 'Error al obtener ubicaciones', details: err.message });
  }
});

app.post('/api/ubicaciones/agregar', async (req, res) => {
  const { nombre, direccion, ciudad } = req.body;
  if (!nombre || !direccion || !ciudad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO Ubicaciones (nombre, direccion, ciudad) VALUES ($1, $2, $3) RETURNING *',
      [nombre, direccion, ciudad]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al agregar ubicación:', err.message);
    res.status(500).json({ error: 'Error al agregar ubicación', details: err.message });
  }
});

// 📌 Rutas para Puntos de Recolección
app.get('/api/puntos-recoleccion', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM PuntosRecoleccion');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener puntos de recolección:', err.message);
    res.status(500).json({ error: 'Error al obtener puntos de recolección', details: err.message });
  }
});

app.post('/api/puntos-recoleccion/agregar', async (req, res) => {
  const { nombre, ubicacion_id, horario } = req.body;
  if (!nombre || !ubicacion_id || !horario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO PuntosRecoleccion (nombre, ubicacion_id, horario) VALUES ($1, $2, $3) RETURNING *',
      [nombre, ubicacion_id, horario]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al agregar punto de recolección:', err.message);
    res.status(500).json({ error: 'Error al agregar punto de recolección', details: err.message });
  }
});

// 📌 Rutas para Eventos
app.get('/api/eventos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Eventos');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener eventos:', err.message);
    res.status(500).json({ error: 'Error al obtener eventos', details: err.message });
  }
});

app.post('/api/eventos/agregar', async (req, res) => {
  const { nombre, fecha, lugar } = req.body;
  if (!nombre || !fecha || !lugar) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO Eventos (nombre, fecha, lugar) VALUES ($1, $2, $3) RETURNING *',
      [nombre, fecha, lugar]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al agregar evento:', err.message);
    res.status(500).json({ error: 'Error al agregar evento', details: err.message });
  }
});

// 📌 Rutas para Dispositivos
app.get('/api/dispositivos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Dispositivos');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener dispositivos:', err.message);
    res.status(500).json({ error: 'Error al obtener dispositivos', details: err.message });
  }
});

app.post('/api/dispositivos/agregar', async (req, res) => {
  const { tipo, marca, modelo, estado, usuario_id } = req.body;
  if (!tipo || !marca || !modelo || !estado || !usuario_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO Dispositivos (tipo, marca, modelo, estado, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tipo, marca, modelo, estado, usuario_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al agregar dispositivo:', err.message);
    res.status(500).json({ error: 'Error al agregar dispositivo', details: err.message });
  }
});

// 📌 Rutas para Agregar Dispositivos
app.get('/api/agregar-dispositivos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM AgregarDispositivos');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener registros de dispositivos:', err.message);
    res.status(500).json({ error: 'Error al obtener registros de dispositivos', details: err.message });
  }
});

app.post('/api/agregar-dispositivos', async (req, res) => {
  const { dispositivo_id, ubicacion_id } = req.body;
  if (!dispositivo_id || !ubicacion_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO AgregarDispositivos (dispositivo_id, ubicacion_id) VALUES ($1, $2) RETURNING *',
      [dispositivo_id, ubicacion_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error al agregar dispositivo a ubicación:', err.message);
    res.status(500).json({ error: 'Error al agregar dispositivo a ubicación', details: err.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor backend en http://localhost:${port}`);
});