export class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async createUser(user) {
    return this.userRepository.create(user);
  }
  async getUserById(id) {
    return this.userRepository.findById(id);
  }
  async getAllUser() {
    return this.userRepository.findAll();
  }
  async updateUser(id, user) {
    return this.userRepository.update(id, user);
  }
  async deleteUser(id) {
    return this.userRepository.delete(id);
  }
}
