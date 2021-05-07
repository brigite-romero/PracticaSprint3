function validarDatosLogin(req, res, next){
    const {username, password} = req.body;

    if (!username){
        return res.status(422).json({msg: "Error, no se envio el atributo username"});
    }else{
        if (!password){
            return res.status(422).json({msg: "Error, no se envio el atributo password"});
        }
    }
    next()
};

function validarDatosRegister(req, res, next){
    const {name,lastname,email,age,password} = req.body;

    if (!name){
        return res.status(422).json({msg: "Error, no se envio el atributo name"});
    }else{
        if (!lastname){
            return res.status(422).json({msg: "Error, no se envio el atributo lastname"});
        }else{
            if (!email){
                return res.status(422).json({msg: "Error, no se envio el atributo email"});
            }else{
                if (!age){
                    return res.status(422).json({msg: "Error, no se envio el atributo age"});
                }else{
                    if (!password){
                        return res.status(422).json({msg: "Error, no se envio el atributo password"});
                    }
                }
            }
        }
    }
    next()
};
function validarClave(req, res, next){
    const password = req.body.password;
    if(password.length >= 8){		
        let mayuscula = false;
        let minuscula = false;
        let numero = false;
        let caracter_raro = false;
            
        for(var i = 0;i<password.length;i++){
                
            if(password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90){
                mayuscula = true;
            }
                else if(password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122){
                    minuscula = true;
                }
                else if(password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57){
                    numero = true;
                }
                else{
                    caracter_raro = true;
                }
        }
        if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true){
            next();
        }
    }else{
        res.status(400).json( {msg: "contraseña invalida"} );
        return false;
    }
};
function validarEmail(req, res, next){
    const email = req.body.email;
    const emailRegex = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!emailRegex.test(email)){
        res.status(400).json({msg: "error email"});
        return false;
    }
    next()
}
module.exports = {validarDatosLogin, validarDatosRegister,validarClave, validarEmail};