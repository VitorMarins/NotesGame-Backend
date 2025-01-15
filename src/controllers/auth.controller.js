const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const config = require('../config/jwt');
const sendEmail = require('../middleware/email.middleware');

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
    const token = jwt.sign({ id: usuario._id, nome: usuario.nome }, config.secret);
    const Data = new Date();
    await sendEmail({
      to: email,
      subject: 'Novo login no Notesgame',
      text: `Identificamos um novo login, ${usuario.nome}. Data e hora: ${Data}`,
      html: `
      <h2 style='color: black'>Identificamos um novo login, ${usuario.nome}.</h2>
      <p style='font-size: 15px; color: black'>
      Data e hora: ${Data.toString()}.<br/>Se foi você quem fez isso, não se preocupe.
      Caso não reconheça o acesso, recomendamos que altere sua senha.
      <br/>Para isso acesse sua conta e clique em Segurança da conta/Alterar senha.
      <br/>Nunca informe seus dados de acesso para outra pessoa.
      <br/>Este é um e-mail automático. Não é necessário respondê-lo.
      </p>`,
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
