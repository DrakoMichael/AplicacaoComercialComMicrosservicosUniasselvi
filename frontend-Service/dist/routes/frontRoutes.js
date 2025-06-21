import express from "express";
import { join } from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname } from "path";
// Definindo __filename e __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Crie um roteador Express, não um novo aplicativo 'app'
const router = express.Router();
// Redireciona a raiz para o formulário
router.get("/", (req, res) => {
    res.redirect("/formulario");
});
// Serve o arquivo HTML do formulário
router.get("/formulario", async (req, res) => {
    res.sendFile(join(__dirname, "../../public/formulario.html"));
});
// Serve o arquivo HTML da listagem
router.get("/listagem", async (req, res) => {
    res.sendFile(join(__dirname, "../../public/listagem.html"));
});
// Endpoint para encaminhar dados de cadastro para o serviço de backend
router.post("/enviar-dados", async (req, res) => {
    const formData = req.body; // express.json() deve estar configurado no arquivo principal para que req.body funcione
    console.log("Dados recebidos do frontend:", formData);
    // CORREÇÃO: O endpoint correto no backend para cadastro de produtos era /api/produtos
    const targetServiceUrl = "http://localhost:3332"; // <- Ajuste aqui
    try {
        const response = await axios.post(targetServiceUrl, formData);
        // Encaminha o status e os dados da resposta do backend diretamente para o frontend
        res.status(response.status).json(response.data);
    }
    catch (error) {
        console.error("Erro ao encaminhar dados para o serviço de destino:", error.message);
        // Tratamento de erros mais robusto
        if (error.response) {
            // O serviço de destino respondeu com um status de erro (ex: 4xx, 5xx)
            res.status(error.response.status).json({
                message: "Falha na comunicação com o serviço de destino.",
                details: error.response.data || error.message, // Inclui detalhes da resposta do erro do backend
            });
        }
        else if (error.request) {
            // A requisição foi feita, mas não houve resposta do serviço de destino (rede, serviço offline)
            res.status(500).json({
                message: "Serviço de destino não respondeu. Verifique se está online.",
                details: error.message,
            });
        }
        else {
            // Erro inesperado na configuração da requisição (código antes da requisição ser enviada)
            res.status(500).json({
                message: "Erro interno ao preparar a requisição para o serviço de destino.",
                details: error.message,
            });
        }
    }
});
export default router;
//# sourceMappingURL=frontRoutes.js.map