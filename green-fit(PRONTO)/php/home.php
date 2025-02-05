<?php
    include("config.php");

    //faz o conteúdo html aparecer na tela.
    $conteudo_home = file_get_contents(__DIR__ . '/../html/home.html');
    echo $conteudo_home;
?>