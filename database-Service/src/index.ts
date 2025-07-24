import express from "express";
import db from "./config/database-config.js";
import routes from "./routes/routes.js";
import cors from "cors";

const app = express();
export const appPort = 8080;

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(appPort, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${appPort}`);
});

export const appInstance = app;
