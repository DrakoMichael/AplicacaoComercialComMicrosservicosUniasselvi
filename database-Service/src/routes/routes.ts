import express from "express";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const router = express.Router();
import {
  listarProdutos,
  criarProduto,
  listarProdutoPorId,
} from "../controller/produtoController.js";

router.post("/", verifyToken, criarProduto);
router.get("/listarProdutos", verifyToken, listarProdutos);
router.get("/listarProdutos/:id", verifyToken, listarProdutoPorId);

export default router;
