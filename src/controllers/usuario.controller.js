const Usuario = require('../models/usuario.model');

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate('carrinho');
        res.status(200).json(usuarios);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).populate('carrinho');
        res.status(200).json(usuario);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario não encontrado.' });
        }
        res.json(usuario);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUsuario = async (req, res) => {
    try {
      await Usuario.findByIdAndDelete(req.params.id);
      res.json({ message: 'Usuario apagado.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};