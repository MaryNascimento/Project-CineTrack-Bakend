export class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      let message = "Erro desconhecido";
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(401).json({ error: message });
    }
  }
}