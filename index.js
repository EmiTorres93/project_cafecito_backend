import express from "express";
//El archivo ppal del backend lo vamos a dividir en 3 partes
const app = express();
app.set("port", process.env.PORT || 4000);
// 1. Configuraciones inciales como el puerto (aquí le pedimos ayuda a Express)
app.listen(app.get("port"), () => {
  console.log("Estoy en el pureto " + app.get("port"));
});

// 2. Midllewares: Vamos a configurar en el medio del proyecto algo que se llama middlewares (son funciones de JS)
//se llaman así en el backend las funciones que me van a dar una habilidad específica en nuestro backedn por ej que pueda recibir solicitudes externas

// 3. Crear las rutas
