const username = document.getElementById('inp-username');
const password = document.getElementById('inp-password');
const login = document.getElementById('login');
const url = 'http://localhost:5000/auth/login';


function entrar(){
    let usuario = {
            username: username.value,
            password: password.value
    };
    fetch(url,{
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(usuario)
    }).then(response => response.json())
    .then(response_login => {
        if (response_login.status == "login"){
            localStorage.setItem('token',response_login.token);
            window.location.replace("./welcome.html");
        }else{console.log("false")}
    }).catch(error => console.log('Request failed:', error))
}

login.addEventListener('click', entrar)