import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config"; //Permite procesar variables de entorno. Cuando suba mi backend a producción no entiende esto de variables de entorno, para que mi backend pueda usar las variables de entorno
import productoRouter from "./src/routes/productos.routes.js";
import userRouter from "./src/routes/usuarios.routes.js";
import "./src/database/database.js";

//El archivo ppal del backend lo vamos a dividir en 3 partes
const app = express();
app.set("port", process.env.PORT || 4000);

// 1. Configuraciones inciales como el puerto (aquí le pedimos ayuda a Express)
app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});

// 2. Middlewares: Vamos a configurar en el medio del proyecto algo que se llama middlewares (son funciones de JS)

/*son algunas funciones que le van a dar alguna herramienta a mi backend, por ej que escuche peticiones remotas, estas funciones las voy a usar de una librería externa. Se llaman así en el backend las funciones que me van a dar una habilidad específica en nuestro backedn por ej que pueda recibir solicitudes externas
son funciones de JS que le dan alguna habilidad al backend, se agregan antes de las rutas xq
necesito que se ejecuten antes de que llegue al último paso
en las dependencies: cors, dotenv y morgan son middlewares. Son herramientas que necesito 
configuararle a mi backend*/

app.use(cors()); //con este middleware hago que mi backend pueda recibir peticiones remotas
app.use(express.json()); //permite que mi backend cuando alguien le haga una solicitud, si me manda datos en formato json, lo entienda (sería como un traductor para que cuando llegue un json se lo pueda procesar). Permite interpretar datos en formato json
app.use(express.urlencoded({ extended: true })); //Ayuda a interpretar datos del body del request. Le pido ayuda a express para que cuando me mande una solicitud un frontend un array o un string, lo entienda, y yo como backend lo recibo
app.use(morgan("dev")); //morgan no le da ninguna habilidad al backend, básicamente nos da una ayuda en nuestra terminal. Me da una ayuda para que como progrmadora de backend me sea más fácil entender qué pasa, cuando me hagan solicitudes voy a ver datos más largos (nos da más información en la terminal) No me da una ayuda importante cuando lo lleve a producción pero sí en desarrollo.

// 3. Crear las rutas.

/* Las rutas es algo que voy a crearme para que el Frontend me haga una solicitud, yo la 
procese y le envíe una respuesta */
// http://localhost:4000/api/producto --> nombre de dominio de mi backend
// ahora vamos a configurar la parte del /api
app.use("/api", productoRouter);
app.use("/api/user", userRouter);
