export default class produto {
    nome;
    preco;
    descricao;
    estoqueAtual;
    constructor(data) {
        this.nome = data.nome || "produto sem nome";
        this.preco = data.preco_unitario || 0.0;
        this.descricao = data.descricao || "Descrição não fornecida";
        this.estoqueAtual = data.estoque_atual || 0;
    }
    // Getters
    getNome() {
        return this.nome;
    }
    getPreco() {
        return this.preco;
    }
    getEstoqueAtual() {
        return this.estoqueAtual;
    }
    getDescricao() {
        return this.descricao;
    }
    //setters
    setNome(nome) {
        this.nome = nome;
    }
    setPreco(preco) {
        this.preco = preco;
    }
    setDescricao(descricao) {
        this.descricao = descricao;
    }
    setEstoqueAtual(estoqueAtual) {
        this.estoqueAtual = estoqueAtual;
    }
}
//# sourceMappingURL=produtoModel.js.map