// Variáveis globais para contagem
var totalGeral = 0;
var totalAlta = 0;
var totalMedia = 0;
var totalBaixa = 0;

function adicionarTarefa() {
    // 1. Capturar valores dos inputs
    var codigo = document.getElementById('codigo').value;
    var descricao = document.getElementById('descricao').value;
    var prioridade = document.getElementById('prioridade').value;

    // Validação simples
    if (codigo === "" || descricao === "") {
        alert("Por favor, preencha código e descrição.");
        return;
    }

    // 2. Criar o elemento HTML da tarefa visualmente
    var novaDiv = document.createElement('div');
    novaDiv.className = "tarefa-item";
    
    // Montar o conteúdo HTML da tarefa
    // A função removerTarefa agora passa 'this' e a string da prioridade
    novaDiv.innerHTML = "<strong>" + codigo + "</strong>: " + descricao + 
                        " <button class='btn-remover' onclick='removerTarefa(this, \"" + prioridade + "\")'>X</button>";

    // 3. Decidir em qual coluna colocar e atualizar contador específico
    if (prioridade === 'alta') {
        document.getElementById('lista-alta').appendChild(novaDiv);
        totalAlta = totalAlta + 1;
        atualizarContador('cont-alta', totalAlta);
    } 
    else if (prioridade === 'media') {
        document.getElementById('lista-media').appendChild(novaDiv);
        totalMedia = totalMedia + 1;
        atualizarContador('cont-media', totalMedia);
    } 
    else if (prioridade === 'baixa') {
        document.getElementById('lista-baixa').appendChild(novaDiv);
        totalBaixa = totalBaixa + 1;
        atualizarContador('cont-baixa', totalBaixa);
    }

    // 4. Atualizar total geral
    totalGeral = totalGeral + 1;
    document.getElementById('total-geral').innerText = totalGeral;

    // 5. Limpar campos para nova digitação
    document.getElementById('codigo').value = "";
    document.getElementById('descricao').value = "";
}

function removerTarefa(botao, prioridade) {
    // Acessa o pai do botão (a div da tarefa) e o remove do HTML
    var tarefaParaRemover = botao.parentNode;
    tarefaParaRemover.remove();

    // Atualizar contadores para baixo (subtração)
    if (prioridade === 'alta') {
        totalAlta = totalAlta - 1;
        atualizarContador('cont-alta', totalAlta);
    } 
    else if (prioridade === 'media') {
        totalMedia = totalMedia - 1;
        atualizarContador('cont-media', totalMedia);
    } 
    else if (prioridade === 'baixa') {
        totalBaixa = totalBaixa - 1;
        atualizarContador('cont-baixa', totalBaixa);
    }

    // Atualizar total geral
    totalGeral = totalGeral - 1;
    document.getElementById('total-geral').innerText = totalGeral;
}

// Função utilitária para atualizar o texto de um elemento
function atualizarContador(idElemento, valor) {
    document.getElementById(idElemento).innerText = valor;
}