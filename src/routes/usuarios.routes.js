import { Router } from "express";
import { login } from "../controllers/usuario.controller.js";

const router = Router();
router.route("/usuario").get(login);

export default router;
