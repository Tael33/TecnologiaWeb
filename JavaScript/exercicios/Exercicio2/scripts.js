let todosProdutos = [];

const produtoInput = document.getElementById("produtoInput");
const listaProdutosUI = document.getElementById("listaProdutos");
const listaResumoUI = document.getElementById("listaResumo");

function adicionarNovoProduto() {
    const nomeProduto = produtoInput.value;

    if (nomeProduto === "") {
        alert("Informe o nome do produto!");
        return;
    }

    todosProdutos.push(nomeProduto);
    produtoInput.value = "";

    atualizarListaProdutos();
    atualizarListaResumo();
}

function atualizarListaProdutos() {
    listaProdutosUI.innerHTML = "";

    for (let i = 0; i < todosProdutos.length; i++) {
        const produto = todosProdutos[i];
        const li = document.createElement("li");
        li.textContent = produto;
        listaProdutosUI.appendChild(li);
    }
}

function atualizarListaResumo() {
    const contagemProdutos = {};

    for (let i = 0; i < todosProdutos.length; i++) {
        const produto = todosProdutos[i];
        if (contagemProdutos[produto]) {
            contagemProdutos[produto]++;
        } else {
            contagemProdutos[produto] = 1;
        }
    }

    listaResumoUI.innerHTML = "";

    for (let produto in contagemProdutos) {
        const quantidade = contagemProdutos[produto];
        const li = document.createElement("li");
        li.textContent = `${produto} — ${quantidade}x`;
        listaResumoUI.appendChild(li);
    }
}