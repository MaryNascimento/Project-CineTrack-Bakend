import { asClass, createContainer } from "awilix";
import { UserRepository } from "../repositories/UserRepository.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";
import { AuthService } from "../services/AuthService.js";
import { AuthController } from "../controllers/AuthController.js";
import { MovieController } from "../controllers/MovieController.js";
import { MovieService } from "../services/MovieService.js";
import { RatingRepository } from "../repositories/RatingRepository.js";
import { RatingService } from "../services/RatingService.js";
import { RatingController } from "../controllers/RatingController.js";
import { EmailService } from "../emails/EmailService.js";

const container = createContainer();

container.register({
  userRepository: asClass(UserRepository).singleton(),
  userService: asClass(UserService).singleton(),
  userController: asClass(UserController).singleton(),
  authService: asClass(AuthService).singleton(),
  authController: asClass(AuthController).singleton(),
  movieService: asClass(MovieService).singleton(),
  movieController: asClass(MovieController).singleton(),
  ratingRepository: asClass(RatingRepository).singleton(),
  ratingService: asClass(RatingService).singleton(),
  ratingController: asClass(RatingController).singleton(),
  emailService: asClass(EmailService).singleton(),
});

export default container;
