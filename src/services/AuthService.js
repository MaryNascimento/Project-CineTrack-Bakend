import pkg from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordMatch = await pkg.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  }
}
