function logar(){
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;

    if(usuario == "admin" && senha == "1234"){
        alert("Login realizado com sucesso!");      

    } else {
        alert("Usuário ou senha incorretos!");
    }
}

