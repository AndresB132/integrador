// 📁 controllers/ubicacionController.js
const UbicacionModel = require('../models/ubicacionModel');

exports.getAllUbicaciones = async (req, res, next) => {
  try {
    const ubicaciones = await UbicacionModel.getAll();
    res.json(ubicaciones);
  } catch (err) {
    next(err);
  }
};

exports.getUbicacionById = async (req, res, next) => {
  try {
    const ubicacion = await UbicacionModel.getById(req.params.id);
    if (!ubicacion) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json(ubicacion);
  } catch (err) {
    next(err);
  }
};

exports.createUbicacion = async (req, res, next) => {
  try {
    const ubicacion = req.body;
    const nuevaUbicacion = await UbicacionModel.create(ubicacion);
    res.status(201).json(nuevaUbicacion);
  } catch (err) {
    next(err);
  }
};

exports.updateUbicacion = async (req, res, next) => {
  try {
    const ubicacion = req.body;
    const updatedUbicacion = await UbicacionModel.update(req.params.id, ubicacion);
    if (!updatedUbicacion) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json(updatedUbicacion);
  } catch (err) {
    next(err);
  }
};

exports.deleteUbicacion = async (req, res, next) => {
  try {
    const deletedUbicacion = await UbicacionModel.delete(req.params.id);
    if (!deletedUbicacion) return res.status(404).json({ error: 'Ubicación no encontrada' });
    res.json(deletedUbicacion);
  } catch (err) {
    next(err);
  }
};