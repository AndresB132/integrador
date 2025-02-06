// 📁 routes/dispositivoRoutes.js
const express = require('express');
const router = express.Router();
const dispositivoController = require('../controllers/dispositivoController');

router.get('/', dispositivoController.getAllDispositivos);
router.get('/:id', dispositivoController.getDispositivoById);
router.post('/agregar', dispositivoController.createDispositivo);
router.put('/:id', dispositivoController.updateDispositivo);
router.delete('/:id', dispositivoController.deleteDispositivo);

module.exports = router;