import { Rating } from "../models/Rating.js";

export class RatingRepository {
  async create(rating) {
    const newRating = new Rating(rating);
    return await newRating.save();
  }
  async findByUserId(userId) {
    return await Rating.find({ user: userId });
  }
  async findById(id) {
    return await Rating.findById(id);
  }
  async findByMovieId(movieId) {
    return await Rating.find({ "movie.id": Number(movieId) });
  }
  async findAll() {
    return await Rating.find();
  }
  async update(id, rating) {
    return await Rating.findByIdAndUpdate(id, rating, { new: true });
  }
  async delete(id) {
    await Rating.findByIdAndDelete(id);
  }
}
