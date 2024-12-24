const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const config = require('../config/jwt');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Nenhum token, autorização negada' });
  }

  // Extrair o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Nenhum token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.usuario = await Usuario.findById(decoded.id);
    if (!req.usuario) {
      return res.status(401).json({ message: 'Usuario não encontrado, autorização negada' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token não é valido' });
  }
};
