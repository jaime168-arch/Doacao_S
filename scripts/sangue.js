class GerenciadorDoadores {
    constructor() {
        
        this.elementos = {
            form: document.getElementById('formDoador'),
            tabela: document.getElementById('tabelaContainer'),
            mensagem: document.getElementById('mensagem'),
            inputs: {
                nome: document.getElementById('nome'),
                idade: document.getElementById('age'),
                peso: document.getElementById('peso'),
                tipo: document.getElementById('tipo sanguineo'),
                cidade: document.getElementById('cidade'),
                estado: document.getElementById('Estado')
            }
        };

        this.CHAVE_STORAGE = 'doadores_db';
        this.doadores = this.carregarDoadores();
        
        this.init();
    }

    init() {
        this.elementos.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.renderizarTabela();
    }

    carregarDoadores() {
        try {
            return JSON.parse(localStorage.getItem(this.CHAVE_STORAGE)) || [];
        } catch (error) {
            console.error("Erro ao carregar dados do Storage", error);
            return [];
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        
        const { nome, idade, peso, tipo, cidade, estado } = this.elementos.inputs;

        const novoDoador = {
            nome: nome.value.trim(),
            idade: parseInt(idade.value),
            peso: parseFloat(peso.value),
            tipo: tipo.value,
            local: `${cidade.value.trim()}/${estado.value.toUpperCase().trim()}`,
            dataCadastro: new Date().toLocaleDateString('pt-BR') 
        };

        if (this.isValido(novoDoador)) {
            this.doadores.push(novoDoador);
            this.salvar();
            this.notificar("Doador cadastrado com sucesso!", "sucesso");
            this.elementos.form.reset();
        }
    }


    isValido(doador) {
        if (!doador.nome || !doador.tipo) {
            this.notificar("Preencha todos os campos obrigatórios.", "erro");
            return false;
        }
        if (doador.peso < 50) {
            this.notificar("Peso insuficiente para doação (< 50kg).", "erro");
            return false;
        }
        if (doador.idade < 16 || doador.idade > 69) {
            this.notificar("Idade fora da faixa permitida (16-69 anos).", "erro");
            return false;
        }
        return true;
    }

    salvar() {
        localStorage.setItem(this.CHAVE_STORAGE, JSON.stringify(this.doadores));
        this.renderizarTabela();
    }

    limparHistorico() {
        if (confirm("Tem certeza que deseja apagar todos os doadores?")) {
            localStorage.removeItem(this.CHAVE_STORAGE);
            this.doadores = [];
            this.renderizarTabela();
            this.notificar("Histórico limpo.", "sucesso");
        }
    }

    notificar(msg, classe) {
        const { mensagem } = this.elementos;
        mensagem.textContent = msg;
        mensagem.className = classe;
        setTimeout(() => mensagem.className = "", 3000);
    }

    renderizarTabela() {
        if (this.doadores.length === 0) {
            this.elementos.tabela.innerHTML = `
                <div class="alerta-vazio">Nenhum doador encontrado.</div>
            `;
            return;
        }

        const linhas = this.doadores.map(d => `
            <tr>
                <td>${d.nome}</td>
                <td><span class="badge-sangue">${d.tipo}</span></td>
                <td>${d.idade} anos</td>
                <td>${d.local}</td>
                <td><small>${d.dataCadastro}</small></td>
            </tr>
        `).join('');

        this.elementos.tabela.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Doador</th>
                        <th>Tipo</th>
                        <th>Idade</th>
                        <th>Localidade</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
            <button id="btnLimpar" class="btn-secundario">Limpar Base de Dados</button>
        `;

        
        document.getElementById('btnLimpar').addEventListener('click', () => this.limparHistorico());
    }
}

new GerenciadorDoadores();