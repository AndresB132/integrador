// 📁 routes/ubicacionRoutes.js
const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');

router.get('/', ubicacionController.getAllUbicaciones);
router.get('/:id', ubicacionController.getUbicacionById);
router.post('/agregar', ubicacionController.createUbicacion);
router.put('/:id', ubicacionController.updateUbicacion);
router.delete('/:id', ubicacionController.deleteUbicacion);

module.exports = router;