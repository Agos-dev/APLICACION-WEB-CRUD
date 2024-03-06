const usuario = document.getElementById("input-usuario");
const contraseña = document.getElementById("input-contraseña");
const btnLogin = document.getElementById("btn-login");
 


function login(){
    if(usuario.value === "agostina" && contraseña.value === "1234"){
        document.location.href = "pages/panel-facturacion.html"
    }
    else{
        alert("Usuario incorrecto");
    }
}

btnLogin.addEventListener("click", login)



