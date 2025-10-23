<?php
require 'db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $action = $_POST['action'];

    if ($action === 'register') {
        $username = htmlspecialchars($_POST['username']);
        $email = htmlspecialchars($_POST['email']);
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$username, $email, $password])) {
            echo "<script>alert('Cadastro realizado com sucesso!'); window.location.href='login.html';</script>";
        } else {
            echo "<script>alert('Erro ao cadastrar. Tente novamente.'); window.location.href='cadastro.html';</script>";
        }
    }

    if ($action === 'login') {
        $username = htmlspecialchars($_POST['username']);
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            echo "<script>alert('Login efetuado com sucesso!'); window.location.href='dashboard.html';</script>";
        } else {
            echo "<script>alert('Usuário ou senha inválidos!'); window.location.href='login.html';</script>";
        }
    }
}
?>
