const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    host: 'smtp.gmail.com', // Host do servidor SMTP
    port: 587, // Porta do SMTP (use 465 para SSL)
    secure: false, // Define como true para 465, false para 587
    auth: {
      user: process.env.EMAIL_USER, // E-mail do remetente
      pass: process.env.EMAIL_PASS, // Senha ou App Password
    },
};