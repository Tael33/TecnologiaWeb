// Variáveis para contar quantidades
var totalGeral = 0;
var totalAlta = 0;
var totalMedia = 0;
var totalBaixa = 0;

function adicionarTarefa() {
    // 1. Pegar valores
    var codigo = document.getElementById('codigo').value;
    var descricao = document.getElementById('descricao').value;
    var prioridade = document.getElementById('prioridade').value;

    // Validação básica de campo vazio
    if (codigo === "" || descricao === "") {
        alert("Preencha o código e a descrição!");
        return;
    }

    // --- REQUISITO CRÍTICO: CÓDIGO ÚNICO ---
    // Criamos um ID padrão. Ex: se o código for 10, o ID será "task-10"
    var idElemento = "task-" + codigo;
    
    // Verificamos se já existe um elemento com esse ID no HTML
    var existe = document.getElementById(idElemento);

    if (existe) {
        // Frase exata pedida na imagem 2
        alert("Já existe uma tarefa com esse código!");
        return; // Para a função aqui
    }

    // 2. Criar o elemento visual (DIV)
    var novaDiv = document.createElement('div');
    novaDiv.className = "tarefa-item";
    novaDiv.id = idElemento; // Colocamos o ID na div para achar ela depois
    novaDiv.innerHTML = "<strong>Cód: " + codigo + "</strong> - " + descricao;

    // 3. Adicionar na coluna correta e atualizar contadores
    if (prioridade === 'alta') {
        document.getElementById('lista-alta').appendChild(novaDiv);
        totalAlta = totalAlta + 1;
        document.getElementById('cont-alta').innerText = totalAlta;
    } 
    else if (prioridade === 'media') {
        document.getElementById('lista-media').appendChild(novaDiv);
        totalMedia = totalMedia + 1;
        document.getElementById('cont-media').innerText = totalMedia;
    } 
    else if (prioridade === 'baixa') {
        document.getElementById('lista-baixa').appendChild(novaDiv);
        totalBaixa = totalBaixa + 1;
        document.getElementById('cont-baixa').innerText = totalBaixa;
    }

    // 4. Atualizar total geral
    totalGeral = totalGeral + 1;
    document.getElementById('total-geral').innerText = totalGeral;

    // Limpar campos
    document.getElementById('codigo').value = "";
    document.getElementById('descricao').value = "";
}

function removerPorCodigo() {
    // 1. Pegar o código digitado
    var codigoDigitado = document.getElementById('codigo-remover').value;

    // Montar o ID que estamos procurando
    var idBusca = "task-" + codigoDigitado;
    
    // Tentar achar o elemento no HTML
    var elementoEncontrado = document.getElementById(idBusca);

    if (elementoEncontrado) {
        // --- SE ENCONTRAR (SUCESSO) ---
        
        // Descobre quem é o pai (para saber qual contador diminuir)
        var pai = elementoEncontrado.parentNode;
        var idPai = pai.id; // Vai ser 'lista-alta', 'lista-media' ou 'lista-baixa'

        // Remove da tela
        elementoEncontrado.remove();

        // Atualiza os contadores decrementando
        if (idPai === 'lista-alta') {
            totalAlta = totalAlta - 1;
            document.getElementById('cont-alta').innerText = totalAlta;
        } 
        else if (idPai === 'lista-media') {
            totalMedia = totalMedia - 1;
            document.getElementById('cont-media').innerText = totalMedia;
        } 
        else if (idPai === 'lista-baixa') {
            totalBaixa = totalBaixa - 1;
            document.getElementById('cont-baixa').innerText = totalBaixa;
        }

        // Atualiza o geral
        totalGeral = totalGeral - 1;
        document.getElementById('total-geral').innerText = totalGeral;

        // Limpa o campo de remoção
        document.getElementById('codigo-remover').value = "";
        alert("Tarefa removida com sucesso!");

    } else {
        // --- SE NÃO ENCONTRAR (ERRO) ---
        // Frase exata pedida na imagem 2
        alert("Tarefa não encontrada!");
    }
}