import { scopePerRequest } from "awilix-express";
import { Router } from "express";
import container from "../containers/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(scopePerRequest(container));

router.post("/", (req, res) =>
  req.container.resolve("userController").createUser(req, res)
);
router.get("/data", authMiddleware, (req, res) =>
  req.container.resolve("userController").getUserData(req, res)
);
router.get("/:id", authMiddleware, (req, res) =>
  req.container.resolve("userController").getUserById(req, res)
);
router.get("/", authMiddleware, (req, res) =>
  req.container.resolve("userController").getAllUser(req, res)
);
router.post("/forgot-password", (req, res) =>
  req.container.resolve("userController").forgotPassword(req, res)
);
router.put("/update-password", (req, res) =>
  req.container.resolve("userController").updateUserPassword(req, res)
);
router.put("/", authMiddleware, (req, res) =>
  req.container.resolve("userController").updateUser(req, res)
);
router.delete("/:id", authMiddleware, (req, res) =>
  req.container.resolve("userController").deleteUser(req, res)
);

export default router;
