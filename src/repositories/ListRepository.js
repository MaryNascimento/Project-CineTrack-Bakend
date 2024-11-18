import { List } from "../models/List.js";
import { User } from "../models/User.js";

export class ListRepository {
  async create(list) {
    const newList = new List(list);
    return await newList.save();
  }

  async createDefaultLists(userId) {
    const defaultLists = [
      { name: "Assistidos", user: userId },
      { name: "Quero Assistir", user: userId },
    ];

    const createdLists = await List.insertMany(defaultLists);

    const listIds = createdLists.map((list) => list._id);
    await User.findByIdAndUpdate(userId, {
      $push: { lists: { $each: listIds } },
    });

    return createdLists;
  }

  async addMovieToList(listId, movie) {
    return await List.findByIdAndUpdate(
      listId,
      { $addToSet: { movies: movie } }, // $addToSet evita duplicação
      { new: true } // Retorna o documento atualizado
    );
  }

  async findByUserId(userId) {
    return await List.find({ user: userId });
  }

  async findById(id) {
    return await List.findById(id);
  }

  async findAll() {
    return await List.find();
  }

  async update(id, list) {
    return await List.findByIdAndUpdate(id, list, { new: true });
  }

  async delete(id) {
    await List.findByIdAndDelete(id);
  }
}
