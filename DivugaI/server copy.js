// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Carrega variáveis de ambiente do .env

const app = express();
const PORT = process.env.PORT || 3000; // Porta do servidor

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        // Criar tabela de usuários se não existir
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`, (createErr) => {
            if (createErr) {
                console.error('Erro ao criar tabela de usuários:', createErr.message);
            } else {
                console.log('Tabela "users" verificada/criada.');
            }
        });
    }
});

// Middleware para analisar o corpo das requisições JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, JS do frontend)
app.use(express.static(__dirname)); // Servir arquivos da pasta raiz (onde estão index.html, portfolio.html, css, js)

// Rota para a página de registro
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

// Rota para a página de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Rota de registro (POST)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Usuário e senha são obrigatórios.');
    }

    try {
        // Verificar se o usuário já existe
        const userExists = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (userExists) {
            return res.status(409).send('Nome de usuário já existe.');
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo do salt

        // Inserir novo usuário no banco de dados
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
            if (err) {
                console.error('Erro ao inserir usuário:', err.message);
                return res.status(500).send('Erro ao registrar usuário.');
            }
            res.status(201).send('Usuário registrado com sucesso!');
        });
    } catch (error) {
        console.error('Erro no registro:', error.message);
        res.status(500).send('Erro interno do servidor.');
    }
});

// Rota de login (POST)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Usuário e senha são obrigatórios.');
    }

    try {
        // Buscar usuário no banco de dados
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });

        if (!user) {
            return res.status(401).send('Usuário ou senha inválidos.');
        }

        // Comparar senha
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Em uma aplicação real, você geraria um token JWT ou sessão aqui
            res.status(200).send('Login bem-sucedido! Bem-vindo(a), ' + user.username);
        } else {
            res.status(401).send('Usuário ou senha inválidos.');
        }
    } catch (error) {
        console.error('Erro no login:', error.message);
        res.status(500).send('Erro interno do servidor.');
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});