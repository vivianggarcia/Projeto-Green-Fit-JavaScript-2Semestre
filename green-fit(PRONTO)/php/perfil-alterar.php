<?php
include("config.php");

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Inicializa a mensagem de erro
$msgErro = "";

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recebe os valores do formulário
    $email = $_POST['email'] ?? null;
    $novaSenha = $_POST['nova-senha'] ?? null;
    $confSenha = $_POST['conf-senha'] ?? null;

    // Validações
    if (empty($email) || empty($novaSenha) || empty($confSenha)) {
        $msgErro = "Todos os campos devem ser preenchidos!";
    } else {
        // Carrega os dados dos usuários do JSON
        $caminhoArquivo = __DIR__ . '/../dados/usuarios.json';
        $usuarios = json_decode(file_get_contents($caminhoArquivo), true);

        // Verifica se o email existe no arquivo
        $usuarioEncontrado = false;
        foreach ($usuarios as &$usuario) {
            if ($usuario['email'] === $email) {
                $usuarioEncontrado = true;

                // Verifica se as senhas coincidem
                if ($novaSenha !== $confSenha) {
                    $msgErro = "A confirmação da senha deve ser igual à nova senha.";
                } else {
                    // Atualiza a senha do usuário
                    $usuario['senha'] = $novaSenha;

                    // Salva as alterações no arquivo JSON
                    file_put_contents($caminhoArquivo, json_encode($usuarios, JSON_PRETTY_PRINT));

                    // Mensagem de sucesso
                    $msgErro = "Senha alterada com sucesso!";
                }
                break;
            }
        }

        if (!$usuarioEncontrado) {
            $msgErro = "O email digitado está incorreto.";
        }
    }
}

// Carrega o conteúdo HTML do formulário
$conteudo_perfilAlterar = file_get_contents(__DIR__ . '/../html/perfil-alterar.html');

// Substitui a mensagem de erro no HTML
$conteudo_perfilAlterar = str_replace("#msgErro", $msgErro, $conteudo_perfilAlterar);

// Exibe o conteúdo atualizado
echo $conteudo_perfilAlterar;
?>