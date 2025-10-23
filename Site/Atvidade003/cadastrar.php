<?php
header('Content-Type: application/json');

// Conexão com o banco de dados
$host = 'localhost';
$dbname = 'biblioteca';
$user = 'root'; // Altere se necessário
$password = ''; // Altere se necessário

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    // Insere no banco de dados
    $sql = "INSERT INTO livros (titulo, autor, genero, ano_publicacao, resenha) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$data['titulo'], $data['autor'], $data['genero'], $data['ano'], $data['resenha']]);

    echo json_encode(['message' => 'Livro cadastrado com sucesso!']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
