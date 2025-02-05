<?php
// Inicia a sessão
session_start();

// Cria uma constante para garantir que o código foi acessado pelo index
define('CONTROLE', true);

// Verifica se o usuário está logado
$login_ok = $_SESSION['email'] ?? null;

// Define a página inicial com base no estado de login
if (empty($login_ok)) {
    $pagina = $_GET['pagina'] ?? 'login'; // Padrão é a página de login
} else {
    $pagina = $_GET['pagina'] ?? 'home';  // Padrão é a página inicial do site
}

// Impede acesso à página de login caso o usuário já esteja logado
if (!empty($login_ok) && $pagina === 'login') {
    $pagina = 'home';
}

// Lista de páginas permitidas
$paginas = [
    'login' => 'php/login.php',
    'cadastro' => 'php/cadastro.php',
    'home' => 'php/home.php',
    'deslogar' => 'php/deslogar.php',
    'metas' => 'php/metas.php',
    'imc' => 'php/imc.php',
    'treinos' => 'php/treinos.php',
    'receitas' => 'php/receitas.php',
    'perfil' => 'php/perfil.php'
];

// Verifica se a página solicitada existe no array
if (!array_key_exists($pagina, $paginas)) {
    die('Erro: Página não encontrada.'); // Mensagem de erro amigável
}

// Requer o arquivo correspondente à página solicitada
require_once $paginas[$pagina];
?>
