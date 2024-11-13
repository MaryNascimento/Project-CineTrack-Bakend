import jwt from "jsonwebtoken";

export class RatingController {
  constructor({ ratingService }) {
    this.ratingService = ratingService;
  }
  async createRating(req, res) {
    try {
      const rating = req.body;
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      rating.user = id;
      const newRating = await this.ratingService.createRating(rating);
      res.status(201).json(newRating);
    } catch (error) {
      res.status(500).json({ message: "Create rating error" });
    }
  }
  async getRatingByUserId(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const rating = await this.ratingService.getRatingByUserId(id);
      res.status(200).json(rating);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Return rating error" });
    }
  }
  async getRatingById(req, res) {
    try {
      const { id } = req.params;
      const rating = await this.ratingService.getRatingById(id);
      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ message: "Return rating error" });
    }
  }
  async getRatingByMovieId(req, res) {
    try {
      const { movieId } = req.params;
      const rating = await this.ratingService.getRatingByMovieId(movieId);
      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ message: "Return rating error" });
    }
  }
  async getAllRating(req, res) {
    try {
      const rating = await this.ratingService.getAllRating();
      res.status(200).json(rating);
    } catch (error) {
      res.status(500).json({ message: "Return rating error" });
    }
  }
  async updateRating(req, res) {
    try {
      const { id } = req.params;
      const rating = req.body;
      const updateRating = await this.ratingService.updateRating(id, rating);
      res.status(200).json(updateRating);
    } catch (error) {
      res.status(500).json({ message: "Update rating error" });
    }
  }
  async deleteRating(req, res) {
    try {
      const { id } = req.params;
      await this.ratingService.deleteRating(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Delete rating error" });
    }
  }
}
