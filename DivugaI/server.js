// server.js - Versão Corrigida e Aprimorada

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Carrega variáveis de ambiente do .env

const app = express();
// Usa a porta do ambiente (para deploy) ou 3000 por padrão
const PORT = process.env.PORT || 3000; 

// Conectar ao banco de dados SQLite
// Usar `sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE` é uma boa prática
// para garantir que o arquivo é criado se não existir.
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        // Erro fatal: o servidor não pode iniciar sem o DB
        console.error('Erro fatal ao conectar ao banco de dados:', err.message);
        // Opcional: process.exit(1); para encerrar a aplicação se o DB não conectar
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
app.use(express.json()); // Para requisições com 'Content-Type: application/json'
app.use(express.urlencoded({ extended: true })); // Para requisições com 'Content-Type: application/x-www-form-urlencoded'

// Servir arquivos estáticos (HTML, CSS, JS do frontend)
// Isso servirá todos os arquivos da pasta onde `server.js` está,
// incluindo `index.html`, `portfolio.html`, `css/`, `js/` etc.
// Para projetos maiores, uma pasta 'public' dedicada é recomendada.
app.use(express.static(__dirname)); 

// ===========================================
// Rotas para as páginas HTML
// ===========================================

// Rota principal para a página inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para a página de portfólio
app.get('/portfolio.html', (req, res) => {
    res.sendFile(__dirname + '/portfolio.html');
});

// Rota para a página "Sobre Nós"
app.get('/sobre-nos.html', (req, res) => {
    res.sendFile(__dirname + '/sobre-nos.html');
});

// Rota para a página "Solicite Orçamento"
app.get('/solicite-orcamento.html', (req, res) => {
    res.sendFile(__dirname + '/solicite-orcamento.html');
});

// Rota para a página de registro
app.get('/register.html', (req, res) => { // Alterado para .html para consistência
    res.sendFile(__dirname + '/register.html');
});

// Rota para a página de login
app.get('/login.html', (req, res) => { // Alterado para .html para consistência
    res.sendFile(__dirname + '/login.html');
});


// ===========================================
// Rotas da API de Autenticação
// ===========================================

// Rota de registro (POST)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validação básica de entrada
    if (!username || !password) {
        return res.status(400).send('Usuário e senha são obrigatórios.');
    }

    if (username.length < 3 || password.length < 6) {
        return res.status(400).send('Usuário deve ter pelo menos 3 caracteres e senha pelo menos 6 caracteres.');
    }

    try {
        // Verificar se o usuário já existe
        const userExists = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) {
                    console.error('Erro na consulta de usuário existente:', err.message);
                    return reject(new Error('Erro interno do servidor ao verificar usuário.'));
                }
                resolve(row);
            });
        });

        if (userExists) {
            return res.status(409).send('Nome de usuário já existe.');
        }

        // Hash da senha com um custo de salt seguro
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Inserir novo usuário no banco de dados
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
            if (err) {
                console.error('Erro ao inserir novo usuário:', err.message);
                return res.status(500).send('Erro ao registrar usuário.');
            }
            // `this.lastID` contém o ID do novo usuário inserido
            console.log(`Usuário ${username} registrado com sucesso. ID: ${this.lastID}`);
            res.status(201).send('Usuário registrado com sucesso!');
        });
    } catch (error) {
        console.error('Erro inesperado no registro:', error.message);
        res.status(500).send('Erro interno do servidor.');
    }
});

// Rota de login (POST)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validação básica de entrada
    if (!username || !password) {
        return res.status(400).send('Usuário e senha são obrigatórios.');
    }

    try {
        // Buscar usuário no banco de dados
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
                if (err) {
                    console.error('Erro na consulta de login:', err.message);
                    return reject(new Error('Erro interno do servidor ao buscar usuário.'));
                }
                resolve(row);
            });
        });

        if (!user) {
            // Não informar se é o usuário ou a senha que está errado por segurança
            return res.status(401).send('Usuário ou senha inválidos.');
        }

        // Comparar senha hasheada
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Em uma aplicação real, você geraria um token JWT (JSON Web Token)
            // ou gerenciaria uma sessão para manter o usuário logado.
            // Por enquanto, apenas um feedback de sucesso.
            console.log(`Login bem-sucedido para o usuário: ${user.username}`);
            res.status(200).send('Login bem-sucedido! Bem-vindo(a), ' + user.username);
        } else {
            console.log(`Tentativa de login falha para o usuário: ${username}`);
            res.status(401).send('Usuário ou senha inválidos.');
        }
    } catch (error) {
        console.error('Erro inesperado no login:', error.message);
        res.status(500).send('Erro interno do servidor.');
    }
});

// ===========================================
// Iniciar o servidor
// ===========================================
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Tratamento de erros globais para capturar exceções não tratadas
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado (uncaughtException):', err);
    // Em produção, você pode querer encerrar o processo ou logar em um serviço
    // process.exit(1); 
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejeição de Promise não tratada (unhandledRejection):', reason, promise);
    // Em produção, você pode querer encerrar o processo ou logar em um serviço
    // process.exit(1);
});