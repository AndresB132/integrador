const puntosRecoleccionModel = require('../models/puntosRecoleccionModel');

const agregarPuntoRecoleccion = async (req, res) => {
  const { nombre, direccion, latitud, longitud } = req.body;

  console.log("Datos recibidos:", req.body); // Depuración

  // Validar que todos los campos sean obligatorios
  if (!nombre || !direccion || latitud === undefined || longitud === undefined) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios',
      details: 'Los campos requeridos son: nombre, direccion, latitud y longitud.',
    });
  }

  // Validar que las coordenadas sean números válidos
  if (isNaN(latitud) || isNaN(longitud)) {
    return res.status(400).json({
      error: 'Las coordenadas deben ser números válidos',
      details: 'Por favor, ingresa valores numéricos para latitud y longitud.',
    });
  }

  try {
    // Llamar al modelo para insertar el punto de recolección
    const nuevoPunto = await puntosRecoleccionModel.agregarPuntoRecoleccion(
      nombre, direccion, parseFloat(latitud), parseFloat(longitud)
    );

    // Verificar y responder con el punto de recolección recién creado
    if (nuevoPunto) {
      res.status(201).json(nuevoPunto);
    } else {
      throw new Error('No se pudo agregar el punto de recolección');
    }
  } catch (err) {
    console.error('❌ Error al agregar punto de recolección:', err.message);
    res.status(500).json({
      error: 'Error al agregar punto de recolección',
      details: err.message,
    });
  }
};

module.exports = {
  agregarPuntoRecoleccion,
};
