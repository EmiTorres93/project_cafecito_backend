import Producto from "../models/producto";

export const listarProductos = (req, res) => {
  try {
    //esta función tiene que ir a la BD y pedir los productos
    res.send("esto es una prueba");
  } catch (error) {
    console.log(error);
  }
};

/* express me está dejando que cuando yo reciba una solicitud, el 1er dato de esa solicitud
es lo que me ha pedido el usuario y el 2do valor es un objeto que tiene una serie de métodos
que me premiten responderle a quien me hizo la solicitud */
