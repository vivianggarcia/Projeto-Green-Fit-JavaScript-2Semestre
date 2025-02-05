<?php
    include("config.php");

    //faz o conteúdo html aparecer na tela.
    $conteudo_imc = file_get_contents(__DIR__ . '/../html/tmb-imc.html');
    echo $conteudo_imc;
?>