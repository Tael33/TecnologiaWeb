const notas = [];
const listaNotas = document.getElementById('lista-notas');
const resultado = document.getElementById('resultado');

function adicionarNota() {
    const inputNota = document.getElementById('input-nota');
    const nota = Number(inputNota.value);

   
    if (notas.length >= 4) {
        alert("Você já adicionou as 4 notas!");
        return;
    }

  
    if (isNaN(nota) || nota < 0 || nota > 10 || inputNota.value === "") {
        alert("Informe uma nota válida (entre 0 e 10)!");
        return;
    }

    
    notas.push(nota);
    
    
    const li = document.createElement('li');
    li.textContent = `Nota ${notas.length}: ${nota}`;
    listaNotas.appendChild(li);

    inputNota.value = ''; 
    inputNota.focus();

   
    if (notas.length === 4) {
        let soma = 0;

        for (let i = 0; i < notas.length; i++) {
            
            soma += notas[i];
        }

        const media = soma / 4;
        
        if (media >= 6) {
            resultado.textContent = `Média: ${media.toFixed(2)} – Aprovado!`;
            resultado.className = 'aprovado';
        } else {
            resultado.textContent = `Média: ${media.toFixed(2)} – Reprovado.`;
            resultado.className = 'reprovado';
        }
    }
}