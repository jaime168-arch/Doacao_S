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
            nome: document.getElementById('nome').ariaValueMax,
            
        }
    }
}