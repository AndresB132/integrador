// 📁 middleware/validator.js
const { body, validationResult } = require('express-validator');

exports.validateUsuario = [
  // Validar que el campo "nombre" no esté vacío
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),

  // Validar que el campo "email" sea un correo electrónico válido
  body('email').isEmail().withMessage('El email no es válido'),

  // Validar que el campo "telefono" no esté vacío
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),

  // Validar que el campo "rol" tenga un valor permitido
  body('rol').isIn(['admin', 'usuario', 'operador']).withMessage('Rol no válido'),

  // Función para manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];