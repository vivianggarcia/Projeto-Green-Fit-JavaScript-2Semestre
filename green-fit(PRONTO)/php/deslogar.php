<?php
 defined('CONTROLE') or die('Erro no acesso');

 //encerra a sessão e volta para a tela de login.
 session_destroy();
 header('Location: index.php?pagina=login');
?>