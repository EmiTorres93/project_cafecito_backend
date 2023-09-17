import { Router } from "express";
import { listarUsuarios, login } from "../controllers/usuario.controller.js";

const router = Router();
router.route("/").post(login).get(listarUsuarios);
//router.route("/user/usuario").get(login);

export default router;
