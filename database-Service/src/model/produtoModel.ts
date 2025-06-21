export default class produto {
  nome: any | "produto sem nome";
  preco: number | 0.0;
  descricao: String | "Descrição não fornecida";
  estoqueAtual: Number | 0;

  constructor(data: any) {
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
  setNome(nome: string) {
    this.nome = nome;
  }

  setPreco(preco: number) {
    this.preco = preco;
  }

  setDescricao(descricao: string) {
    this.descricao = descricao;
  }

  setEstoqueAtual(estoqueAtual: number) {
    this.estoqueAtual = estoqueAtual;
  }
}
