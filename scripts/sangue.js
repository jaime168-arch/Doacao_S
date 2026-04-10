document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formDoador');
    const mensagemDiv = document.getElementById('mensagem');
    const tabelaContainer = document.getElementById('tabelaContainer');
    

    let doadores = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();


        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const idade = parseInt(document.getElementById('age').value);
        const peso = parseFloat(document.getElementById('peso').value);
        const tipoSanguineo = document.getElementById('tipo sanguineo').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('Estado').value;

     
        if (peso < 50) {
            exibirMensagem("Lamento, o peso mínimo para doação é 50kg.", "erro");
            return;
        }

        if (idade < 16 || idade > 69) {
            exibirMensagem("A idade para doação deve ser entre 16 e 69 anos.", "erro");
            return;
        }

        
        const novoDoador = { nome, tipoSanguineo, idade, peso, cidade, estado };
        doadores.push(novoDoador);

        exibirMensagem("Doador cadastrado com sucesso!", "sucesso");
        atualizarTabela();
        form.reset();
    });

    function exibirMensagem(texto, tipo) {
        mensagemDiv.innerText = texto;
        mensagemDiv.className = tipo;
        setTimeout(() => { mensagemDiv.innerText = ""; mensagemDiv.className = ""; }, 4000);
    }

    function atualizarTabela() {
        if (doadores.length === 0) {
            tabelaContainer.innerHTML = "<p>Nenhum doador cadastrado no momento</p>";
            return;
        }

        let html = `
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Idade</th>
                        <th>Local</th>
                    </tr>
                </thead>
                <tbody>
        `;

        doadores.forEach(d => {
            html += `
                <tr>
                    <td>${d.nome}</td>
                    <td><strong>${d.tipoSanguineo}</strong></td>
                    <td>${d.idade}</td>
                    <td>${d.cidade}/${d.estado}</td>
                </tr>
            `;
        });

        html += "</tbody></table>";
        tabelaContainer.innerHTML = html;
    }
});