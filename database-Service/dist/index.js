// C:\Users\Michael\Desktop\paper\dataBaseService\src\index.ts
import express from "express";
import routes from "./routes/routes.js"; // Suas rotas de API
import cors from "cors"; // <--- NOVO: Importe o pacote CORS aqui
const app = express();
export const appPort = 3332;
// --- MIDDLEWARES GLOBAIS (ORDEM IMPORTANTE!) ---
// 1. CORS: Permite que seu frontend (http://localhost:3333) acesse este backend (http://localhost:3332)
//    Essa é a peça que faltava para resolver o erro CORS.
app.use(cors({
    origin: "http://localhost:3333", // Especifique a origem exata do seu frontend
    // Para desenvolvimento, você também pode usar: origin: '*' para permitir todas as origens
}));
// 2. express.json(): Permite que o Express entenda corpos de requisição JSON (para POST/PUT)
app.use(express.json());
// --- SUAS ROTAS ---
// 3. Suas rotas de API personalizadas, definidas em './routes/routes.js'
//    Elas devem vir APÓS os middlewares globais como CORS e express.json().
app.use(routes);
// 4. Rota de teste da raiz (opcional, apenas para ver se o servidor está no ar)
app.get("/", (req, res) => {
    res.send({
        message: "Olá do meu projeto TypeScript com Express e PostgreSQL!",
        headers: req.headers,
    });
});
// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(appPort, () => {
    console.log(`Servidor rodando em http://localhost:${appPort}`);
});
// Você provavelmente não precisa exportar a instância 'app' se este for seu arquivo principal
// mas se for parte de um sistema de módulos que importa isso, pode manter.
export const appInstance = app;
//# sourceMappingURL=index.js.map