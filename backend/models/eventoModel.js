// 📁 models/eventoModel.js
const pool = require('../db/db');

class EventoModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM Eventos');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM Eventos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(evento) {
    const { nombre, fecha, lugar } = evento;
    const result = await pool.query(
      'INSERT INTO Eventos (nombre, fecha, lugar) VALUES ($1, $2, $3) RETURNING *',
      [nombre, fecha, lugar]
    );
    return result.rows[0];
  }

  static async update(id, evento) {
    const { nombre, fecha, lugar } = evento;
    const result = await pool.query(
      'UPDATE Eventos SET nombre = $1, fecha = $2, lugar = $3 WHERE id = $4 RETURNING *',
      [nombre, fecha, lugar, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM Eventos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = EventoModel;