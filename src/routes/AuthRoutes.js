import { scopePerRequest } from "awilix-express";
import { Router } from "express";
import container from "../containers/index.js";

const router = Router();

router.use(scopePerRequest(container));

router.post("/login", (req, res) =>
  req.container.resolve("authController").login(req, res)
);

export default router;
