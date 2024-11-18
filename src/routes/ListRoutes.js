import express from "express";
import container from "../containers/index.js";
import { scopePerRequest } from "awilix-express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(scopePerRequest(container));

router.post("/", authMiddleware, (req, res) =>
  req.container.resolve("listController").createList(req, res)
);
router.post("/add", (req, res) =>
  req.container.resolve("listController").addMovieToList(req, res)
);

router.get("/", authMiddleware, (req, res) =>
  req.container.resolve("listController").getListsByUserId(req, res)
);
router.get("/all", authMiddleware, (req, res) =>
  req.container.resolve("listController").getAllLists(req, res)
);
router.get("/:id", authMiddleware, (req, res) =>
  req.container.resolve("listController").getListById(req, res)
);
router.put("/:id", authMiddleware, (req, res) =>
  req.container.resolve("listController").updateList(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  req.container.resolve("listController").deleteList(req, res)
);

export default router;
