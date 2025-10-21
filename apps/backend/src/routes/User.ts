import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

router.post("/register", (req, res) => controller.register(req, res));

router.post("/login", (req, res) => controller.login(req, res));

export default router;
