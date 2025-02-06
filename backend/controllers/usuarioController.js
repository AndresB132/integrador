// 📁 controllers/usuarioController.js
const UsuarioModel = require('../models/usuarioModel');

exports.getAllUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

exports.getUsuarioById = async (req, res, next) => {
  try {
    const usuario = await UsuarioModel.getById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

exports.createUsuario = async (req, res, next) => {
  try {
    const usuario = req.body;
    const nuevoUsuario = await UsuarioModel.create(usuario);
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
};

exports.updateUsuario = async (req, res, next) => {
  try {
    const usuario = req.body;
    const updatedUsuario = await UsuarioModel.update(req.params.id, usuario);
    if (!updatedUsuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(updatedUsuario);
  } catch (err) {
    next(err);
  }
};

exports.deleteUsuario = async (req, res, next) => {
  try {
    const deletedUsuario = await UsuarioModel.delete(req.params.id);
    if (!deletedUsuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(deletedUsuario);
  } catch (err) {
    next(err);
  }
};