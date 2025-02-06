// 📁 controllers/dispositivoController.js
const DispositivoModel = require('../models/dispositivoModel');

exports.getAllDispositivos = async (req, res, next) => {
  try {
    const dispositivos = await DispositivoModel.getAll();
    res.json(dispositivos);
  } catch (err) {
    next(err);
  }
};

exports.getDispositivoById = async (req, res, next) => {
  try {
    const dispositivo = await DispositivoModel.getById(req.params.id);
    if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    res.json(dispositivo);
  } catch (err) {
    next(err);
  }
};

exports.createDispositivo = async (req, res, next) => {
  try {
    const dispositivo = req.body;
    const nuevoDispositivo = await DispositivoModel.create(dispositivo);
    res.status(201).json(nuevoDispositivo);
  } catch (err) {
    next(err);
  }
};

exports.updateDispositivo = async (req, res, next) => {
  try {
    const dispositivo = req.body;
    const updatedDispositivo = await DispositivoModel.update(req.params.id, dispositivo);
    if (!updatedDispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    res.json(updatedDispositivo);
  } catch (err) {
    next(err);
  }
};

exports.deleteDispositivo = async (req, res, next) => {
  try {
    const deletedDispositivo = await DispositivoModel.delete(req.params.id);
    if (!deletedDispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    res.json(deletedDispositivo);
  } catch (err) {
    next(err);
  }
};