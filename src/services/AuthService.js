import pkg from "bcryptjs";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export class AuthService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    if (!user.isVerified) {
      throw new Error("Confirme seu email para continuar");
    }

    const passwordMatch = await pkg.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }

  async confirmAccount(token) {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    user.isVerified = true;

    await this.userRepository.update(id, user);
  }
}
