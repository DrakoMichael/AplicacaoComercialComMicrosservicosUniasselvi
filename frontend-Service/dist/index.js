// src/index.ts (Seu arquivo principal)
import express from "express";
import frontRoutes from "./routes/frontRoutes.js"; // Importe o roteador
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
// --- Ordem dos Middlewares (MUITO IMPORTANTE!) ---
app.use(cors()); // 1. Middleware CORS: permite requisições de outras origens
app.use(express.json()); // 2. Middleware para parsear JSON no corpo da requisição POST
// 3. Middleware para servir arquivos estáticos (CSS, JS do frontend, HTML estático)
app.use(express.static(join(__dirname, "..", "public")));
// 4. Seus roteadores personalizados (frontRoutes neste caso)
//    Qualquer rota definida em frontRoutes será tratada aqui
app.use("/", frontRoutes); // Use o roteador no caminho raiz
const PORT = process.env.PORT || 3333; // Este é o seu frontend-Service, então 3333 faz sentido
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map