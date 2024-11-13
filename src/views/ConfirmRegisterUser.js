export function ConfirmRegisterUser(confirmUrl) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de E-mail</title>
  </head>
  <body>
    <h1>Bem-vindo, {{username}}!</h1>
    <p>Para confirmar seu cadastro, clique no link abaixo:</p>
    <a href="${confirmUrl}">Confirmar E-mail</a>
  </body>
  </html>
  `;
}
