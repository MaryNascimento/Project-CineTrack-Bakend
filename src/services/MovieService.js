import axios from "axios";
import { config } from "dotenv";
import { Rating } from "../models/Rating.js";

config();

const { TMDB_API_TOKEN, TMDB_BASE_URL } = process.env;

export class MovieService {
  async getNowPlayingMovies(filters) {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

    const primary_release_date = {
      gte: date.toISOString().split("T")[0],
      lte: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt-BR",
          region: "BR",
          certification_country: "BR",
          "primary_release_date.gte": primary_release_date.gte,
          "primary_release_date.lte": primary_release_date.lte,
          with_realease_type: "2|3|4",
          ...filters,
        },
      });

      return {
        movies: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
        primary_release_date,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar os filmes.");
    }
  }

  async getUpcomingMovies(filters) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    const primary_release_date = {
      gte: new Date().toISOString().split("T")[0],
      lte: date.toISOString().split("T")[0],
    };
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt-BR",
          region: "BR",
          certification_country: "BR",
          "primary_release_date.gte": primary_release_date.gte,
          "primary_release_date.lte": primary_release_date.lte,
          with_realease_type: "2|3|4",
          ...filters,
        },
      });

      return {
        movies: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
        primary_release_date,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar os filmes.");
    }
  }

  async getFilteredMovies(filters) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt-BR",
          region: "BR",
          certification_country: "BR",
          with_release_type: "2|3|4",
          ...filters,
        },
      });

      return {
        movies: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar os filmes.");
    }
  }

  async getRecommendedMovies(userId) {
    try {
      const ratings = await Rating.find({
        user: userId,
        rating: { $gte: 4 },
      }).select("movie.id");

      const list = ratings.map((rating) => rating.movie.get("id"));

      const recommendations = list.map((movie) =>
        axios.get(`${TMDB_BASE_URL}/movie/${movie}/recommendations`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
          params: {
            language: "pt-BR",
          },
        })
      );

      const response = await Promise.all(recommendations);

      const recommendationData = response
        .flatMap((movie) => movie.data.results)
        .reduce((acc, movie) => {
          acc[movie.id] = movie;
          return acc;
        }, {});

      return Object.values(recommendationData);
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar os filmes recomendados.");
    }
  }

  async getMovieById(id) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt-BR",
          append_to_response: "videos",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar o filme.");
    }
  }

  async searchMovies(query) {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt-BR",
          query,
        },
      });

      return {
        movies: response.data.results,
        page: response.data.page,
        total_pages: response.data.total_pages,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar o filme.");
    }
  }

  async mostPopularMovie() {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt-BR",
        },
      });
      return response.data.results[0];
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar o filme.");
    }
  }

  async getGenreList() {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
        params: {
          language: "pt",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Não foi possível buscar a lista de gêneros.");
    }
  }
}
