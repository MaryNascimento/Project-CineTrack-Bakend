import { List } from "../models/List.js";

export class ListRepository {
  async create(list) {
    const newList = new List(list);
    return await newList.save();
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