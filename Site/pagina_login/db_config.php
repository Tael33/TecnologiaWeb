<?php
$host = 'localhost'; // Endereço do servidor
$db = 'user_management'; // Nome do banco de dados
$user = 'root'; // Usuário do banco
$password = ''; // Senha do banco

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
}
?>
