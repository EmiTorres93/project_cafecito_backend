import mongoose, { Schema } from "mongoose";
//Acá modelams el producto (un producto) que sería el modelo de prodcuto como quiero que me traiga de la BD
//Acá modelamos el producto
/* moongose, librería que me ayudó a conectarme a la BDD, me ayudará tb a modelar el dato que
yo pretendo guardar en la BD, entonces importamos moongose y a moongose le pedimos que tb nos
importe el Schema que es como una plantilla o estructura */
const productoShema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 50,
  },
  precio: {
    type: Number,
    required: true,
    min: 600,
    max: 100000,
  },
  imagen: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

// vamos a generar un modelo
const Producto = mongoose.model("producto", productoShema);

export default Producto;

//a Producto debo usarla en los ontrollers y para eso debo invocar esa palabra Producto, puedo usar el export al lado de const o el export default
