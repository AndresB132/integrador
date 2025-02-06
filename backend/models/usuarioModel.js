// 📁 models/usuarioModel.js
const pool = require('../db/db'); // Asegúrate de que la ruta sea correcta

class UsuarioModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM Usuarios');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM Usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(usuario) {
    const { nombre, email, telefono, rol } = usuario;
    const result = await pool.query(
      'INSERT INTO Usuarios (nombre, email, telefono, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, telefono, rol]
    );
    return result.rows[0];
  }

  static async update(id, usuario) {
    const { nombre, email, telefono, rol } = usuario;
    const result = await pool.query(
      'UPDATE Usuarios SET nombre = $1, email = $2, telefono = $3, rol = $4 WHERE id = $5 RETURNING *',
      [nombre, email, telefono, rol, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM Usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = UsuarioModel;