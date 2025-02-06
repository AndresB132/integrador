// 📁 routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();

// Importar controladores
const usuarioController = require('../controllers/usuarioController');

// Importar middlewares de validación
const { validateUsuario } = require('../middleware/validator');

// Definir rutas para Usuarios

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario (con validación)
router.post('/agregar', validateUsuario, usuarioController.createUsuario);

// Actualizar un usuario existente
router.put('/:id', usuarioController.updateUsuario);

// Eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

// Exportar el router
module.exports = router;