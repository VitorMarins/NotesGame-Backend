const Data = new Date();

module.exports = {
    mensagemLogin: `
      <h2 style='color: black'>Identificamos um novo login, ${usuario.nome}.</h2>
      <p style='font-size: 15px; color: black'>
      Data e hora: ${Data.toString()}.<br/>Se foi você quem fez isso, não se preocupe.
      Caso não reconheça o acesso, recomendamos que altere sua senha.
      <br/>Para isso acesse sua conta e clique em Segurança da conta/Alterar senha.
      <br/>Nunca informe seus dados de acesso para outra pessoa.
      <br/>Este é um e-mail automático. Não é necessário respondê-lo.
      </p>`,
    mensagemCadastro: `
      <h2 style='color: black'>Bem-vindo ao Notesgame, ${usuario.nome}.</h2>
      <p style='font-size: 15px; color: black'>
      Data e hora: ${Data.toString()}.<br/>Se foi você quem fez isso, não se preocupe.
      Caso não reconheça o acesso, recomendamos que altere sua senha.
      <br/>Para isso acesse sua conta e clique em Segurança da conta/Alterar senha.
      <br/>Nunca informe seus dados de acesso para outra pessoa.
      <br/>Este é um e-mail automático. Não é necesario respondê-lo.
      </p>`,
};