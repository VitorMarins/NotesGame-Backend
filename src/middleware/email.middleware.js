const nodemailer = require('nodemailer');
const config = require('../config/email');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  config.auth.clientId,
  config.auth.clientSecret,
  'https://developers.google.com/oauthplayground'
);

oAuth2Client.setCredentials({ refresh_token: config.auth.refreshToken });

// Função para enviar e-mail
async function sendEmail({ to, subject, text, html }) {
  try {
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    // Configuração do transporte
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        type: "OAuth2",
        user: config.auth.user,
        clientId: config.auth.clientId,
        clientSecret: config.auth.clientSecret,
        refreshToken: config.auth.refreshToken,
        accessToken: ACCESS_TOKEN,
      },
    });

    // Configuração do e-mail
    const mailOptions = {
      from: config.auth.user,       // Remetente
      to,                           // Destinatário(s)
      subject,                      // Assunto
      text,                         // Corpo do e-mail em texto
      html,                         // Corpo do e-mail em HTML (opcional)
    };

    // Envia o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, error: error.message };
  }
}

module.exports = sendEmail;