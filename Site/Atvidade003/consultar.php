<?php
header('Content-Type: application/json');

// Conexão com o banco
$host = 'localhost';
$dbname = 'biblioteca';
$user = 'root'; // Altere se necessário
$password = ''; // Altere se necessário

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta todos os livros
    $stmt = $conn->query("SELECT * FROM livros");
    $livros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($livros);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
