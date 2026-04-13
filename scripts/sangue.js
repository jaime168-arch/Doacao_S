class GerenciadorDoadores {
    constructor(){
        this.form = document.getElementById('formDoador');
        this.tabelaContainer = document.getElementById('tabelaContainer');
        this.mensagemDiv = document.getElementById('mensagem');

        this.doadores = JSON.parse(localStorage.getItem('doadores_db')) || [];

        this.init();
    }

    init() {
        this.form.addEventListener('submit' , (e) => this.cadastrar(e));
        this.renderizarTabela();
    }

    cadastrar(e){
        e.preventDefault();

        const novoDoador = {
            nome: document.getElementById('nome').Value,
            idade: parseInt(document.getElementById('age').Value),
            peso: parseFloat(document.getElementById('peso').Value)
            tipo: document.getElementById('tipov sanguineo').Value,
            local: `${document.getElementById('cidade'). Value}/${document.getElementById('Estado').value.toUpperCase()}`
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
    }
}