const username = document.getElementById('name');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const age = document.getElementById('age');
const password = document.getElementById('password');
const register = document.getElementById('register');
const url = 'http://localhost:5000/auth/register';


function registrar(){
    let usuario = {
            name: username.value,
            lastname: lastName.value,
            email: email.value,
            age: age.value,
            password: password.value
    };
    console.log(usuario)
    fetch(url,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(usuario)
    }).then(response => response.json())
    .then(response_login => {
        console.log(response_login)
        if (response_login.msg == "register"){
            window.location.replace("./login.html");
        }else{console.log("error")}
    }).catch(error => console.log('Request failed:', error))
}

register.addEventListener('click', registrar)