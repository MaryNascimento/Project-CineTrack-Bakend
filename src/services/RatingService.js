export class RatingService {
  constructor({ ratingRepository }) {
    this.ratingRepository = ratingRepository;
  }

  async createRating(rating) {
    return await this.ratingRepository.create(rating);
  }

  async getRatingByUserId(userId) {
    return await this.ratingRepository.findByUserId(userId);
  }

  async getRatingById(id) {
    return await this.ratingRepository.findById(id);
  }

  async getRatingByMovieId(movieId) {
    return await this.ratingRepository.findByMovieId(movieId);
  }

  async getAllRating() {
    return await this.ratingRepository.findAll();
  }

  async updateRating(id, rating) {
    return await this.ratingRepository.update(id, rating);
  }

  async deleteRating(id) {
    return await this.ratingRepository.delete(id);
  }
}
