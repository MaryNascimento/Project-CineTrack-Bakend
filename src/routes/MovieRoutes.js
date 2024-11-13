import { scopePerRequest } from "awilix-express";
import { Router } from "express";
import container from "../containers/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(scopePerRequest(container));

router.get("/", (req, res) =>
  req.container.resolve("movieController").getFilteredMovies(req, res)
);

router.get("/now-playing", (req, res) =>
  req.container.resolve("movieController").getNowPlayingMovies(req, res)
);

router.get("/upcoming", (req, res) =>
  req.container.resolve("movieController").getUpcomingMovies(req, res)
);

router.get("/recommended", authMiddleware, (req, res) =>
  req.container.resolve("movieController").getRecommendedMovies(req, res)
);

router.get("/search", (req, res) =>
  req.container.resolve("movieController").searchMovies(req, res)
);

router.get("/popular", (req, res) =>
  req.container.resolve("movieController").mostPopularMovie(req, res)
);

router.get("/genres", (req, res) =>
  req.container.resolve("movieController").getGenreList(req, res)
);

router.get("/:id", (req, res) =>
  req.container.resolve("movieController").getMovieById(req, res)
);

export default router;
