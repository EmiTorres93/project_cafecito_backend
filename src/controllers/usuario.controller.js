import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

//verificar si existe el mail
// verificar si el usuario que encontré tiene la misma contraseña que recibí en body
export const login = async (req, res) => {
  try {
    //res.send("prueba para loguear");
    console.log(req.body);
    //verificar si existe un mail como el recibido
    const { email, password } = req.body;
    //verificar si el mail ya existe
    //let usuario = await Usuario.findOne({email: req.body.email})
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Email o password inválido.",
      });
    }
    // desencriptar y comparar password
    const passwordValida = bcrypt.compareSync(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ mensaje: "Correo o password inválido" });
    }
    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombreUsuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Usuario o contraseña inválido",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    //verificar si el mail ya existe
    let usuario = await Usuario.findOne({ email }); //devuelve un null
    console.log(usuario);
    if (usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "Ya existe un usuario con el correo enviado",
      });
    }
    //guardamos el nuevo usuario en la BDD
    usuario = new Usuario(req.body);
    console.log(usuario);
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    res.status(201).json({
      mensaje: "usuario creado",
      nombre: usuario.nombreUsuario,
      uid: usuario._id,
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        mensaje: "El usuario no pudo ser creado",
      });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    //Buscar en la BDD la collection
    const usuarios = await Usuario.find();
    //envio la repsuesta al frontend
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar los usuarios",
    });
  }
};
