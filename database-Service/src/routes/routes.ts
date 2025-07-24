import express from "express";
const router = express.Router();
import {
  listarProdutos,
  criarProduto,
} from "../controller/produtoController.js";
import {
  login,
  profile,
  validateToken
} from "../controller/authController.js";
import { verifyToken, optionalAuth } from "../middleware/authMiddleware.js";

// *** ROTAS DE AUTENTICAÇÃO ***
router.post("/auth/login", login);
router.get("/auth/profile", verifyToken, profile);
router.get("/auth/validate", verifyToken, validateToken);

// *** ROTAS DE PRODUTOS ***
// Rota pública para listar produtos (sem autenticação obrigatória)
router.get("/listarProdutos", optionalAuth, listarProdutos);

// Rota protegida para criar produtos (requer autenticação)
router.post("/", verifyToken, criarProduto);

// Alternativa: se quiser que criar produto seja público, use:
// router.post("/", criarProduto);

export default router;
