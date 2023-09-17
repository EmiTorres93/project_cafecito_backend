import { Router } from "express"; //Esta librería de express me va a dejar crear rutas
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";

const router = Router();

router.route("/producto").get(listarProductos).post(crearProducto);
//route es un método y es la habilidad que tiene ese enrutador de crearme una ruta
router
  .route("/producto/:id")
  .put(editarProducto)
  .delete(borrarProducto)
  .get(obtenerProducto);

/* En esta función tengo que poner una serie de lógicas que validen algunos datos, que vaya y
se conecte a la BDD, que traiga la lista de productos y que envíe la respuesta al frontend que
me hizo la solicitud. 
Toda esa fnción larga la podríamos poner dentro del get pero la vamos a poner dentro de la 
carpeta controllers */

/* Así que cuando me manden una solicitud de que quieren obtener la lista de prodcutos, la ruta
sólo recibe la solicitud get y la lógica que va a procesar esa solicitud estará en controllers,
así que en esa carpeta va la lógica para crear los productos */

export default router;
