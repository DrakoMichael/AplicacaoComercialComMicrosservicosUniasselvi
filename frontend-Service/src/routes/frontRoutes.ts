import express from "express";
import { join } from "path";
import axios from "axios";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/formulario");
});

router.get("/formulario", async (req, res) => {
  res.sendFile(join(__dirname, "../../public/formulario.html"));
});

router.get("/listagem", async (req, res) => {
  res.sendFile(join(__dirname, "../../public/listagem.html"));
});

router.post("/enviar-dados", async (req, res) => {
  const formData = req.body;

  console.log("Dados recebidos do frontend:", formData);

  const targetServiceUrl = "http://localhost:3332"; // <- Ajuste aqui

  try {
    const response = await axios.post(targetServiceUrl, formData);

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(
      "Erro ao encaminhar dados para o serviço de destino:",
      error.message
    );

    if (error.response) {
      res.status(error.response.status).json({
        message: "Falha na comunicação com o serviço de destino.",
        details: error.response.data || error.message,
      });
    } else if (error.request) {
      res.status(500).json({
        message: "Serviço de destino não respondeu. Verifique se está online.",
        details: error.message,
      });
    } else {
      res.status(500).json({
        message:
          "Erro interno ao preparar a requisição para o serviço de destino.",
        details: error.message,
      });
    }
  }
});

export default router;
