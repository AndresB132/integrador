// 📁 controllers/eventoController.js
const EventoModel = require('../models/eventoModel');

exports.getAllEventos = async (req, res, next) => {
  try {
    const eventos = await EventoModel.getAll();
    res.json(eventos);
  } catch (err) {
    next(err);
  }
};

exports.getEventoById = async (req, res, next) => {
  try {
    const evento = await EventoModel.getById(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(evento);
  } catch (err) {
    next(err);
  }
};

exports.createEvento = async (req, res, next) => {
  try {
    const evento = req.body;
    const nuevoEvento = await EventoModel.create(evento);
    res.status(201).json(nuevoEvento);
  } catch (err) {
    next(err);
  }
};

exports.updateEvento = async (req, res, next) => {
  try {
    const evento = req.body;
    const updatedEvento = await EventoModel.update(req.params.id, evento);
    if (!updatedEvento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(updatedEvento);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvento = async (req, res, next) => {
  try {
    const deletedEvento = await EventoModel.delete(req.params.id);
    if (!deletedEvento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(deletedEvento);
  } catch (err) {
    next(err);
  }
};