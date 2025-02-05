<?php
    include("config.php");

    //faz o conteúdo html aparecer na tela.
    $conteudo_treinos = file_get_contents(__DIR__ . '/../html/treinos.html');
    echo $conteudo_treinos;
?>