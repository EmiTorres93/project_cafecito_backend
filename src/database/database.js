import mongoose from "mongoose";
import "dotenv/config"; //importante porque vamos a leer una variable de entorno

/* mongose: nos sirve para que nuestro backend converce con la BDD de Mongo Atlas, esta librería 
nos sirve de intermediario para conectarme fácil o hacer transacciones con mi BDD, me va a 
permitir conectarme a mi BDD */

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI); //para conectar con mi BDD
const datosConexion = mongoose.connection; //Para ver si se conecta o no

datosConexion.once("open", () => {
  console.log("BD conectada"); //si veo ese mensaje es porque funcionó la conexión.
});
