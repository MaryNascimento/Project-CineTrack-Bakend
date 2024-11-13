import { scopePerRequest } from "awilix-express";
import { Router } from "express";
import container from "../containers/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(scopePerRequest(container));

router.post("/", authMiddleware, (req, res) => {
  req.container.resolve("ratingController").createRating(req, res);
});

router.get("/movie/:movieId", authMiddleware, (req, res) => {
  req.container.resolve("ratingController").getRatingByMovieId(req, res);
});

router.get("/user", authMiddleware, (req, res) => {
  req.container.resolve("ratingController").getRatingByUserId(req, res);
});

router.get("/:id", authMiddleware, (req, res) => {
  req.container.resolve("ratingController").getRatingById(req, res);
});

router.put("/:id", authMiddleware, (req, res) => {
  req.container.resolve("ratingController").updateRating(req, res);
});

router.delete("/:id", authMiddleware, (req, res) => {
  req.container.resolve("ratingController").deleteRating(req, res);
});

export default router;
