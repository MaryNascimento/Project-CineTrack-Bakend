import jwt from "jsonwebtoken";

export class UserService {
  constructor({ userRepository, emailService, listRepository }) {
    this.userRepository = userRepository;
    this.emailService = emailService;
    this.listRepository = listRepository;
  }

  async createUser(user) {
    try {
      const existingUser = await this.userRepository.findByEmail(user.email);

      if (existingUser) {
        throw new Error("Email já cadastrado");
      }
      const newUser = await this.userRepository.create(user);
      await this.listRepository.createDefaultLists(newUser._id);

      this.emailService.sendConfirmationEmail(newUser).catch((error) => {
        console.error(error);
        throw new Error("Error sending confirmation email");
      });

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
  async getUserData(id) {
    return this.userRepository.findById(id);
  }
  async getAllUser() {
    return this.userRepository.findAll();
  }
  async forgotPassword(email) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return;
    }

    this.emailService.sendUpdatePasswordEmail(user).catch((error) => {
      console.error(error);
      throw new Error("Error sending update password email");
    });
  }
  async updateUserPassword(token, password) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    user.password = password;

    return this.userRepository.update(id, user);
  }
  async updateUser(id, user) {
    return this.userRepository.update(id, user);
  }
  async deleteUser(id) {
    return this.userRepository.delete(id);
  }
}
