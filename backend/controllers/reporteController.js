// 📁 controllers/reporteController.js
const pool = require('../db/db');

exports.getReporteDispositivos = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM Reporte_Dispositivos_Estadisticas');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};