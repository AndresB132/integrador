// 📁 models/ubicacionModel.js
const pool = require('../db/db');

class UbicacionModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM Ubicaciones');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM Ubicaciones WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(ubicacion) {
    const { nombre, direccion, ciudad } = ubicacion;
    const result = await pool.query(
      'INSERT INTO Ubicaciones (nombre, direccion, ciudad) VALUES ($1, $2, $3) RETURNING *',
      [nombre, direccion, ciudad]
    );
    return result.rows[0];
  }

  static async update(id, ubicacion) {
    const { nombre, direccion, ciudad } = ubicacion;
    const result = await pool.query(
      'UPDATE Ubicaciones SET nombre = $1, direccion = $2, ciudad = $3 WHERE id = $4 RETURNING *',
      [nombre, direccion, ciudad, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM Ubicaciones WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = UbicacionModel;