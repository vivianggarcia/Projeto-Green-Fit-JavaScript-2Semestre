<?php
    include("config.php");
    defined('CONTROLE') or die('Erro no acesso');

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }


    //faz o conteúdo html aparecer na tela.
    $conteudo_perfil = file_get_contents(__DIR__ . '/../html/perfil.html');
    echo $conteudo_perfil;

    
?>