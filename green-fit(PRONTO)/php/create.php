<?php
include(__DIR__ . '/../php/config.php');



$nomeArq = '../dados/usuarios.json'; 
$existe = file_exists($nomeArq);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'salvar') {
    $novoUsuario = [
        'id' => gerarId($existe ? json_decode(file_get_contents($nomeArq), true) : []),
        'nome' => $_POST['nome'],
        'email' => $_POST['email'],
        'login' => $_POST['login'],
        'senha' => $_POST['senha'],
    ];

    $dadosLidos = $existe ? json_decode(file_get_contents($nomeArq), true) : [];
    $dadosLidos[] = $novoUsuario; 

    file_put_contents($nomeArq, json_encode($dadosLidos, JSON_PRETTY_PRINT));
    header("Location: " . $_SERVER['PHP_SELF']); 
    exit();
}
include('../html/usuario.html');


if (!$existe) {
    echo "<p><h3>Não existe nenhum usuário...</h3></p>";
} else {
    $jsonLido = file_get_contents($nomeArq);
    $dadosLidos = json_decode($jsonLido, true);

    echo "<hr><center><table><tr><td>Login</td><td>Email</td><td>Ações</td></tr>";
    foreach ($dadosLidos as $usuario) {
        $update = "crud.php?id=" . $usuario["id"]; 
        $delete = "delete.php?id=" . $usuario["id"]; 

        echo "<tr>";
        echo "<td>" . htmlspecialchars($usuario["login"]) . "</td>";
        echo "<td>" . htmlspecialchars($usuario["email"]) . "</td>";
        echo "<td>";
        echo "<a href='" . $update . "'>Alterar</a> &nbsp; ";
        echo "<a href='" . $delete . "' onclick=\"return confirm('Tem certeza que deseja excluir?');\">Excluir</a>";
        echo "</td></tr>";
    }
    echo "</table></center>";
}


function gerarId($dados) {
    $ids = array_column($dados, 'id');
    return count($ids) > 0 ? max($ids) + 1 : 1; 
}
?>