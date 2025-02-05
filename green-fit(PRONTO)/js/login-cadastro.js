function myMenuFunction(){
    let i = document.getElementById("navMenu");

    if(i.className === "nav-menu"){
        i.className += "responsive";
    } else {
        i.className = "nav-menu";
    }
}

/* Função referente ao cadastro de usuários.*/
function registerUser(event) {
    event.preventDefault();
    const form = document.getElementById("registerForm");
    const formData = new FormData(form);

    fetch('php/create.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const mensagemErro = document.getElementById("mensagemErro");
        const mensagemSucesso = document.getElementById("mensagemSucesso");
        
        if (data.erro) {
            mensagemErro.textContent = data.erro;
            mensagemSucesso.textContent = "";
        } else {
            mensagemErro.textContent = "";
            mensagemSucesso.textContent = data.sucesso;
            form.reset();

            // Redireciona para a página de login após o cadastro
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        }
    })
    .catch(error => {
        console.error("Erro ao registrar o usuário:", error);
    });
}






