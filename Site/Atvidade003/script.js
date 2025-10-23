document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value,
        ano: document.getElementById("ano").value,
        resenha: document.getElementById("resenha").value,
    };

    // Enviar dados para o backend
    fetch("cadastrar.php", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message || data.error);
            carregarLivros();
        })
        .catch((error) => console.error("Erro:", error));
});

function carregarLivros() {
    fetch("consultar.php")
        .then((response) => response.json())
        .then((livros) => {
            const tabela = document.querySelector("#tabelaLivros tbody");
            tabela.innerHTML = "";
            livros.forEach((livro) => {
                tabela.innerHTML += `
                    <tr>
                        <td>${livro.id}</td>
                        <td>${livro.titulo}</td>
                        <td>${livro.autor}</td>
                        <td>${livro.genero}</td>
                        <td>${livro.ano_publicacao}</td>
                    </tr>`;
            });
        });
}

// Carregar livros ao iniciar
carregarLivros();
