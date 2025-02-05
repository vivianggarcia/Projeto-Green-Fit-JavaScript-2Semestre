<?php
include("config.php");
defined('CONTROLE') or die('Erro no acesso');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


//$conteudo_pagina_metas = file_get_contents(__DIR__ . '/../html/metas.html');
//echo $conteudo_pagina_metas;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se o usuário está logado
    if (!isset($_SESSION['email'])) {
        echo "Erro: Usuário não está logado.";
        exit();
    }
    $emailUsuario = $_SESSION['email'];

    // Caminho para o arquivo de metas
    $arquivoMetas = __DIR__ . '/../dados/usuarios_metas.json';

    // Dados do formulário
    $dataAtual = $_POST['data_atual'] ?? '';
    $pesoAtual = $_POST['peso_atual'] ?? '';
    $bracoAtual = $_POST['braco_atual'] ?? '';
    $cinturaAtual = $_POST['cintura_atual'] ?? '';
    $pernaAtual = $_POST['perna_atual'] ?? '';

    // Ler conteúdo existente no arquivo
    $dadosMetas = [];
    if (file_exists($arquivoMetas)) {
        $conteudoAtual = file_get_contents($arquivoMetas);
        $dadosMetas = json_decode($conteudoAtual, true) ?? [];
    }

    // Nova meta do usuário
    $novaMeta = [
        'data' => $dataAtual,
        'peso' => $pesoAtual ?: null,
        'braco' => $bracoAtual ?: null,
        'cintura' => $cinturaAtual ?: null,
        'perna' => $pernaAtual ?: null,
    ];

    // Adiciona as metas ao email do usuário no array
    if (!isset($dadosMetas[$emailUsuario])) {
        $dadosMetas[$emailUsuario] = [];
    }

    $dadosMetas[$emailUsuario][] = $novaMeta;

    // Salvar os dados atualizados no JSON
    if (file_put_contents($arquivoMetas, json_encode($dadosMetas, JSON_PRETTY_PRINT)) !== false) {
        // Redirecionar para evitar reenvio do formulário
        header("Location: index.php?pagina=metas");
        exit();
    } else {
        echo "Erro ao salvar os dados.";
    }

    
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atualização de Metas</title>

    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
    <span id="usuarioEmail" data-email="<?php echo $_SESSION['email']; ?>"></span>
    <div class="topo">
        <div class="logo">
            green fit
        </div>

        <div class="navbar">
            <span class="navlinks"><a href="index.php?pagina=home">Início</a></span>
            <span class="navlinks"><a href="index.php?pagina=metas">Metas</a></span>
            <span class="navlinks"><a href="index.php?pagina=imc">TMB IMC</a></span>
            <span class="navlinks"><a href="index.php?pagina=treinos">Treinos</a></span>
            <span class="navlinks"><a href="index.php?pagina=receitas">Receitas</a></span>
            <span class="navlinks"><a href="index.php?pagina=perfil">Perfil</a></span>
            <span class="material-symbols-rounded size-20">person</span>    
        </div>
    </div>

    <main>
        <div class="metas">
            <h1>Atualização de Metas</h1>


            <div class="wrapper1">
                    <h3>Ultimo registro:</h3>
                    <table>
                        <tr>
                            <td>Peso (kg): </td>
                                <td>
                                    <div class="w1-result-peso"></div>
                                </td>
                        </tr>
                        <tr>
                            <td>Braço (cm):</td>
                            <td>
                                <div class="w1-result-braco"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Cintura (cm):</td>
                            <td>
                                <div class="w1-result-cintura"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Perna (cm):</td>
                            <td>
                                <div class="w1-result-perna"></div>
                            </td>
                        </tr>
                    </table>
                </div>

            <form action="" method="post">
                <div class="wrapper2">
                    <div class="w2-labels">
                        <label for="data_atual">Data: </label>
                    </div>
                    <input type="date" name="data_atual" id="data_atual">

                    <div class="w2-labels">
                        <label for="peso_atual">Peso: (kg): </label>
                    </div>
                    <input type="number" name="peso_atual" id="peso_atual">

                    <div class="w2-labels">
                        <label for="braco_atual">Braço (cm): </label>
                    </div>
                    <input type="number" name="braco_atual" id="braco_atual">

                    <div class="w2-labels">
                        <label for="cintura_atual">Cintura (cm): </label>
                    </div>
                    <input type="number" name="cintura_atual" id="cintura_atual">

                    <div class="w2-labels">
                        <label for="perna_atual">Perna (cm): </label>
                    </div>
                    <input type="number" name="perna_atual" id="perna_atual">

                    <div class="btn-enviar">
                        <input type="submit" value="Enviar">
                    </div>
                </div>
            </form>


                <div class="wrapper3">
                    <h3>Penúltimo registro:</h3>

                    <table>
                        <tr>
                            <td>Data: </td>
                            <td> 
                                <div class="w3-result"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Peso (kg): </td>
                            <td> 
                                <div class="w3-result-peso"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Braço (cm):</td>
                            <td> 
                                <div class="w3-result-braco"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Cintura (cm):</td>
                            <td> 
                                <div class="w3-result-cintura"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>Perna (cm):</td>
                            <td> 
                                <div class="w3-result-perna"></div>
                            </td>
                    </table>
                </div>

        </div>

    </main>

    <footer class="contato">
        <span><a href="#"><u>n</u></a></a> (12) 3456-7890</span>
        <span><a href="#"><u>c</u></a></span>
        <span><a href="#"><u>f</u></a></span>
        <span><a href="#"><u>i</u></a></span>
        <span><a href="#"><u>t</u></a></span>
    </footer>

    <script src="js/metas.js"></script>
    <script>
        const emailUsuario = '<?php echo $_SESSION["email"]; ?>';
    </script>
</body>
</html>



