const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const config = require('../config/jwt');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, foto } = req.body;
    const usuario = new Usuario({ nome, email, senha, foto });
    await usuario.save();
    res.status(201).json({ message: 'Usuario registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email: email });
    if (!usuario || !(await usuario.compareSenha(senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, config.secret, { expiresIn: '3h' });
    res.json({ token, userId: usuario._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};