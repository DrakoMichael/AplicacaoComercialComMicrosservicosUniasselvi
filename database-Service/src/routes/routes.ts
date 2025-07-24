import express from "express";
import { verifyToken } from "../middlewares/tokenMiddleware.js";

const router = express.Router();
import {
  listarProdutos,
  criarProduto,
} from "../controller/produtoController.js";

router.post("/", verifyToken, criarProduto);
router.get("/listarProdutos", verifyToken, listarProdutos);

export default router;
