<?php
    include("config.php");

    //faz o conteúdo html aparecer na tela.
    $conteudo_receitas = file_get_contents(__DIR__ . '/../html/receitas.html');
    echo $conteudo_receitas;
?>