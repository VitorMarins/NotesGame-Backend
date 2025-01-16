const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    host: 'smtp.gmail.com', // Host do servidor SMTP
    port: 587,              // Porta do SMTP (use 465 para SSL)
    secure: false,          // Define como true para 465, false para 587
    auth: {
      user: process.env.EMAIL_USER,               // E-mail do remetente
      acesstoken: process.env.EMAIL_ACCESS_TOKEN, // Token de acesso do e-mail
      clientId: process.env.EMAIL_CLIENT_ID,            // ID do aplicativo
      clientSecret: process.env.EMAIL_CLIENT_SECRET,    // Secret do aplicativo
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,    // Token de atualização do aplicativo
    },
};