import jwt from "jsonwebtoken";

export class ListController {
  constructor({ listService }) {
    this.listService = listService;
  }

  async createList(req, res) {
    try {
      const list = req.body;
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      list.user = id;

      const newList = await this.listService.createList(list);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: "Create list error" });
    }
  }
  async addMovieToList(req, res) {
    const { movie, listId } = req.body;

    try {
      const updatedList = await this.listService.addMovie(listId, movie);
      res.status(200).json(updatedList);
    } catch (error) {
      console.error("Error adding movie to list:", error.message);
      res
        .status(error.message === "List not found." ? 404 : 400)
        .json({ error: error.message });
    }
  }
  async getListsByUserId(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const lists = await this.listService.getListsByUserId(id);
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Return lists error" });
    }
  }

  async getListById(req, res) {
    try {
      const { id } = req.params;
      const list = await this.listService.getListById(id);
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ message: "Return list error" });
    }
  }

  async getAllLists(req, res) {
    try {
      const lists = await this.listService.getAllLists();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Return all lists error" });
    }
  }

  async updateList(req, res) {
    try {
      const { id } = req.params;
      const list = req.body;
      const updatedList = await this.listService.updateList(id, list);
      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).json({ message: "Update list error" });
    }
  }

  async deleteList(req, res) {
    try {
      const { id } = req.params;
      await this.listService.deleteList(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Delete list error" });
    }
  }
}
