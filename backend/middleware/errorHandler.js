// 📁 middleware/errorHandler.js

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
    // Log del error en la consola para depuración
    console.error('❌ Error:', err.message);
  
    // Determinar el código de estado HTTP
    const statusCode = err.status || 500;
  
    // Construir la respuesta de error
    const errorResponse = {
      error: err.message || 'Error interno del servidor',
      details: err.details || null,
    };
  
    // Enviar la respuesta al cliente
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;