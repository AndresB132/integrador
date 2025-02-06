// 📁 controllers/auditoriaController.js
const pool = require('../db/db');

exports.getAuditoria = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Auditoria ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};