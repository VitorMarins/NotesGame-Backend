const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const config = require('../config/jwt');
const messages = require('../config/messages');
const sendEmail = require('../middleware/email.middleware');

exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, foto } = req.body;
    const usuario = new Usuario({ nome, email, senha, foto });
    await usuario.save();
    await sendEmail({
      to: email,
      subject: 'Novo Conta no Notesgame',
      text: `Bem-vindo ao Notesgame, ${usuario.nome}. Data e hora: ${Data}`,
      html: messages.mensagemCadastro,
    });
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
    const token = jwt.sign({ id: usuario._id, nome: usuario.nome }, config.secret);
    await sendEmail({
      to: email,
      subject: 'Novo login no Notesgame',
      text: `Identificamos um novo login, ${usuario.nome}. Data e hora: ${Data}`,
      html: messages.mensagemLogin,
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
