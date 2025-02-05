<?php
include("config.php");
defined('CONTROLE') or die('Erro no acesso');

// Variável de mensagem de erro inicializada como vazia
$msg_erro = "";

// Verificação se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recebe dados do formulário de login
    $email = $_POST['email'] ?? null;
    $senha = $_POST['senha'] ?? null;

    if (empty($email) || empty($senha)) {
        // Caso os campos estejam vazios
        $msg_erro = "Você precisa preencher os campos de email e senha!";
    } else {
        // Verifica as credenciais no arquivo JSON
        $credenciais = json_decode(file_get_contents(__DIR__ . "/../dados/usuarios.json"), true);
        $conteudo = file_get_contents(__DIR__ . "/../dados/usuarios.json");
        if ($conteudo === false) {
            die("Erro ao acessar o arquivo de usuários.");
        }
        $credenciais = json_decode($conteudo, true);


        foreach ($credenciais as $usuario) {
            if ($usuario['email'] == $email && $usuario['senha'] == $senha) {
                // Credenciais corretas: salva o email na sessão e redireciona ao menu
                $_SESSION['email'] = $email;
                $_SESSION['usuario_id'] = $usuario['id'];
                header('Location: index.php?pagina=home');
                exit;
            }
        }
        // Caso as credenciais estejam incorretas
        $msg_erro = "Credenciais inválidas! Tente novamente.";
    }
}

 // Carrega o conteúdo HTML do formulário de login
 $pagina_login= file_get_contents(__DIR__ . '/../html/login.html');
 // Substitui o placeholder de erro no HTML
 $pagina_login = str_replace("{{mensagem_erro_login}}", "<div id='mensagemErroLogin' style='color: red;'>$msg_erro</div>", $pagina_login);

// Exibe a página de login
echo $pagina_login;
?>



