const nodemailer = require('nodemailer');
const config = require('../config/email');

// Função para enviar e-mail
async function sendEmail({ to, subject, text, html }) {
  try {
    // Configuração do transporte
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
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