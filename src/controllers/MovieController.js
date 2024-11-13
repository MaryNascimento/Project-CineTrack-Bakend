import jwt from "jsonwebtoken";

export class MovieController {
  constructor({ movieService }) {
    this.movieService = movieService;
  }

  async getNowPlayingMovies(req, res) {
    try {
      const filters = req.query;
      const movies = await this.movieService.getNowPlayingMovies(filters);
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movies" });
    }
  }

  async getUpcomingMovies(req, res) {
    try {
      const filters = req.query;
      const movies = await this.movieService.getUpcomingMovies(filters);
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movies" });
    }
  }

  async getFilteredMovies(req, res) {
    try {
      const filters = req.query;
      const movies = await this.movieService.getFilteredMovies(filters);
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movies" });
    }
  }

  async getRecommendedMovies(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.replace("Bearer ", "");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const movies = await this.movieService.getRecommendedMovies(id);
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movies" });
    }
  }

  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const movie = await this.movieService.getMovieById(id);
      res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movie" });
    }
  }

  async searchMovies(req, res) {
    try {
      const { query } = req.query;
      const movies = await this.movieService.searchMovies(query);
      res.status(200).json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movies" });
    }
  }

  async mostPopularMovie(req, res) {
    try {
      const movie = await this.movieService.mostPopularMovie();
      res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching movie" });
    }
  }

  async getGenreList(req, res) {
    try {
      const genres = await this.movieService.getGenreList();
      res.status(200).json(genres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching genres" });
    }
  }
}
