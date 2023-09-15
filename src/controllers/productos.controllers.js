import Producto from "../models/producto.js";

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

export const crearProducto = async (req, res) => {
  try {
    //esta función tiene que ir a la BD y pedir los productos
    // aquí los datos deberían estar validados
    console.log(req.body);
    //res.send("se crea un producto");
    //creo un nuevo producto
    const productoNuevo = new Producto(req.body);
    //guardar el producto en el backend
    await productoNuevo.save();
    res.status(201).json({
      menssaje: "El producto fue creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      menssaje: "El producto no pudo ser creado",
    });
  }
};
