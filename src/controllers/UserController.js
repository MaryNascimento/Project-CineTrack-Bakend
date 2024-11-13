import jwt from "jsonwebtoken";

export class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async createUser(req, res) {
    try {
      const user = req.body;
      const newUser = await this.userService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: "User not Found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  }

  async getUserData(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await this.userService.getUserData(id);

      if (!user) {
        res.status(404).json({ message: "User not Found" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving user" });
    }
  }

  async getAllUser(req, res) {
    try {
      const users = await this.userService.getAllUser();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error return users list" });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    await this.userService.forgotPassword(email);
    res.status(200).json({ message: "Email enviado com sucesso" });
  }

  async updateUserPassword(req, res) {
    try {
      const { token } = req.query;
      const { password } = req.body;
      const updateUser = await this.userService.updateUserPassword(
        token,
        password
      );

      if (!updateUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(updateUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user password" });
    }
  }

  async updateUser(req, res) {
    try {
      const user = req.body;

      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const updateUser = await this.userService.updateUser(id, user);

      if (!updateUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(updateUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}
