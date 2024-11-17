import express from "express";
import { ListController } from "../controller/ListController.js";
import { ListService } from "../service/ListService.js";
import { ListRepository } from "../repository/ListRepository.js";

const router = express.Router();

const ListRepository = new ListRepository();
const ListService = new ListService({ ListRepository });
const ListController = new ListController({ ListService });

router.post("/", (req, res) => ListController.createList(req, res));
router.get("/", (req, res) => ListController.getListsByUserId(req, res));
router.get("/:id", (req, res) => ListController.getListById(req, res));
router.get("/all", (req, res) => ListController.getAllLists(req, res));
router.put("/:id", (req, res) => ListController.updateList(req, res));
router.delete("/:id", (req, res) => ListController.deleteList(req, res));

export default router;