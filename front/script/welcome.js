const welcome = document.getElementById('title');
const boton = document.getElementById('cerrar');
const url = 'http://localhost:5000/welcome';

let token = localStorage.getItem('token');
fetch(url,{
    headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
    }
}).then(response => response.json())
.then(response_login => {
    if(response_login.msg == "error"){
        welcome.innerHTML = `Error de autenticación`;
        window.location.replace("./login.html");
    }else{
        if(response_login.admin === true){
            window.location.replace("./welcomeadmin.html");
        }else{
            welcome.innerHTML = `Welcome ${response_login.name}`;
        }
    }
}).catch(error => console.log('Request failed:', error));


function cerrar (){
    localStorage.removeItem('token');
    window.location.replace("./login.html");
}

boton.addEventListener('click', cerrar)