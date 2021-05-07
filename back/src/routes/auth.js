const express = require('express');
const validarDatos = require('./../middlewares/validarDatos');
const rateLimit = require ("express-rate-limit");
var jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN;
const validarDatosLogin = validarDatos.validarDatosLogin;
const validarDatosRegister = validarDatos.validarDatosRegister;
const validarClave = validarDatos.validarClave;
const validarEmail = validarDatos.validarEmail;
const router = express.Router();


const apiLimiter = rateLimit({
    windowMs: 3000,
    max: 10
});

let usuarios = [
    { id: 1, admin: true, name: "sara", lastname: "gomez", email: "saragomez@gmail.com", age: 15, password: "542"},
    { id: 2, admin: false, name: "pepito", lastname: "perez", email: "pepitoperez@gmail.com", age: 19, password: "888"},
];
router.post('/login',apiLimiter, validarDatosLogin, (req, res) => {
    const {username, password} = req.body;
    const usuariosFiltrados = usuarios.filter( usuario => {
        return usuario.name == username;
    });
    
    if (usuariosFiltrados == ''){
        res.status(404).json( {status: "Usuario no encontrado"} );
    }else{
        if (usuariosFiltrados[0].password != password){
            return res.status(400).json( {msg: "Password incorrect"} );
        }else{
            let usuario = {
                id: usuariosFiltrados[0].id,
                admin: usuariosFiltrados[0].admin,
                name: usuariosFiltrados[0].name,
                lastname: usuariosFiltrados[0].lastname,
                email: usuariosFiltrados[0].email,
                age: usuariosFiltrados[0].age,
            }
            let token = jwt.sign({data: usuario}, sign);
            return res.json( {token: token, status: "login"} );
        }
    };
});

router.post('/register', validarDatosRegister, validarEmail, validarClave, (req, res) => {

    let {admin, name, lastname, email, age, password} = req.body;
    const lastId = usuarios[usuarios.length -1].id;
    if (admin === "si"){
        admin = true;
    }else{
        admin = false;
    }
    const usuario = {
        id: lastId + 1 ,
        admin,
        name,
        lastname,
        email,
        age,
        password
    };
    usuarios.push(usuario);
    res.json({msg: "register"});
});

module.exports = router;