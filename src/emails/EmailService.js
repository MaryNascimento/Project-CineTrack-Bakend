import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ConfirmRegisterUser } from "../views/ConfirmRegisterUser.js";
import { UpdatePasswordTemplate } from "../views/UpdatePasswordTemplate.js";

config();

const { EMAIL_USER, EMAIL_PASS, BASE_URL_FRONT, JWT_SECRET } = process.env;

export class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendConfirmationEmail(user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const confirmUrl = `${BASE_URL_FRONT}/confirm-email?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: "Confirme seu cadastro",
      html: ConfirmRegisterUser(confirmUrl, user),
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendUpdatePasswordEmail(user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    const updateUrl = `${BASE_URL_FRONT}/update-password?token=${token}`;

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: "Atualize sua senha",
      html: UpdatePasswordTemplate(updateUrl, user),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
