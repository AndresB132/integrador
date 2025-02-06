const pool = require('../db/db');

const agregarPuntoRecoleccion = async (nombre, direccion, latitud, longitud) => {
  try {
    const result = await pool.query(
      'INSERT INTO PuntosRecoleccion (nombre, direccion, latitud, longitud) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, direccion, latitud, longitud]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  agregarPuntoRecoleccion,
};
