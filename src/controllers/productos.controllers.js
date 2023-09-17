import Producto from "../models/producto.js";

export const listarProductos = async (req, res) => {
  try {
    //esta función tiene que ir a la BD y pedir los productos
    //res.send("esto es una prueba");
    const listaProductos = await Producto.find();
    res.status(200).json(listaProductos); //este método json es el body de la respuesta en formato json
  } catch (error) {
    console.log(error);
    res.status(404).json({
      menssaje: "Error al buscar productos",
    });
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

export const editarProducto = async (req, res) => {
  try {
    // extraer el parámetro id de la ruta
    console.log(req.params.id); //con params es la forma que le extraigo el id de la solicitud, en postman puse identificador luego de la / y esa palabra es la que me muestra (sería el id)
    console.log(req.body); //req.body veo el body con params.id vería el id
    //modificar un producto
    await Producto.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      menssaje: "El producto fue editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      menssaje: "No se pudo editar el producto",
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
      menssaje: "El producto fue eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo eliminar el producto",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findById(req.params.id);
    res.status(200).json(productoBuscado);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "No se pudo obtener información del producto",
    });
  }
};
