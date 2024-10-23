import { User } from "../models/User.js";

export class UserRepository {
  async create(user) {
    const newUser = new User(user);
    return await newUser.save();
  }
  async findById(id) {
    return await User.findById(id);
  }
  async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }
  async findAll() {
    return await User.find();
  }
  async update(id, user) {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }
  async delete(id) {
    await User.findByIdAndDelete(id);
  }
}
