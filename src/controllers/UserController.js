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
      res.status(500).json({ message: "Create user error" });
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

  async getAllUser(req, res) {
    try {
      const users = await this.userService.getAllUser();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error return users list" });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const user = req.body;
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
