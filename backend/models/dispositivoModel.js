// 📁 models/dispositivoModel.js
const pool = require('../db/db');

class DispositivoModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM Dispositivos');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM Dispositivos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(dispositivo) {
    const { tipo, marca, modelo, estado, usuario_id } = dispositivo;
    const result = await pool.query(
      'INSERT INTO Dispositivos (tipo, marca, modelo, estado, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tipo, marca, modelo, estado, usuario_id]
    );
    return result.rows[0];
  }

  static async update(id, dispositivo) {
    const { tipo, marca, modelo, estado, usuario_id } = dispositivo;
    const result = await pool.query(
      'UPDATE Dispositivos SET tipo = $1, marca = $2, modelo = $3, estado = $4, usuario_id = $5 WHERE id = $6 RETURNING *',
      [tipo, marca, modelo, estado, usuario_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM Dispositivos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = DispositivoModel;