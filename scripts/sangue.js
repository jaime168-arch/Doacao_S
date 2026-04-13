class GerenciadorDoadores {
    constructor() {
        this.form = document.getElementById('formDoador');
        this.tabelaContainer = document.getElementById('tabelaContainer');
        this.mensagemDiv = document.getElementById('mensagem');
        
        
        this.doadores = JSON.parse(localStorage.getItem('doadores_db')) || [];
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.cadastrar(e));
        this.renderizarTabela();
    }

    cadastrar(e) {
        e.preventDefault();

        const novoDoador = {
            nome: document.getElementById('nome').value,
            idade: parseInt(document.getElementById('age').value),
            peso: parseFloat(document.getElementById('peso').value),
            tipo: document.getElementById('tipo sanguineo').value,
            local: `${document.getElementById('cidade').value}/${document.getElementById('Estado').value.toUpperCase()}`
        };

      
        
        if (novoDoador.peso < 50 || novoDoador.idade < 16) {
            this.notificar("Requisitos básicos não atendidos (Peso/Idade).", "erro");
            return;
        }

        this.doadores.push(novoDoador);
        this.salvar();
        this.notificar("Cadastro realizado!", "sucesso");
        this.form.reset();
    }

    salvar() {
        localStorage.setItem('doadores_db', JSON.stringify(this.doadores));
        this.renderizarTabela();
    }

    notificar(msg, classe) {
        this.mensagemDiv.textContent = msg;
        this.mensagemDiv.className = classe;
        setTimeout(() => this.mensagemDiv.className = "", 3000);
    }

    renderizarTabela() {
        if (this.doadores.length === 0) {
            this.tabelaContainer.innerHTML = "<p>Nenhum registro encontrado.</p>";
            return;
        }

        const linhas = this.doadores.map(d => `
            <tr>
                <td>${d.nome}</td>
                <td><strong>${d.tipo}</strong></td>
                <td>${d.idade} anos</td>
                <td>${d.local}</td>
            </tr>
        `).join('');

        this.tabelaContainer.innerHTML = `
            <table>
                <thead>
                    <tr><th>Doador</th><th>Sangue</th><th>Idade</th><th>Localidade</th></tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
            <button onclick="localStorage.clear(); location.reload();" style="margin-top:10px; background:#666; font-size:12px;">Limpar Tudo</button>
        `;
    }
}


new GerenciadorDoadores();