<?php
// Caminho para o arquivo HTML do formulário de cadastro
$pagina_cadastro = file_get_contents(__DIR__ . '/../html/cadastro.html');

// Exibe o conteúdo do HTML
echo $pagina_cadastro;

// Processamento do cadastro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'] ?? '';
    $sobrenome = $_POST['sobrenome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // Verifica se todos os campos estão preenchidos
    if (empty($nome) || empty($sobrenome) || empty($email) || empty($senha)) {
        echo "<div style='color:red;'>Por favor, preencha todos os campos.</div>";
        exit;
    }

    // Carrega o arquivo de dados JSON
    $arq_dados = __DIR__ . '/../dados/usuarios.json';
    $dados = file_exists($arq_dados) ? json_decode(file_get_contents($arq_dados), true) : [];


    // Verifica se o email já está cadastrado
    foreach ($dados as $usuario) {
        if ($usuario['email'] === $email) {
            echo "<div style='color:red;'>Esse email já foi cadastrado.</div>";
            exit;
        }
    }

    // Gera um novo ID para o usuário
    $id = !empty($dados) ? max(array_column($dados, 'id')) + 1 : 1;

    // Adiciona o novo usuário
    $dados[] = [
        'id' => $id,
        'nome' => $nome,
        'sobrenome' => $sobrenome,
        'email' => $email,
        'senha' => $senha
    ];

    if (file_put_contents($arq_dados, json_encode($dados)) === false) {
        echo "<div style='color:red;'>Erro ao salvar os dados. Tente novamente.</div>";
    } else {
        echo "<div style='color:green;'>Cadastro realizado com sucesso!</div>";

                // Caminho do arquivo usuario_metas.json
                $metasFile = __DIR__ . '/../dados/usuarios_metas.json';

                // Carrega os dados existentes ou cria um novo array se o arquivo não existir
                $metas = file_exists($metasFile) ? json_decode(file_get_contents($metasFile), true) : [];
        
                // Adiciona o novo usuário ao usuario_metas.json com campos vazios para altura, peso, etc.
                $metas[$id] = [
                    'altura' => null,
                    'peso' => null,
                    'cintura' => null,
                    'braco' => null,
                    'perna' => null,
                    'data' => date('Y-m-d') // Data de criação
                ];
        
                // Salva o conteúdo atualizado de volta ao arquivo usuario_metas.json
                file_put_contents($metasFile, json_encode($metas, JSON_PRETTY_PRINT));
    }
}
?>