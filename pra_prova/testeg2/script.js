let alunos = [];

function adicionarAluno() {
    let mat = document.getElementById("matriculaInput").value;
    let nome = document.getElementById("nomeInput").value;
    let nota = document.getElementById("notaInput").value;

    if (mat === "" || nome === "" || nota === "") {
        alert("Preencha todos os campos!");
        return;
    }

    nota = parseFloat(nota);

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i][0] == mat) {
            alert("Já existe um aluno com essa matrícula!");
            return;
        }
    }

    alunos.push([mat, nome, nota]);

    let lista = document.getElementById("listaAlunos");
    let li = document.createElement("li");
    li.id = "aluno-" + mat;
    li.innerText = mat + " - " + nome + " - Nota: " + nota;
    lista.appendChild(li);

    calcularMedia();
    
    document.getElementById("matriculaInput").value = "";
    document.getElementById("nomeInput").value = "";
    document.getElementById("notaInput").value = "";
}

function removerAluno() {
    let mat = document.getElementById("removerInput").value;
    let posicao = -1;

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i][0] == mat) {
            posicao = i;
            break;
        }
    }

    if (posicao === -1) {
        alert("Aluno não encontrado!");
    } else {
        
        alunos.splice(posicao, 1);
        
        let item = document.getElementById("aluno-" + mat);
        if (item) {
            item.remove();
        }

        calcularMedia();
        document.getElementById("removerInput").value = "";
    }
}

function calcularMedia() {
    let total = 0;
    if (alunos.length === 0) {
        document.getElementById("mediaGeral").innerText = "Média: 0.0";
        return;
    }

    for (let i = 0; i < alunos.length; i++) {
        total = total + alunos[i][2];
    }

    let media = total / alunos.length;
    document.getElementById("mediaGeral").innerText = "Média: " + media.toFixed(1);
}