// acá modelamos el usuario
import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 12,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
