import jwt from "jsonwebtoken";

export class ListController {
  constructor({ ListService }) {
    this.ListService = ListService;
  }

  async createList(req, res) {
    try {
      const list = req.body;
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      list.user = id;

      const newList = await this.ListService.createList(list);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: "Create list error" });
    }
  }

  async getListsByUserId(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const lists = await this.ListService.getListsByUserId(id);
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Return lists error" });
    }
  }

  async getListById(req, res) {
    try {
      const { id } = req.params;
      const list = await this.ListService.getListById(id);
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ message: "Return list error" });
    }
  }

  async getAllLists(req, res) {
    try {
      const lists = await this.ListService.getAllLists();
      res.status(200).json(lists);
    } catch (error) {
      res.status(500).json({ message: "Return all lists error" });
    }
  }

  async updateList(req, res) {
    try {
      const { id } = req.params;
      const list = req.body;
      const updatedList = await this.ListService.updateList(id, list);
      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).json({ message: "Update list error" });
    }
  }

  async deleteList(req, res) {
    try {
      const { id } = req.params;
      await this.ListService.deleteList(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Delete list error" });
    }
  }
}