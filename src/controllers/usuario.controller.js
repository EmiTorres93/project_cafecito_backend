import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

//verificar si existe el mail
//verificar si el usuario que encontré tiene la misma contraseña que recibí en body
export const login = async (req, res) => {
  try {
    //res.send("prueba para loguear");
    console.log(req.body);
    //verificar si existe un mail como el recibido
    const { email, password } = req.body; //con las {email, pass} lo que hago es desestructurar el body, el email y el passw del body.
    //verificar si el mail ya existe
    //let usuario = await Usuario.findOne({email: req.body.email}) al estar desestructurado puedo obviar el poner que cuando email sea igual a req.body.email ya que se llaman igual puedo poner directamente email solo si arriba había desestructurado
    let usuario = await Usuario.findOne({ email }); //find de moongose me devuelve siempre una lista de usuarios, si quiero buscar un usuario en particular por un campo uso el findOne
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Email o password inválido.  - correo",
      });
    }
    // desencriptar y comparar password
    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password inválido. - password" });
    }
    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id, //uid significa user id pero puedo ponerle _id o como yo quiera
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
    const salt = bcrypt.genSaltSync(10); //bcryps me dice que necesito generar un código que se llama salt y por eso la llamamos así la const, salt es un cógido que se genera con la librería que me permitirá encriptar la contraseña, o sea no es la constraseña encriptada sino un código que me permitirá encriptar
    usuario.password = bcrypt.hashSync(password, salt); //genSalt es un método de bcryp y si lo quiero usar tengo que poner el async xq es un método asíncrono (ahí tenemos que ponerle el await) pero tb es síncrono y ahí no necesitamos ponerle el await
    //10 es la cantidad de vueltas que dará ese algoritmo para generar ese salt, cuanto menor sea la cant de vueltas será más fácil vulnerar esa contraseña
    //con esto decimos que al usuario.password (xq usuario es un objeto) le voy a asignar un nuevo valor
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
