export function ConfirmRegisterUser(confirmUrl, user) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de E-mail</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;>
    <div style="width: 100%; background-color: #f9f9f9; padding: 20px;">
      <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #ffcf57; padding: 30px; text-align: center;">
          <img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1566/BTS_your_logo.png" alt="Your Logo" style="width: 150px;">
        </div>
        <div style="text-align: center; padding: 40px;">
          <h1 style="color: #7747FF; font-size: 32px; margin: 0;">Hi ${user.username},</h1>
          <p style="font-size: 16px; color: #555555; margin: 20px 0;">Thank you for signing up! To confirm your email address, please click the link below:</p>
          <a href=${confirmUrl} style="background-color: #7747FF; color: #ffffff; padding: 12px 30px; font-size: 18px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px;">Confirm Email</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
