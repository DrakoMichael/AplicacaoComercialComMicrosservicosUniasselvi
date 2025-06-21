import express from "express";
import frontRoutes from "./routes/frontRoutes.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// --- Ordem dos Middlewares (MUITO IMPORTANTE!) ---
app.use(cors()); // permite requisições de outras origens
app.use(express.json()); // para passar JSON no corpo da requisição POST
app.use(express.static(join(__dirname, "..", "public"))); //para servir
// arquivos estáticos (CSS, JS do frontend, HTML estático)

// roteadores personalizados (frontRoutes neste caso)
app.use("/", frontRoutes);

//define a rota
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen usa o express na porta definida
