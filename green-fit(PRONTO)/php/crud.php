<?php
 include("config.php");

 $registrar = true;

 if(isset($_REQUEST['id'])) {
     $registrar = false;
 }

 $nome = "";
 $sobrenome = "";
 $email = "";
 $senha = "";
 $acao = "create.php";

 function ler_dados($id, $arq_dados)
 {
   $dados_json = file_get_contents($arq_dados);
   $dados = [];
   $usuarios = json_decode($dados_json, true);
   foreach ($usuarios as $usuario) {
      if ( $usuario['id'] == $id ){
           $dados = $usuario;
           break;
      }
   }
   return $dados;
 }

 if ($registrar == false) {
    $dados = ler_dados($_REQUEST["id"], $arq_dados);
    $id = $dados['id'];
    $nome = $dados['nome'];
    $sobrenome = $dados['sobrenome'];
    $email = $dados['email'];
    $senha = $dados['senha'];
 }

 function preencher_pagina($nome, $sobrenome, $email, $senha, $id, 
 $usuario_cadastrado,  $acao) {
 $conteudo_pagina = file_get_contents($usuario_cadastrado);
 $conteudo_pagina = str_replace("#nome", $nome, $conteudo_pagina);
 $conteudo_pagina = str_replace("#sobrenome", $sobrenome, $conteudo_pagina);
 $conteudo_pagina = str_replace("#email", $email, $conteudo_pagina);
 $conteudo_pagina = str_replace("#senha", $senha, $conteudo_pagina);
 $conteudo_pagina = str_replace("#id",       $id, $conteudo_pagina);
 $conteudo_pagina = str_replace("#acao",   $acao, $conteudo_pagina);
 return $conteudo_pagina; 	
 }

 $conteudo_pagina = preencher_pagina($nome, $sobrenome, $email, $senha, $id, $usuario_cadastrado, $acao);
 echo $conteudo_pagina;
 
?>