import { asClass, createContainer } from "awilix";
import { UserRepository } from "../repositories/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";
import { AuthService } from "../services/AuthService.js";
import { AuthController } from "../controllers/AuthController.js";

const container = createContainer();

container.register({
  userRepository: asClass(UserRepository).singleton(),
  userService: asClass(UserService).singleton(),
  userController: asClass(UserController).singleton(),
  authService: asClass(AuthService).singleton(),
  authController: asClass(AuthController).singleton(),
});

export default container;
