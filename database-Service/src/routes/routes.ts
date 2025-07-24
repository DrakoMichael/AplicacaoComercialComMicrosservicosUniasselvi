import express from "express";
const router = express.Router();
import {
  listarProdutos,
  criarProduto,
} from "../controller/produtoController.js";

router.post("/", criarProduto);
router.get("/listarProdutos", listarProdutos);

export default router;
