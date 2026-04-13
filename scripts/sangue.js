class GerenciadorDoadores {
    constructor(){
        this.form = document.getElementById('formDoador');
        this.tabelaContainer = document.getElementById('tabelaContainer');
        this.mensagemDiv = document.getElementById('mensagem');

        this.doadores = JSON.parse(localStorage.getItem('doadores_db')) || [];

        this.init();
    }
}