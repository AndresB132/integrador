// 📁 routes/reporteRoutes.js
const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/dispositivos', reporteController.getReporteDispositivos);

module.exports = router;