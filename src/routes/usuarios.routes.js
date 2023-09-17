import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  login,
} from "../controllers/usuario.controller.js";

const router = Router();
router.route("/").post(login).get(listarUsuarios);
router.route("/nuevo").post(crearUsuario);
//router.route("/user/usuario").get(login);

export default router;
