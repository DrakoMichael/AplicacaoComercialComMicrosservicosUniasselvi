import produto from "../model/produtoModel.js";
import { db } from "../config/database-config.js";
export const criarProduto = async (req, res) => {
    console.log("Requisição POST recebida");
    console.log("Corpo da requisição:", req.body);
    try {
        const p = new produto(req.body);
        console.log("corpo da requisição:", req.body);
        const query = "INSERT INTO produto(nome, preco_unitario, descricao, estoque_atual) VALUES($1, $2, $3, $4) RETURNING *";
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
        });
    }
    catch (err) {
        console.error("Erro ao inserir produto:", err);
        res.status(500).json({
            message: "Erro ao inserir o produto no banco de dados.",
            error: err.message || "Erro desconhecido",
        });
    }
};
export const listarProdutos = async (req, res) => {
    console.log("Requisição GET recebida para listar produtos");
    try {
        const query = "SELECT * FROM produto";
        const produtos = await db.any(query);
        console.log("Produtos encontrados:", produtos);
        res.status(200).json(produtos);
    }
    catch (err) {
        console.error("Erro ao listar produtos:", err);
        res.status(500).json({
            message: "Erro ao obter a lista de produtos do banco de dados.",
            error: err.message || "Erro desconhecido",
        });
    }
};
//# sourceMappingURL=produtoController.js.map