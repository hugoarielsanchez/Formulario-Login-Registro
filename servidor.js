const express = require("express");
const path = require("path");
const app = express();
const Port = 3000;

// Usuarios
const Usuarios = [
  {
    usuario: "Hugo",
    clave: "123456",
  },
  { 
    usuario: "Carlos", 
    clave: "78946" },
];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "cliente")));

// Get a pagian de Inicio
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/index.html"));
});

// Validación de Usuarios
app.post("/login", function (req, res) {
  if (req.body.user === "" || req.body.password === "") {
    res.send("Faltan Datos");
  } else {
    for (let i = 0; i < Usuarios.length; i++) {
      if (
        req.body.user === Usuarios[i].usuario &&
        req.body.password === Usuarios[i].clave
      ) {
        res.sendFile(path.join(__dirname, "cliente/home.html"));
      }
    }
  }
});

// Get a Formulario de Registro
app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/registro.html"));
});

// Formulario para registro de usuarios
app.post("/register", function (req, res) {
    const user = req.body.user;
    const password = req.body.password;
    const rePassword = req.body.rePassword;
    let usuarioRepetido = false;

    if (password === rePassword) {
        for (let i = 0; i < Usuarios.length; i++) {
           if (user === Usuarios[i].usuario) {
               usuarioRepetido = true;
           }else{
               usuarioRepetido = false;
           }
        }

        if(usuarioRepetido){
            res.send("El usuario ya se encuentra registrado");
        }else{
            Usuarios.push({ usuario: user, clave: password });
            res.sendFile(path.join(__dirname, "cliente/index.html"));             
        }
    }else{
        res.sendFile(path.join(__dirname, "cliente/registro.html"));
    }
});

app.listen(Port, function () {
  console.log(`Servidor iniciado en puerto ${Port}...`);
});