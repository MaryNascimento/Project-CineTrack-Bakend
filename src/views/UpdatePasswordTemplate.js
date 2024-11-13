export function UpdatePasswordTemplate(updateUrl) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Atualizar Senha</title>
    </head>
    <body>
        <h1>Atualização de Senha</h1>
        <p>Para atualizar sua senha, clique no link abaixo:</p>
        <a href="${updateUrl}">Atualizar Senha</a> 
    </body>
    </html>
    `;
}
