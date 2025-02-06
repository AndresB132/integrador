const express = require('express');
const router = express.Router();
const puntosRecoleccionController = require('../controllers/puntosRecoleccionController');

// Ruta POST para agregar un nuevo punto de recolección
router.post('/agregar', puntosRecoleccionController.agregarPuntoRecoleccion);

module.exports = router;
