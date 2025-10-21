import { Router } from "express";
import { BookController } from "../controllers/BookController";

const router = Router();
const controller = new BookController();

router.get("/", (req, res) => controller.getAll(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.put("/:id/borrow", (req, res) => controller.borrow(req, res));
router.put("/:id/return", (req, res) => controller.returnBook(req, res));

export default router;
