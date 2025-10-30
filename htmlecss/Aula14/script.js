let numerosPares = [];
let numerosImpares = [];
let somatorioPares = 0;
let somatorioImpares = 0;

function adicionarNumero() {
    const numeroInput = document.getElementById('numeroInput');
    const numero = parseInt(numeroInput.value);

    if (isNaN(numero)) {
        alert('Por favor, digite um número válido.');
        return;
    }

    if (numero % 2 === 0) {
        numerosPares.push(numero);
        somatorioPares += numero;
        atualizarLista('listaPares', numero);
        document.getElementById('somatorioPares').textContent = somatorioPares;
    } else {
        numerosImpares.push(numero);
        somatorioImpares += numero;
        atualizarLista('listaImpares', numero);
        document.getElementById('somatorioImpares').textContent = somatorioImpares;
    }

    numeroInput.value = '';
    numeroInput.focus();
}
function atualizarLista(idLista, numero) {
    const lista = document.getElementById(idLista);
    const li = document.createElement('li');
    li.textContent = numero;
    lista.appendChild(li);
}