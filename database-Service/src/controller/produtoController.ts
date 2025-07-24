import produto from "../model/produtoModel.js";
import { db } from "../config/database-config.js";

export const criarProduto = async (req: any, res: any) => {
  console.log("Requisição POST recebida");
  console.log("Corpo da requisição:", req.body);
  
  // Se houver dados do usuário autenticado, logá-los
  if (req.user) {
    console.log("Usuário autenticado:", req.user.username, "ID:", req.user.id);
  }

  try {
    const p = new produto(req.body);
    console.log("corpo da requisição:", req.body);

    const query =
      "INSERT INTO produto(nome, preco_unitario, descricao, estoque_atual) VALUES($1, $2, $3, $4) RETURNING *";
    const params = [
      p.getNome() || "Produto sem nome",
      p.getPreco() || 0.0,
      p.getDescricao() || "Descrição não fornecida",
      p.getEstoqueAtual() || 0,
    ];

    const novoProduto = await db.one(query, params);
    console.log("Produto inserido:", novoProduto);
    console.log(params);

    res.status(201).json({
      message: `Produto ${novoProduto.id_produto} inserido com sucesso!`,
      produto: novoProduto,
      // Incluir informação do usuário que criou (se autenticado)
      ...(req.user && { createdBy: req.user.username })
    });
  } catch (err: any) {
    console.error("Erro ao inserir produto:", err);

    res.status(500).json({
      message: "Erro ao inserir o produto no banco de dados.",
      error: err.message || "Erro desconhecido",
    });
  }
};

export const listarProdutos = async (req: any, res: any) => {
  console.log("Requisição GET recebida para listar produtos");

  try {
    const query = "SELECT * FROM produto";
    const produtos = await db.any(query);

    console.log("Produtos encontrados:", produtos);

    res.status(200).json(produtos);
  } catch (err: any) {
    console.error("Erro ao listar produtos:", err);

    res.status(500).json({
      message: "Erro ao obter a lista de produtos do banco de dados.",
      error: err.message || "Erro desconhecido",
    });
  }
};
